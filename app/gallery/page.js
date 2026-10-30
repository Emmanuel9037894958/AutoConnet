
import fs from "node:fs";
import path from "node:path";
import Link from "next/link";

export const metadata = {
  title: "Gallery | AutoConnet",
  description:
    "Explore skilled professionals and services through the AutoConnet gallery.",
};

const supportedExtensions = /\.(jpg|jpeg|png|webp|avif|gif)$/i;

function getGalleryImages() {
  const publicDirectory = path.join(process.cwd(), "public");

  const files = fs.readdirSync(publicDirectory);

  return files
    .map((file) => {
      const match = file.match(/^image(\d+)\.(jpg|jpeg|png|webp|avif|gif)$/i);

      if (!match || !supportedExtensions.test(file)) return null;

      const number = Number(match[1]);

      if (number < 1 || number > 105) return null;

      return {
        number,
        filename: file,
        src: `/${file}`,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.number - b.number);
}

export default function GalleryPage() {
  const images = getGalleryImages();

  return (
    <main className="min-h-screen bg-[#f4f8f3] text-[#19251f]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#103e2b] via-[#176b46] to-[#258052] px-4 pb-20 pt-28 text-white sm:pb-28 sm:pt-36">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#8bd6a4]/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-[#e9b66b]/20 blur-3xl" />

        <div className="relative mx-auto max-w-[1160px]">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[2px] text-[#c7f0d3]">
            AutoConnet Gallery
          </span>

          <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">
            Discover skills.
            <span className="block text-[#b9edca]">
              See work in action.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
            Explore our collection of service images showcasing different
            skills, professions and everyday services. Find inspiration for
            your next project with AutoConnet.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/services"
              className="rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#176b46] transition hover:bg-[#e6f5e9]"
            >
              Explore Services
            </Link>

            <Link
              href="/"
              className="rounded-full border border-white/30 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Back to Home
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap gap-8 border-t border-white/20 pt-7">
            <div>
              <p className="text-3xl font-black">{images.length}</p>
              <p className="mt-1 text-xs font-medium text-white/70">
                Gallery images found
              </p>
            </div>

            <div>
              <p className="text-3xl font-black">105</p>
              <p className="mt-1 text-xs font-medium text-white/70">
                Expected collection
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="mx-auto max-w-[1250px] px-4 py-16 sm:py-20">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[2px] text-[#176b46]">
              Our collection
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#193b2b] sm:text-4xl">
              Explore the gallery.
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-[#68766c]">
              A visual collection of skills and services available to explore
              through AutoConnet.
            </p>
          </div>

          <span className="text-sm font-bold text-[#176b46]">
            {images.length} images displayed
          </span>
        </div>

        {images.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {images.map((image) => (
              <a
                key={image.filename}
                href={image.src}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#e3ece4] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:rounded-[22px]"
              >
                <img
                  src={image.src}
                  alt={`AutoConnet gallery image ${image.number}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-70 transition group-hover:opacity-100" />

                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-3 sm:p-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-white/75">
                      AutoConnet collection
                    </p>
                    <p className="mt-1 text-sm font-extrabold text-white sm:text-base">
                      Image {image.number}
                    </p>
                  </div>

                  <span className="grid h-9 w-9 place-items-center rounded-full bg-white/20 text-lg text-white backdrop-blur-md transition group-hover:bg-white group-hover:text-[#176b46]">
                    ↗
                  </span>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-[#b9cdbd] bg-white px-5 py-16 text-center">
            <h3 className="text-xl font-extrabold text-[#193b2b]">
              No gallery images found yet
            </h3>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-[#68766c]">
              Place your image1 to image105 files inside the public folder.
              Supported formats include JPG, PNG, JPEG, WEBP and AVIF.
            </p>
          </div>
        )}
      </section>

      {/* CALL TO ACTION */}
      <section className="bg-gradient-to-r from-[#176b46] to-[#104b34] px-4 py-16 text-center text-white sm:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[2px] text-[#b9edca]">
            Find the right professional
          </p>

          <h2 className="mt-4 text-3xl font-black sm:text-4xl">
            Have a job that needs doing?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/75">
            Explore services and connect directly with skilled professionals
            through AutoConnet.
          </p>

          <Link
            href="/services"
            className="mt-8 inline-flex rounded-full bg-white px-8 py-4 text-sm font-extrabold text-[#176b46] transition hover:bg-[#e7f5e9]"
          >
            Find a Professional
          </Link>
        </div>
      </section>
    </main>
  );
}
