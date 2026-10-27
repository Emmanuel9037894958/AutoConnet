
"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#e0fbe0]">
      {/* Soft background glow */}
      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-emerald-100/70 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-green-100/70 blur-3xl" />

      <div className="relative flex flex-col items-center px-6 text-center">
        {/* Circular loader */}
        <div className="relative mb-8 flex h-36 w-36 items-center justify-center">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-[#176b46]/10 border-t-[#176b46]" />

          {/* Inner rotating ring */}
          <div className="absolute inset-3 animate-[spin_1.5s_linear_infinite_reverse] rounded-full border-2 border-transparent border-b-[#75bd91] border-l-[#75bd91]" />

          {/* Brand icon */}
          <div className="relative flex h-[76px] w-[76px] items-center justify-center rounded-[24px] bg-[#176b46] shadow-[0_10px_35px_rgba(23,107,70,0.25)]">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              className="h-12 w-12"
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
              <circle cx="24" cy="24" r="2.5" fill="white" />
            </svg>
          </div>
        </div>

        {/* Brand name */}
        <h1 className="text-3xl font-extrabold tracking-tight text-[#123e2b]">
          Auto<span className="text-[#176b46]">Connet</span>
        </h1>

        <p className="mt-3 text-sm text-gray-500">
          Connecting skills. Creating opportunities.
        </p>

        {/* Loading indicator */}
        <div className="mt-7 flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#176b46]" />
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#176b46]">
            Loading AutoConnet
          </p>
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#176b46]" />
        </div>
      </div>
    </div>
  );
}
