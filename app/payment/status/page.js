
import Link from "next/link";
import { connection } from "next/server";

// Allow this route to render dynamically instead of failing during
// the production build's prerendering process.
export const instant = false;

export default async function PaymentStatusPage({ searchParams }) {
  await connection();

  const params = await searchParams;
  const result = params?.result || "pending";

  const states = {
    success: {
      title: "Payment verified",
      description:
        "Your ₦800 registration payment was verified successfully. Your worker profile will remain hidden until AutoConnet reviews and approves it.",
      color: "text-emerald-700",
    },
    pending: {
      title: "Payment is being checked",
      description:
        "We could not confirm the final payment status yet. If you used bank transfer, confirmation may take time. Please check your payment status before trying again.",
      color: "text-amber-700",
    },
    failed: {
      title: "Payment not completed",
      description:
        "The transaction was not completed successfully. Check your transaction status before attempting another payment.",
      color: "text-red-700",
    },
    cancelled: {
      title: "Payment cancelled",
      description:
        "You left checkout before completing payment. Your worker profile remains hidden until payment and approval requirements are completed.",
      color: "text-slate-700",
    },
  };

  const state = states[result] || states.pending;

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <section className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-lg sm:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl">
          {result === "success"
            ? "✓"
            : result === "failed"
              ? "!"
              : "…"}
        </div>

        <h1 className={`mt-6 text-2xl font-extrabold ${state.color}`}>
          {state.title}
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          {state.description}
        </p>

        <Link
          href="/registration-payment"
          className="mt-7 inline-flex rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800"
        >
          Return to payment
        </Link>

        <Link
          href="/"
          className="mt-4 block text-sm font-medium text-slate-600 hover:text-emerald-700"
        >
          Back to homepage
        </Link>
      </section>
    </main>
  );
}
