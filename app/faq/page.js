
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const FAQS = [
  {
    category: "Getting Started",
    audience: "customers",
    question: "What is AutoConnet?",
    answer:
      "AutoConnet is a service marketplace that helps people discover service providers and contact professionals for work they need. The platform is starting in Anambra State, Nigeria, with the aim of expanding to other locations.",
    tags: ["about", "marketplace", "services"],
  },
  {
    category: "Getting Started",
    audience: "customers",
    question: "Do I need an account to find a service provider?",
    answer:
      "No. Customers can browse available service categories and provider profiles without registering or paying a browsing fee. You can use the contact details shown on an available profile to reach the provider directly.",
    tags: ["account", "browse", "free"],
  },
  {
    category: "Getting Started",
    audience: "customers",
    question: "How do I find the right professional?",
    answer:
      "Start by choosing a service category, then look through the available providers. Check their listed skills, location, experience and contact information. Contact the provider to discuss your exact job before agreeing to anything.",
    tags: ["search", "find", "professional", "category"],
  },
  {
    category: "Getting Started",
    audience: "customers",
    question: "Which services can I find on AutoConnet?",
    answer:
      "Depending on the active listings, categories may include plumbing, electrical work, carpentry, painting, building, welding, cleaning, gardening, phone and computer repairs, air-conditioning services, automotive work and other practical services.",
    tags: ["categories", "trades", "repairs"],
  },
  {
    category: "Getting Started",
    audience: "customers",
    question: "Does AutoConnet operate outside Anambra State?",
    answer:
      "AutoConnet is starting with Anambra State. Availability in another state depends on whether providers serving that location have been listed. Check the provider's stated location before making arrangements.",
    tags: ["location", "states", "coverage"],
  },
  {
    category: "Finding a Worker",
    audience: "customers",
    question: "How do I contact a provider?",
    answer:
      "Open the provider's profile and use the available phone or WhatsApp contact option. Explain the work you need, your location and when you need it done. Agree on the scope, price and timing directly with the provider.",
    tags: ["phone", "WhatsApp", "contact"],
  },
  {
    category: "Finding a Worker",
    audience: "customers",
    question: "Can I call or WhatsApp a worker directly?",
    answer:
      "Yes. Where contact options are available on the provider's profile, you can contact the provider directly. You do not need to pay AutoConnet just to contact a listed provider.",
    tags: ["call", "message", "direct"],
  },
  {
    category: "Finding a Worker",
    audience: "customers",
    question: "How much will a service cost?",
    answer:
      "Prices depend on the type of work, materials, distance, urgency and the provider. AutoConnet does not promise one fixed price for every job. Ask the provider for a clear quotation before work begins.",
    tags: ["price", "cost", "quotation", "estimate"],
  },
  {
    category: "Finding a Worker",
    audience: "customers",
    question: "Can I request a quote before hiring someone?",
    answer:
      "Yes. Describe the job, share relevant measurements or photos if helpful, and ask for the estimated labour and material costs. Confirm whether transport, call-out charges or additional work will cost extra.",
    tags: ["quote", "estimate", "materials"],
  },
  {
    category: "Finding a Worker",
    audience: "customers",
    question: "Can I hire a provider for an urgent job?",
    answer:
      "You can contact a provider and ask whether they are available. Availability is not guaranteed by the listing, so confirm the arrival time directly. For dangerous situations, contact the appropriate emergency service instead of waiting for a marketplace provider.",
    tags: ["urgent", "emergency", "availability"],
  },
  {
    category: "Finding a Worker",
    audience: "customers",
    question: "What if a provider does not answer my call?",
    answer:
      "Try contacting the provider again at a reasonable time or use another contact option shown on their profile. If you still cannot reach them, browse other available providers in the same category.",
    tags: ["no answer", "unavailable", "call"],
  },
  {
    category: "Finding a Worker",
    audience: "customers",
    question: "Does viewing a profile mean the provider is available?",
    answer:
      "No. A profile helps you discover a provider, but availability can change. Contact the provider to confirm that they are accepting work and can serve your location.",
    tags: ["available", "booking", "schedule"],
  },
  {
    category: "Finding a Worker",
    audience: "customers",
    question: "Can AutoConnet guarantee the quality of every job?",
    answer:
      "No marketplace listing can guarantee the outcome of every job. Review the information provided, ask about relevant experience, request references or examples where appropriate, and agree on the work and payment terms before hiring.",
    tags: ["quality", "guarantee", "trust"],
  },
  {
    category: "Finding a Worker",
    audience: "customers",
    question: "How can I protect myself when hiring a worker?",
    answer:
      "Discuss the job and price clearly, verify the person's identity and experience where appropriate, agree on milestones for larger jobs, and keep records of important messages and payments. Avoid sending money to unfamiliar people without understanding what the payment covers.",
    tags: ["safety", "scam", "security", "payment"],
  },
  {
    category: "Finding a Worker",
    audience: "customers",
    question: "What if a provider asks me to pay before starting?",
    answer:
      "Some jobs may reasonably require a deposit for materials, but terms vary. Ask for a written breakdown, confirm the provider's details and agree on receipts, milestones and refund terms before paying. AutoConnet does not set every provider's job-payment arrangement.",
    tags: ["deposit", "advance", "materials", "fraud"],
  },
  {
    category: "For Service Providers",
    audience: "providers",
    question: "Who can register as an AutoConnet provider?",
    answer:
      "People who offer genuine services and want customers to discover and contact them can apply to join. Provide accurate information about your skills, service area and contact details. Listings are subject to the platform's approval process.",
    tags: ["worker", "join", "register", "professional"],
  },
  {
    category: "For Service Providers",
    audience: "providers",
    question: "How do I join AutoConnet as a worker?",
    answer:
      "Use the 'Join as a Worker' link on the website and complete the provider registration form with your real details, service category, location and contact information. Follow the instructions shown during registration and payment.",
    tags: ["signup", "registration", "join as worker"],
  },
  {
    category: "For Service Providers",
    audience: "providers",
    question: "How much is the provider registration fee?",
    answer:
      "AutoConnet's planned provider registration fee is a one-time ₦800 payment. Always check the amount displayed on the official registration and checkout pages before paying. Do not pay an individual claiming to represent AutoConnet through an unverified channel.",
    tags: ["800", "₦800", "fee", "price", "charge"],
  },
  {
    category: "For Service Providers",
    audience: "providers",
    question: "Is the ₦800 payment a monthly subscription?",
    answer:
      "The current plan is for a one-time provider registration fee, not a monthly subscription. Check the official checkout page for the actual amount and terms shown when you register.",
    tags: ["monthly", "subscription", "recurring", "one-time"],
  },
  {
    category: "For Service Providers",
    audience: "providers",
    question: "Why is my profile not visible after registration?",
    answer:
      "Creating an account does not automatically mean your public listing is active. Your payment may need to be verified and your profile may need approval. If the required steps are complete and your listing is still missing, contact support with the email used to register.",
    tags: ["hidden", "pending", "approval", "not visible", "inactive"],
  },
  {
    category: "For Service Providers",
    audience: "providers",
    question: "How long does provider approval take?",
    answer:
      "Approval time may vary. Check any status or instructions displayed on your account. If your profile remains pending for an unusually long time, contact support and provide your registration email and payment reference if applicable.",
    tags: ["pending", "waiting", "approval time"],
  },
  {
    category: "For Service Providers",
    audience: "providers",
    question: "What information should I include in my profile?",
    answer:
      "Use your real name or business name, a clear description of your services, the categories you work in, your location, relevant experience and working contact details. Accurate information helps customers understand what you offer.",
    tags: ["profile", "bio", "details", "experience"],
  },
  {
    category: "For Service Providers",
    audience: "providers",
    question: "Can I offer more than one service?",
    answer:
      "If the registration form allows multiple service selections, choose every service you genuinely provide. If you cannot add a relevant category or need to change your listed services, contact support for guidance.",
    tags: ["multiple", "categories", "skills", "services"],
  },
  {
    category: "For Service Providers",
    audience: "providers",
    question: "How do customers contact me?",
    answer:
      "Customers can use the phone or WhatsApp details made available on your active public profile. Keep those details correct and ensure you can respond to enquiries professionally.",
    tags: ["leads", "customers", "phone", "WhatsApp"],
  },
  {
    category: "For Service Providers",
    audience: "providers",
    question: "Will AutoConnet guarantee that I get customers?",
    answer:
      "No. AutoConnet helps customers discover listed providers, but it cannot guarantee a specific number of enquiries, jobs or earnings. Your results may depend on demand, location, service quality, pricing and how complete your profile is.",
    tags: ["income", "earnings", "jobs", "customers"],
  },
  {
    category: "For Service Providers",
    audience: "providers",
    question: "Does AutoConnet collect my payment for every job?",
    answer:
      "The provider registration payment is separate from what you charge customers for your work. Follow the payment arrangements you agree on with each customer. Do not assume AutoConnet holds, guarantees or processes job payments unless the website explicitly offers that feature.",
    tags: ["payout", "withdraw", "job payment", "money"],
  },
  {
    category: "For Service Providers",
    audience: "providers",
    question: "What if my registration payment succeeds but my account is still pending?",
    answer:
      "First, check the payment status and any confirmation message. Keep your payment reference or receipt. Do not immediately pay again. Contact support with your registration email, payment reference, date and amount so the issue can be checked.",
    tags: ["failed", "pending", "successful", "receipt", "transaction"],
  },
  {
    category: "For Service Providers",
    audience: "providers",
    question: "What if I entered the wrong phone number or profile information?",
    answer:
      "Contact support and explain which information needs correcting. Include your registration email and the corrected details. Never send your password or payment-card PIN to support.",
    tags: ["edit", "change", "wrong number", "update details"],
  },
  {
    category: "Payments and Accounts",
    audience: "both",
    question: "What payment methods does AutoConnet accept?",
    answer:
      "Use only the payment method presented on the official AutoConnet checkout page. If a payment option is not displayed there, do not assume it is supported.",
    tags: ["Paystack", "card", "bank transfer", "checkout"],
  },
  {
    category: "Payments and Accounts",
    audience: "both",
    question: "What should I do if I am charged twice?",
    answer:
      "Save the receipts and transaction references for both charges. Contact support with the registration email, transaction dates, amounts and references. Do not share your card PIN, password or one-time banking code.",
    tags: ["double charge", "duplicate", "refund", "charged twice"],
  },
  {
    category: "Payments and Accounts",
    audience: "both",
    question: "Can I request a refund?",
    answer:
      "Refund eligibility depends on the applicable payment terms and the circumstances of the transaction. Contact support with your payment reference and a clear explanation. A refund should not be assumed until it has been reviewed and confirmed.",
    tags: ["refund", "money back", "cancel", "reversal"],
  },
  {
    category: "Payments and Accounts",
    audience: "both",
    question: "I forgot my password. What should I do?",
    answer:
      "Use the password-reset option on the login page if it is available. Follow the instructions sent to your registered email. If you cannot regain access, contact support. Never send your password to anyone.",
    tags: ["forgot password", "login", "account access"],
  },
  {
    category: "Payments and Accounts",
    audience: "both",
    question: "Is my personal information safe?",
    answer:
      "Only provide information needed to use the platform and review the site's privacy policy for details about data handling. Do not share your password, banking PIN, one-time passcode or other secret credentials with anyone claiming to be support.",
    tags: ["privacy", "personal data", "security"],
  },
  {
    category: "Problems and Support",
    audience: "both",
    question: "What if a provider does not complete an agreed job?",
    answer:
      "Contact the provider first if it is safe to do so, and keep records of your agreement, messages and payments. You can also report the issue to AutoConnet support. For serious suspected fraud or threats, consider contacting the appropriate authorities. Support cannot promise a particular dispute outcome.",
    tags: ["complaint", "dispute", "unfinished", "fraud"],
  },
  {
    category: "Problems and Support",
    audience: "both",
    question: "How do I report a suspicious profile or scam?",
    answer:
      "Contact AutoConnet support with the profile link or provider details, a description of what happened and relevant evidence. Avoid publishing private information publicly. If you believe money has been stolen, contact your bank or payment provider promptly as well.",
    tags: ["report", "scam", "suspicious", "fake profile"],
  },
  {
    category: "Problems and Support",
    audience: "both",
    question: "What if the website is not working?",
    answer:
      "Refresh the page, check your internet connection and try again. If the issue continues, contact support and tell us which page you were using, what you expected to happen and the error message you saw. A screenshot can help, but hide private information first.",
    tags: ["error", "bug", "website", "not working"],
  },
  {
    category: "Problems and Support",
    audience: "both",
    question: "How do I contact AutoConnet support?",
    answer:
      "Call or WhatsApp either official support number listed on the Contact page: +234 912 158 2822 or +234 901 418 5097. Explain your issue clearly. For payment issues, include your transaction reference but never share secret banking credentials.",
    tags: ["help", "support", "contact", "phone number"],
  },
];

