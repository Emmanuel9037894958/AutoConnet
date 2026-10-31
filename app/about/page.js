
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Users,
  HeartHandshake,
  Search,
  Phone,
  Target,
  Eye,
  Sparkles,
  BadgeCheck,
  Handshake,
  Globe2,
  Lightbulb,
} from "lucide-react";

const founders = [
  {
    name: "Amamchukwu Emmanuel O",
    role: "Founder & Chief Executive Officer (NYEA)",
    image: "/founder.jpg",
    description:
      "Leads the vision, strategy and growth of AutoConnet, building a trusted platform that connects customers with skilled professionals.",
  },
  {
    name: "Okoye Chinonso Joseph (Otoko_isu)",
    role: "Co-Founder & Director of Operations",
    image: "/co-founder.jpg",
    description:
      "Supports the development and daily operations of AutoConnet, helping build a reliable experience for customers and service providers.",
  },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Trust & accountability",
    description:
      "We aim to build confidence through clear provider information, review processes and responsible platform management.",
  },
  {
    icon: HeartHandshake,
    title: "Opportunity for skilled workers",
    description:
      "We help skilled people showcase their services and reach customers who need their expertise.",
  },
  {
    icon: Users,
    title: "Customer-first service",
    description:
      "Customers can explore providers and contact them directly without paying AutoConnet to browse.",
  },
  {
    icon: Lightbulb,
    title: "Practical innovation",
    description:
      "We use technology to make finding everyday services easier, more accessible and more convenient.",
  },
];

const steps = [
  {
    title: "Find a service",
    description:
      "Browse service categories and explore providers serving your area.",
    icon: Search,
  },
  {
    title: "Choose a provider",
    description:
      "Review available profile information, skills and service locations.",
    icon: BadgeCheck,
  },
  {
    title: "Contact directly",
    description:
      "Reach a provider by phone or WhatsApp to discuss the job, price and timing.",
    icon: Phone,
  },
];

