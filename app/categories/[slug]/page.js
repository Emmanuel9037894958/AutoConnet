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
    image: "/image34.jpg",
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
    image: "/image105.jpg",
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
    image: "/image65.jpg",
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
    image: "/image10.jpg",
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
    image: "/image90.jpg",
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
    image: "/image55.jpg",
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
    image: "/image43.jpg",
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
    image: "/image3.jpg",
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
    image: "/image83.jpg",
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
    image: "/image28.jpg",
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
    image: "/image72.jpg",
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
    image: "/image30.jpg",
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
    image: "/image6.jpg",
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
    image: "/image67.jpg",
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
    image: "/image5.jpg",
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
    image: "/image92.jpg",
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
    image: "/image98.jpg",
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
    image: "/image103.jpg",
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
    image: "/image99.jpg",
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
    image: "/image101.jpg",
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
    image: "/image70.jpg",
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
    image: "/image22.jpg",
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

export default async function CategoryPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
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
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-slate-950">
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 border-b border-emerald-500/20 shadow-2xl">
        <div className="pointer-events-none absolute -right-20 -top-24 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 transition-colors hover:text-emerald-300"
          >
            <ArrowLeft size={17} />
            Back to all services
          </Link>

          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-300 bg-emerald-900/40 px-3.5 py-1.5 rounded-full border border-emerald-500/30 shadow-inner">
                <ShieldCheck size={15} className="text-emerald-400" />
                AutoConnet Services
              </div>

              <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl bg-gradient-to-r from-white via-slate-100 to-emerald-200 bg-clip-text text-transparent">
                {category.name}
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                {category.description}
              </p>
            </div>

            <div className="relative h-52 w-full shrink-0 overflow-hidden rounded-3xl border border-emerald-500/30 bg-slate-900 shadow-2xl shadow-emerald-950/50 lg:h-64 lg:w-80">
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

              <div className="absolute bottom-4 left-4 flex items-center gap-2.5 rounded-2xl bg-slate-900/90 backdrop-blur-xl px-3.5 py-2.5 border border-emerald-500/30 shadow-lg">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-slate-950 font-bold shadow-md">
                  <Icon size={18} strokeWidth={2.5} />
                </div>

                <span className="text-xs font-bold text-white tracking-wide">
                  Verified Experts
                </span>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <CategorySearch
              categoryName={category.name}
              shortName={category.shortName}
            />
          </div>

          <p className="mt-4 text-xs font-medium text-emerald-400/80">
            Contact providers directly to discuss availability, pricing and job
            details.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Explore your options
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              What do you need done?
            </h2>

            <p className="mt-3 text-base text-slate-400">
              Choose the specific service that matches your job.
            </p>
          </div>

          <span className="w-fit rounded-full border border-emerald-500/30 bg-gradient-to-r from-emerald-950 to-slate-900 px-4 py-2 text-sm font-semibold text-emerald-300 shadow-lg">
            {category.services.length} service types
          </span>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {category.services.map((service, index) => (
            <article
              key={service}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-900/50 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-500/50 hover:bg-slate-900 hover:shadow-2xl hover:shadow-emerald-950/40"
            >
              <div className="relative mb-5 h-40 w-full overflow-hidden rounded-2xl bg-slate-950 shadow-inner">
                <img
                  src={category.image}
                  alt={`${service} - ${category.name}`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

                <span className="absolute top-3 right-3 rounded-lg bg-slate-900/90 backdrop-blur-md px-2.5 py-1 text-xs font-bold tabular-nums text-emerald-400 border border-slate-700/80 shadow-md">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-950 text-emerald-400 border border-emerald-500/30 shadow-md transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-emerald-400 group-hover:to-emerald-600 group-hover:text-slate-950 group-hover:shadow-emerald-500/20">
                  <Wrench size={20} strokeWidth={2} />
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {service}
                </h3>
              </div>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
                Find a professional who offers {service.toLowerCase()}.
              </p>

              <Link
                href={`/services?search=${encodeURIComponent(service)}`}
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-emerald-950/80 border border-emerald-500/30 px-4 py-2.5 text-sm font-semibold text-emerald-300 transition-all duration-300 hover:bg-emerald-500 hover:text-slate-950 hover:shadow-lg hover:shadow-emerald-500/20"
              >
                Explore providers
                <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-900 p-6 sm:p-8 backdrop-blur-xl shadow-xl">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 shadow-lg">
              <ShieldCheck size={24} />
            </div>

            <div>
              <h3 className="text-lg font-bold text-amber-200">
                Looking for someone available now?
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Provider availability depends on registered workers and their
                current schedules. Browse the marketplace to check the listings;
                AutoConnet does not display invented provider profiles.
              </p>

              <Link
                href="/services"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors hover:underline"
              >
                Explore the marketplace
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 p-8 sm:p-12 shadow-2xl shadow-emerald-950/60">
          <div className="pointer-events-none absolute -right-10 -top-10 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />

          <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-300">
                For skilled workers
              </p>

              <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
                Do you offer {category.shortName.toLowerCase()} services?
              </h2>

              <p className="mt-3 text-base leading-relaxed text-emerald-100 sm:text-lg">
                Create your worker profile and select the services you provide
                so customers can discover and contact you.
              </p>
            </div>

            <Link
              href="/register"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-white px-7 py-4 text-sm font-extrabold text-emerald-950 shadow-xl transition-all duration-300 hover:bg-emerald-100 hover:shadow-white/20 hover:scale-105"
            >
              Join as a worker
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-900 bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Explore other categories
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Find other skills and services on AutoConnet.
              </p>
            </div>

            <Link
              href="/services"
              className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors hover:underline sm:mt-0"
            >
              View all categories
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {relatedCategories.map(([key, item]) => {
              const RelatedIcon = item.icon;

              return (
                <Link
                  key={key}
                  href={`/categories/${key}`}
                  className="group flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:bg-slate-900 hover:shadow-xl hover:shadow-emerald-950/30"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 transition-transform duration-300 group-hover:scale-110">
                    <RelatedIcon size={20} strokeWidth={2} />
                  </div>

                  <p className="mt-4 text-sm font-bold text-slate-200 group-hover:text-emerald-300 transition-colors">
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