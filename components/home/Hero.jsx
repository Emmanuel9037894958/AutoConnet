"use client";

import { useState } from "react";
import Link from "next/link";

const popularSearches = [
  "Phone repair",
  "Electrician",
  "Plumber",
  "Computer repair",
];

export default function Hero() {
  const [service, setService] = useState("");
  const [location, setLocation] = useState("Awka, Anambra");

  function handleSearch(event) {
    event.preventDefault();

    const query = service.trim();

    if (!query) {
      document
        .getElementById("services")
        ?.scrollIntoView({ behavior: "smooth" });

      return;
    }

    document
      .getElementById("services")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#f0f5ec]"
    >
      <div className="pointer-events-none absolute -right-24 -top-20 h-80 w-80 rounded-full border border-[#dbe8d8]" />
      <div className="pointer-events-none absolute -right-10 -top-8 h-52 w-52 rounded-full border border-[#dbe8d8]" />

      <div className="mx-auto grid w-[calc(100%-32px)] max-w-[1160px] items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.12fr_.88fr] lg:gap-10 lg:py-24">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d6e5d4] bg-white/80 px-3 py-2 text-xs font-semibold text-[#176b46] sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-[#31965e]" />
            Your local services connection
          </div>

          <h1 className="max-w-[700px] text-[42px] font-extrabold leading-[1.08] tracking-[-2px] sm:text-6xl lg:text-[67px]">
            The right skills.
            <br />
            <span className="text-[#176b46]">Right when</span> you need them.
          </h1>

          <p className="mt-6 max-w-[550px] text-base leading-7 text-[#5a695f] sm:text-lg sm:leading-8">
            Find skilled professionals for repairs, installations and everyday
            jobs. Discover local talent and connect directly to discuss your
            needs.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-[#526159]">
            <span className="flex items-center gap-2 rounded-full bg-white px-3 py-2">
              <span className="text-[#176b46]">✓</span>
              Direct contact
            </span>

            <span className="flex items-center gap-2 rounded-full bg-white px-3 py-2">
              <span className="text-[#176b46]">✓</span>
              Local professionals
            </span>

            <span className="flex items-center gap-2 rounded-full bg-white px-3 py-2">
              <span className="text-[#176b46]">✓</span>
              Agree on your price
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#services"
              className="flex items-center gap-3 rounded-xl bg-[#176b46] px-6 py-4 font-semibold text-white shadow-sm transition hover:bg-[#105738]"
            >
              Explore services <span>↗</span>
            </a>

            <Link
              href="/register"
              className="rounded-xl border border-[#d6e0d4] bg-white px-6 py-4 font-semibold transition hover:bg-[#f9fcf8]"
            >
              I'm a professional
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[470px] lg:ml-auto">
          <div className="relative overflow-hidden rounded-[30px] bg-[#176b46] p-5 text-white shadow-[0_24px_70px_rgba(23,107,70,0.18)] sm:p-7">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,.5) 1px, transparent 1px)",
                backgroundSize: "23px 23px",
              }}
            />

            <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full border border-white/10" />
            <div className="absolute -right-5 -top-5 h-32 w-32 rounded-full border border-white/10" />

            <div className="relative flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-[#d1e8d8]">
                  What can we help with?
                </p>

                <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
                  Find your expert.
                </h2>
              </div>

              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10 text-2xl">
                ✳
              </div>
            </div>

            <form onSubmit={handleSearch} className="relative mt-7 space-y-3">
              <label className="flex items-center gap-3 rounded-xl bg-white px-4 py-3.5 text-[#176b46] focus-within:outline focus-within:outline-2 focus-within:outline-[#8bb89e]">
                <span className="text-xl" aria-hidden="true">
                  ⌕
                </span>

                <span className="min-w-0 flex-1">
                  <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-[#78867d]">
                    Service
                  </span>

                  <input
                    value={service}
                    onChange={(event) => setService(event.target.value)}
                    placeholder="e.g. phone repair"
                    className="w-full min-w-0 bg-transparent text-sm font-medium text-[#19251f] outline-none placeholder:text-[#98a29a]"
                    aria-label="Service you need"
                  />
                </span>
              </label>

              <label className="flex items-center gap-3 rounded-xl bg-white px-4 py-3.5 text-[#176b46] focus-within:outline focus-within:outline-2 focus-within:outline-[#8bb89e]">
                <span className="text-xl" aria-hidden="true">
                  ⌖
                </span>

                <span className="min-w-0 flex-1">
                  <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-[#78867d]">
                    Your location
                  </span>

                  <input
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    placeholder="Enter town or city"
                    className="w-full min-w-0 bg-transparent text-sm font-medium text-[#19251f] outline-none placeholder:text-[#98a29a]"
                    aria-label="Your location"
                  />
                </span>
              </label>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#d5edb9] px-5 py-4 font-bold text-[#173d2b] transition hover:bg-white"
              >
                Search services <span>↗</span>
              </button>
            </form>

            <div className="relative mt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#d1e8d8]">
                Popular searches
              </p>

              <div className="flex flex-wrap gap-2">
                {popularSearches.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setService(item)}
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs text-white transition hover:bg-white/20"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute -bottom-5 -left-3 hidden items-center gap-3 rounded-2xl border border-[#e5eae2] bg-white p-4 shadow-lg sm:flex lg:-left-8">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#edf5ee] text-xl text-[#176b46]">
              ♧
            </span>

            <span>
              <span className="block text-sm font-bold">
                Local connections
              </span>

              <span className="mt-1 block text-xs text-[#758178]">
                Skills within your reach
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}