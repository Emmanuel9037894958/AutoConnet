
import Link from "next/link";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CreditCard,
  FolderOpen,
  RefreshCw,
  ShieldCheck,
  Users,
  Wallet,
  CircleCheck,
  Clock3,
  TrendingUp,
  LayoutDashboard,
} from "lucide-react";
import { getAdminSession } from "../../lib/admin-auth";

const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

function formatDate(value) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Africa/Lagos",
  }).format(date);
}

function statusStyle(status) {
  const normalized = (status || "").toLowerCase();

  if (
    ["successful", "success", "completed", "verified"].includes(normalized)
  ) {
    return "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";
  }

  if (["pending", "processing"].includes(normalized)) {
    return "border-amber-400/20 bg-amber-400/10 text-amber-300";
  }

  if (["failed", "cancelled", "canceled"].includes(normalized)) {
    return "border-rose-400/20 bg-rose-400/10 text-rose-300";
  }

  return "border-slate-400/20 bg-slate-400/10 text-slate-300";
}

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  accent = "emerald",
}) {
  const accents = {
    emerald: {
      icon: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
      glow: "from-emerald-400/[0.09]",
      bar: "bg-emerald-400",
    },
    blue: {
      icon: "border-sky-400/20 bg-sky-400/10 text-sky-300",
      glow: "from-sky-400/[0.09]",
      bar: "bg-sky-400",
    },
    amber: {
      icon: "border-amber-400/20 bg-amber-400/10 text-amber-300",
      glow: "from-amber-400/[0.09]",
      bar: "bg-amber-400",
    },
    violet: {
      icon: "border-violet-400/20 bg-violet-400/10 text-violet-300",
      glow: "from-violet-400/[0.09]",
      bar: "bg-violet-400",
    },
  };

  const colors = accents[accent] || accents.emerald;

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#10271e] p-5 transition duration-300 hover:-translate-y-1 hover:border-emerald-400/25 hover:bg-[#132e23] sm:p-6">
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${colors.glow} to-transparent opacity-80`}
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-medium text-slate-400">{title}</p>
            <p className="mt-4 break-words text-3xl font-bold tracking-tight text-white sm:text-[34px]">
              {value}
            </p>
          </div>

          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${colors.icon}`}
            aria-hidden="true"
          >
            <Icon size={22} strokeWidth={1.8} />
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2 border-t border-white/[0.07] pt-4">
          <span className={`h-1.5 w-1.5 rounded-full ${colors.bar}`} />
          <p className="text-xs leading-5 text-slate-400">{description}</p>
        </div>
      </div>
    </article>
  );
}

function SectionHeading({ eyebrow, title, description, icon: Icon }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-400/15 bg-emerald-400/[0.08] text-emerald-300">
        <Icon size={19} />
      </div>

      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">
          {eyebrow}
        </p>
        <h2 className="mt-1 text-lg font-bold tracking-tight text-white sm:text-xl">
          {title}
        </h2>
        <p className="mt-1 text-sm leading-6 text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}

function DashboardLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#081710] px-6 text-slate-100">
      <div className="text-center">
        <div
          className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-emerald-400/20 border-t-emerald-400"
          role="status"
          aria-label="Loading dashboard"
        />

        <p className="mt-5 text-sm font-semibold">
          Loading AutoConnet Control Center…
        </p>

        <p className="mt-2 text-xs text-slate-400">
          Securely retrieving marketplace data.
        </p>
      </div>
    </main>
  );
}

