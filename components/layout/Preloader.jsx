"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#f3fff6]">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-emerald-200/30 blur-[100px]" />

        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-green-200/30 blur-[100px]" />

        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#176b46]/5" />

        <div className="absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#176b46]/5" />
      </div>

      {/* Loader */}
      <div className="relative flex flex-col items-center">
        {/* Animated logo */}
        <div className="relative flex h-40 w-40 items-center justify-center">
          {/* Glow */}
          <div className="absolute h-28 w-28 animate-pulse rounded-full bg-[#176b46]/10 blur-2xl" />

          {/* Outer ring */}
          <div className="absolute inset-0 animate-[spin_6s_linear_infinite] rounded-full border border-[#176b46]/10" />

          {/* Main ring */}
          <div className="absolute inset-2 animate-[spin_2.8s_linear_infinite] rounded-full border-[3px] border-transparent border-r-[#176b46]/30 border-t-[#176b46]" />

          {/* Inner ring */}
          <div className="absolute inset-5 animate-[spin_2s_linear_infinite_reverse] rounded-full border-2 border-transparent border-b-[#75bd91] border-l-[#75bd91]/40" />

          {/* Orbit dots */}
          <div className="absolute inset-0 animate-[spin_5s_linear_infinite]">
            <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-[#176b46] shadow-[0_0_12px_rgba(23,107,70,0.5)]" />

            <span className="absolute bottom-3 left-5 h-1.5 w-1.5 rounded-full bg-[#75bd91]" />
          </div>

          {/* Logo box */}
          <div className="relative flex h-[82px] w-[82px] items-center justify-center rounded-[26px] bg-[#176b46] shadow-[0_15px_45px_rgba(23,107,70,0.28)]">
            <div className="absolute inset-0 overflow-hidden rounded-[26px]">
              <div className="preloader-shine absolute -left-20 top-0 h-full w-16 rotate-[25deg] bg-white/10 blur-md" />
            </div>

            {/* AutoConnet icon */}
            <svg
              viewBox="0 0 48 48"
              fill="none"
              className="relative h-12 w-12"
              aria-hidden="true"
            >
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

              <circle
                cx="24"
                cy="24"
                r="2.5"
                fill="white"
              />
            </svg>
          </div>
        </div>

        {/* Brand name only */}
        <h1 className="mt-8 text-[34px] font-extrabold tracking-[-0.04em] text-[#123e2b]">
          Auto<span className="text-[#176b46]">Connet</span>
        </h1>
      </div>
    </div>
  );
}