
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Hammer,
  Wrench,
  Paintbrush,
  Trees,
  Zap,
  Droplets,
  Laptop,
  Car,
  Scissors,
  Sparkles,
  Flower2,
  Truck,
  GraduationCap,
  Smartphone,
  Snowflake,
  Camera,
  Utensils,
  Shirt,
  BriefcaseBusiness,
  Sprout,
  ShieldCheck,
  HardHat,
  Bike,
} from "lucide-react";

import CategorySearch from "@/components/categories/CategorySearch";

const categories = {
  "phone-repairs": {
    name: "Phone Repair Services",
    shortName: "Phone Repair",
    description:
      "Find mobile phone technicians for screen replacements, battery problems, charging faults and other phone repairs.",
    icon: Smartphone,
    services: [
      "Android Phone Repair",
      "iPhone Repair",
      "Phone Screen Replacement",
      "Battery Replacement",
      "Charging Port Repair",
      "Phone Software Troubleshooting",
      "Water-Damaged Phone Repair",
      "Phone Unlocking",
      "Phone Accessories Installation",
      "Phone Diagnostics",
    ],
  },

  technology: {
    name: "Computer & IT Services",
    shortName: "Computer & IT",
    description:
      "Connect with computer technicians and IT professionals for repairs, software, networking and digital services.",
    icon: Laptop,
    services: [
      "Laptop Repair",
      "Desktop Computer Repair",
      "Computer Software Installation",
      "Windows Installation",
      "Data Recovery",
      "Computer Networking",
      "Wi-Fi Setup",
      "Printer Repair",
      "CCTV Installation",
      "Web Development",
      "Graphic Design",
      "Computer Training",
    ],
  },

  electrical: {
    name: "Electrical Services",
    shortName: "Electrical",
    description:
      "Find electricians for home wiring, electrical faults, installations and maintenance.",
    icon: Zap,
    services: [
      "House Wiring",
      "Electrical Fault Diagnosis",
      "Socket and Switch Installation",
      "Lighting Installation",
      "Electrical Repairs",
      "Solar Installation",
      "Inverter Installation",
      "Generator Repairs",
      "Electrical Maintenance",
      "Security Light Installation",
    ],
  },

  plumbing: {
    name: "Plumbing Services",
    shortName: "Plumbing",
    description:
      "Connect with plumbers for leaks, blocked drains, water systems, bathrooms and plumbing installations.",
    icon: Droplets,
    services: [
      "Pipe Installation",
      "Pipe Leak Repairs",
      "Blocked Drain Clearing",
      "Water Tank Installation",
      "Water Pump Installation",
      "Bathroom Plumbing",
      "Kitchen Plumbing",
      "Toilet Repairs",
      "Tap and Faucet Repairs",
      "Borehole Plumbing",
      "Water Heater Installation",
    ],
  },

  carpentry: {
    name: "Carpentry & Woodwork",
    shortName: "Carpentry",
    description:
      "Find skilled carpenters for custom furniture, doors, cabinets and woodwork repairs.",
    icon: Hammer,
    services: [
      "Furniture Making",
      "Door Making",
      "Wardrobe Making",
      "Kitchen Cabinet Making",
      "Bed Making",
      "Roof Carpentry",
      "Wooden Ceiling Installation",
      "Furniture Repairs",
      "Door Repairs",
      "Custom Woodwork",
      "Furniture Installation",
    ],
  },

  painting: {
    name: "Painting & Decoration",
    shortName: "Painting",
    description:
      "Find painters for residential, commercial and decorative painting projects.",
    icon: Paintbrush,
    services: [
      "Interior Painting",
      "Exterior Painting",
      "House Painting",
      "Office Painting",
      "Wall Screeding",
      "Wall Texture Finishing",
      "Decorative Painting",
      "Repainting",
      "Fence Painting",
      "Waterproofing",
    ],
  },

  "building-repairs": {
    name: "Building & Construction",
    shortName: "Building",
    description:
      "Find tradespeople for construction, renovation, finishing and general building maintenance.",
    icon: HardHat,
    services: [
      "Bricklaying",
      "Masonry",
      "Building Construction",
      "House Renovation",
      "Tiling",
      "POP Installation",
      "Ceiling Installation",
      "Roofing",
      "Aluminium Works",
      "Glass Installation",
      "Handyman Services",
      "Concrete Work",
    ],
  },

  welding: {
    name: "Welding & Metalwork",
    shortName: "Welding",
    description:
      "Connect with welders and fabricators for metal gates, railings, frames and repairs.",
    icon: Hammer,
    services: [
      "Gate Fabrication",
      "Metal Door Fabrication",
      "Window Burglar Proof",
      "Metal Railings",
      "Stainless Steel Fabrication",
      "Metal Furniture",
      "Welding Repairs",
      "Metal Roofing Frames",
      "Steel Structure Fabrication",
      "Custom Metalwork",
    ],
  },

  "ac-refrigeration": {
    name: "AC & Refrigeration Services",
    shortName: "AC Services",
    description:
      "Find technicians for air conditioners, refrigerators, freezers and cooling system maintenance.",
    icon: Snowflake,
    services: [
      "Air Conditioner Installation",
      "AC Servicing",
      "AC Repairs",
      "AC Gas Refill",
      "Refrigerator Repairs",
      "Freezer Repairs",
      "Cold Room Maintenance",
      "Cooling System Diagnostics",
      "AC Removal and Relocation",
      "Preventive Maintenance",
    ],
  },

  cleaning: {
    name: "Cleaning Services",
    shortName: "Cleaning",
    description:
      "Find cleaners for homes, offices, shops, compounds and post-construction spaces.",
    icon: Sparkles,
    services: [
      "House Cleaning",
      "Office Cleaning",
      "Compound Cleaning",
      "Deep Cleaning",
      "Post-Construction Cleaning",
      "Move-In Cleaning",
      "Move-Out Cleaning",
      "Laundry and Ironing",
      "Carpet Cleaning",
      "Upholstery Cleaning",
      "Window Cleaning",
      "Waste Collection",
    ],
  },

  "gardening-flowers": {
    name: "Gardening, Flowers & Landscaping",
    shortName: "Gardening",
    description:
      "Discover gardeners, flower growers and landscaping professionals for outdoor spaces and gardens.",
    icon: Flower2,
    services: [
      "Gardening",
      "Flower Cultivation",
      "Flower Arrangement",
      "Garden Design",
      "Landscaping",
      "Planting Flowers",
      "Lawn Maintenance",
      "Tree Pruning",
      "Plant Nursery Services",
      "Hedge Trimming",
      "Garden Maintenance",
      "Bush Clearing",
    ],
  },

  "grass-cutting": {
    name: "Grass Cutting & Bush Clearing",
    shortName: "Grass Cutting",
    description:
      "Find people to cut grass, clear overgrown plots and maintain compounds and lawns.",
    icon: Trees,
    services: [
      "Residential Grass Cutting",
      "Commercial Grass Cutting",
      "Bush Clearing",
      "Plot Clearing",
      "Lawn Trimming",
      "Compound Maintenance",
      "Weed Removal",
      "Vacant Land Clearing",
      "Estate Grounds Maintenance",
    ],
  },

  automotive: {
    name: "Automotive Services",
    shortName: "Automotive",
    description:
      "Find mechanics and automotive professionals for vehicle repairs, servicing and maintenance.",
    icon: Car,
    services: [
      "Car Mechanic",
      "Auto Electrical Repairs",
      "Vehicle Diagnostics",
      "Car Washing",
      "Car Detailing",
      "Tyre Services",
      "Vulcanizing",
      "Panel Beating",
      "Car AC Repair",
      "Battery Replacement",
      "Oil Change",
      "Motorcycle Repairs",
    ],
  },

  "fashion-beauty": {
    name: "Fashion & Beauty Services",
    shortName: "Fashion & Beauty",
    description:
      "Find fashion designers, barbers, hairstylists and beauty professionals.",
    icon: Scissors,
    services: [
      "Fashion Design",
      "Tailoring",
      "Barbing",
      "Hairdressing",
      "Makeup Services",
      "Nail Services",
      "Wig Making and Styling",
      "Shoe Making",
      "Shoe Repairs",
      "Clothing Alterations",
      "Bridal Styling",
    ],
  },

  clothing: {
    name: "Clothing & Tailoring",
    shortName: "Tailoring",
    description:
      "Connect with tailors and clothing makers for custom outfits, alterations and garment repairs.",
    icon: Shirt,
    services: [
      "Men's Tailoring",
      "Women's Tailoring",
      "Traditional Outfits",
      "School Uniforms",
      "Corporate Wear",
      "Clothing Alterations",
      "Zip Replacement",
      "Garment Repairs",
      "Embroidery",
      "Fashion Pattern Making",
    ],
  },

  "moving-delivery": {
    name: "Moving, Delivery & Errands",
    shortName: "Moving & Delivery",
    description:
      "Find people to help move household items, transport goods, deliver packages and run errands.",
    icon: Truck,
    services: [
      "House Moving",
      "Office Moving",
      "Furniture Moving",
      "Local Deliveries",
      "Dispatch Riding",
      "Loading and Offloading",
      "Errand Services",
      "Small Goods Transport",
      "Market Shopping Assistance",
      "Packing and Unpacking",
    ],
  },

  education: {
    name: "Education & Tutoring",
    shortName: "Education",
    description:
      "Find tutors and instructors for school subjects, computer skills and practical learning.",
    icon: GraduationCap,
    services: [
      "Home Lessons",
      "Primary School Tutoring",
      "Secondary School Tutoring",
      "Mathematics Tutoring",
      "English Tutoring",
      "Computer Training",
      "Coding Lessons",
      "Exam Preparation",
      "Music Lessons",
      "Language Lessons",
      "Adult Learning Support",
    ],
  },

  agriculture: {
    name: "Agriculture & Farm Services",
    shortName: "Agriculture",
    description:
      "Connect with farm workers and agricultural service providers for cultivation and farm maintenance.",
    icon: Sprout,
    services: [
      "Crop Cultivation",
      "Farm Labour",
      "Land Preparation",
      "Vegetable Farming",
      "Flower Cultivation",
      "Planting and Weeding",
      "Harvesting",
      "Poultry Farm Assistance",
      "Livestock Care",
      "Farm Maintenance",
      "Irrigation Assistance",
    ],
  },

  photography: {
    name: "Photography & Media",
    shortName: "Photography",
    description:
      "Find photographers and media professionals for events, portraits, products and video coverage.",
    icon: Camera,
    services: [
      "Event Photography",
      "Wedding Photography",
      "Portrait Photography",
      "Product Photography",
      "Video Coverage",
      "Event Videography",
      "Photo Editing",
      "Video Editing",
      "Content Creation",
      "Live Event Coverage",
    ],
  },

  "food-events": {
    name: "Food, Catering & Events",
    shortName: "Food & Events",
    description:
      "Discover cooks, caterers and event professionals for meals, celebrations and gatherings.",
    icon: Utensils,
    services: [
      "Home Cooking",
      "Outdoor Catering",
      "Event Catering",
      "Small Chops",
      "Cake Baking",
      "Pastry Services",
      "Event Planning",
      "Event Decoration",
      "Waiters and Event Staff",
      "Bartending Services",
      "Food Delivery",
    ],
  },

  "mobile-services": {
    name: "Mobile & Home-Visit Services",
    shortName: "Mobile Services",
    description:
      "Find service providers who can travel to your home, office or preferred location by arrangement.",
    icon: Bike,
    services: [
      "Mobile Phone Repair",
      "Home-Visit Barber",
      "Home-Visit Hair Styling",
      "Home Cleaning",
      "Mobile Car Wash",
      "Home Appliance Repairs",
      "On-Site Computer Support",
      "Home Tutoring",
      "Mobile Mechanic",
      "Home-Visit Beauty Services",
    ],
  },

  "other-services": {
    name: "Other Local Services",
    shortName: "Other Services",
    description:
      "Find additional skilled workers for everyday tasks and specialised services not listed elsewhere.",
    icon: BriefcaseBusiness,
    services: [
      "General Handyman",
      "Furniture Assembly",
      "Locksmith Services",
      "Appliance Repairs",
      "Pest Control",
      "Home Organisation",
      "Pet Care",
      "Security Equipment Installation",
      "Sign Making",
      "Other Skilled Services",
    ],
  },
};

