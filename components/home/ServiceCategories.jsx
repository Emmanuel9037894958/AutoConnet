
"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { serviceCategories } from "@/lib/utils";

const categoryImages = {
  "Phone Repair": "/image34.jpg",
  "Computer Repair": "/image105.jpg",
  Electrical: "/image65.jpg",
  Plumbing: "/image10.jpg",
  Carpentry: "/image89.jpg",
  Painting: "/image55.jpg",
  Welding: "/image7.jpg",
  "AC Services": "/image83.jpg",
};

const categoryColors = [
  "bg-emerald-50",
  "bg-blue-50",
  "bg-amber-50",
  "bg-rose-50",
  "bg-violet-50",
  "bg-orange-50",
  "bg-cyan-50",
  "bg-lime-50",
];

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transform transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

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
    <section
      id="services"
      className="scroll-mt-24 bg-gradient-to-b from-[#f0f8f2] via-[#f8faf6] to-[#fff8ed] py-16 sm:py-20"
    >
      <div className="mx-auto w-[calc(100%-32px)] max-w-[1160px]">

        <FadeUp>
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[2px] text-[#176b46]">
                Explore the marketplace
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-[-1px] text-[#19251f] sm:text-4xl">
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
              className="w-fit rounded-full bg-[#176b46] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#105537]"
            >
              View all categories ↗
            </button>
          </div>
        </FadeUp>

        <FadeUp delay={100}>
          <div className="mt-8">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search for a service..."
              className="w-full rounded-2xl border border-[#dce9df] bg-white px-5 py-4 text-sm text-[#19251f] shadow-sm outline-none transition placeholder:text-[#929d94] focus:border-[#176b46] focus:ring-2 focus:ring-[#176b46]/10"
            />
          </div>
        </FadeUp>

        <FadeUp delay={200}>
          <div className="mt-5 flex flex-wrap gap-2">
            {[
              "All services",
              ...serviceCategories.map((item) => item.name),
            ].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setActiveCategory(item)}
                className={`rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                  activeCategory === item
                    ? "bg-[#176b46] text-white shadow-md"
                    : "border border-[#dce9df] bg-white text-[#526159] hover:border-[#176b46] hover:text-[#176b46]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </FadeUp>

        <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filteredCategories.map((category, index) => (
            <FadeUp
              key={category.slug}
              delay={(index % 4) * 100}
            >
              <Link
                href={`/categories/${category.slug}`}
                className="group block h-full overflow-hidden rounded-2xl border border-[#e5ece4] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div
                  className={`relative h-44 overflow-hidden ${
                    categoryColors[index % categoryColors.length]
                  }`}
                >
                  {categoryImages[category.name] ? (
                    <img
                      src={categoryImages[category.name]}
                      alt={category.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-6xl">
                      {category.icon}
                    </div>
                  )}

                  <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#176b46] shadow-sm">
                    Explore service
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-extrabold text-[#19251f] transition group-hover:text-[#176b46]">
                      {category.name}
                    </h3>

                    <span className="text-xl text-[#176b46] transition group-hover:translate-x-1">
                      ↗
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-[#718076]">
                    {category.description}
                  </p>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <FadeUp>
            <div className="mt-6 rounded-2xl border border-dashed border-[#cbd8ca] bg-white p-8 text-center">
              <p className="font-semibold text-[#19251f]">
                No matching services found.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 font-semibold text-[#176b46] underline"
              >
                Clear filters
              </button>
            </div>
          </FadeUp>
        )}
      </div>
    </section>
  );
}
