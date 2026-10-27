export const serviceCategories = [
  {
    name: "Phone Repair",
    slug: "phone-repair",
    description: "Screen, battery, charging port and phone repairs.",
    icon: "▣",
  },
  {
    name: "Computer Repair",
    slug: "computer-repair",
    description: "Laptop, desktop, software and hardware support.",
    icon: "⌘",
  },
  {
    name: "Electrical",
    slug: "electrical",
    description: "Electrical installations, repairs and maintenance.",
    icon: "ϟ",
  },
  {
    name: "Plumbing",
    slug: "plumbing",
    description: "Pipes, fittings, leaks and plumbing installations.",
    icon: "♧",
  },
  {
    name: "Carpentry",
    slug: "carpentry",
    description: "Furniture, woodwork, doors and custom projects.",
    icon: "⌁",
  },
  {
    name: "Painting",
    slug: "painting",
    description: "Interior, exterior and decorative painting.",
    icon: "◩",
  },
  {
    name: "Welding",
    slug: "welding",
    description: "Metal fabrication, gates, railings and repairs.",
    icon: "⚒",
  },
  {
    name: "AC Services",
    slug: "ac-services",
    description: "Air conditioner installation, servicing and repair.",
    icon: "❋",
  },
];

export const popularSearches = [
  "Phone repair",
  "Electrician",
  "Plumber",
  "Computer repair",
];

export const demoWorkers = [
  {
    id: "worker-1",
    name: "Worker profile coming soon",
    slug: "worker-profile-coming-soon",
    profession: "Phone Repair Specialist",
    category: "Phone Repair",
    location: "Awka, Anambra",
    rating: "New",
    description:
      "Verified professional profiles will appear here when workers begin registering on AutoConnet.",
    available: true,
  },
  {
    id: "worker-2",
    name: "Worker profile coming soon",
    slug: "professional-coming-soon",
    profession: "Electrical Technician",
    category: "Electrical",
    location: "Awka, Anambra",
    rating: "New",
    description:
      "AutoConnet will allow customers to discover and contact local professionals directly.",
    available: true,
  },
  {
    id: "worker-3",
    name: "Worker profile coming soon",
    slug: "skilled-worker-coming-soon",
    profession: "Computer Technician",
    category: "Computer Repair",
    location: "Awka, Anambra",
    rating: "New",
    description:
      "Real worker profiles will replace these introductory listings after registration is connected.",
    available: true,
  },
];

export function slugify(value) {
  return value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function getCategoryBySlug(slug) {
  return serviceCategories.find((category) => category.slug === slug);
}

export function getWorkerBySlug(slug) {
  return demoWorkers.find((worker) => worker.slug === slug);
}