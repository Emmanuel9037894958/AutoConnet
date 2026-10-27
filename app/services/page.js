
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  MapPin,
  ArrowRight,
  Sparkles,
  Zap,
  Hammer,
  Paintbrush,
  Droplets,
  Scissors,
  Car,
  Laptop,
  Truck,
  GraduationCap,
  Camera,
  Utensils,
  Flower2,
  Home,
  Shirt,
  Smartphone,
  Settings,
  ShieldCheck,
  Wrench,
  X,
} from "lucide-react";

const categories = [
  {
    slug: "cleaning",
    name: "Cleaning",
    description: "Professional cleaners for homes, offices and businesses.",
    icon: Sparkles,
    services: [
      "Home Cleaning",
      "Office Cleaning",
      "Deep Cleaning",
      "Laundry",
      "Carpet Cleaning",
    ],
  },
  {
    slug: "carpentry",
    name: "Carpentry & Woodwork",
    description:
      "Furniture makers, carpenters and woodwork specialists.",
    icon: Hammer,
    services: [
      "Carpenter",
      "Furniture Maker",
      "Kitchen Cabinets",
      "Door Installation",
      "Wood Repairs",
    ],
  },
  {
    slug: "building-repairs",
    name: "Building & Repairs",
    description:
      "Skilled workers for construction, repairs and maintenance.",
    icon: Home,
    services: [
      "Builder",
      "Mason",
      "Tiler",
      "POP Installer",
      "Ceiling Installer",
    ],
  },
  {
    slug: "electrical",
    name: "Electrical",
    description:
      "Electricians for installations, repairs and maintenance.",
    icon: Zap,
    services: [
      "Electrician",
      "Wiring",
      "Inverter Installation",
      "Solar Installation",
      "Generator Repair",
    ],
  },
  {
    slug: "plumbing",
    name: "Plumbing",
    description:
      "Plumbers for water systems, pipes, bathrooms and repairs.",
    icon: Droplets,
    services: [
      "Plumber",
      "Pipe Installation",
      "Water Tank Installation",
      "Bathroom Repairs",
      "Borehole Services",
    ],
  },
  {
    slug: "painting",
    name: "Painting",
    description:
      "Professional painters for homes, offices and commercial spaces.",
    icon: Paintbrush,
    services: [
      "House Painter",
      "Interior Painting",
      "Exterior Painting",
      "Wall Decoration",
      "Industrial Painting",
    ],
  },
  {
    slug: "gardening-flowers",
    name: "Gardening & Flowers",
    description:
      "Gardeners, landscapers and flower specialists.",
    icon: Flower2,
    services: [
      "Gardener",
      "Grass Cutter",
      "Landscaper",
      "Flower Cultivator",
      "Garden Maintenance",
    ],
  },
  {
    slug: "technology",
    name: "Technology",
    description:
      "Technicians and digital professionals for your technology needs.",
    icon: Laptop,
    services: [
      "Phone Repair",
      "Computer Repair",
      "Web Developer",
      "Graphic Designer",
      "CCTV Installer",
    ],
  },
  {
    slug: "automotive",
    name: "Automotive",
    description:
      "Mechanics, auto electricians and vehicle specialists.",
    icon: Car,
    services: [
      "Mechanic",
      "Auto Electrician",
      "Car AC Repair",
      "Panel Beater",
      "Car Diagnostics",
    ],
  },
  {
    slug: "fashion-beauty",
    name: "Fashion & Beauty",
    description:
      "Fashion designers, barbers, stylists and beauty professionals.",
    icon: Scissors,
    services: [
      "Tailor",
      "Fashion Designer",
      "Barber",
      "Hair Stylist",
      "Makeup Artist",
    ],
  },
  {
    slug: "moving-delivery",
    name: "Moving & Delivery",
    description:
      "Reliable people for transportation, moving and deliveries.",
    icon: Truck,
    services: [
      "Mover",
      "Delivery Rider",
      "Driver",
      "Truck Driver",
      "Courier",
    ],
  },
  {
    slug: "education",
    name: "Education",
    description:
      "Tutors, teachers and educational professionals.",
    icon: GraduationCap,
    services: [
      "Home Tutor",
      "Computer Teacher",
      "Music Teacher",
      "Language Tutor",
      "Exam Tutor",
    ],
  },
  {
    slug: "agriculture",
    name: "Agriculture",
    description:
      "Farmers and agricultural service providers.",
    icon: Settings,
    services: [
      "Farmer",
      "Poultry Farmer",
      "Fish Farmer",
      "Farm Labourer",
      "Agricultural Consultant",
    ],
  },
  {
    slug: "photography",
    name: "Photography & Media",
    description:
      "Photographers, videographers and creative professionals.",
    icon: Camera,
    services: [
      "Photographer",
      "Videographer",
      "Drone Operator",
      "Photo Editor",
      "Video Editor",
    ],
  },
  {
    slug: "food-events",
    name: "Food & Events",
    description:
      "Caterers, chefs and event professionals.",
    icon: Utensils,
    services: [
      "Caterer",
      "Private Chef",
      "Baker",
      "Event Planner",
      "Waiter",
    ],
  },
  {
    slug: "clothing",
    name: "Clothing & Fashion",
    description:
      "Professionals who create, repair and customize clothing.",
    icon: Shirt,
    services: [
      "Tailor",
      "Shoe Maker",
      "Bag Maker",
      "Clothing Designer",
      "Clothing Repair",
    ],
  },
  {
    slug: "mobile-services",
    name: "Phone & Device Services",
    description:
      "Experts for phones, tablets and other devices.",
    icon: Smartphone,
    services: [
      "Phone Repair",
      "Screen Replacement",
      "Software Installation",
      "Phone Unlocking",
      "Device Setup",
    ],
  },
];

