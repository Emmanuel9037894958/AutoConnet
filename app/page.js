
import Navbar from "@/components/layout/Navbar";
// import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import ServiceCategories from "@/components/home/ServiceCategories";
import FeaturedWorkers from "@/components/home/FeaturedWorkers";

export const metadata = {
  title: "AutoConnet | Find Skilled Professionals",
  description:
    "Find skilled professionals for repairs, installations and everyday jobs. Starting in Anambra State.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#fafbf8] text-[#19251f]">
      <Navbar />
      <Hero />
      <ServiceCategories />

      <section
        id="how-it-works"
        className="border-y border-[#e7ece4] bg-white py-16 sm:py-20"
      >
        <div className="mx-auto w-[calc(100%-32px)] max-w-[1160px]">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[2px] text-[#176b46]">
              Simple by design
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-[-1px] sm:text-4xl">
              Getting help should be easy.
            </h2>

            <p className="mt-4 leading-7 text-[#68766c]">
              Discover professionals and discuss your job directly with them.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                number: "01",
                icon: "⌕",
                title: "Find your service",
                description:
                  "Choose a category or search for the particular skill you need.",
              },
              {
                number: "02",
                icon: "♙",
                title: "Explore professionals",
                description:
                  "Review worker profiles, service areas and available contact information.",
              },
              {
                number: "03",
                icon: "↗",
                title: "Connect directly",
                description:
                  "Discuss your requirements, agree on the price and arrange the job.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="rounded-2xl bg-[#f7f9f4] p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#e6f1e3] text-2xl font-bold text-[#176b46]">
                    {step.icon}
                  </span>

                  <span className="text-3xl font-extrabold text-[#dce7d9]">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-bold">{step.title}</h3>

                <p className="mt-3 text-sm leading-7 text-[#68766c]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="professionals" className="py-16 sm:py-20">
        <div className="mx-auto w-[calc(100%-32px)] max-w-[1160px]">
          <div className="relative overflow-hidden rounded-[28px] bg-[#153f2d] px-6 py-10 text-white sm:px-10 sm:py-14 lg:px-14">
            <div className="absolute -right-12 -top-20 h-64 w-64 rounded-full border border-white/10" />
            <div className="absolute -right-2 -top-10 h-44 w-44 rounded-full border border-white/10" />

            <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[2px] text-[#c3e4c1]">
                  For skilled professionals
                </p>

                <h2 className="mt-3 text-3xl font-extrabold tracking-[-1px] sm:text-4xl">
                  Your skills deserve to be discovered.
                </h2>

                <p className="mt-4 max-w-xl leading-7 text-[#d5e3d8]">
                  Register your skills, showcase your services and make it
                  easier for customers to discover and contact you.
                </p>
              </div>

              <a
                href="/register"
                className="flex shrink-0 items-center justify-center gap-3 rounded-xl bg-[#d5edb9] px-6 py-4 font-bold text-[#173d2b] transition hover:bg-white"
              >
                Become a professional <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <FeaturedWorkers />
      {/* <Footer /> */}
    </main>
  );
}
