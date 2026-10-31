
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import WorkerCard from "@/components/workers/WorkerCard";
import { supabase } from "@/lib/supabase";

export default function FeaturedWorkers() {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadWorkers() {
      if (!supabase) {
        setError("The worker directory is not configured correctly.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        // Fetch only active worker profiles.
        const { data: profiles, error: profileError } = await supabase
          .from("provider_profiles")
          .select(
            "id, display_name, slug, bio, location, city, state, years_experience, is_active"
          )
          .eq("is_active", true)
          .order("display_name", { ascending: true })
          .limit(6);

        if (profileError) throw profileError;

        if (!profiles || profiles.length === 0) {
          if (!cancelled) setWorkers([]);
          return;
        }

        const providerIds = profiles.map((profile) => profile.id);

        // Fetch the services belonging to these workers.
        const { data: providerServices, error: servicesError } =
          await supabase
            .from("provider_services")
            .select("provider_id, service_id")
            .in("provider_id", providerIds);

        if (servicesError) throw servicesError;

        const serviceIds = [
          ...new Set(
            (providerServices || []).map((item) => item.service_id)
          ),
        ];

        let categories = [];

        if (serviceIds.length > 0) {
          const { data, error: categoriesError } = await supabase
            .from("service_categories")
            .select("id, name, slug")
            .in("id", serviceIds);

          if (categoriesError) throw categoriesError;
          categories = data || [];
        }

        const categoryById = new Map(
          categories.map((category) => [category.id, category])
        );

        const servicesByProvider = new Map();

        for (const item of providerServices || []) {
          const category = categoryById.get(item.service_id);
          if (!category) continue;

          const current = servicesByProvider.get(item.provider_id) || [];
          current.push(category);
          servicesByProvider.set(item.provider_id, current);
        }

        const realWorkers = profiles
          .filter((profile) => profile.slug)
          .map((profile) => {
            const services = servicesByProvider.get(profile.id) || [];
            const serviceNames = services.map((service) => service.name);

            return {
              id: profile.id,
              slug: profile.slug,
              name: profile.display_name || "Professional",
              profession: serviceNames[0] || "Skilled Professional",
              category: serviceNames.length
                ? serviceNames.join(" · ")
                : "Services",
              rating: "New professional",
              description:
                profile.bio?.trim() ||
                "Contact this professional to discuss your service needs.",
              location:
                [profile.city, profile.state]
                  .filter(Boolean)
                  .join(", ") ||
                profile.location ||
                "Location not provided",
            };
          });

        if (!cancelled) setWorkers(realWorkers);
      } catch (err) {
        console.error("Failed to load AutoConnet workers:", err);

        if (!cancelled) {
          setError(
            "We couldn't load professionals right now. Please try again."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadWorkers();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="professionals"
      className="relative isolate overflow-hidden border-y border-[#e3ece3] bg-gradient-to-br from-[#edf7ef] via-[#f8f8f1] to-[#eaf2fa] py-20 sm:py-24"
    >
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute -left-32 top-10 -z-10 h-80 w-80 rounded-full bg-[#b8e5c5]/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-32 -z-10 h-96 w-96 rounded-full bg-[#c8dcf5]/50 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-64 w-96 -translate-x-1/2 rounded-full bg-[#f8dfbd]/30 blur-3xl" />

      <div className="mx-auto w-[calc(100%-32px)] max-w-[1160px]">
        {/* Section heading */}
        <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
          <div className="max-w-2xl">

            <h2 className=" text-3xl font-black tracking-[-1.5px] text-[#153f2d] sm:text-4xl md:text-5xl">
              Skilled professionals
              <span className="text-[#2875bd]">.</span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-[#586b5e] sm:text-base">
              Discover professionals registered on AutoConnet, explore
              their expertise and connect directly with the right person
              for your next job.
            </p>
          </div>

          <Link
            href="/register"
            className="inline-flex w-fit shrink-0 items-center justify-center gap-3 rounded-xl bg-[#176b46] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#176b46]/15 transition duration-300 hover:-translate-y-1 hover:bg-[#105738] hover:shadow-xl"
          >
            Become a professional
            <span className="text-lg">↗</span>
          </Link>
        </div>

        {/* Loading state */}
        {loading && (
          <div
            className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            aria-label="Loading professionals"
          >
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-[26px] border border-white/80 bg-white/80 p-6 shadow-sm"
              >
                <div className="h-14 w-14 rounded-2xl bg-[#dcebdd]" />
                <div className="mt-6 h-4 w-1/3 rounded bg-[#e4eee4]" />
                <div className="mt-3 h-5 w-2/3 rounded bg-[#e4eee4]" />
                <div className="mt-4 h-4 w-full rounded bg-[#e4eee4]" />
                <div className="mt-2 h-4 w-3/4 rounded bg-[#e4eee4]" />
                <div className="mt-7 h-10 w-full rounded-xl bg-[#e4eee4]" />
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div
            role="alert"
            className="mt-12 rounded-[26px] border border-red-200 bg-white/90 p-8 shadow-sm"
          >
            <p className="font-bold text-[#19251f]">
              Professionals are temporarily unavailable.
            </p>

            <p className="mt-2 text-sm leading-6 text-[#68766c]">
              {error}
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 rounded-xl bg-[#176b46] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#105738]"
            >
              Try again
            </button>
          </div>
        )}

        {/* Real worker profiles */}
        {!loading && !error && workers.length > 0 && (
          <>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {workers.map((worker) => (
                <WorkerCard key={worker.id} worker={worker} />
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-3 rounded-xl border-2 border-[#176b46] bg-white/70 px-8 py-4 text-sm font-bold text-[#176b46] shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-[#176b46] hover:text-white hover:shadow-lg"
              >
                Explore services
                <span className="text-lg">↗</span>
              </Link>
            </div>
          </>
        )}

        {/* Empty state */}
        {!loading && !error && workers.length === 0 && (
          <div className="mt-12 overflow-hidden rounded-[30px] border border-white/80 bg-white/75 px-6 py-14 text-center shadow-sm backdrop-blur">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-[22px] bg-gradient-to-br from-[#dcefe0] to-[#e0ecfa] text-3xl text-[#176b46]">
              ♙
            </div>

            <h3 className="mt-6 text-xl font-extrabold text-[#193b2b] sm:text-2xl">
              Our professional network is growing
            </h3>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-[#68766c]">
              No active professional profiles are available to display yet.
              Skilled workers can register to create their profiles and help
              customers discover their services.
            </p>

            <Link
              href="/register"
              className="mt-7 inline-flex items-center justify-center gap-3 rounded-xl bg-[#176b46] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-[#176b46]/15 transition hover:-translate-y-1 hover:bg-[#105738]"
            >
              Register your skills
              <span className="text-lg">↗</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
