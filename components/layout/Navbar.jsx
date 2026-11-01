
"use client";

import { useState } from "react";
import Link from "next/link";

function BrandMark() {
  return (
    <span
      className="grid h-11 w-11 shrink-0 place-items-center"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        <rect
          x="1.5"
          y="1.5"
          width="45"
          height="45"
          rx="14"
          fill="#176b46"
        />
        <path
          d="M11 25.5L19.5 17L25 22.5L19.5 28"
          stroke="white"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M23 19.5L28.5 14L37 22.5L28.5 31L23 25.5"
          stroke="#BDE8C9"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="24" cy="24" r="2.5" fill="white" />
      </svg>
    </span>
  );
}

function BrandName({ mobile = false }) {
  return (
    <span
      className={`font-extrabold tracking-[-1.1px] ${
        mobile ? "text-[21px]" : "text-[23px]"
      }`}
    >
      <span className="text-[#123e2b]">Auto</span>
      <span className="text-[#176b46]">Connet</span>
    </span>
  );
}

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Explore services", href: "/services" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "For professionals", href: "/#professionals" },
  { label: "FAQ", href: "/faq" },
  { label: "Gallery", href: "/gallery" },
];

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);

  function closeMenu() {
    setMobileMenu(false);
  }

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-[#123e2b] text-white">
        <div className="mx-auto flex min-h-9 w-[calc(100%-32px)] max-w-[1160px] items-center justify-center gap-2 py-2 text-center text-xs sm:text-sm">
          <span className="text-[#b9e2c7]" aria-hidden="true">
            ●
          </span>
          <span>
            Connecting local skills to everyday needs.
            <span className="hidden sm:inline">
              {" "}Starting in Anambra State.
            </span>
          </span>
        </div>
      </div>

      {/* Main navbar */}
      <header className="sticky top-0 z-50 border-b border-[#e8ede7] bg-[#fafbf8]/95 backdrop-blur-md">
        <nav
          className="mx-auto flex min-h-[76px] w-[calc(100%-32px)] max-w-[1160px] items-center justify-between gap-4"
          aria-label="Main navigation"
        >
          {/* Brand */}
          <Link
            href="/"
            onClick={closeMenu}
            className="flex shrink-0 items-center gap-2"
            aria-label="AutoConnet home"
          >
            <BrandMark />
            <BrandName />
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-6 text-sm font-medium lg:flex xl:gap-8">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                className="whitespace-nowrap text-[#526159] transition hover:text-[#176b46]"
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden shrink-0 items-center gap-3 sm:flex">
            <Link
              href="/join-as-worker"
              className="whitespace-nowrap rounded-xl border border-[#dce5dc] px-4 py-3 text-sm font-semibold transition hover:bg-green bg-green-800"
            >
              Join as a worker
            </Link>

            <Link
              href="/services"
              className="flex items-center gap-2 whitespace-nowrap rounded-xl bg-[#176b46] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#105738]"
            >
              Find a worker <span aria-hidden="true">↗</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="relative z-[70] grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[#e1e8df] text-2xl text-[#123e2b] transition hover:bg-white sm:hidden"
            aria-label={
              mobileMenu ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={mobileMenu}
            aria-controls="autoconnet-mobile-menu"
            onClick={() => setMobileMenu((current) => !current)}
          >
            {mobileMenu ? "×" : "☰"}
          </button>
        </nav>
      </header>

      {/* Mobile backdrop */}
      <button
        type="button"
        aria-label="Close navigation menu"
        tabIndex={mobileMenu ? 0 : -1}
        onClick={closeMenu}
        className={`fixed inset-0 z-[55] bg-black/30 transition-opacity duration-300 sm:hidden ${
          mobileMenu
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Mobile sliding drawer */}
      <aside
        id="autoconnet-mobile-menu"
        className={`fixed right-0 top-0 z-[60] flex h-dvh w-[min(86vw,380px)] flex-col border-l border-[#e3e9e2] bg-[#fafbf8] shadow-2xl transition-transform duration-300 ease-out sm:hidden ${
          mobileMenu ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Mobile navigation"
        aria-hidden={!mobileMenu}
        inert={!mobileMenu}
      >
        {/* Drawer header */}
        <div className="flex min-h-[76px] items-center justify-between border-b border-[#e8ede7] px-5">
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-2"
            aria-label="AutoConnet home"
          >
            <BrandMark />
            <BrandName mobile />
          </Link>

          <button
            type="button"
            onClick={closeMenu}
            className="grid h-10 w-10 place-items-center rounded-xl border border-[#e1e8df] text-2xl text-[#123e2b] transition hover:bg-white"
            aria-label="Close navigation menu"
          >
            ×
          </button>
        </div>

        {/* Drawer content */}
        <div className="flex flex-1 flex-col overflow-y-auto px-5 py-6">
          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[#839087]">
            Navigation
          </p>

          <div className="flex flex-col gap-1">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                className="rounded-xl px-3 py-3.5 text-[15px] font-semibold text-[#26382e] transition hover:bg-[#edf5ee] hover:text-[#176b46]"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Drawer actions */}
          <div className="mt-auto border-t border-[#e8ede7] pt-5">
            <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[#839087]">
              Get started
            </p>

            <Link
              href="/join-as-worker"
              onClick={closeMenu}
              className="mb-3 block rounded-xl border border-[#dce5dc] px-4 py-3.5 text-center text-sm font-bold text-[#26382e] transition hover:bg-white"
            >
              Join as a worker
            </Link>

            <Link
              href="/services"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#176b46] px-4 py-3.5 text-sm font-bold text-white transition hover:bg-[#105738]"
            >
              Find a worker <span aria-hidden="true">↗</span>
            </Link>

            <p className="mt-5 px-3 text-center text-xs leading-5 text-[#7a887f]">
              Find skilled professionals for everyday jobs.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
