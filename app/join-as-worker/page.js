"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

const benefits = [
  {
    number: "01",
    title: "Showcase your skills",
    description: "Build a profile that tells customers what you do best.",
  },
  {
    number: "02",
    title: "Get discovered locally",
    description: "Help people looking for professionals in your area find you.",
  },
  {
    number: "03",
    title: "Connect directly",
    description: "Discuss the job, agree on a price, and arrange the work.",
  },
];

const experienceOptions = [
  { label: "Just starting", value: "0" },
  { label: "Less than 1 year", value: "0" },
  { label: "1–2 years", value: "1" },
  { label: "3–5 years", value: "3" },
  { label: "6–10 years", value: "6" },
  { label: "10+ years", value: "10" },
];

function makeSlug(name) {
  const nameSlug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `${nameSlug || "worker"}-${crypto.randomUUID().slice(0, 8)}`;
}

function normalizeWhatsApp(phone) {
  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("0")) {
    digits = `234${digits.slice(1)}`;
  }

  return digits;
}

function parseLocation(location) {
  const parts = location.split(",").map((part) => part.trim());

  return {
    city: parts[0] || "",
    state: parts[1] || "",
  };
}

export default function JoinAsWorkerPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [categories, setCategories] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [otherService, setOtherService] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");
  const [showSuccess, setShowSuccess] = useState(false);
  const [emailConfirmationRequired, setEmailConfirmationRequired] =
    useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    location: "",
    experience: "",
    bio: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  useEffect(() => {
    let cancelled = false;

    async function loadCategories() {
      if (!supabase) {
        setMessage(
          "Supabase configuration is missing. Check your .env.local file and restart the development server.",
        );
        setMessageType("error");
        setLoadingCategories(false);
        return;
      }

      const { data, error } = await supabase
        .from("service_categories")
        .select("id, name, slug, description")
        .order("name", { ascending: true });

      if (cancelled) return;

      if (error) {
        setMessage(`Unable to load services: ${error.message}`);
        setMessageType("error");
      } else {
        setCategories(data || []);
      }

      setLoadingCategories(false);
    }

    loadCategories();

    return () => {
      cancelled = true;
    };
  }, []);

  function updateField(event) {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setMessage("");
  }

  function addService(value) {
    if (!value) return;

    if (value === "other") {
      setSelectedServices((previous) =>
        previous.includes("other") ? previous : [...previous, "other"],
      );
    } else {
      const serviceId = Number(value);

      setSelectedServices((previous) =>
        previous.includes(serviceId) ? previous : [...previous, serviceId],
      );
    }

    setMessage("");
  }

  function removeService(serviceId) {
    setSelectedServices((previous) =>
      previous.filter((id) => id !== serviceId),
    );

    if (serviceId === "other") {
      setOtherService("");
    }

    setMessage("");
  }

  async function saveWorkerProfile(user, serviceIds, metadata) {
    const { data: existingProfile, error: lookupError } = await supabase
      .from("provider_profiles")
      .select("id")
      .eq("id", user.id)
      .maybeSingle();

    if (lookupError) {
      throw new Error(
        `Your account exists, but we could not check your profile: ${lookupError.message}`,
      );
    }

    if (!existingProfile) {
      const { error: profileError } = await supabase
        .from("provider_profiles")
        .insert({
          id: user.id,
          display_name: metadata.full_name,
          slug: metadata.slug,
          bio: metadata.bio || "",
          phone: metadata.phone,
          whatsapp: metadata.whatsapp,
          location: metadata.location,
          city: metadata.city,
          state: metadata.state,
          years_experience: metadata.years_experience || 0,

          // Keep the profile hidden until the provider's registration
          // payment has been verified by a trusted server-side process.
          is_active: false,
        });

      if (profileError) {
        throw new Error(
          `Your account was created, but saving your profile failed: ${profileError.message}. Please sign in and try completing your profile again.`,
        );
      }
    }

    // Only real service category IDs may be saved in provider_services.
    // The custom "other" option is deliberately excluded.
    const categoryServiceIds = serviceIds.filter(
      (serviceId) => serviceId !== "other",
    );

    if (categoryServiceIds.length > 0) {
      const rows = categoryServiceIds.map((serviceId) => ({
        provider_id: user.id,
        service_id: serviceId,
      }));

      const { error: serviceError } = await supabase
        .from("provider_services")
        .upsert(rows, {
          onConflict: "provider_id,service_id",
          ignoreDuplicates: true,
        });

      if (serviceError) {
        throw new Error(
          `Your profile was saved, but saving your selected services failed: ${serviceError.message}. Please sign in and try again.`,
        );
      }
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    if (!supabase) {
      setMessage(
        "Supabase is not configured. Check .env.local and restart your development server.",
      );
      setMessageType("error");
      return;
    }

    if (!form.fullName.trim()) {
      setMessage("Please enter your full name.");
      setMessageType("error");
      return;
    }

    if (!form.phone.trim()) {
      setMessage("Please enter your phone number.");
      setMessageType("error");
      return;
    }

    if (!form.email.trim()) {
      setMessage("An email address is required to create your account.");
      setMessageType("error");
      return;
    }

    if (!form.location.trim()) {
      setMessage("Please enter your work location.");
      setMessageType("error");
      return;
    }

    if (selectedServices.length === 0) {
      setMessage("Please select at least one service you provide.");
      setMessageType("error");
      return;
    }

    if (selectedServices.includes("other") && !otherService.trim()) {
      setMessage("Please describe your other service.");
      setMessageType("error");
      return;
    }

    if (form.password.length < 8) {
      setMessage("Your password must contain at least 8 characters.");
      setMessageType("error");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setMessage("Your passwords do not match.");
      setMessageType("error");
      return;
    }

    if (!form.terms) {
      setMessage("Please agree to the Terms of Service.");
      setMessageType("error");
      return;
    }

    setSubmitting(true);

    try {
      const { city, state } = parseLocation(form.location);

      const serviceSlugs = categories
        .filter((category) => selectedServices.includes(category.id))
        .map((category) => category.slug);

      const metadata = {
        full_name: form.fullName.trim(),
        phone: form.phone.trim(),
        whatsapp: normalizeWhatsApp(form.phone),
        location: form.location.trim(),
        city,
        state,
        bio: form.bio.trim(),
        years_experience: Number(form.experience || 0),
        slug: makeSlug(form.fullName),
        service_slugs: serviceSlugs,
        account_type: "provider",

        // Stored as auth user metadata until a dedicated custom-services
        // database table or approved storage method is implemented.
        other_service: selectedServices.includes("other")
          ? otherService.trim()
          : "",
      };

      const { data, error } = await supabase.auth.signUp({
        email: form.email.trim().toLowerCase(),
        password: form.password,
        options: {
          data: metadata,
          emailRedirectTo:
            typeof window !== "undefined"
              ? `${window.location.origin}/login`
              : undefined,
        },
      });

      if (error) throw error;

      if (!data.user) {
        throw new Error(
          "Supabase did not return a user account. Please try again.",
        );
      }

      if (data.session) {
        await saveWorkerProfile(data.user, selectedServices, metadata);

        setEmailConfirmationRequired(false);
        setShowSuccess(true);
      } else {
        setEmailConfirmationRequired(true);
        setShowSuccess(true);
      }
    } catch (error) {
      setMessage(error?.message || "Registration failed. Please try again.");
      setMessageType("error");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-[#d7e5d8] bg-[#f5faf4] px-4 py-3.5 text-sm text-[#20372b] outline-none transition placeholder:text-[#91a397] hover:border-[#b8d5be] focus:border-[#176b46] focus:bg-white focus:ring-4 focus:ring-[#176b46]/10";

  const labelClass = "text-sm font-semibold text-[#304538]";

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#e6f3e7] via-[#f7f5e9] to-[#fff0dc] px-4 py-7 sm:px-6 sm:py-10">
      {showSuccess && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#0d281b]/75 px-4 py-8 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="registration-success-title"
        >
          <div className="my-auto w-full max-w-md overflow-hidden rounded-[30px] border border-white/70 bg-white px-6 py-9 text-center shadow-2xl sm:px-10 sm:py-11">
            <div className="mx-auto mb-5 grid h-24 w-24 place-items-center rounded-full bg-[#e8f7e9] text-5xl">
              🌸
            </div>

            <span className="inline-flex items-center gap-2 rounded-full border border-[#cce8d0] bg-[#eff9ef] px-3 py-1.5 text-[11px] font-extrabold tracking-[0.15em] text-[#176b46]">
              <span className="h-2 w-2 rounded-full bg-[#258657]" />
              ACCOUNT CREATED
            </span>

            <h2
              id="registration-success-title"
              className="mt-4 text-3xl font-black tracking-tight text-[#183d2b] sm:text-4xl"
            >
              Registration Successful!
            </h2>

            <p className="mt-3 text-base leading-7 text-[#617467]">
              Welcome to AutoConnet,{" "}
              <span className="font-bold text-[#176b46]">
                {form.fullName.trim().split(/\s+/)[0] || "friend"}
              </span>
              !
            </p>

            {emailConfirmationRequired ? (
              <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-left text-sm leading-6 text-amber-950">
                <p className="font-bold">One last step: confirm your email</p>
                <p className="mt-1">
                  Open the confirmation link sent to{" "}
                  <strong>{form.email.trim()}</strong> before signing in. Your
                  provider profile may need to be completed after confirmation.
                </p>
              </div>
            ) : (
              <div className="mt-5 rounded-2xl border border-[#dcebdd] bg-[#f0f8ef] p-4 text-left text-sm leading-6 text-[#304538]">
                <p className="font-bold text-[#176b46]">
                  Your provider details have been submitted.
                </p>
                <p className="mt-1">
                  Your public profile remains hidden until the one-time provider
                  registration payment has been verified.
                </p>
              </div>
            )}

            <div className="mt-7 flex flex-col gap-3">
              <Link
                href="/login"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#176b46] to-[#258657] px-5 py-4 text-sm font-extrabold text-white shadow-lg transition hover:from-[#105738] hover:to-[#176b46]"
              >
                Continue to Sign In <span aria-hidden="true">→</span>
              </Link>

              <Link
                href="/"
                className="rounded-xl border border-[#dce7df] px-5 py-3.5 text-sm font-bold text-[#176b46] transition hover:bg-[#f0f8ef]"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="pointer-events-none absolute -left-28 top-44 h-72 w-72 rounded-full bg-[#b8dfbf]/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-[#f3c98e]/30 blur-3xl" />

      <div className="relative mx-auto max-w-[1120px]">
        <Link href="/" className="mb-7 inline-flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#248657] to-[#104b31] text-white shadow-lg shadow-[#176b46]/20">
            <svg
              viewBox="0 0 44 44"
              fill="none"
              className="h-8 w-8"
              aria-hidden="true"
            >
              <path
                d="M8 23.5 17.5 14l7 7L17 28.5"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="m21 16.5 5-5 10 10-10 10-5-5"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          <span className="text-2xl font-extrabold tracking-tight text-[#183d2b]">
            Auto<span className="text-[#208052]">Connet</span>
            <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#778c7c]">
              Skills meet opportunity
            </span>
          </span>
        </Link>

        <div className="grid overflow-hidden rounded-[28px] border border-white/80 bg-white/80 shadow-[0_28px_90px_-35px_rgba(25,65,42,0.25)] backdrop-blur-xl lg:grid-cols-[0.82fr_1.18fr]">
          <section className="relative hidden overflow-hidden bg-gradient-to-br from-[#12462f] via-[#176b46] to-[#25875a] p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-12">
            <div className="pointer-events-none absolute -right-24 -top-20 h-80 w-80 rounded-full border border-white/15" />
            <div className="pointer-events-none absolute -right-8 top-8 h-48 w-48 rounded-full border border-[#d5efaa]/20" />
            <div className="pointer-events-none absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-[#b5dc81]/15 blur-2xl" />

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold text-[#e0f4c8]">
                <span className="h-2 w-2 rounded-full bg-[#c8f18b]" />
                For skilled professionals
              </span>

              <h1 className="mt-8 max-w-sm text-4xl font-bold leading-[1.15] tracking-tight xl:text-[46px]">
                Your talent deserves to{" "}
                <span className="text-[#d0ef9e]">be discovered.</span>
              </h1>

              <p className="mt-5 max-w-sm text-[15px] leading-7 text-white/80">
                Join AutoConnet and help customers find the skills they need,
                right in their own communities.
              </p>

              <div className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#d9efb4] px-4 py-3 text-sm font-bold text-[#18492f] shadow-lg">
                <span className="text-lg">✦</span>
                Make your skills work for you
              </div>
            </div>

            <div className="relative mt-14 space-y-6">
              {benefits.map((item) => (
                <div key={item.number} className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/15 bg-white/10 text-sm font-bold text-[#d8f1a9]">
                    {item.number}
                  </span>

                  <div>
                    <h2 className="text-sm font-semibold">{item.title}</h2>
                    <p className="mt-1 max-w-xs text-sm leading-6 text-white/70">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative mt-12 border-t border-white/15 pt-5">
              <p className="text-xs leading-5 text-white/60">
                AutoConnet · Connecting local skills to everyday needs.
              </p>
            </div>
          </section>

          <section className="relative bg-gradient-to-br from-[#fffefa] via-white to-[#f0f8ee] p-5 sm:p-9 lg:p-10 xl:p-12">
            <div className="absolute right-0 top-0 h-2 w-32 rounded-bl-full bg-gradient-to-r from-[#e5bd72] to-[#2c955f]" />

            <div className="mx-auto max-w-[540px]">
              <div className="mb-8">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#d7e9d8] bg-[#eaf6e9] px-3 py-1.5 text-[11px] font-bold tracking-[0.12em] text-[#176b46]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#27925b]" />
                  WORKER REGISTRATION
                </span>

                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#183d2b] sm:text-[36px]">
                  Create your worker account
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#718075]">
                  Tell customers about your skills, select the services you
                  provide, and choose where you work.
                </p>

                <div className="mt-5 flex items-center gap-2">
                  <span className="h-1.5 flex-1 rounded-full bg-[#176b46]" />
                  <span className="h-1.5 flex-1 rounded-full bg-[#a9d8ad]" />
                  <span className="h-1.5 flex-1 rounded-full bg-[#f0d5a6]" />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="fullName" className={labelClass}>
                    Full name <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="fullName"
                    name="fullName"
                    autoComplete="name"
                    value={form.fullName}
                    onChange={updateField}
                    className={inputClass}
                    placeholder="Enter your full name"
                    maxLength={100}
                    required
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className={labelClass}>
                      Phone number <span className="text-red-500">*</span>
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={updateField}
                      className={inputClass}
                      placeholder="0801 234 5678"
                      required
                    />

                    <p className="mt-1 text-xs text-[#819084]">
                      Customers can use this number to contact you.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Email address <span className="text-red-500">*</span>
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={updateField}
                      className={inputClass}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="location" className={labelClass}>
                    Work location <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="location"
                    name="location"
                    autoComplete="address-level2"
                    value={form.location}
                    onChange={updateField}
                    className={inputClass}
                    placeholder="e.g. Awka, Anambra"
                    required
                  />

                  <p className="mt-1 text-xs text-[#819084]">
                    Enter your city and state, separated by a comma.
                  </p>
                </div>

                {/* COMPACT MULTI-SERVICE SELECTOR */}
                <div>
                  <label htmlFor="serviceSelector" className={labelClass}>
                    Services you provide <span className="text-red-500">*</span>
                  </label>

                  <p className="mt-1 text-xs leading-5 text-[#718075]">
                    Choose services from the dropdown. You can add more than one
                    without filling the page with checkboxes.
                  </p>

                  {loadingCategories ? (
                    <div className="mt-3 rounded-xl border border-[#d7e5d8] bg-[#f5faf4] p-4 text-sm text-[#718075]">
                      Loading services from AutoConnet...
                    </div>
                  ) : categories.length === 0 ? (
                    <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                      No service categories were loaded. Please check your
                      Supabase connection before registering.
                    </div>
                  ) : (
                    <>
                      <select
                        id="serviceSelector"
                        value=""
                        onChange={(event) => addService(event.target.value)}
                        className={inputClass}
                      >
                        <option value="">Choose a service to add...</option>

                        {categories
                          .filter(
                            (category) =>
                              !selectedServices.includes(category.id),
                          )
                          .map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}

                        <option value="other">
                          Other — my service isn't listed
                        </option>
                      </select>

                      {selectedServices.length > 0 && (
                        <div className="mt-3 rounded-xl border border-[#d7e5d8] bg-white p-3">
                          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#718075]">
                            Selected services ({selectedServices.length})
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {selectedServices.map((serviceId) => {
                              const isOther = serviceId === "other";

                              const category = categories.find(
                                (item) => item.id === serviceId,
                              );

                              if (!isOther && !category) return null;

                              return (
                                <span
                                  key={serviceId}
                                  className="inline-flex items-center gap-2 rounded-full border border-[#cce5d0] bg-[#eaf6e9] px-3 py-2 text-sm font-medium text-[#176b46]"
                                >
                                  <span>
                                    {isOther ? "Other" : category.name}
                                  </span>

                                  <button
                                    type="button"
                                    onClick={() => removeService(serviceId)}
                                    aria-label={`Remove ${
                                      isOther ? "other service" : category.name
                                    }`}
                                    className="rounded-full px-1 font-bold text-[#176b46] hover:bg-red-100 hover:text-red-600"
                                  >
                                    ×
                                  </button>
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {selectedServices.includes("other") && (
                        <div className="mt-4">
                          <label htmlFor="otherService" className={labelClass}>
                            Describe your other service{" "}
                            <span className="text-red-500">*</span>
                          </label>

                          <input
                            id="otherService"
                            type="text"
                            value={otherService}
                            onChange={(event) => {
                              setOtherService(event.target.value);
                              setMessage("");
                            }}
                            className={inputClass}
                            placeholder="e.g. flower cultivation, grass cutting"
                            maxLength={100}
                            required
                          />

                          <p className="mt-1 text-xs text-[#819084]">
                            Enter the name of the service you offer.
                          </p>
                        </div>
                      )}

                      <p className="mt-2 text-xs text-[#718075]">
                        Selected: {selectedServices.length} service
                        {selectedServices.length === 1 ? "" : "s"}
                      </p>
                    </>
                  )}
                </div>

                <div>
                  <label htmlFor="experience" className={labelClass}>
                    Years of experience
                  </label>

                  <select
                    id="experience"
                    name="experience"
                    value={form.experience}
                    onChange={updateField}
                    className={inputClass}
                  >
                    <option value="">Select experience</option>

                    {experienceOptions.map((option) => (
                      <option
                        key={`${option.label}-${option.value}`}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="bio" className={labelClass}>
                    About your skills (optional)
                  </label>

                  <textarea
                    id="bio"
                    name="bio"
                    value={form.bio}
                    onChange={updateField}
                    className={inputClass}
                    placeholder="Describe your experience, services, and the work you do."
                    rows={4}
                    maxLength={1000}
                  />

                  <p className="mt-1 text-right text-xs text-[#819084]">
                    {form.bio.length}/1000
                  </p>
                </div>

                <div className="rounded-2xl border border-[#dcebdd] bg-[#f0f8ef]/80 p-4">
                  <div className="mb-4">
                    <p className="text-sm font-bold text-[#245438]">
                      Secure your account
                    </p>

                    <p className="text-xs text-[#748779]">
                      Use at least 8 characters for your password.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="password" className={labelClass}>
                      Create password <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        value={form.password}
                        onChange={updateField}
                        className={`${inputClass} pr-20`}
                        placeholder="At least 8 characters"
                        minLength={8}
                        required
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((value) => !value)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-bold text-[#176b46] hover:bg-[#eaf6e9]"
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label htmlFor="confirmPassword" className={labelClass}>
                      Confirm password <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        autoComplete="new-password"
                        value={form.confirmPassword}
                        onChange={updateField}
                        className={`${inputClass} pr-20`}
                        placeholder="Enter your password again"
                        minLength={8}
                        required
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword((value) => !value)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-bold text-[#176b46] hover:bg-[#eaf6e9]"
                      >
                        {showConfirmPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>
                </div>

                <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-[#68776d]">
                  <input
                    type="checkbox"
                    name="terms"
                    checked={form.terms}
                    onChange={updateField}
                    className="mt-1 h-4 w-4 shrink-0 accent-[#176b46]"
                    required
                  />

                  <span>
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="font-bold text-[#176b46] underline decoration-[#b2d7b5] underline-offset-4"
                    >
                      Terms of Service
                    </Link>{" "}
                    and understand that my professional information may be
                    displayed to customers when my account is active.
                  </span>
                </label>

                {message && (
                  <div
                    role="alert"
                    aria-live="polite"
                    className={`rounded-xl border px-4 py-3 text-sm leading-6 ${
                      messageType === "success"
                        ? "border-green-200 bg-green-50 text-green-900"
                        : "border-red-200 bg-red-50 text-red-800"
                    }`}
                  >
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting || loadingCategories}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#176b46] to-[#258657] px-5 py-4 text-sm font-bold text-white shadow-lg shadow-[#176b46]/20 transition duration-200 hover:-translate-y-0.5 hover:from-[#105738] hover:to-[#176b46] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#176b46]/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting
                    ? "Creating your account..."
                    : "Create worker account"}

                  {!submitting && (
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  )}
                </button>
              </form>

              <div className="my-7 flex items-center gap-3">
                <div className="h-px flex-1 bg-[#e3eae0]" />

                <span className="text-xs text-[#8a988e]">ALREADY JOINED?</span>

                <div className="h-px flex-1 bg-[#e3eae0]" />
              </div>

              <p className="text-center text-sm text-[#718075]">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-extrabold text-[#176b46] underline decoration-[#b2d7b5] underline-offset-4 hover:text-[#104b31]"
                >
                  Sign in
                </Link>
              </p>

              <p className="mt-5 text-center text-sm text-[#718075]">
                Looking for services instead?{" "}
                <Link
                  href="/services"
                  className="font-bold text-[#176b46] underline underline-offset-4"
                >
                  Browse services
                </Link>
              </p>

              <div className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-[#fff5e6] px-4 py-3 text-center text-xs leading-5 text-[#005e19]">
                <span>✦</span>
                <span>
                  Your skills matter. Your next opportunity could start here.
                </span>
              </div>
            </div>
          </section>
        </div>

        <p className="mt-5 text-center text-xs text-[#9aa69d]">
          © 2026 AutoConnet. All rights reserved.
        </p>
      </div>
    </main>
  );
}