async function AdminDashboardContent() {
  // Defer request-specific work until the incoming request exists.
  // This is important when Next.js Cache Components is enabled.
  await connection();

  const { supabase, user, isAdmin } = await getAdminSession();

  if (!user) {
    redirect("/login?next=/admin");
  }

  if (!isAdmin) {
    redirect("/");
  }

  const [
    providersResult,
    activeProvidersResult,
    categoriesResult,
    successfulPaymentsResult,
    pendingPaymentsResult,
    revenueResult,
    transactionsResult,
  ] = await Promise.all([
    supabase
      .from("provider_profiles")
      .select("id", { count: "exact", head: true }),

    supabase
      .from("provider_profiles")
      .select("id", { count: "exact", head: true })
      .eq("is_active", true),

    supabase
      .from("service_categories")
      .select("id", { count: "exact", head: true }),

    supabase
      .from("registration_payments")
      .select("id", { count: "exact", head: true })
      .eq("status", "successful")
      .not("verified_at", "is", null),

    supabase
      .from("registration_payments")
      .select("id", { count: "exact", head: true })
      .eq("status", "pending"),

    supabase
      .from("registration_payments")
      .select("amount")
      .eq("status", "successful")
      .not("verified_at", "is", null),

    supabase
      .from("registration_payments")
      .select(
        "id, provider_id, amount, currency, gateway, tx_ref, payment_method, status, verified_at, created_at"
      )
      .order("created_at", { ascending: false })
      .limit(10),
  ]);

  const queryErrors = [
    providersResult.error,
    activeProvidersResult.error,
    categoriesResult.error,
    successfulPaymentsResult.error,
    pendingPaymentsResult.error,
    revenueResult.error,
    transactionsResult.error,
  ].filter(Boolean);

  const totalRevenue = revenueResult.error
    ? null
    : (revenueResult.data || []).reduce(
        (total, payment) => total + Number(payment.amount || 0),
        0
      );

  const totalProviders = providersResult.error
    ? null
    : (providersResult.count ?? 0);

  const activeProviders = activeProvidersResult.error
    ? null
    : (activeProvidersResult.count ?? 0);

  const totalCategories = categoriesResult.error
    ? null
    : (categoriesResult.count ?? 0);

  const successfulPayments = successfulPaymentsResult.error
    ? null
    : (successfulPaymentsResult.count ?? 0);

  const pendingPayments = pendingPaymentsResult.error
    ? null
    : (pendingPaymentsResult.count ?? 0);

  const transactions = transactionsResult.data || [];

  return (
    <main className="min-h-screen bg-[#081710] text-slate-100">
      <header className="sticky top-0 z-30 border-b border-white/[0.08] bg-[#0b2017]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/admin" className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-700 text-white shadow-lg shadow-emerald-950/40">
              <BriefcaseBusiness size={23} />
            </div>

            <div className="min-w-0">
              <p className="text-lg font-extrabold tracking-tight text-white">
                Auto<span className="text-emerald-400">Connet</span>
              </p>
              <p className="text-xs text-slate-400">Owner control center</p>
            </div>
          </Link>

          <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] px-3 py-2">
            <ShieldCheck
              size={15}
              className="shrink-0 text-emerald-300"
            />
            <span className="hidden text-xs font-semibold text-emerald-200 sm:inline">
              Authorized administrator
            </span>
            <span className="text-xs font-semibold text-emerald-200 sm:hidden">
              Admin
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-4 py-7 sm:px-6 sm:py-10 lg:px-8">
        <section className="relative mb-8 overflow-hidden rounded-3xl border border-emerald-400/15 bg-gradient-to-br from-[#123b29] via-[#103023] to-[#0c241a] p-6 sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border border-emerald-300/[0.08]" />
          <div className="pointer-events-none absolute -right-5 -top-12 h-52 w-52 rounded-full border border-emerald-300/[0.08]" />
          <div className="pointer-events-none absolute -bottom-20 right-1/4 h-48 w-48 rounded-full bg-emerald-500/[0.08] blur-3xl" />

          <div className="relative flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-black/10 px-3 py-1.5">
                <LayoutDashboard size={14} className="text-emerald-300" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-200">
                  Control center
                </span>
              </div>

              <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Admin dashboard
                <span className="text-emerald-400">.</span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Manage your service marketplace, monitor provider activity,
                and keep track of verified registration payments from one
                central workspace.
              </p>
            </div>

            <div className="relative flex min-w-0 items-center gap-3 rounded-2xl border border-white/[0.09] bg-black/15 p-4 lg:min-w-[270px]">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
                <Activity size={21} />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">
                  Database overview
                </p>
                <p className="mt-1 break-all text-xs text-slate-400">
                  {user.email || "Authorized administrator"}
                </p>
              </div>

              <span
                className="absolute right-4 top-4 h-2 w-2 rounded-full bg-emerald-400"
                title="Dashboard loaded"
              />
            </div>
          </div>
        </section>

        {queryErrors.length > 0 && (
          <div className="mb-7 rounded-2xl border border-amber-400/20 bg-amber-400/[0.07] p-4 text-sm leading-6 text-amber-200">
            <div className="flex items-start gap-3">
              <Activity className="mt-0.5 shrink-0" size={18} />
              <div>
                <p className="font-semibold">Some figures are unavailable</p>
                <p className="mt-1 text-amber-100/70">
                  Check the relevant Supabase table permissions, column names,
                  and row-level security policies. Unavailable figures are
                  not treated as zero.
                </p>
              </div>
            </div>
          </div>
        )}

        <section>
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">
                Marketplace performance
              </p>
              <h2 className="mt-1 text-xl font-bold text-white">
                Business overview
              </h2>
            </div>

            <div className="hidden items-center gap-2 text-xs text-slate-500 sm:flex">
              <TrendingUp size={15} className="text-emerald-400" />
              Supabase data
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total providers"
              value={totalProviders === null ? "Unavailable" : totalProviders}
              description="Provider profiles recorded"
              icon={Users}
              accent="blue"
            />

            <StatCard
              title="Active providers"
              value={activeProviders === null ? "Unavailable" : activeProviders}
              description="Profiles currently marked active"
              icon={ArrowUpRight}
              accent="emerald"
            />

            <StatCard
              title="Service categories"
              value={totalCategories === null ? "Unavailable" : totalCategories}
              description="Categories in your marketplace"
              icon={FolderOpen}
              accent="violet"
            />

            <StatCard
              title="Verified revenue"
              value={
                totalRevenue === null
                  ? "Unavailable"
                  : naira.format(totalRevenue)
              }
              description="Successful payments with verification timestamps"
              icon={Wallet}
              accent="amber"
            />
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">
              Payment monitoring
            </p>
            <h2 className="mt-1 text-xl font-bold text-white">
              Registration payments
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <StatCard
              title="Verified payments"
              value={
                successfulPayments === null
                  ? "Unavailable"
                  : successfulPayments
              }
              description="Successful and verified registration payments"
              icon={CircleCheck}
              accent="emerald"
            />

            <StatCard
              title="Pending payments"
              value={
                pendingPayments === null ? "Unavailable" : pendingPayments
              }
              description="Payments awaiting final status"
              icon={Clock3}
              accent="amber"
            />
          </div>
        </section>

        <section className="mt-9 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#10271e] shadow-2xl shadow-black/10">
          <div className="flex flex-col justify-between gap-4 border-b border-white/[0.08] px-5 py-5 sm:flex-row sm:items-center sm:px-6">
            <SectionHeading
              eyebrow="Financial activity"
              title="Recent transactions"
              description="The latest 10 records from your registration payment table."
              icon={CreditCard}
            />

            <div className="flex w-fit items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-xs text-slate-400">
              <ArrowDownRight size={15} className="text-emerald-400" />
              Newest first
            </div>
          </div>

          {transactionsResult.error ? (
            <div className="p-6 text-sm leading-6 text-rose-300">
              Unable to load payment history. Check your
              registration_payments SELECT policy and confirm the requested
              columns exist.
            </div>
          ) : transactions.length === 0 ? (
            <div className="px-6 py-14 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] text-emerald-300">
                <CreditCard size={25} strokeWidth={1.7} />
              </div>

              <h3 className="mt-5 text-base font-bold text-white">
                No payment records yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
                When registration payment records are saved in your database,
                they will appear here with their reference, amount, status,
                and date.
              </p>

              <div className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-xs text-slate-400">
                <RefreshCw size={13} />
                Waiting for transaction records
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left text-sm">
                <thead className="border-b border-white/[0.07] bg-[#0b2017] text-[10px] uppercase tracking-[0.13em] text-slate-400">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Reference</th>
                    <th className="px-5 py-4 font-semibold">Provider ID</th>
                    <th className="px-5 py-4 font-semibold">Amount</th>
                    <th className="px-5 py-4 font-semibold">Gateway</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                    <th className="px-5 py-4 font-semibold">Date</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/[0.06]">
                  {transactions.map((payment) => (
                    <tr
                      key={payment.id}
                      className="transition hover:bg-emerald-400/[0.035]"
                    >
                      <td className="px-5 py-4">
                        <span className="font-semibold text-slate-200">
                          {payment.tx_ref || "No reference"}
                        </span>
                        <p className="mt-1 text-xs text-slate-500">
                          {payment.payment_method || "Method not recorded"}
                        </p>
                      </td>

                      <td className="px-5 py-4 font-mono text-xs text-slate-400">
                        {payment.provider_id
                          ? `${payment.provider_id.slice(0, 8)}…`
                          : "—"}
                      </td>

                      <td className="px-5 py-4 font-semibold text-white">
                        {naira.format(Number(payment.amount || 0))}
                      </td>

                      <td className="px-5 py-4 capitalize text-slate-300">
                        {(payment.gateway || "—").replaceAll("_", " ")}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusStyle(payment.status)}`}
                        >
                          {payment.status || "Unknown"}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-xs text-slate-400">
                        {formatDate(payment.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {transactions.length > 0 && !transactionsResult.error && (
            <div className="border-t border-white/[0.07] px-5 py-4 text-xs text-slate-500">
              Showing the latest {transactions.length} payment records.
            </div>
          )}
        </section>

        <footer className="mt-8 flex flex-col gap-3 border-t border-white/[0.08] py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-300">
              <BriefcaseBusiness size={16} />
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-300">
                AutoConnet Administration
              </p>
              <p className="mt-1 text-[10px] text-slate-500">
                Private owner workspace
              </p>
            </div>
          </div>

          <p className="break-all text-xs text-slate-500">
            Signed in as{" "}
            <span className="font-medium text-emerald-300">
              {user.email || "Authorized administrator"}
            </span>
          </p>
        </footer>
      </div>
    </main>
  );
}

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <AdminDashboardContent />
    </Suspense>
  );
}
