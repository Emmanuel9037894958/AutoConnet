
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
        const { data: profiles, error: profileError } =
          await supabase
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
      className="border-y border-[#e7ece4] bg-[#f7f9f4] py-16 sm:py-20"
    >
      <div className="mx-auto w-[calc(100%-32px)] max-w-[1160px]">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[2px] text-[#176b46]">
              Meet the network
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-[-1px] sm:text-4xl">
              Skilled professionals
            </h2>

            <p className="mt-3 max-w-xl leading-7 text-[#68766c]">
              Discover professionals registered on AutoConnet and explore
              the services they offer.
            </p>
          </div>

          <Link
            href="/register"
            className="w-fit text-sm font-bold text-[#176b46] hover:underline"
          >
            Become a professional ↗
          </Link>
        </div>

        {loading && (
          <div
            className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
            aria-label="Loading professionals"
          >
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-2xl border border-[#e5ebe3] bg-white p-5"
              >
                <div className="h-14 w-14 rounded-2xl bg-[#e7eee6]" />
                <div className="mt-6 h-4 w-1/3 rounded bg-[#e7eee6]" />
                <div className="mt-3 h-5 w-2/3 rounded bg-[#e7eee6]" />
                <div className="mt-4 h-4 w-full rounded bg-[#e7eee6]" />
                <div className="mt-2 h-4 w-3/4 rounded bg-[#e7eee6]" />
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div
            role="alert"
            className="mt-9 rounded-2xl border border-red-200 bg-white p-6"
          >
            <p className="font-semibold text-[#19251f]">
              Professionals are temporarily unavailable.
            </p>
            <p className="mt-2 text-sm text-[#68766c]">{error}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-4 rounded-xl bg-[#176b46] px-5 py-3 text-sm font-semibold text-white hover:bg-[#105738]"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && workers.length > 0 && (
          <>
            <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {workers.map((worker) => (
                <WorkerCard key={worker.id} worker={worker} />
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-xl border border-[#176b46] px-6 py-3 font-semibold text-[#176b46] transition hover:bg-[#176b46] hover:text-white"
              >
                Explore services ↗
              </Link>
            </div>
          </>
        )}

        {!loading && !error && workers.length === 0 && (
          <div className="mt-9 rounded-2xl border border-dashed border-[#cbd9ca] bg-white px-6 py-12 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#edf5ee] text-2xl text-[#176b46]">
              ♙
            </div>

            <h3 className="mt-5 text-xl font-bold text-[#19251f]">
              Our professional network is growing
            </h3>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-[#68766c]">
              No active professional profiles are available to display yet.
              Skilled workers can register to create their profiles and
              help customers discover their services.
            </p>

            <Link
              href="/register"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#176b46] px-6 py-3 font-semibold text-white transition hover:bg-[#105738]"
            >
              Register your skills ↗
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
