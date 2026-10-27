
"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../lib/supabase";

function makeSlug(name) {
  const base = (name || "worker")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `${base || "worker"}-${crypto.randomUUID().slice(0, 8)}`;
}

function normalizeWhatsApp(phone) {
  const digits = (phone || "").replace(/\D/g, "");

  if (digits.startsWith("0")) return `234${digits.slice(1)}`;
  if (digits.startsWith("234")) return digits;

  return digits;
}

function parseLocation(location) {
  const parts = (location || "")
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  return {
    city: parts[0] || "Awka",
    state: parts[1] || "Anambra",
  };
}

async function completeWorkerProfile(user) {
  const metadata = user.user_metadata || {};

  const { data: existingProfile, error: profileCheckError } =
    await supabase
      .from("provider_profiles")
      .select("id")
      .eq("id", user.id)
      .maybeSingle();

  if (profileCheckError) {
    throw new Error(
      `Could not check your worker profile: ${profileCheckError.message}`
    );
  }

  if (!existingProfile) {
    const location = metadata.location || "";
    const parsedLocation = parseLocation(location);
    const phone = metadata.phone || "";

    const fullName =
      metadata.full_name ||
      metadata.fullName ||
      metadata.display_name ||
      user.email?.split("@")[0] ||
      "Worker";

    const profile = {
      id: user.id,
      display_name: fullName,
      slug: metadata.slug || makeSlug(fullName),
      bio: metadata.bio || "",
      phone,
      whatsapp: metadata.whatsapp || normalizeWhatsApp(phone),
      location,
      city: metadata.city || parsedLocation.city,
      state: metadata.state || parsedLocation.state,
      years_experience: Number(metadata.years_experience || 0),
      is_active: false,
    };

    const { error: insertProfileError } = await supabase
      .from("provider_profiles")
      .insert(profile);

    if (insertProfileError) {
      throw new Error(
        `Your account was created, but your profile could not be saved: ${insertProfileError.message}`
      );
    }
  }

  const serviceSlugs = Array.isArray(metadata.service_slugs)
    ? [...new Set(metadata.service_slugs)]
    : [];

  if (serviceSlugs.length > 0) {
    const { data: categories, error: categoriesError } = await supabase
      .from("service_categories")
      .select("id, slug")
      .in("slug", serviceSlugs);

    if (categoriesError) {
      throw new Error(
        `Your profile exists, but your services could not be loaded: ${categoriesError.message}`
      );
    }

    const associations = (categories || []).map((category) => ({
      provider_id: user.id,
      service_id: category.id,
    }));

    if (associations.length > 0) {
      const { error: servicesError } = await supabase
        .from("provider_services")
        .upsert(associations, {
          onConflict: "provider_id,service_id",
          ignoreDuplicates: true,
        });

      if (servicesError) {
        throw new Error(
          `Your profile exists, but your selected services could not be saved: ${servicesError.message}`
        );
      }
    }
  }
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next");

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    if (!supabase) {
      setMessageType("error");
      setMessage(
        "Supabase is not configured. Check your .env.local settings and restart the development server."
      );
      return;
    }

    const email = form.identifier.trim().toLowerCase();

    if (!email || !form.password) {
      setMessageType("error");
      setMessage("Enter your email address and password.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessageType("error");
      setMessage("Enter the email address you used to register.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: form.password,
      });

      if (error) {
        if (error.message.toLowerCase().includes("email not confirmed")) {
          throw new Error(
            "Please confirm your email address before signing in. Check your inbox and spam folder."
          );
        }

        throw error;
      }

      if (!data.user) {
        throw new Error(
          "Sign-in did not return a user account. Please try again."
        );
      }

      const user = data.user;

      // Check administrator access before handling normal accounts.
      const { data: adminRecord, error: adminCheckError } = await supabase
        .from("autoconnet_admins")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (adminCheckError) {
        throw new Error(
          "We could not verify your administrator access. Check the autoconnet_admins table permissions and try again."
        );
      }

      if (adminRecord) {
        setMessageType("success");
        setMessage("Admin login successful. Opening your dashboard...");

        router.replace("/admin");
        router.refresh();
        return;
      }

      // Only worker/provider accounts should have a worker profile.
      const isProvider =
        user.user_metadata?.account_type === "provider";

      if (isProvider) {
        try {
          // Restore the worker's profile and selected services if needed.
          await completeWorkerProfile(user);

          // Check whether the worker has completed the ₦800 payment.
          const { data: payment, error: paymentError } = await supabase
            .from("registration_payments")
            .select("id, status")
            .eq("provider_id", user.id)
            .eq("gateway", "paystack")
            .eq("status", "successful")
            .limit(1)
            .maybeSingle();

          if (paymentError) {
            throw new Error(
              "We could not verify your registration payment status. Please try again."
            );
          }

          // Unpaid workers must pay before proceeding.
          if (!payment) {
            setMessageType("success");
            setMessage(
              "Welcome back! Taking you to your worker registration payment..."
            );

            router.replace("/registration-payment");
            router.refresh();
            return;
          }
        } catch (profileError) {
          setMessageType("error");
          setMessage(
            profileError.message ||
              "We could not complete your worker setup. Please try again."
          );
          return;
        }
      }

      // Customers and workers with a successful payment can continue.
      setMessageType("success");
      setMessage("Signed in successfully. Taking you to AutoConnet...");

      const destination =
        nextPath &&
        nextPath.startsWith("/") &&
        !nextPath.startsWith("//") &&
        !nextPath.startsWith("/admin")
          ? nextPath
          : "/";

      router.replace(destination);
      router.refresh();
    } catch (error) {
      setMessageType("error");
      setMessage(
        error.message || "We could not sign you in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-[#dfe7df] bg-white px-4 py-3.5 text-sm text-[#20372b] outline-none transition placeholder:text-[#9aa69d] focus:border-[#176b46] focus:ring-4 focus:ring-[#176b46]/10";

  return (
    <main className="flex min-h-screen flex-col bg-[#f5f7f2] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-[1080px]">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#176b46] text-white shadow-sm">
            <svg viewBox="0 0 44 44" fill="none" className="h-8 w-8">
              <path
                d="M8 23.5 17.5 14l7 7L17 28.5"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="m21 16.5 5-5 10 10-10 10-5-5"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          <span className="text-2xl font-extrabold tracking-tight text-[#183d2b]">
            Auto<span className="text-[#176b46]">Connet</span>
          </span>
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-center py-10">
        <div className="grid w-full max-w-[950px] overflow-hidden rounded-[28px] border border-[#e4eae1] bg-white shadow-[0_20px_70px_-35px_rgba(25,65,42,0.24)] md:grid-cols-[1fr_1fr]">
          <section className="relative hidden overflow-hidden bg-[#123e2b] p-9 text-white md:flex md:flex-col md:justify-between lg:p-12">
            <div className="pointer-events-none absolute -right-20 -top-16 h-64 w-64 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-[#176b46]/50 blur-2xl" />

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-xs font-semibold text-[#d5f0de]">
                <span className="h-2 w-2 rounded-full bg-[#9cdbb0]" />
                Welcome back
              </span>

              <h1 className="mt-8 text-4xl font-bold leading-tight tracking-tight lg:text-[42px]">
                Your next opportunity starts here.
              </h1>

              <p className="mt-5 text-sm leading-7 text-white/75">
                Sign in to continue your journey with AutoConnet and connect
                with the people who need your skills.
              </p>
            </div>

            <div className="relative mt-12 rounded-2xl border border-white/15 bg-white/[0.07] p-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-lg">
                  ✓
                </span>
                <span className="text-sm font-semibold">
                  Built around direct connections
                </span>
              </div>

              <p className="text-sm leading-6 text-white/65">
                Customers can discover professionals and discuss jobs and
                prices directly with them.
              </p>
            </div>

            <p className="relative mt-10 text-xs text-white/50">
              AutoConnet · Connecting local skills to everyday needs.
            </p>
          </section>

          <section className="flex items-center p-5 sm:p-9 lg:p-12">
            <div className="mx-auto w-full max-w-[390px]">
              <div className="mb-8">
                <p className="text-sm font-semibold text-[#176b46]">
                  YOUR ACCOUNT
                </p>

                <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#183d2b]">
                  Sign in
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#718075]">
                  Enter the email and password you used to register.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="identifier"
                    className="text-sm font-semibold text-[#304538]"
                  >
                    Email address
                  </label>

                  <input
                    id="identifier"
                    name="identifier"
                    type="email"
                    autoComplete="email"
                    value={form.identifier}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between gap-3">
                    <label
                      htmlFor="password"
                      className="text-sm font-semibold text-[#304538]"
                    >
                      Password
                    </label>

                    <Link
                      href="/forgot-password"
                      className="text-xs font-semibold text-[#176b46] hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={form.password}
                      onChange={handleChange}
                      className={`${inputClass} pr-20`}
                      placeholder="Enter your password"
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-semibold text-[#176b46] hover:bg-[#edf5ee]"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {message && (
                  <div
                    role="status"
                    aria-live="polite"
                    className={`rounded-xl border px-4 py-3 text-sm leading-6 ${
                      messageType === "success"
                        ? "border-[#cce7d2] bg-[#eff9f0] text-[#245b3b]"
                        : "border-[#f0d7d7] bg-[#fff4f4] text-[#923c3c]"
                    }`}
                  >
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#176b46] px-5 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#105738] focus:outline-none focus:ring-4 focus:ring-[#176b46]/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Signing you in..." : "Sign in"}
                  {!loading && <span aria-hidden="true">→</span>}
                </button>
              </form>

              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-[#e8ede7]" />
                <span className="text-xs text-[#9aa69d]">
                  NEW TO AUTOCONNET?
                </span>
                <div className="h-px flex-1 bg-[#e8ede7]" />
              </div>

              <Link
                href="/register"
                className="block w-full rounded-xl border border-[#dce5dc] px-5 py-3.5 text-center text-sm font-bold text-[#176b46] transition hover:bg-[#f3f8f2]"
              >
                Create a Customer account
              </Link>

              <p className="mt-7 text-center text-xs leading-5 text-[#9aa69d]">
                By continuing, you agree to use AutoConnet responsibly and
                provide accurate account information.
              </p>
            </div>
          </section>
        </div>
      </div>

      <p className="text-center text-xs text-[#9aa69d]">
        © AutoConnet. All rights reserved.
      </p>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading login...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
