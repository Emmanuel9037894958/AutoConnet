import Link from "next/link";

export default function WorkerCard({ worker }) {
  return (
    <article className="group rounded-2xl border border-[#e5ebe3] bg-white p-5 transition hover:-translate-y-1 hover:border-[#91bda4] hover:shadow-[0_15px_35px_rgba(25,61,42,0.08)]">
      <div className="flex items-start justify-between gap-4">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#edf5ee] text-xl font-bold text-[#176b46]">
          {worker.profession?.charAt(0) || "A"}
        </div>

        <span className="rounded-full bg-[#f0f7ed] px-3 py-1.5 text-xs font-semibold text-[#176b46]">
          {worker.rating}
        </span>
      </div>

      <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-[#176b46]">
        {worker.category}
      </p>

      <h3 className="mt-2 text-lg font-bold text-[#19251f]">
        {worker.name}
      </h3>

      <p className="mt-1 text-sm font-medium text-[#526159]">
        {worker.profession}
      </p>

      <p className="mt-3 text-sm leading-6 text-[#748078]">
        {worker.description}
      </p>

      <div className="mt-4 flex items-center gap-2 text-sm text-[#68766c]">
        <span>⌖</span>
        {worker.location}
      </div>

      <Link
        href={`/workers/${worker.slug}`}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#176b46] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#105738]"
      >
        View profile
      </Link>
    </article>
  );
}