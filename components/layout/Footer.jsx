import Link from "next/link";

function BrandMark() {
  return (
    <span
      className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-500/10 text-emerald-500 transition-transform duration-300 group-hover:scale-105"
      aria-hidden="true"
    >
      <svg viewBox="0 0 44 44" fill="none" className="h-6 w-6">
        <path
          d="M8 23.5 17.5 14l7 7L17 28.5"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21 16.5 26 11.5 36 21.5 26 31.5 21 26.5"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="22"
          cy="22"
          r="19"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity=".25"
        />
      </svg>
    </span>
  );
}

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-800 bg-slate-950 text-slate-200">
      {/* Background ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 h-96 w-[600px] rounded-full bg-emerald-600/30 blur-[120px]" />
      </div>

      <div className="relative mx-auto grid w-[calc(100%-32px)] max-w-[1160px] gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
        {/* Brand Info */}
        <div className="space-y-4">
          <Link href="/" className="group flex w-fit items-center gap-3">
            <BrandMark />
            <span className="text-xl font-bold tracking-tight text-white">
              Auto<span className="text-emerald-500">Connet</span>
            </span>
          </Link>

          <p className="max-w-sm text-sm leading-relaxed text-slate-400">
            Connecting customers with skilled professionals, starting in Anambra
            State and growing from there.
          </p>
        </div>

        {/* Explore Links */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            Explore
          </h3>

          <ul className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
            <li>
              <Link href="#services" className="transition-colors hover:text-emerald-400">
                Service categories
              </Link>
            </li>
            <li>
              <Link href="#how-it-works" className="transition-colors hover:text-emerald-400">
                How it works
              </Link>
            </li>
            <li>
              <Link href="#professionals" className="transition-colors hover:text-emerald-400">
                For professionals
              </Link>
            </li>
          </ul>
        </div>

        {/* Get Started Links */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            Get started
          </h3>

          <ul className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
            <li>
              <Link href="/register" className="transition-colors hover:text-emerald-400">
                Join as a worker
              </Link>
            </li>
            <li>
              <Link href="/login" className="transition-colors hover:text-emerald-400">
                Worker login
              </Link>
            </li>
            <li>
              <Link href="/" className="inline-flex items-center gap-1 transition-colors hover:text-emerald-400">
                Back to top <span aria-hidden="true">↑</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-slate-800/80 bg-slate-950/50 backdrop-blur-sm">
        <div className="mx-auto flex w-[calc(100%-32px)] max-w-[1160px] flex-col gap-3 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 AutoConnet. All rights reserved.</p>
          <p className="font-medium text-slate-400">Built to connect skills with opportunity.</p>
        </div>
      </div>
    </footer>
  );
}