const popularSearches = [
  "Plumber",
  "Electrician",
  "Cleaner",
  "Mechanic",
  "Carpenter",
  "Phone Repair",
  "Painter",
  "Barber",
  "Gardener",
  "Tailor",
  "Grass Cutter",
  "Web Developer",
];

export default function ServicesPage() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return categories;

    return categories.filter((category) => {
      const categoryMatch =
        category.name.toLowerCase().includes(query) ||
        category.description.toLowerCase().includes(query);

      const serviceMatch = category.services.some((service) =>
        service.toLowerCase().includes(query)
      );

      return categoryMatch || serviceMatch;
    });
  }, [search]);

  function goToProviders(service, selectedLocation = location) {
    const params = new URLSearchParams();

    if (service?.trim()) {
      params.set("search", service.trim());
    }

    if (selectedLocation?.trim()) {
      params.set("location", selectedLocation.trim());
    }

    router.push(`/providers?${params.toString()}`);
  }

  function handleSearch(event) {
    event.preventDefault();

    goToProviders(search);
  }

  function browseCategory(category) {
    // Search for a real provider offering the first service in this category.
    // Customers can change the search on the providers page.
    goToProviders(category.services[0]);
  }

  function clearSearch() {
    setSearch("");
    setLocation("");
  }

  return (
    <main className="min-h-screen bg-[#f4f8f5] text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#063b2b] via-[#07583d] to-[#0b7650]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-lime-300/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur">
              <ShieldCheck size={17} />
              Find trusted local service providers
            </div>

            <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              What do you need
              <span className="block text-emerald-300">
                help with?
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-emerald-50/85 sm:text-lg">
              Search for skilled workers around you. Explore their
              services, view their profiles and contact them directly.
            </p>
          </div>

          {/* FUNCTIONAL SEARCH FORM */}
          <form
            onSubmit={handleSearch}
            className="mt-10 rounded-3xl border border-white/15 bg-white/10 p-3 shadow-2xl backdrop-blur-xl"
          >
            <div className="grid gap-3 md:grid-cols-[1fr_0.65fr_auto]">
              <div className="flex min-w-0 items-center gap-3 rounded-2xl bg-white px-4 py-4">
                <Search
                  className="shrink-0 text-emerald-700"
                  size={21}
                />

                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="What service do you need?"
                  aria-label="What service do you need?"
                  className="w-full min-w-0 bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    aria-label="Clear service search"
                    className="shrink-0 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                  >
                    <X size={17} />
                  </button>
                )}
              </div>

              <div className="flex min-w-0 items-center gap-3 rounded-2xl bg-white px-4 py-4">
                <MapPin
                  className="shrink-0 text-emerald-700"
                  size={21}
                />

                <input
                  type="text"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  placeholder="Location e.g. Awka"
                  aria-label="Your location"
                  className="w-full min-w-0 bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-7 py-4 font-bold text-[#063b2b] transition hover:bg-emerald-300 focus:outline-none focus:ring-4 focus:ring-emerald-200"
              >
                <Search size={18} />
                Search
              </button>
            </div>

            <p className="px-2 pb-1 pt-3 text-xs leading-5 text-emerald-50/70">
              Search by profession or service. Add a city to narrow
              your results.
            </p>
          </form>
        </div>
      </section>

      {/* POPULAR SEARCHES */}
      <section className="border-b border-emerald-100 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-7 sm:px-8 lg:px-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="mr-1 text-sm font-bold text-slate-500">
              Popular:
            </span>

            {popularSearches.map((service) => (
              <button
                key={service}
                type="button"
                onClick={() => goToProviders(service)}
                className="rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800 transition hover:border-emerald-300 hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              >
                {service}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
              Explore services
            </p>

            <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Find the right professional
            </h2>

            <p className="mt-3 max-w-2xl text-slate-600">
              Choose a category or search for a specific service to
              find professionals who offer it.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {search && (
              <button
                type="button"
                onClick={clearSearch}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                <X size={15} />
                Clear filters
              </button>
            )}

            <div className="shrink-0 rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-800">
              {filteredCategories.length} categories
            </div>
          </div>
        </div>

        {filteredCategories.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-emerald-200 bg-white p-10 text-center sm:p-12">
            <Search
              className="mx-auto text-emerald-600"
              size={40}
            />

            <h3 className="mt-4 text-xl font-bold">
              No matching service category
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Try a different keyword, or search the provider
              marketplace directly.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={clearSearch}
                className="rounded-xl border border-emerald-200 px-5 py-3 text-sm font-bold text-emerald-800 hover:bg-emerald-50"
              >
                Show all categories
              </button>

              <button
                type="button"
                onClick={() => goToProviders(search)}
                className="rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-800"
              >
                Search providers
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCategories.map((category) => {
              const Icon = category.icon;

              return (
                <article
                  key={category.slug}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl"
                >
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 transition group-hover:bg-emerald-600 group-hover:text-white">
                        <Icon size={27} strokeWidth={1.8} />
                      </div>

                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
                        {category.services.length} services
                      </span>
                    </div>

                    <h3 className="mt-6 text-xl font-black text-slate-900">
                      {category.name}
                    </h3>

                    <p className="mt-2 min-h-[48px] text-sm leading-6 text-slate-500">
                      {category.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {category.services.slice(0, 4).map((service) => (
                        <button
                          key={service}
                          type="button"
                          onClick={() => goToProviders(service)}
                          className="rounded-lg bg-emerald-50 px-2.5 py-1.5 text-left text-xs font-semibold text-emerald-800 transition hover:bg-emerald-100"
                        >
                          {service}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => browseCategory(category)}
                      className="mt-6 flex w-full items-center justify-between border-t border-slate-100 pt-5 text-left text-sm font-bold text-emerald-700"
                    >
                      <span>Browse providers</span>

                      <ArrowRight
                        size={18}
                        className="transition group-hover:translate-x-1"
                      />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* WORKER REGISTRATION CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-10">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#063b2b] to-[#087a50] p-8 shadow-xl sm:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border border-white/10"
          />

          <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <div className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-emerald-300">
                <Wrench size={17} />
                ARE YOU A SKILLED WORKER?
              </div>

              <h2 className="text-3xl font-black text-white sm:text-4xl">
                Put your skills in front of people who need them.
              </h2>

              <p className="mt-4 leading-7 text-emerald-50/80">
                Create one professional profile and list the services
                you provide. Help customers discover your skills and
                contact you directly.
              </p>
            </div>

            <Link
              href="/register"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-white px-7 py-4 font-black text-[#063b2b] transition hover:bg-emerald-50 focus:outline-none focus:ring-4 focus:ring-white/30"
            >
              Join as a Worker
              <ArrowRight size={19} />
            </Link>
          </div>
        </div>
      </section>

      {/* TRUST NOTE */}
      <section className="border-t border-emerald-100 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-7 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <p className="flex items-center gap-2">
            <ShieldCheck
              size={18}
              className="shrink-0 text-emerald-700"
            />
            AutoConnet helps customers discover local service providers.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 font-bold text-emerald-800 hover:underline"
          >
            Back to homepage
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
