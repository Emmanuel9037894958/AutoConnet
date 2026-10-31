import Navbar from "@/components/layout/Navbar";
// import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import ProfessionSlider from "@/components/home/ProfessionSlider";
import ServiceCategories from "@/components/home/ServiceCategories";
import FeaturedWorkers from "@/components/home/FeaturedWorkers";

export const metadata = {
  title: "AutoConnet | Find Skilled Professionals",
  description:
    "Find skilled professionals for repairs, installations and everyday jobs. Starting in Anambra State.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#061710] text-white">
      <Navbar />

      <Hero />

      <ProfessionSlider />

      <ServiceCategories />

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="relative scroll-mt-24 overflow-hidden bg-[#0a2318] py-12 sm:py-16"
      >
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="relative mx-auto w-[calc(100%-32px)] max-w-[1160px]">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
              Getting help should be easy.
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-emerald-100/80 sm:text-base">
              Discover trusted professionals, explore their services and
              connect directly to get your job done.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Find your service",
                description:
                  "Choose a category or search for the particular skill you need.",
              },
              {
                number: "02",
                title: "Explore professionals",
                description:
                  "Review worker profiles, service areas and available contact information.",
              },
              {
                number: "03",
                title: "Connect directly",
                description:
                  "Discuss your requirements, agree on the price and arrange the job.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:bg-white/10 sm:p-7"
              >
                <div className="flex items-center justify-between">
                 
                </div>

                <h3 className="mt-4 text-xl font-bold tracking-tight text-white">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-emerald-100/70">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs font-medium text-emerald-200/60 sm:text-sm">
              Your next service connection starts with AutoConnet.
            </p>
          </div>
        </div>
      </section>

      {/* For Professionals CTA Section */}
      <section id="professionals" className="py-8 sm:py-12">
        <div className="mx-auto w-[calc(100%-32px)] max-w-[1160px]">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-[#0e3022] to-[#14422f] px-6 py-8 text-white sm:px-10 sm:py-12 lg:px-12">
            <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                  For skilled professionals
                </p>

                <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
                  Your skills deserve to be discovered.
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-6 text-emerald-100/80 sm:text-base">
                  Register your skills, showcase your services and make it
                  easier for customers to discover and contact you.
                </p>
              </div>

              <a
                href="/register"
                className="flex shrink-0 items-center justify-center rounded-xl bg-emerald-400 px-6 py-3.5 font-bold text-gray-950 transition hover:bg-white"
              >
                Become a professional
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