"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { serviceCategories } from "@/lib/utils";

export default function ServiceCategories() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All services");

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();

    return serviceCategories.filter((category) => {
      const matchesSearch =
        !query ||
        category.name.toLowerCase().includes(query) ||
        category.description.toLowerCase().includes(query);

      const matchesCategory =
        activeCategory === "All services" ||
        category.name === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  function clearFilters() {
    setSearch("");
    setActiveCategory("All services");
  }

  return (
    <section id="services" className="scroll-mt-24 py-16 sm:py-20">
      <div className="mx-auto w-[calc(100%-32px)] max-w-[1160px]">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[2px] text-[#176b46]">
              Explore the marketplace
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-[-1px] sm:text-4xl">
              What do you need done?
            </h2>

            <p className="mt-3 max-w-xl leading-7 text-[#68766c]">
              Start with a service category and find the skills that match
              your job.
            </p>
          </div>

          <button
            type="button"
            onClick={clearFilters}
            className="w-fit text-sm font-bold text-[#176b46] hover:underline"
          >
            View all categories ↗
          </button>
        </div>

        <div className="mt-7">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search for a service..."
            className="w-full rounded-xl border border-[#e2e8df] bg-white px-4 py-4 text-sm outline-none transition focus:border-[#176b46] focus:ring-2 focus:ring-[#176b46]/10"
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {["All services", ...serviceCategories.map((item) => item.name)].map(
            (item) => (
              <button
                key={item}
                type="button"
                onClick={() => setActiveCategory(item)}
                className={`rounded-full border px-4 py-2.5 text-sm font-medium transition ${
                  activeCategory === item
                    ? "border-[#176b46] bg-[#176b46] text-white"
                    : "border-[#e2e8df] bg-white text-[#526159] hover:border-[#9fbea7]"
                }`}
              >
                {item}
              </button>
            ),
          )}
        </div>

        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredCategories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="group flex min-h-[210px] flex-col items-start rounded-2xl border border-[#e7ebe4] bg-white p-5 text-left transition hover:-translate-y-1 hover:border-[#91bda4] hover:shadow-[0_12px_30px_rgba(25,61,42,0.07)]"
            >
              <span className="grid h-[54px] w-[54px] place-items-center rounded-2xl bg-[#edf5ee] text-[29px] font-semibold text-[#176b46]">
                {category.icon}
              </span>

              <span className="mt-5 flex w-full items-center justify-between gap-2">
                <span className="font-bold">{category.name}</span>
                <span className="text-xl text-[#176b46] transition group-hover:translate-x-1">
                  ↗
                </span>
              </span>

              <span className="mt-2 text-sm leading-6 text-[#7a857c]">
                {category.description}
              </span>
            </Link>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="mt-6 rounded-2xl border border-dashed border-[#cbd8ca] bg-white p-8 text-center">
            <p className="font-semibold">No matching services found.</p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 font-semibold text-[#176b46] underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}