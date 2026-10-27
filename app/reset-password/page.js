
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!supabase) {
      setError("Supabase is not configured. Check your environment variables.");
      setChecking(false);
      return;
    }

    let mounted = true;

    async function checkRecoverySession() {
      try {
        const { data, error: sessionError } =
          await supabase.auth.getSession();

        if (!mounted) return;

        if (sessionError) {
          setError(sessionError.message);
          setReady(false);
        } else if (data.session) {
          setReady(true);
        } else {
          setError(
            "No password-reset session was found. Please request a new reset link and open it from your email."
          );
          setReady(false);
        }
      } catch {
        if (mounted) {
          setError("Unable to verify your reset link. Please request a new one.");
        }
      } finally {
        if (mounted) setChecking(false);
      }
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;

      if (event === "PASSWORD_RECOVERY" && session) {
        setReady(true);
        setError("");
      }
    });

    checkRecoverySession();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setError("");

    if (!supabase) {
      setError("Supabase is not configured.");
      return;
    }

    if (password.length < 8) {
      setError("Your password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("The passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) {
        setError(updateError.message);
        return;
      }

      setMessage(
        "Your password has been updated successfully. You can now sign in with your new password."
      );
      setPassword("");
      setConfirmPassword("");
      setReady(false);
    } catch {
      setError("Unable to update your password. Please try again.");
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
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#176b46]">
            Account security
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-gray-900">
            Set a new password
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Choose a new password for your AutoConnet account.
          </p>

          {checking && (
            <div className="mt-6 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">
              Verifying your password-reset link...
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

          {message && (
            <div
              role="status"
              className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm leading-6 text-green-800"
            >
              {message}
            </div>
          )}

          {!checking && ready && (
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  New password
                </label>

                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-[#176b46] focus:ring-4 focus:ring-green-100"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  Confirm new password
                </label>

                <input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(event.target.value)
                  }
                  placeholder="Enter the password again"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-[#176b46] focus:ring-4 focus:ring-green-100"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#176b46] px-5 py-3.5 font-bold text-white transition hover:bg-[#125539] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Updating password..." : "Update password"}
              </button>
            </form>
          )}

          <div className="mt-6 border-t border-gray-100 pt-5 text-center">
            <Link
              href="/login"
              className="text-sm font-semibold text-[#176b46] hover:underline"
            >
              Back to sign in
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
