
const professions = [
  "Plumbers",
  "Phone Repairers",
  "Computer Repairers",
  "Mechanics",
  "Electricians",
  "Carpenters",
  "Painters",
  "Welders",
  "AC Technicians",
  "Refrigeration Technicians",
  "Hairdressers",
  "Barbers",
  "Tailors",
  "Cleaners",
  "Tilers",
  "Bricklayers",
  "Generator Repairers",
  "CCTV Installers",
  "Solar Technicians",
  "Furniture Makers",
];

export default function ProfessionSlider() {
  return (
    <section className="overflow-hidden bg-white py-3">
      <div className="mx-auto mb-5 flex w-[calc(100%-32px)] max-w-[1160px] items-center gap-3">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-600"></span>
        </span>

        <span className="text-xs font-extrabold uppercase tracking-[2px] text-green-700">
          LIVE
        </span>

        <span className="text-sm font-medium text-[#68766c]">
          Discover skilled professionals
        </span>
      </div>

      <div className="overflow-hidden">
        <div className="flex w-max animate-[profession-slide_45s_linear_infinite] hover:[animation-play-state:paused]">
          {[...professions, ...professions].map((profession, index) => (
            <span
              key={`${profession}-${index}`}
              className="mx-4 shrink-0 whitespace-nowrap text-sm font-semibold text-[#176b46] sm:text-base"
            >
              {profession}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
