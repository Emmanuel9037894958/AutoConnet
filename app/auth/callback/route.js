
import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "../../../../lib/supabase-server";
import { createSupabaseAdminClient } from "../../../../lib/supabase-admin";

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(
      new URL("/login?error=email_confirmation_failed", request.url)
    );
  }

  try {
    // Exchange the confirmation code for an authenticated session.
    const supabase = await createSupabaseServerClient();

    const { error: exchangeError } =
      await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      console.error("Auth callback error:", exchangeError.message);

      return NextResponse.redirect(
        new URL("/login?error=email_confirmation_failed", request.url)
      );
    }

    // Get the authenticated user.
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.redirect(
        new URL("/login?error=authentication_failed", request.url)
      );
    }

    // Customers do not need provider registration payment.
    const metadata = user.user_metadata || {};
    const isProvider = metadata.account_type === "provider";

    if (!isProvider) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Use the service-role client to save the provider's registration data.
    const admin = createSupabaseAdminClient();

    const profile = {
      id: user.id,
      display_name: metadata.full_name || "",
      slug: metadata.slug || "",
      bio: metadata.bio || "",
      phone: metadata.phone || "",
      whatsapp: metadata.whatsapp || "",
      location: metadata.location || "",
      city: metadata.city || "",
      state: metadata.state || "",
      years_experience: Number(metadata.years_experience) || 0,
      is_active: false,
    };

    const { error: profileError } = await admin
      .from("provider_profiles")
      .upsert(profile, { onConflict: "id" });

    if (profileError) {
      console.error("Provider profile error:", profileError.message);

      return NextResponse.redirect(
        new URL("/login?error=profile_setup_failed", request.url)
      );
    }

    // Restore the provider's selected service categories.
    const serviceSlugs = Array.isArray(metadata.service_slugs)
      ? metadata.service_slugs.filter(
          (slug) => typeof slug === "string" && slug.trim()
        )
      : [];

    if (serviceSlugs.length > 0) {
      const { data: categories, error: categoriesError } = await admin
        .from("service_categories")
        .select("id, slug")
        .in("slug", serviceSlugs);

      if (categoriesError) {
        console.error("Category lookup error:", categoriesError.message);

        return NextResponse.redirect(
          new URL("/login?error=service_setup_failed", request.url)
        );
      }

      const services = (categories || []).map((category) => ({
        provider_id: user.id,
        service_id: category.id,
      }));

      if (services.length > 0) {
        const { error: servicesError } = await admin
          .from("provider_services")
          .upsert(services, {
            onConflict: "provider_id,service_id",
          });

        if (servicesError) {
          console.error("Provider services error:", servicesError.message);

          return NextResponse.redirect(
            new URL("/login?error=service_setup_failed", request.url)
          );
        }
      }
    }

    // Provider is authenticated and their profile is saved.
    // Continue to the existing registration payment page.
    return NextResponse.redirect(
      new URL("/registration-payment", request.url)
    );
  } catch (error) {
    console.error("Unexpected auth callback error:", error);

    return NextResponse.redirect(
      new URL("/login?error=unexpected_error", request.url)
    );
  }
}
