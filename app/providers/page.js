
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  ArrowLeft,
  MapPin,
  Search,
  UserRound,
  Phone,
  MessageCircle,
  Wrench,
  AlertCircle,
} from "lucide-react";

export default function ProvidersPage() {
  const [providers, setProviders] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    setSearch(params.get("search") || params.get("category") || "");
    setLocation(params.get("location") || "");
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadProviders() {
      setLoading(true);
      setError("");

      if (!supabase) {
        setError(
          "Supabase is not configured. Check your public environment variables."
        );
        setProviders([]);
        setLoading(false);
        return;
      }

      try {
        const { data, error: queryError } = await supabase
          .from("provider_profiles")
          .select(`
            id,
            display_name,
            slug,
            bio,
            phone,
            whatsapp,
            location,
            city,
            state,
            avatar_url,
            years_experience,
            is_active,
            provider_services (
              service_categories (
                name,
                slug
              )
            )
          `)
          .eq("is_active", true);

        if (queryError) throw queryError;

        const records = data || [];

        const params = new URLSearchParams(window.location.search);
        const serviceQuery = (
          params.get("search") || ""
        ).trim().toLowerCase();

        const categoryQuery = (
          params.get("category") || ""
        ).trim().toLowerCase();

        const locationQuery = (
          params.get("location") || ""
        ).trim().toLowerCase();

        const filtered = records.filter((provider) => {
          const services = (provider.provider_services || [])
            .map((item) => item.service_categories)
            .flat()
            .filter(Boolean);

          const serviceNames = services.map((service) =>
            service.name.toLowerCase()
          );

          const categorySlugs = services.map((service) =>
            (service.slug || "").toLowerCase()
          );

          const searchableText = [
            provider.display_name,
            provider.bio,
            ...serviceNames,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

          const matchesService =
            !serviceQuery || searchableText.includes(serviceQuery);

          const matchesCategory =
            !categoryQuery ||
            searchableText.includes(categoryQuery) ||
            categorySlugs.includes(
              categoryQuery.replaceAll(" ", "-")
            ) ||
            serviceNames.some((name) =>
              name.includes(categoryQuery)
            );

          const providerLocation = [
            provider.location,
            provider.city,
            provider.state,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

          const matchesLocation =
            !locationQuery ||
            providerLocation.includes(locationQuery);

          return (
            matchesService &&
            matchesCategory &&
            matchesLocation
          );
        });

        if (!cancelled) {
          setProviders(filtered);
        }
      } catch (err) {
        console.error("Unable to load providers:", err);

        if (!cancelled) {
          setError(
            err.message ||
              "We could not load providers. Please try again."
          );
          setProviders([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProviders();

    return () => {
      cancelled = true;
    };
  }, []);

  function runSearch(event) {
    event.preventDefault();

    const params = new URLSearchParams();

    if (search.trim()) params.set("search", search.trim());
    if (location.trim()) params.set("location", location.trim());

    window.location.href = `/providers?${params.toString()}`;
  }

  return (
    <main className="min-h-screen bg-[#f4f8f5] text-slate-900">
      <section className="bg-gradient-to-br from-[#063b2b] via-[#07583d] to-[#0b7650]">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-100 hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to services
          </Link>

          <h1 className="mt-7 text-3xl font-black text-white sm:text-5xl">
            Find your service provider
          </h1>

          <p className="mt-3 max-w-2xl leading-7 text-emerald-50/80">
            Discover registered professionals, explore their services
            and contact them directly.
          </p>

          <form
            onSubmit={runSearch}
            className="mt-8 grid gap-3 rounded-2xl bg-white p-3 md:grid-cols-[1fr_0.7fr_auto]"
          >
            <div className="flex items-center gap-3 px-3">
              <Search size={20} className="text-emerald-700" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Service or profession"
                className="w-full py-3 text-sm outline-none"
              />
            </div>

            <div className="flex items-center gap-3 px-3">
              <MapPin size={20} className="text-emerald-700" />
              <input
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="City or state"
                className="w-full py-3 text-sm outline-none"
              />
            </div>

            <button
              type="submit"
              className="rounded-xl bg-emerald-700 px-6 py-3 font-bold text-white hover:bg-emerald-800"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
        <div className="mb-7">
          <h2 className="text-2xl font-black">
            {loading ? "Finding providers..." : "Available providers"}
          </h2>

          {!loading && !error && (
            <p className="mt-2 text-sm text-slate-500">
              {providers.length} matching registered{" "}
              {providers.length === 1 ? "provider" : "providers"}
            </p>
          )}
        </div>

        {loading && (
          <div className="rounded-2xl bg-white p-10 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-700" />
            <p className="mt-4 text-slate-500">
              Loading real provider profiles...
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-white p-6">
            <AlertCircle className="text-red-600" size={26} />
            <h3 className="mt-3 font-bold">Could not load providers</h3>
            <p className="mt-2 text-sm text-slate-600">{error}</p>
          </div>
        )}

        {!loading && !error && providers.length === 0 && (
          <div className="rounded-2xl border border-dashed border-emerald-200 bg-white p-10 text-center">
            <Search className="mx-auto text-emerald-700" size={36} />
            <h3 className="mt-4 text-xl font-bold">
              No matching providers found
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Try another service or location. New providers will appear
              when they register and have active profiles.
            </p>
            <Link
              href="/services"
              className="mt-5 inline-flex rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white hover:bg-emerald-800"
            >
              Browse services
            </Link>
          </div>
        )}

        {!loading && !error && providers.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {providers.map((provider) => {
              const services = (provider.provider_services || [])
                .map((item) => item.service_categories)
                .flat()
                .filter(Boolean);

              const phone = (provider.phone || "").replace(/[^\d+]/g, "");
              const whatsapp = (provider.whatsapp || provider.phone || "")
                .replace(/\D/g, "")
                .replace(/^0/, "234");

              return (
                <article
                  key={provider.id}
                  className="overflow-hidden rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    {provider.avatar_url ? (
                      <img
                        src={provider.avatar_url}
                        alt=""
                        className="h-16 w-16 rounded-2xl object-cover"
                      />
                    ) : (
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                        <UserRound size={30} />
                      </div>
                    )}

                    <div className="min-w-0">
                      <h3 className="break-words text-lg font-black">
                        {provider.display_name || "Service provider"}
                      </h3>

                      <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                        <MapPin size={15} />
                        {[provider.city, provider.state, provider.location]
                          .filter(Boolean)
                          .join(", ") || "Location not provided"}
                      </p>
                    </div>
                  </div>

                  {provider.bio && (
                    <p className="mt-4 text-sm leading-6 text-slate-600">
                      {provider.bio}
                    </p>
                  )}

                  {provider.years_experience != null && (
                    <p className="mt-3 text-sm font-semibold text-slate-600">
                      {provider.years_experience} years of experience
                    </p>
                  )}

                  <div className="mt-4 flex flex-wrap gap-2">
                    {services.map((service) => (
                      <span
                        key={`${provider.id}-${service.slug || service.name}`}
                        className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800"
                      >
                        {service.name}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-100 pt-5">
                    {provider.slug && (
                      <Link
                        href={`/workers/${provider.slug}`}
                        className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-800"
                      >
                        <Wrench size={16} />
                        View profile
                      </Link>
                    )}

                    {phone && (
                      <a
                        href={`tel:${phone}`}
                        className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 px-4 py-3 text-sm font-bold text-emerald-800 hover:bg-emerald-50"
                      >
                        <Phone size={16} />
                        Call
                      </a>
                    )}

                    {whatsapp && (
                      <a
                        href={`https://wa.me/${whatsapp}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 px-4 py-3 text-sm font-bold text-emerald-800 hover:bg-emerald-50"
                      >
                        <MessageCircle size={16} />
                        WhatsApp
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
