
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function CategorySearch({ categoryName, shortName }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch(event) {
    event.preventDefault();

    const value = query.trim();
    if (!value) return;

    router.push(`/services?search=${encodeURIComponent(value)}`);
  }

  return (
    <form
      onSubmit={handleSearch}
      className="mt-9 flex max-w-2xl items-center gap-3 rounded-2xl border border-white/10 bg-white p-2 pl-4 shadow-xl shadow-black/10"
    >
      <Search className="shrink-0 text-emerald-700" size={21} />

      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={`Looking for ${shortName.toLowerCase()}?`}
        aria-label={`Search ${categoryName}`}
        className="min-w-0 flex-1 bg-transparent py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
      />

      <button
        type="submit"
        className="shrink-0 rounded-xl bg-[#176b46] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#105536]"
      >
        Search
      </button>
    </form>
  );
}
