
import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";

function redirectToStatus(request, result) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;

  const url = new URL("/payment/status", siteUrl);
  url.searchParams.set("result", result);

  return NextResponse.redirect(url);
}

export async function GET(request) {
  const reference = request.nextUrl.searchParams.get("reference");
  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!reference || !secretKey) {
    return redirectToStatus(request, "failed");
  }

  try {
    const verifyResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    const verification = await verifyResponse.json();

    if (!verifyResponse.ok || !verification.status || !verification.data) {
      console.error("Paystack verification failed:", verification.message);
      return redirectToStatus(request, "pending");
    }

    const transaction = verification.data;
    const admin = createSupabaseAdminClient();

    const { data: payment, error: lookupError } = await admin
      .from("registration_payments")
      .select("id, provider_id, amount, currency, gateway, tx_ref, status")
      .eq("tx_ref", reference)
      .eq("gateway", "paystack")
      .maybeSingle();

    if (lookupError || !payment) {
      console.error("Payment record not found:", lookupError?.message);
      return redirectToStatus(request, "failed");
    }

    const validTransaction =
      transaction.status === "success" &&
      transaction.reference === reference &&
      transaction.amount === 80000 &&
      transaction.currency === "NGN" &&
      String(payment.amount) === "800" &&
      payment.currency === "NGN";

    if (!validTransaction) {
      if (transaction.status === "failed" || transaction.status === "abandoned") {
        await admin
          .from("registration_payment")
          .update({ status: "failed" })
          .eq("id", payment.id)
          .eq("gateway", "paystack");

        return redirectToStatus(request, "failed");
      }

      return redirectToStatus(request, "pending");
    }

    // Make verification idempotent: don't overwrite an already verified payment.
    if (payment.status !== "successful") {
      const { error: updateError } = await admin
        .from("registration_payment")
        .update({
          status: "successful",
          verified_at: new Date().toISOString(),
          payment_method: transaction.channel
            ? `paystack_${transaction.channel}`
            : "paystack_checkout",
        })
        .eq("id", payment.id)
        .eq("gateway", "paystack");

      if (updateError) {
        console.error("Could not save verified payment:", updateError.message);
        return redirectToStatus(request, "pending");
      }
    }

    // Intentionally do not change provider_profiles.is_active here.
    return redirectToStatus(request, "success");
  } catch (error) {
    console.error("Paystack callback error:", error);
    return redirectToStatus(request, "pending");
  }
}
