
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Wallet,
  ArrowRight,
  LoaderCircle,
} from "lucide-react";

export default function RegistrationPaymentPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function startPayment() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/payment/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          router.push("/login");
          return;
        }

        throw new Error(
          result.error || "Unable to start payment."
        );
      }

      if (!result.checkoutUrl) {
        throw new Error(
          "Paystack did not return a checkout link."
        );
      }

      window.location.assign(result.checkoutUrl);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Payment could not be started. Please try again."
      );
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <section className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
        <div className="bg-emerald-800 px-7 py-8 text-white sm:px-9">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
            <Wallet size={29} />
          </div>

          <p className="mt-6 text-sm font-semibold text-emerald-100">
            PROVIDER REGISTRATION
          </p>

          <h1 className="mt-2 text-3xl font-extrabold">
            Complete your registration
          </h1>

          <p className="mt-3 text-sm leading-6 text-emerald-50">
            Pay the one-time registration fee to submit your service
            profile for AutoConnet review and approval.
          </p>
        </div>

        <div className="p-7 sm:p-9">
          <div className="flex items-end justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <p className="text-sm text-slate-500">
                One-time registration fee
              </p>
              <p className="mt-2 text-4xl font-extrabold text-slate-900">
                ₦800
              </p>
            </div>

            <span className="mb-1 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              No recurring fee
            </span>
          </div>

          <div className="my-6 space-y-3 text-sm text-slate-600">
            <p className="flex items-start gap-3">
              <ShieldCheck
                size={19}
                className="mt-0.5 shrink-0 text-emerald-700"
              />
              Your payment is verified securely with Paystack.
            </p>

            <p className="flex items-start gap-3">
              <ShieldCheck
                size={19}
                className="mt-0.5 shrink-0 text-emerald-700"
              />
              Your profile remains hidden until AutoConnet approves it.
            </p>

            <p className="flex items-start gap-3">
              <Wallet
                size={19}
                className="mt-0.5 shrink-0 text-emerald-700"
              />
              Available payment options depend on Paystack checkout.
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={startPayment}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-4 font-bold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <LoaderCircle size={20} className="animate-spin" />
                Preparing checkout...
              </>
            ) : (
              <>
                Pay ₦800
                <ArrowRight size={19} />
              </>
            )}
          </button>

          <p className="mt-4 text-center text-xs leading-5 text-slate-500">
            You will continue to Paystack's secure checkout. Confirm your
            transaction status before attempting another payment.
          </p>
        </div>
      </section>
    </main>
  );
}