const aliases = {
  "phone-repair": "phone-repairs",
  "computer-repair": "technology",
  "computer-it": "technology",
  "computer-it-services": "technology",
  "phone-and-computer-repair": "technology",
  "electrical-services": "electrical",
  "plumbing-services": "plumbing",
  "carpentry-services": "carpentry",
  "painting-services": "painting",
  construction: "building-repairs",
  building: "building-repairs",
  "ac-services": "ac-refrigeration",
  "air-conditioning": "ac-refrigeration",
  refrigeration: "ac-refrigeration",
  gardening: "gardening-flowers",
  flowers: "gardening-flowers",
  "grass-cutters": "grass-cutting",
  "grass-cutting-services": "grass-cutting",
  "car-repair": "automotive",
  "auto-repair": "automotive",
  fashion: "fashion-beauty",
  beauty: "fashion-beauty",
  tailoring: "clothing",
  delivery: "moving-delivery",
  moving: "moving-delivery",
  tutoring: "education",
  farming: "agriculture",
  media: "photography",
  catering: "food-events",
  events: "food-events",
  other: "other-services",
};

export function generateStaticParams() {
  return [
    ...Object.keys(categories),
    ...Object.keys(aliases),
  ].map((slug) => ({ slug }));
}

// export const dynamicParams = false;

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const categorySlug = aliases[slug] || slug;
  const category = categories[categorySlug];

  if (!category) {
    notFound();
  }

  const Icon = category.icon;

  const relatedCategories = Object.entries(categories)
    .filter(([key]) => key !== categorySlug)
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-[#f7f9f6] text-slate-900">
      <section className="relative overflow-hidden bg-[#103e2d]">
        <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full border border-white/10" />

        <div className="pointer-events-none absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-100 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to all services
          </Link>

          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#b9ef8b] text-[#103e2d] shadow-lg shadow-black/10">
              <Icon size={30} strokeWidth={1.8} />
            </div>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#b9ef8b]">
                <ShieldCheck size={15} />
                AutoConnet Services
              </div>

              <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-5xl">
                {category.name}
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-emerald-50/80 sm:text-base">
                {category.description}
              </p>
            </div>
          </div>

          <CategorySearch
            categoryName={category.name}
            shortName={category.shortName}
          />

          <p className="mt-4 text-xs text-emerald-50/60">
            Contact providers directly to discuss availability, pricing and job
            details.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
              Explore your options
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              What do you need done?
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Choose the specific service that matches your job.
            </p>
          </div>

          <span className="w-fit rounded-full border border-emerald-100 bg-white px-4 py-2 text-sm font-semibold text-emerald-800">
            {category.services.length} service types
          </span>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {category.services.map((service, index) => (
            <article
              key={service}
              className="group flex flex-col rounded-2xl border border-slate-200/80 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-950/5"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-700 group-hover:text-white">
                  <Wrench size={20} strokeWidth={1.8} />
                </div>

                <span className="text-xs font-semibold tabular-nums text-slate-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                {service}
              </h3>

              <p className="mt-2 flex-1 text-sm leading-6 text-slate-500">
                Find a professional who offers {service.toLowerCase()}.
              </p>

              <Link
                href={`/services?search=${encodeURIComponent(service)}`}
                className="mt-5 inline-flex w-fit items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5 text-sm font-bold text-emerald-800 transition hover:bg-emerald-700 hover:text-white"
              >
                Explore providers
                <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-amber-700">
              <ShieldCheck size={20} />
            </div>

            <div>
              <h3 className="font-bold text-slate-900">
                Looking for someone available now?
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Provider availability depends on registered workers and their
                current schedules. Browse the marketplace to check the listings;
                AutoConnet does not display invented provider profiles.
              </p>

              <Link
                href="/services"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-emerald-800 hover:underline"
              >
                Explore the marketplace
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#e5f2e6] p-6 sm:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
                For skilled workers
              </p>

              <h2 className="mt-2 text-2xl font-bold text-[#153e2c] sm:text-3xl">
                Do you offer {category.shortName.toLowerCase()} services?
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                Create your worker profile and select the services you provide
                so customers can discover and contact you.
              </p>
            </div>

            <Link
              href="/register"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#176b46] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#105536]"
            >
              Join as a worker
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Explore other categories
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Find other skills and services on AutoConnet.
              </p>
            </div>

            <Link
              href="/services"
              className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-emerald-800 hover:underline sm:mt-0"
            >
              View all categories
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {relatedCategories.map(([key, item]) => {
              const RelatedIcon = item.icon;

              return (
                <Link
                  key={key}
                  href={`/categories/${key}`}
                  className="group rounded-xl border border-slate-200 p-4 transition hover:border-emerald-300 hover:bg-emerald-50"
                >
                  <RelatedIcon
                    size={22}
                    className="text-emerald-700"
                    strokeWidth={1.8}
                  />

                  <p className="mt-3 text-sm font-bold text-slate-800 group-hover:text-emerald-800">
                    {item.shortName}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