const serviceExamples = [
  { name: "Electrical work" },
  { name: "Plumbing" },
  { name: "Carpentry" },
  { name: "Phone repairs" },
  { name: "Computer services" },
  { name: "Automotive repairs" },
  { name: "Painting" },
  { name: "Cleaning" },
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-900">
      {/* HERO */}
      <section className="relative isolate bg-[#092b20]">
        <img
          src="/group-image.jpg"
          alt="Skilled professionals representing AutoConnet"
          className="h-[260px] w-full object-cover sm:h-[420px] lg:h-[520px]"
        />

        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="absolute -bottom-32 left-0 h-80 w-80 rounded-full bg-lime-400/10 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:42px_42px]" />
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-white/5 px-4 py-2 text-sm font-semibold text-emerald-200">
              <Sparkles size={16} />
              About AutoConnet
            </div>

            <h1 className="max-w-2xl text-4xl font-black leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Skilled hands.
              <span className="block text-emerald-300">
                Real connections.
              </span>
              Better opportunities.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              AutoConnet is a service marketplace built to help people find
              skilled professionals and help hardworking service providers
              connect with customers who need their skills.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/services"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-400 px-6 py-3 font-bold text-[#082b20] transition hover:bg-emerald-300"
              >
                Find a service <ArrowRight size={18} />
              </Link>

              <Link
                href="/register"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 px-6 py-3 font-bold text-white transition hover:bg-white/10"
              >
                Join AutoConnet
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-emerald-300" />
                Direct customer contact
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-emerald-300" />
                Starting in Anambra State
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-4 rounded-[2rem] border border-emerald-300/15" />

            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#123c2e] p-3 shadow-2xl shadow-black/30">
              <img
                src="/image45.jpg"
                alt="Skilled professionals representing the AutoConnet community"
                className="h-[300px] w-full rounded-2xl object-cover sm:h-[420px]"
              />

              <div className="absolute bottom-7 left-7 right-7 rounded-2xl border border-white/15 bg-[#092b20]/90 p-5 shadow-xl backdrop-blur-md sm:bottom-9 sm:left-9 sm:right-9">
                <p className="text-sm font-semibold text-emerald-300">
                  Our mission
                </p>

                <p className="mt-2 text-lg font-bold leading-7 text-white sm:text-xl">
                  Making skilled services easier to find and opportunities
                  easier to reach.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-12 lg:py-28">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-emerald-700">
            Who we are
          </p>

          <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
            Connecting talent with the people who need it.
          </h2>

          <div className="mt-6 h-1.5 w-20 rounded-full bg-emerald-500" />
        </div>

        <div className="space-y-5 text-base leading-8 text-slate-600">
          <p>
            Finding a dependable electrician, plumber, carpenter, technician
            or other skilled professional should not be unnecessarily
            difficult. At the same time, talented workers need better ways to
            showcase their services and reach potential customers.
          </p>

          <p>
            AutoConnet was created to help bridge that gap. Our platform
            brings service categories and provider profiles together in one
            place, making it easier for customers to discover available
            professionals and contact them directly.
          </p>

          <p>
            We are beginning with a focus on Anambra State, Nigeria, with the
            long-term ambition of reaching more communities and making the
            platform useful to people across the country.
          </p>
        </div>
      </section>

      {/* MISSION AND VISION */}
      <section className="bg-[#f3f8f5]">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-16 sm:px-8 md:grid-cols-2 lg:px-12 lg:py-20">
          <div className="rounded-3xl border border-emerald-900/5 bg-white p-7 shadow-sm sm:p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800">
              <Target size={27} />
            </div>

            <p className="mt-7 text-sm font-extrabold uppercase tracking-widest text-emerald-700">
              Our mission
            </p>

            <h2 className="mt-3 text-2xl font-black sm:text-3xl">
              Make finding skilled services simpler.
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              We aim to make it easier for customers to discover skilled
              professionals and for workers to present their abilities,
              services and contact information to potential customers.
            </p>
          </div>

          <div className="rounded-3xl bg-[#0c3829] p-7 text-white shadow-sm sm:p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-emerald-300">
              <Eye size={27} />
            </div>

            <p className="mt-7 text-sm font-extrabold uppercase tracking-widest text-emerald-300">
              Our vision
            </p>

            <h2 className="mt-3 text-2xl font-black sm:text-3xl">
              A trusted connection point for skilled work.
            </h2>

            <p className="mt-4 leading-8 text-slate-300">
              We envision a growing service marketplace where skilled
              professionals can build visibility and customers can find
              services more conveniently, starting locally and expanding
              over time.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-emerald-700">
            How AutoConnet works
          </p>

          <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
            A simpler way to connect
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            We focus on discovery and direct communication, helping customers
            and skilled workers take the next step.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="group rounded-3xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-900/5 sm:p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800 transition group-hover:bg-emerald-600 group-hover:text-white">
                  <Icon size={23} />
                </div>

                <h3 className="mt-7 text-xl font-extrabold">{step.title}</h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-[#092b20] text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:px-12 lg:py-24">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-emerald-300">
              Services that matter
            </p>

            <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
              Many skills. One place to start.
            </h2>

            <p className="mt-5 max-w-xl leading-8 text-slate-300">
              From repairs and home maintenance to technology and everyday
              services, AutoConnet is being developed to help people discover
              professionals across a growing range of categories.
            </p>

            <Link
              href="/services"
              className="mt-8 inline-flex items-center gap-2 font-bold text-emerald-300 transition hover:text-white"
            >
              Explore available services <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {serviceExamples.map((service) => (
              <div
                key={service.name}
                className="flex min-h-24 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4 transition hover:border-emerald-300/40 hover:bg-white/[0.09] sm:p-5"
              >
                <span className="text-sm font-bold sm:text-base">
                  {service.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR VALUES */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="max-w-2xl">
          <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-emerald-700">
            What guides us
          </p>

          <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
            Built around people and opportunity.
          </h2>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <article
                key={value.title}
                className="rounded-3xl border border-slate-200 p-6 transition hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-900/5 sm:p-7"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800">
                  <Icon size={23} />
                </div>

                <h3 className="mt-5 text-lg font-extrabold">{value.title}</h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {value.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* FOUNDERS */}
      <section
        id="founders"
        className="relative overflow-hidden bg-[#f3f8f5] py-10 lg:py-28"
      >
        <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-lime-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800">
              <Handshake size={28} />
            </div>

            <p className="mt-6 text-sm font-extrabold uppercase tracking-[0.2em] text-emerald-700">
              The people behind AutoConnet
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Meet our founders
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-600">
              AutoConnet is driven by a vision to connect customers and skilled
              professionals. Meet the people helping shape that vision and
              guide the platform’s growth.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl gap-8 md:grid-cols-2 md:gap-10">
            {founders.map((founder) => (
              <article
                key={founder.name}
                className="group overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-950/10"
              >
                <div className="relative overflow-hidden bg-[#dcebe2]">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="h-[330px] w-full object-cover object-center transition duration-500 group-hover:scale-[1.03] sm:h-[390px]"
                  />
                </div>

                <div className="p-7 text-center sm:p-9">
                  <h3 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
                    {founder.name}
                  </h3>

                  <p className="mt-2 text-sm font-bold leading-6 text-emerald-700 sm:text-base">
                    {founder.role}
                  </p>

                  {/* <div className="mx-auto my-5 h-1 w-12 rounded-full bg-emerald-400" /> */}

                  <p className="text-sm leading-7 text-slate-600 sm:text-base">
                    {founder.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSPARENCY */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-6 rounded-3xl border border-emerald-900/10 bg-white p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="shrink-0 text-emerald-700" size={27} />

              <h2 className="text-xl font-black sm:text-2xl">
                A clear and transparent experience
              </h2>
            </div>

            <p className="mt-4 max-w-3xl leading-8 text-slate-600">
              Customers can browse available providers and contact them
              directly without paying AutoConnet to access listings. Service
              providers must complete the registration requirements. A
              provider’s profile remains hidden until the required payment
              process is completed and AutoConnet approves the profile.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm font-bold text-emerald-800">
            <MapPin size={18} />
            Starting in Anambra, Nigeria
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-emerald-700 px-6 py-12 text-center sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -right-10 -top-24 h-64 w-64 rounded-full border-[35px] border-white/10" />
          <div className="pointer-events-none absolute -bottom-28 -left-10 h-64 w-64 rounded-full border-[35px] border-white/10" />

          <div className="relative mx-auto max-w-3xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white">
              <Globe2 size={28} />
            </div>

            <h2 className="mt-6 text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
              Your skills deserve to be discovered.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-emerald-50">
              Whether you need a skilled professional or want to showcase your
              services, AutoConnet is building a better way to make that
              connection.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/services"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-emerald-900 transition hover:bg-emerald-50"
              >
                Find a professional <ArrowRight size={18} />
              </Link>

              <Link
                href="/register"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/40 px-6 py-3 font-bold text-white transition hover:bg-white/10"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
