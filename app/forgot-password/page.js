
"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("emmanuelamamchukwu506@gmail.com");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setError("");

    if (!supabase) {
      setError("Supabase is not configured. Check your .env.local file.");
      return;
    }

    setLoading(true);

    try {
      const { error: resetError } =
        await supabase.auth.resetPasswordForEmail(email.trim(), {
          redirectTo: `${window.location.origin}/reset-password`,
        });

      if (resetError) {
        setError(resetError.message);
      } else {
        setMessage(
          "Your reset request was submitted. Check your inbox and spam folder for the newest email. Open its link to set a new password."
        );
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f8f5] px-4 py-12">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-8 flex items-center justify-center gap-3"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#176b46] text-xl font-black text-white">
            A
          </span>

          <span className="text-2xl font-extrabold tracking-tight text-[#123e2b]">
            AutoConnet
          </span>
        </Link>

        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xl sm:p-8">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-2xl">
            🔐
          </div>

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#176b46]">
            Account recovery
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-gray-900">
            Forgot password?
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter your registered email address. We will send you a link to
            reset your AutoConnet password.
          </p>

          {message && (
            <div
              role="status"
              className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm leading-6 text-green-800"
            >
              {message}
            </div>
          )}

          {error && (
            <div
              role="alert"
              className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-gray-800"
              >
                Email address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#176b46] focus:ring-4 focus:ring-green-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#176b46] px-5 py-3.5 font-bold text-white transition hover:bg-[#125539] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Sending reset link..." : "Send reset link"}
            </button>
          </form>

          <div className="mt-6 border-t border-gray-100 pt-5 text-center">
            <Link
              href="/login"
              className="text-sm font-semibold text-[#176b46] hover:underline"
            >
              ← Back to sign in
            </Link>
          </div>
        </section>

        <p className="mt-6 text-center text-xs text-gray-500">
          © AutoConnet. All rights reserved.
        </p>
      </div>
    </main>
  );
}
