"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { SiteContactLink } from "@/lib/site-config";
import { useState, type ChangeEvent, type FormEvent } from "react";

type ContactProps = {
  links: SiteContactLink[];
  resumeUrl?: string;
};

type ContactFormState = {
  name: string;
  email: string;
  message: string;
};

type SubmitStatus = "idle" | "sending" | "sent" | "error";

const linkVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.04, duration: 0.32, ease: [0.16, 1, 0.3, 1] },
  }),
};

function ContactIcon({ label }: { label: string }) {
  const commonProps = {
    "aria-hidden": true,
    className: "h-4 w-4",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  };

  if (label === "Email") {
    return (
      <svg {...commonProps}>
        <path
          d="M4.75 6.75h14.5v10.5H4.75V6.75Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="m5.25 7.25 6.75 5.5 6.75-5.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    );
  }

  if (label === "LinkedIn") {
    return (
      <svg {...commonProps} fill="currentColor">
        <path d="M6.94 8.88H3.98v9.47h2.96V8.88Z" />
        <path d="M5.46 7.59a1.72 1.72 0 1 0 0-3.44 1.72 1.72 0 0 0 0 3.44Z" />
        <path d="M18.88 13.11c0-2.86-1.53-4.19-3.57-4.19a3.08 3.08 0 0 0-2.79 1.53h-.04V8.88H9.64v9.47h2.96v-4.68c0-1.23.23-2.43 1.76-2.43 1.5 0 1.52 1.41 1.52 2.51v4.6h3v-5.24Z" />
      </svg>
    );
  }

  if (label === "GitHub") {
    return (
      <svg {...commonProps} fill="currentColor">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2.75a9.25 9.25 0 0 0-2.92 18.03c.46.08.63-.2.63-.44v-1.62c-2.57.56-3.11-1.1-3.11-1.1-.42-1.07-1.03-1.36-1.03-1.36-.84-.57.07-.56.07-.56.93.07 1.42.96 1.42.96.83 1.42 2.18 1.01 2.71.77.08-.6.32-1.01.59-1.24-2.05-.23-4.21-1.03-4.21-4.57 0-1.01.36-1.83.95-2.48-.1-.23-.41-1.17.09-2.44 0 0 .78-.25 2.55.95a8.8 8.8 0 0 1 4.64 0c1.77-1.2 2.54-.95 2.54-.95.51 1.27.19 2.21.1 2.44.59.65.95 1.47.95 2.48 0 3.55-2.16 4.33-4.22 4.56.33.29.63.85.63 1.72v2.52c0 .24.17.53.64.44A9.25 9.25 0 0 0 12 2.75Z"
        />
      </svg>
    );
  }

  if (label === "Instagram") {
    return (
      <svg {...commonProps}>
        <rect x="4.5" y="4.5" width="15" height="15" rx="4.2" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="3.55" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="16.55" cy="7.45" r="1" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function Contact({ links, resumeUrl }: ContactProps) {
  const [form, setForm] = useState<ContactFormState>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [feedback, setFeedback] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        throw new Error(data?.error ?? "Could not send message.");
      }

      setStatus("sent");
      setFeedback("Message sent. I will get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "Could not send message.");
    }
  };

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="scroll-section border-t border-[rgba(255,255,255,0.06)] px-6 py-28 sm:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="lg:sticky lg:top-28">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.45em] text-text-muted">Contact</p>
            <h2 className="mt-5 max-w-5xl bg-[linear-gradient(90deg,#4ade80_0%,#facc15_100%)] bg-clip-text pb-3 font-heading text-[clamp(4rem,10vw,9rem)] font-bold leading-[0.98] tracking-[-0.08em] text-transparent">
              Let&apos;s build something.
            </h2>

            <p className="mt-8 max-w-[66ch] font-mono text-[clamp(1rem,1.6vw,1.125rem)] leading-8 text-text-muted">
              Send a note if you want to talk AI systems, frontend builds, or useful experiments.
            </p>

            <div className="mt-10 max-w-3xl border border-[rgba(240,253,244,0.08)] bg-[rgba(255,255,255,0.015)] p-6">
              <h3 className="font-heading text-[clamp(1.5rem,3.5vw,2.4rem)] font-bold leading-tight text-text-main">
                Open to AI/Backend internships, collaborations, and freelance builds.
              </h3>
              <p className="mt-4 max-w-[62ch] font-sans text-base leading-7 text-text-muted">
                If you are building practical systems and need execution support, I can help with agentic workflows, API
                integrations, and product-ready frontend implementation.
              </p>
            </div>
          </div>

          <div className="border border-[rgba(240,253,244,0.08)] bg-[rgba(0,0,0,0.3)] p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-accent">Direct Reach</p>
            <p className="mt-4 font-sans text-sm leading-6 text-text-muted">
              Best way to connect for opportunities, collaboration, or project discussions.
            </p>
            <div className="mt-6 space-y-3 font-mono text-xs uppercase tracking-[0.16em] text-text-main">
              <p>Response window: 24-48 hrs</p>
              <p>Timezone: IST (UTC+5:30)</p>
              <p>Mode: Remote / Hybrid</p>
              <p>
                Resume:{" "}
                {resumeUrl ? (
                  <a href={resumeUrl} className="text-primary underline-offset-4 hover:underline">
                    Open / download
                  </a>
                ) : (
                  "Coming soon"
                )}
              </p>
            </div>
          </div>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mt-14 border border-[rgba(240,253,244,0.08)] bg-[rgba(0,0,0,0.3)] p-5 md:p-6"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="sr-only">Your name</span>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                maxLength={80}
                placeholder="Your Name"
                className="w-full border border-[rgba(240,253,244,0.08)] bg-[rgba(255,255,255,0.015)] px-4 py-4 font-mono text-sm tracking-[0.08em] text-text-main outline-none transition-colors duration-200 placeholder:text-text-muted focus:border-primary"
              />
            </label>
            <label className="block">
              <span className="sr-only">Your email</span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                maxLength={254}
                placeholder="Your Email"
                className="w-full border border-[rgba(240,253,244,0.08)] bg-[rgba(255,255,255,0.015)] px-4 py-4 font-mono text-sm tracking-[0.08em] text-text-main outline-none transition-colors duration-200 placeholder:text-text-muted focus:border-primary"
              />
            </label>
          </div>
          <label className="mt-4 block">
            <span className="sr-only">Your message</span>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              maxLength={2000}
              rows={5}
              placeholder="Your Message"
              className="min-h-[160px] w-full resize-y border border-[rgba(240,253,244,0.08)] bg-[rgba(255,255,255,0.015)] px-4 py-4 font-mono text-sm tracking-[0.08em] text-text-main outline-none transition-colors duration-200 placeholder:text-text-muted focus:border-primary"
            />
          </label>
          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex w-fit border border-primary px-6 py-4 font-heading text-sm font-bold uppercase tracking-[0.24em] text-primary transition-colors duration-200 hover:bg-primary hover:text-background disabled:cursor-wait disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>
            {feedback ? (
              <p className={status === "sent" ? "font-mono text-xs uppercase tracking-[0.16em] text-primary" : "font-mono text-xs uppercase tracking-[0.16em] text-accent"}>
                {feedback}
              </p>
            ) : (
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-text-muted">
                Messages go straight to my inbox.
              </p>
            )}
          </div>
        </motion.form>

        <div className="mt-14 grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {links.length === 0 && process.env.NODE_ENV === "development" ? (
            <p className="col-span-full font-mono text-sm text-text-muted">
              Add CONTACT_EMAIL, LINKEDIN_URL, GITHUB_URL, and/or INSTAGRAM_URL in .env.local (see .env.example).
            </p>
          ) : null}
          {links.map((link, index) => (
            <motion.a
              key={`${link.label}-${link.href}`}
              href={link.href}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              variants={linkVariants}
              className="group relative flex min-w-0 items-center justify-center overflow-hidden border border-[rgba(240,253,244,0.08)] bg-[linear-gradient(90deg,rgba(255,255,255,0.015),rgba(255,255,255,0.005))] px-3 py-4 font-mono text-[11px] uppercase tracking-[0.16em] text-text-main transition-colors duration-200 hover:border-primary hover:text-primary sm:px-4 sm:text-xs sm:tracking-[0.18em]"
            >
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted transition-colors duration-200 group-hover:text-accent">
                <ContactIcon label={link.label} />
              </span>
              <span className="pointer-events-none absolute inset-x-6 bottom-2 h-px origin-center scale-x-0 bg-[linear-gradient(90deg,transparent,#4ade80,#facc15,transparent)] transition-transform duration-300 group-hover:scale-x-100" />
              <span className="shrink-0 whitespace-nowrap text-center">{link.label}</span>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-accent transition-transform duration-200 group-hover:translate-x-1">
                ↗
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
