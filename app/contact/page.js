
"use client";

import { useState } from "react";
import Link from "next/link";

const contacts = [
  {
    number: "+234 912 158 2822",
    tel: "+2349121582822",
    whatsapp: "2349121582822",
  },
  {
    number: "+234 901 418 5097",
    tel: "+2349014185097",
    whatsapp: "2349014185097",
  },
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("General enquiry");
  const [message, setMessage] = useState("");

  function sendMessage(event) {
    event.preventDefault();

    if (!message.trim()) return;

    const text = [
      "Hello AutoConnet Support,",
      "",
      `Name: ${name.trim() || "Not provided"}`,
      `Subject: ${topic}`,
      "",
      message.trim(),
    ].join("\n");

    const url = `https://wa.me/${contacts[0].whatsapp}?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <main className="min-h-screen bg-[#f5f8f6] text-slate-900">
      {/* Main image appears first */}
      <section className="w-full bg-white">
        <div className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl sm:rounded-3xl">
            <img
              src="/image2.jpg"
              alt="AutoConnet customer support and service professionals"
              className="block h-[240px] w-full object-cover sm:h-[380px] lg:h-[500px]"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      {/* Introduction follows the image */}
      <section className="px-5 pb-8 pt-9 sm:pb-12 sm:pt-12">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#176b46]">
            We're here to help
          </p>

          <h1 className="max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Contact AutoConnet
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
            Have a question about worker registration, payments, your profile,
            or finding a skilled professional? Get in touch with our support
            team. We are here to help you navigate AutoConnet.
          </p>
        </div>
      </section>

      {/* Contact information and message form */}
      <section className="mx-auto grid max-w-6xl gap-8 px-5 pb-16 pt-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:pb-24">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Reach our team
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            Call us directly or start a WhatsApp conversation using either
            official support contact below.
          </p>

          <div className="mt-7 space-y-5">
            {contacts.map((contact, index) => (
              <article
                key={contact.tel}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-emerald-200 hover:shadow-md"
              >
                <p className="text-sm font-semibold text-slate-500">
                  AutoConnet Support {index + 1}
                </p>

                <p className="mt-2 text-xl font-extrabold tracking-tight sm:text-2xl">
                  {contact.number}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={`tel:${contact.tel}`}
                    className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#176b46] px-5 py-3 font-bold text-white transition hover:bg-[#104d35]"
                  >
                    Call us
                  </a>

                  <a
                    href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent("Hello AutoConnet Support, I need assistance.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3 font-bold text-[#176b46] transition hover:bg-emerald-100"
                  >
                    WhatsApp
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
            <h3 className="text-lg font-bold text-[#104d35]">
              Need quick answers?
            </h3>

            <p className="mt-2 text-sm leading-7 text-slate-600">
              Visit our FAQ page for answers about registration, the provider
              registration fee, payments and profile approval.
            </p>

            <Link
              href="/faq"
              className="mt-4 inline-flex font-bold text-[#176b46] underline underline-offset-4"
            >
              Explore frequently asked questions
            </Link>
          </div>
        </div>

        {/* Contact form */}
        <div className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
          <span className="text-sm font-bold uppercase tracking-wider text-[#176b46]">
            Send an enquiry
          </span>

          <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
            How can we help you?
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            Complete this form and we will prepare your message in WhatsApp
            for you to review and send.
          </p>

          <form onSubmit={sendMessage} className="mt-7 space-y-5">
            <div>
              <label
                htmlFor="contact-name"
                className="mb-2 block text-sm font-bold text-slate-800"
              >
                Your name (optional)
              </label>

              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your name"
                autoComplete="name"
                className="min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-[#176b46] focus:ring-4 focus:ring-emerald-900/5"
              />
            </div>

            <div>
              <label
                htmlFor="contact-topic"
                className="mb-2 block text-sm font-bold text-slate-800"
              >
                What do you need help with?
              </label>

              <select
                id="contact-topic"
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
                className="min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-[#176b46] focus:ring-4 focus:ring-emerald-900/5"
              >
                <option>General enquiry</option>
                <option>Worker registration</option>
                <option>Payment problem</option>
                <option>Worker profile approval</option>
                <option>Finding a service provider</option>
                <option>Report a problem</option>
                <option>Website technical issue</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="mb-2 block text-sm font-bold text-slate-800"
              >
                Your message
              </label>

              <textarea
                id="contact-message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Tell us how we can help..."
                rows={6}
                required
                className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-[#176b46] focus:ring-4 focus:ring-emerald-900/5"
              />
            </div>

            <button
              type="submit"
              className="inline-flex min-h-14 w-full items-center justify-center rounded-xl bg-[#176b46] px-6 py-4 font-bold text-white transition hover:bg-[#104d35] focus:outline-none focus:ring-4 focus:ring-emerald-900/15"
            >
              Continue to WhatsApp
              <span className="ml-2" aria-hidden="true">
                ↗
              </span>
            </button>

            <p className="text-xs leading-6 text-slate-500">
              Your message opens in WhatsApp. You must press Send in WhatsApp
              to deliver it. Never share your password, banking PIN or
              one-time verification code.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
