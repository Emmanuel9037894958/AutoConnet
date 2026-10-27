
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import {
  UserRound,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  BriefcaseBusiness,
  Search,
  CheckCircle2,
  AlertCircle,
  LoaderCircle,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");
  const [success, setSuccess] = useState(false);
  const [confirmationRequired, setConfirmationRequired] = useState(false);

  function updateField(event) {
    const { name, value, checked, type } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    if (!supabase) {
      setMessage(
        "Supabase configuration is missing. Check your .env.local file and restart the development server."
      );
      setMessageType("error");
      return;
    }

    const fullName = form.fullName.trim();
    const email = form.email.trim().toLowerCase();

    if (fullName.length < 2) {
      setMessage("Please enter your full name.");
      setMessageType("error");
      return;
    }

    if (form.password.length < 8) {
      setMessage("Your password must contain at least 8 characters.");
      setMessageType("error");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setMessage("Your passwords do not match.");
      setMessageType("error");
      return;
    }

    if (!form.terms) {
      setMessage("Please accept the Terms of Service to continue.");
      setMessageType("error");
      return;
    }

    setLoading(true);

    try {
      const emailRedirectTo =
        typeof window !== "undefined"
          ? `${window.location.origin}/login`
          : undefined;

      const { data, error } = await supabase.auth.signUp({
        email,
        password: form.password,
        options: {
          data: {
            full_name: fullName,
            account_type: "customer",
          },
          emailRedirectTo,
        },
      });

      if (error) {
        throw error;
      }

      if (!data.user) {
        throw new Error(
          "Supabase did not return a user account. Please try again."
        );
      }

      setConfirmationRequired(!data.session);
      setSuccess(true);
      setMessageType("success");
    } catch (error) {
      setMessage(
        error?.message || "Registration failed. Please try again."
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-[#dce7df] bg-[#f8fbf8] py-3.5 pl-11 pr-4 text-sm text-[#193b2b] outline-none transition placeholder:text-[#9aa99e] focus:border-[#218451] focus:bg-white focus:ring-4 focus:ring-[#218451]/10";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f3f7f2] px-4 py-8 sm:px-6 sm:py-12">
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#b9e2c5]/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 bottom-0 h-96 w-96 rounded-full bg-[#f6dfb9]/50 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <Link href="/" className="mb-8 inline-flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#248657] to-[#104b31] text-white shadow-lg shadow-green-900/15">
            <svg
              viewBox="0 0 44 44"
              fill="none"
              className="h-8 w-8"
              aria-hidden="true"
            >
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
            Auto<span className="text-[#208052]">Connet</span>
            <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#778c7c]">
              Skills meet opportunity
            </span>
          </span>
        </Link>

        <div className="grid overflow-hidden rounded-[28px] border border-white bg-white shadow-[0_25px_80px_-30px_rgba(20,70,42,0.2)] lg:grid-cols-[0.9fr_1.1fr]">
          <section className="relative hidden overflow-hidden bg-gradient-to-br from-[#12462f] via-[#176b46] to-[#25875a] p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-12">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/15" />
            <div className="pointer-events-none absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-lime-200/10 blur-2xl" />

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold text-[#e0f4c8]">
                <ShieldCheck size={15} />
                Free customer account
              </span>

              <h1 className="mt-8 max-w-md text-4xl font-bold leading-tight xl:text-5xl">
                Find the right help for your everyday needs.
              </h1>

              <p className="mt-5 max-w-md text-sm leading-7 text-white/75">
                Discover skilled professionals, explore services around you,
                and connect directly with people who can get the job done.
              </p>

              <div className="mt-9 space-y-5">
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10">
                    <Search size={19} />
                  </span>
                  <div>
                    <p className="font-semibold">Discover local professionals</p>
                    <p className="mt-1 text-sm leading-6 text-white/65">
                      Explore the services available on AutoConnet.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10">
                    <UserRound size={19} />
                  </span>
                  <div>
                    <p className="font-semibold">Your account, your choice</p>
                    <p className="mt-1 text-sm leading-6 text-white/65">
                      Create an account when you want one. Browsing services
                      remains free.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10">
                    <BriefcaseBusiness size={19} />
                  </span>
                  <div>
                    <p className="font-semibold">Are you a service provider?</p>
                    <p className="mt-1 text-sm leading-6 text-white/65">
                      Use the separate professional registration process to
                      list your services.
                    </p>
                    <Link
                      href="/join-as-worker"
                      className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-[#d0ef9e] hover:text-white"
                    >
                      Join as a Worker <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <p className="relative mt-12 border-t border-white/15 pt-5 text-xs text-white/60">
              AutoConnet · Connecting local skills to everyday needs.
            </p>
          </section>

          <section className="bg-gradient-to-br from-white via-white to-[#f2f8f0] px-5 py-8 sm:px-10 sm:py-12 xl:px-14">
            <div className="mx-auto max-w-md">
              {!success ? (
                <>
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#d7e9d8] bg-[#eaf6e9] px-3 py-1.5 text-[11px] font-bold tracking-[0.12em] text-[#176b46]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#27925b]" />
                    CUSTOMER REGISTRATION
                  </span>

                  <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-[#183d2b] sm:text-4xl">
                    Create your account
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-[#718075]">
                    Join AutoConnet to make it easier to access your account.
                    Creating a customer account is free.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="text-sm font-semibold text-[#304538]"
                      >
                        Full name
                      </label>
                      <div className="relative mt-2">
                        <UserRound
                          size={18}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7c9584]"
                        />
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          autoComplete="name"
                          value={form.fullName}
                          onChange={updateField}
                          className={inputClass}
                          placeholder="Enter your full name"
                          minLength={2}
                          maxLength={100}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="text-sm font-semibold text-[#304538]"
                      >
                        Email address
                      </label>
                      <div className="relative mt-2">
                        <Mail
                          size={18}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7c9584]"
                        />
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={form.email}
                          onChange={updateField}
                          className={inputClass}
                          placeholder="you@example.com"
                          maxLength={254}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="text-sm font-semibold text-[#304538]"
                      >
                        Create password
                      </label>
                      <div className="relative mt-2">
                        <LockKeyhole
                          size={18}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7c9584]"
                        />
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          autoComplete="new-password"
                          value={form.password}
                          onChange={updateField}
                          className={`${inputClass} pr-12`}
                          placeholder="At least 8 characters"
                          minLength={8}
                          maxLength={128}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((value) => !value)}
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#176b46] hover:bg-[#eaf6e9]"
                        >
                          {showPassword ? (
                            <EyeOff size={17} />
                          ) : (
                            <Eye size={17} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="text-sm font-semibold text-[#304538]"
                      >
                        Confirm password
                      </label>
                      <div className="relative mt-2">
                        <LockKeyhole
                          size={18}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7c9584]"
                        />
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          autoComplete="new-password"
                          value={form.confirmPassword}
                          onChange={updateField}
                          className={`${inputClass} pr-12`}
                          placeholder="Enter your password again"
                          minLength={8}
                          maxLength={128}
                          required
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword((value) => !value)
                          }
                          aria-label={
                            showConfirmPassword
                              ? "Hide confirm password"
                              : "Show confirm password"
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#176b46] hover:bg-[#eaf6e9]"
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={17} />
                          ) : (
                            <Eye size={17} />
                          )}
                        </button>
                      </div>
                    </div>

                    <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-[#68776d]">
                      <input
                        type="checkbox"
                        name="terms"
                        checked={form.terms}
                        onChange={updateField}
                        className="mt-1 h-4 w-4 shrink-0 accent-[#176b46]"
                        required
                      />
                      <span>
                        I agree to the{" "}
                        <Link
                          href="/terms"
                          className="font-bold text-[#176b46] underline underline-offset-4"
                        >
                          Terms of Service
                        </Link>{" "}
                        and understand that my account information will be
                        handled according to the applicable privacy policy.
                      </span>
                    </label>

                    {message && (
                      <div
                        role="alert"
                        className={`flex items-start gap-2 rounded-xl border px-4 py-3 text-sm leading-6 ${
                          messageType === "success"
                            ? "border-green-200 bg-green-50 text-green-900"
                            : "border-red-200 bg-red-50 text-red-800"
                        }`}
                      >
                        <AlertCircle
                          size={18}
                          className="mt-1 shrink-0"
                        />
                        <span>{message}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#176b46] to-[#258657] px-5 py-4 text-sm font-bold text-white shadow-lg shadow-[#176b46]/20 transition hover:-translate-y-0.5 hover:from-[#105738] hover:to-[#176b46] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#176b46]/20 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <LoaderCircle size={18} className="animate-spin" />
                          Creating account...
                        </>
                      ) : (
                        <>
                          Create free account <ArrowRight size={18} />
                        </>
                      )}
                    </button>
                  </form>

                  <div className="my-7 flex items-center gap-3">
                    <div className="h-px flex-1 bg-[#e3eae0]" />
                    <span className="text-xs text-[#8a988e]">
                      ALREADY HAVE AN ACCOUNT?
                    </span>
                    <div className="h-px flex-1 bg-[#e3eae0]" />
                  </div>

                  <p className="text-center text-sm text-[#718075]">
                    Already registered?{" "}
                    <Link
                      href="/login"
                      className="font-extrabold text-[#176b46] underline underline-offset-4 hover:text-[#104b31]"
                    >
                      Sign in
                    </Link>
                  </p>

                  <p className="mt-6 text-center text-sm text-[#718075] lg:hidden">
                    Want to offer services?{" "}
                    <Link
                      href="/join-as-worker"
                      className="font-bold text-[#176b46] underline underline-offset-4"
                    >
                      Join as a Worker
                    </Link>
                  </p>
                </>
              ) : (
                <div className="py-8 text-center">
                  <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[#e8f7e9]">
                    <CheckCircle2 size={42} className="text-[#218451]" />
                  </div>

                  <h2 className="mt-6 text-3xl font-extrabold text-[#183d2b]">
                    {confirmationRequired
                      ? "Check your email"
                      : "Account created!"}
                  </h2>

                  {confirmationRequired ? (
                    <p className="mt-4 text-sm leading-7 text-[#718075]">
                      Supabase has received your registration. Open the
                      confirmation link sent to{" "}
                      <strong className="break-all text-[#304538]">
                        {form.email.trim()}
                      </strong>{" "}
                      before signing in.
                    </p>
                  ) : (
                    <p className="mt-4 text-sm leading-7 text-[#718075]">
                      Welcome to AutoConnet,{" "}
                      <strong className="text-[#176b46]">
                        {form.fullName.trim()}
                      </strong>
                      . Your account has been created successfully.
                    </p>
                  )}

                  <div className="mt-7 flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={() => router.push("/login")}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#176b46] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#104b31]"
                    >
                      Continue to sign in <ArrowRight size={18} />
                    </button>

                    <Link
                      href="/services"
                      className="rounded-xl border border-[#dce7df] px-5 py-3.5 text-sm font-bold text-[#176b46] transition hover:bg-[#f0f8ef]"
                    >
                      Explore services
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

        <p className="mt-6 text-center text-xs text-[#8b9a8f]">
        © AutoConnet. All rights reserved.
        </p>
      </div>
    </main>
  );
}
