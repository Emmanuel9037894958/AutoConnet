
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
    const searchLocation = location.trim();

    const params = new URLSearchParams();

    if (query) params.set("service", query);
    if (searchLocation) params.set("location", searchLocation);

    const target = params.toString()
      ? `/services?${params.toString()}`
      : "/services";

    window.location.href = target;
  }

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-[#103e2c] text-white"
    >
      {/* Background video: place video1mp4.mp4 directly inside public */}
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/video2.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay keeps the content readable */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#082c1d]/95 via-[#104d35]/85 to-[#103e2c]/55" />

      {/* Subtle decorative details */}
      <div className="pointer-events-none absolute -right-24 -top-20 -z-10 h-80 w-80 rounded-full border border-white/10" />
      <div className="pointer-events-none absolute -right-10 -top-8 -z-10 h-52 w-52 rounded-full border border-white/10" />

      <div className="mx-auto grid w-[calc(100%-32px)] max-w-[1160px] items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.12fr_.88fr] lg:gap-10 lg:py-24">
        {/* Left content */}
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-[#b9ed91]" />
            Connecting skills with opportunity
          </div>

          <h1 className="max-w-[700px] text-[30px] font-extrabold leading-[1.08] tracking-[-1.7px] sm:text-6xl lg:text-[67px]">
            Your Next Trusted Professional Is{" "}
            <span className="text-[#c5f29d]">Closer Than You Think.</span>
          </h1>

          <p className="mt-6 max-w-[550px] text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
            From home repairs to everyday services, discover skilled local
            professionals and connect directly to get the job done.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-white/90">
            <span className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-sm">
              <span className="text-[#c5f29d]">✓</span>
              Contact providers directly
            </span>

            <span className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-sm">
              <span className="text-[#c5f29d]">✓</span>
              Explore local services
            </span>

            <span className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-sm">
              <span className="text-[#c5f29d]">✓</span>
              Discuss prices directly
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#services"
              className="flex min-h-12 items-center gap-3 rounded-xl bg-[#c5f29d] px-6 py-4 font-bold text-[#123c29] shadow-lg transition hover:bg-white"
            >
              Explore services <span aria-hidden="true">↗</span>
            </a>

            <Link
              href="/join-as-worker"
              className="flex min-h-12 items-center rounded-xl border border-white/30 bg-white/10 px-6 py-4 font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Join as a worker
            </Link>
          </div>
        </div>

        {/* Right search panel */}
        <div className="relative mx-auto w-full max-w-[470px] lg:ml-auto">
          <div className="relative overflow-hidden rounded-[28px] border border-white/20 bg-[#104d35]/90 p-5 text-white shadow-[0_24px_70px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-7">
            <div
              className="pointer-events-none absolute inset-0 opacity-15"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,.6) 1px, transparent 1px)",
                backgroundSize: "23px 23px",
              }}
            />

            <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full border border-white/10" />
            <div className="absolute -right-5 -top-5 h-32 w-32 rounded-full border border-white/10" />

            <div className="relative flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-green-100">
                  Let's get your job moving
                </p>
                <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
                  Find your expert.
                </h2>
              </div>

              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/10 text-2xl">
                ✳
              </div>
            </div>

            <form onSubmit={handleSearch} className="relative mt-7 space-y-3">
              <label className="flex items-center gap-3 rounded-xl bg-white px-4 py-3.5 text-[#176b46] focus-within:outline focus-within:outline-2 focus-within:outline-[#c5f29d]">
                <span className="text-xl" aria-hidden="true">
                  ⌕
                </span>

                <span className="min-w-0 flex-1">
                  <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-[#78867d]">
                    What service do you need?
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

              <label className="flex items-center gap-3 rounded-xl bg-white px-4 py-3.5 text-[#176b46] focus-within:outline focus-within:outline-2 focus-within:outline-[#c5f29d]">
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
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#c5f29d] px-5 py-4 font-bold text-[#173d2b] transition hover:bg-white"
              >
                Search services <span aria-hidden="true">↗</span>
              </button>
            </form>

            <div className="relative mt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-green-100">
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

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/80 sm:text-sm">
            <span className="text-[#c5f29d]" aria-hidden="true">
              ✓
            </span>
            Discover professionals serving your area
          </div>
        </div>
      </div>
    </section>
  );
}
