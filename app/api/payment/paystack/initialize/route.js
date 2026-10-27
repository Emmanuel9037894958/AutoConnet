
import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";

export async function POST() {
  try {
    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

    if (!secretKey || !siteUrl) {
      return NextResponse.json(
        { error: "Payment configuration is incomplete." },
        { status: 500 }
      );
    }

    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Please sign in before making your registration payment." },
        { status: 401 }
      );
    }

    if (!user.email) {
      return NextResponse.json(
        { error: "Your account needs an email address before payment." },
        { status: 400 }
      );
    }

    const admin = createSupabaseAdminClient();

    const { data: provider, error: providerError } = await admin
      .from("provider_profiles")
      .select("id, display_name, is_active")
      .eq("id", user.id)
      .maybeSingle();

    if (providerError) {
      console.error("Provider lookup failed:", providerError.message);

      return NextResponse.json(
        { error: "We could not check your worker profile. Please try again." },
        { status: 500 }
      );
    }

    if (!provider) {
      return NextResponse.json(
        { error: "Complete your worker registration before paying." },
        { status: 400 }
      );
    }

    if (provider.is_active) {
      return NextResponse.json(
        { error: "Your worker profile is already active." },
        { status: 409 }
      );
    }

    const reference = `AC-${randomUUID()}`;
    const baseUrl = siteUrl.replace(/\/+$/, "");

    // Save the pending payment before requesting checkout.
    const { error: insertError } = await admin
      .from("registration_payments")
      .insert({
        provider_id: user.id,
        amount: 800,
        currency: "NGN",
        gateway: "paystack",
        tx_ref: reference,
        payment_method: "paystack_checkout",
        status: "pending",
      });

    if (insertError) {
      console.error(
        "Payment record creation failed:",
        insertError.message
      );

      return NextResponse.json(
        { error: "Could not start your payment. Please try again." },
        { status: 500 }
      );
    }

    // Use the callback route that matches:
    // app/api/payment/paystack/callback/route.js
    const callbackUrl = `${baseUrl}/api/payment/paystack/callback`;

    const paystackResponse = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          amount: 80000,
          currency: "NGN",
          reference,
          callback_url: callbackUrl,
          metadata: {
            provider_id: user.id,
            purpose: "AutoConnet worker registration",
          },
        }),
        cache: "no-store",
      }
    );

    // Safely handle unexpected HTML or other non-JSON responses.
    const responseText = await paystackResponse.text();
    let result;

    try {
      result = JSON.parse(responseText);
    } catch {
      console.error(
        "Paystack returned a non-JSON response:",
        responseText.slice(0, 500)
      );

      await admin
        .from("registration_payments")
        .update({ status: "failed" })
        .eq("tx_ref", reference)
        .eq("gateway", "paystack");

      return NextResponse.json(
        {
          error:
            "The payment gateway returned an unexpected response. Please try again later.",
        },
        { status: 502 }
      );
    }

    if (
      !paystackResponse.ok ||
      !result.status ||
      !result.data?.authorization_url
    ) {
      console.error(
        "Paystack initialization failed:",
        result.message || "Unknown gateway error"
      );

      await admin
        .from("registration_payments")
        .update({ status: "failed" })
        .eq("tx_ref", reference)
        .eq("gateway", "paystack");

      return NextResponse.json(
        {
          error:
            result.message ||
            "Paystack could not start checkout. Please try again.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      checkoutUrl: result.data.authorization_url,
      reference,
    });
  } catch (error) {
    console.error("Payment initialization error:", error);

    return NextResponse.json(
      { error: "An unexpected error occurred while starting payment." },
      { status: 500 }
    );
  }
}