const CATEGORIES = [
  "All questions",
  "Getting Started",
  "Finding a Worker",
  "For Service Providers",
  "Payments and Accounts",
  "Problems and Support",
];

const AUDIENCES = [
  { label: "Everyone", value: "all" },
  { label: "Customers", value: "customers" },
  { label: "Service providers", value: "providers" },
];

const SUPPORT_NUMBERS = [
  {
    label: "+234 912 158 2822",
    tel: "+2349121582822",
    whatsapp: "2349121582822",
  },
  {
    label: "+234 901 418 5097",
    tel: "+2349014185097",
    whatsapp: "2349014185097",
  },
];

export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All questions");
  const [audience, setAudience] = useState("all");
  const [openItems, setOpenItems] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const filteredFAQs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return FAQS.filter((faq) => {
      const matchesCategory =
        category === "All questions" || faq.category === category;

      const matchesAudience =
        audience === "all" ||
        faq.audience === "both" ||
        faq.audience === audience;

      const searchableText = [
        faq.question,
        faq.answer,
        faq.category,
        ...faq.tags,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = !query || searchableText.includes(query);

      return matchesCategory && matchesAudience && matchesSearch;
    });
  }, [search, category, audience]);

  const visibleFAQs = showAll
    ? filteredFAQs
    : filteredFAQs.slice(0, 8);

  function toggleItem(index) {
    setOpenItems((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index]
    );
  }

  function resetFilters() {
    setSearch("");
    setCategory("All questions");
    setAudience("all");
    setOpenItems([]);
    setShowAll(false);
  }

  function openWhatsApp(number, message) {
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <main className="min-h-screen bg-[#f5f8f6] text-slate-800">
      {/* Hero */}
            {/* Hero */}
      <section className="relative overflow-hidden bg-[#104d35] px-4 pb-16 pt-3 text-white sm:px-6 sm:pb-20 sm:pt-10">

        {/* Hero Image — replace image1.jpg with your image filename */}
        <div className="mx-auto mb-8 max-w-5xl overflow-hidden">
          <img
            src="/image1.jpg"
            alt="AutoConnet service professionals"
            className="h-56 w-full object-cover sm:h-80 lg:h-96"
          />
        </div>

        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full border border-white/10" />

        <div className="relative mx-auto max-w-5xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-green-50">
            <span aria-hidden="true">✦</span>
            AutoConnet Help Centre
          </div>

          <h1 className="max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Answers for every step of your service journey.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-green-50/90 sm:text-lg">
            Whether you need a reliable professional or want to grow your
            service business, find helpful information about using AutoConnet.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/services"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-5 py-3 font-bold text-[#104d35] transition hover:bg-green-50"
            >
              Find a service
            </Link>

            <Link
              href="/join-as-worker"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/35 px-5 py-3 font-bold text-white transition hover:bg-white/10"
            >
              Join as a worker
            </Link>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="relative z-10 mx-auto -mt-7 max-w-5xl px-4 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-900/5 sm:p-6">
          <label
            htmlFor="faq-search"
            className="mb-3 block text-sm font-bold text-slate-800"
          >
            What do you need help with?
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <span
                aria-hidden="true"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400"
              >
                ⌕
              </span>

              <input
                id="faq-search"
                type="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setShowAll(false);
                  setOpenItems([]);
                }}
                placeholder="Search payments, registration, workers..."
                className="min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#176b46] focus:bg-white focus:ring-4 focus:ring-green-900/5"
              />
            </div>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setOpenItems([]);
              }}
              className="min-h-12 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Clear search
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
            <span className="mr-1 text-slate-500">Popular:</span>
            {["₦800 fee", "Payment pending", "Find a worker", "Refund"].map(
              (term) => (
                <button
                  type="button"
                  key={term}
                  onClick={() => {
                    setSearch(term);
                    setShowAll(false);
                    setOpenItems([]);
                  }}
                  className="rounded-full bg-green-50 px-3 py-2 font-medium text-[#176b46] transition hover:bg-green-100"
                >
                  {term}
                </button>
              )
            )}
          </div>
        </div>
      </section>

      {/* Audience filters */}
      <section className="mx-auto max-w-5xl px-4 pb-12 pt-10 sm:px-6">
        <div className="mb-7">
          <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
            Browse help topics
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Choose the questions most relevant to you.
          </p>
        </div>

        <div className="mb-5 flex flex-wrap gap-2">
          {AUDIENCES.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => {
                setAudience(item.value);
                setOpenItems([]);
                setShowAll(false);
              }}
              aria-pressed={audience === item.value}
              className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
                audience === item.value
                  ? "border-[#176b46] bg-[#176b46] text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-green-300 hover:text-[#176b46]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mb-7 flex gap-2 overflow-x-auto pb-2">
          {CATEGORIES.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setCategory(item);
                setOpenItems([]);
                setShowAll(false);
              }}
              aria-pressed={category === item}
              className={`shrink-0 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                category === item
                  ? "border-green-200 bg-green-50 text-[#176b46]"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-500" aria-live="polite">
            <strong className="text-slate-800">{filteredFAQs.length}</strong>{" "}
            {filteredFAQs.length === 1 ? "answer" : "answers"} found
          </p>

          {(search || category !== "All questions" || audience !== "all") && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-sm font-semibold text-[#176b46] underline underline-offset-4"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Questions */}
        <div className="space-y-3">
          {visibleFAQs.map((faq) => {
            const originalIndex = FAQS.indexOf(faq);
            const isOpen = openItems.includes(originalIndex);

            return (
              <article
                key={faq.question}
                className={`overflow-hidden rounded-2xl border bg-white transition ${
                  isOpen
                    ? "border-green-200 shadow-sm"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(originalIndex)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start justify-between gap-4 p-5 text-left sm:p-6"
                >
                  <span className="min-w-0">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#176b46]">
                      {faq.category}
                    </span>
                    <span className="block text-base font-bold leading-6 text-slate-900 sm:text-lg">
                      {faq.question}
                    </span>
                  </span>

                  <span
                    aria-hidden="true"
                    className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xl transition ${
                      isOpen
                        ? "rotate-45 bg-green-100 text-[#176b46]"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                    <div className="border-t border-slate-100 pt-4">
                      <p className="text-sm leading-7 text-slate-600 sm:text-base">
                        {faq.answer}
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          openWhatsApp(
                            SUPPORT_NUMBERS[0].whatsapp,
                            `Hello AutoConnet Support, I need more help with: ${faq.question}`
                          )
                        }
                        className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#176b46] hover:underline"
                      >
                        Still need help? Contact support
                        <span aria-hidden="true">↗</span>
                      </button>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {filteredFAQs.length > 8 && (
          <div className="mt-7 text-center">
            <button
              type="button"
              onClick={() => setShowAll((current) => !current)}
              className="min-h-12 rounded-xl border border-slate-300 bg-white px-6 py-3 font-bold text-slate-700 transition hover:border-green-300 hover:text-[#176b46]"
            >
              {showAll
                ? "Show fewer questions"
                : `View all ${filteredFAQs.length} answers`}
            </button>
          </div>
        )}

        {filteredFAQs.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
            <div className="text-4xl" aria-hidden="true">
              ?
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-900">
              We couldn't find that answer
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Try a different word or contact our support team for help with
              your question.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 rounded-xl bg-[#176b46] px-5 py-3 font-bold text-white transition hover:bg-[#104d35]"
            >
              Browse all questions
            </button>
          </div>
        )}
      </section>

      {/* Contact support */}
      <section className="border-t border-slate-200 bg-white px-4 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <span className="text-sm font-bold uppercase tracking-wider text-[#176b46]">
                Personal assistance
              </span>
              <h2 className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                Didn't find the answer you need?
              </h2>
              <p className="mt-4 max-w-xl leading-7 text-slate-600">
                Our listed support contacts can help you explain your issue.
                Please include enough information for us to understand the
                problem, but never send passwords, PINs or one-time codes.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#176b46] px-5 py-3 font-bold text-white transition hover:bg-[#104d35]"
                >
                  Visit contact page
                </Link>
                <Link
                  href="/services"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 px-5 py-3 font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  Explore services
                </Link>
              </div>
            </div>

            <div className="space-y-3">
              {SUPPORT_NUMBERS.map((number) => (
                <div
                  key={number.tel}
                  className="rounded-2xl border border-slate-200 bg-[#f8faf9] p-5"
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    AutoConnet support
                  </p>
                  <p className="mt-2 text-lg font-extrabold text-slate-900">
                    {number.label}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <a
                      href={`tel:${number.tel}`}
                      className="inline-flex min-h-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:border-green-300"
                    >
                      Call
                    </a>
                    <a
                      href={`https://wa.me/${number.whatsapp}?text=${encodeURIComponent(
                        "Hello AutoConnet Support, I need help."
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-10 items-center justify-center rounded-lg bg-green-100 px-4 py-2 text-sm font-bold text-[#176b46] hover:bg-green-200"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
