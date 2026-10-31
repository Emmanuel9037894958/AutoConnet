
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const heroSlides = [
  {
    heading: "Find Trusted Professionals Around You.",
    description:
      "Discover reliable artisans and service providers around Awka and beyond. The right professional for your next project is closer than you think.",
  },
  {
    heading: "Everyday Services, Made Easier.",
    description:
      "From electricians and plumbers to technicians and cleaners, find the services you need without unnecessary stress.",
  },
  {
    heading: "Your Home Deserves The Right Hands.",
    description:
      "Connect directly with skilled professionals who can help you handle repairs, maintenance and important home projects.",
  },
  {
    heading: "Local Skills. Real Opportunities.",
    description:
      "Discover talented service providers in your community and connect with people who are ready to get the job done.",
  },
  {
    heading: "The Right Professional Is Just A Search Away.",
    description:
      "Explore available professionals, discover useful services and contact your preferred provider directly.",
  },
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 5500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative isolate flex w-full items-center overflow-hidden bg-[#092c1e] text-white"
    >
      {/* Background video */}
      <div className="absolute inset-0 -z-20">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/video3.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Video overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#061b13]/90 via-[#092c1e]/80 to-[#092c1e]/65" />

      {/* Hero content */}
      <div className="relative mx-auto flex w-[calc(100%-32px)] max-w-[1200px] items-center py-12 sm:py-28 lg:py-32">
        <div className="w-full max-w-[760px]">

          {/* Gentle automatic text slider */}
          <div className="relative min-h-[250px] sm:min-h-[260px] lg:min-h-[280px]">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.heading}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  activeSlide === index
                    ? "translate-y-0 opacity-100"
                    : "translate-y-3 opacity-0"
                }`}
              >
                <h1 className="max-w-[740px] text-[34px] font-extrabold leading-[1.12] tracking-tight sm:text-5xl lg:text-[64px]">
                  {slide.heading}
                </h1>

                <p className="mt-5 max-w-[620px] text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
                  {slide.description}
                </p>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="mt-5 flex w-full flex-row gap-3 sm:w-auto">
            <Link
              href="#services"
              className="flex flex-1 items-center justify-center whitespace-nowrap rounded-lg bg-[#16834f] px-3 py-3.5 text-center text-xs font-bold text-white transition hover:bg-[#116b40] sm:flex-none sm:px-8 sm:text-sm"
            >
              Explore
            </Link>

            <Link
              href="/join-as-worker"
              className="flex flex-1 items-center justify-center whitespace-nowrap rounded-lg border border-white/60 bg-white/10 px-3 py-3.5 text-center text-xs font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-[#092c1e] sm:flex-none sm:px-8 sm:text-sm"
            >
              Join as a Worker
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
