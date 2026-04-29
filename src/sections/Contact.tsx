"use client";

import { motion } from "framer-motion";

const links = [
  { label: "Email", href: "mailto:email@lalit.dev", value: "email@lalit.dev" },
  { label: "LinkedIn", href: "https://linkedin.com/in/lalit", value: "linkedin.com/in/lalit" },
  { label: "GitHub", href: "https://github.com/lalit", value: "github.com/lalit" },
];

export function Contact() {
  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="border-t border-[rgba(255,255,255,0.06)] px-6 py-28 sm:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.45em] text-text-muted">Contact</p>
            <h2 className="mt-5 max-w-5xl bg-[linear-gradient(90deg,#4ade80_0%,#facc15_100%)] bg-clip-text font-heading text-[clamp(4rem,10vw,9rem)] font-bold leading-[0.9] tracking-[-0.08em] text-transparent">
              Let&apos;s build something.
            </h2>

            <p className="mt-8 max-w-2xl font-mono text-[clamp(1rem,1.6vw,1.125rem)] leading-8 text-text-muted">
              Send a note if you want to talk AI systems, frontend builds, or useful experiments.
            </p>

            <div className="mt-10 max-w-3xl border border-[rgba(240,253,244,0.08)] bg-[rgba(255,255,255,0.015)] p-6">
              <h3 className="font-heading text-[clamp(1.5rem,3.5vw,2.4rem)] font-bold leading-tight text-text-main">
                Open to AI/Backend internships, collaborations, and freelance builds.
              </h3>
              <p className="mt-4 font-sans text-base leading-7 text-text-muted">
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
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group flex items-center justify-between border border-[rgba(240,253,244,0.08)] px-4 py-4 font-mono text-xs uppercase tracking-[0.18em] text-text-main transition-colors duration-200 hover:border-primary hover:text-primary"
            >
              <span className="shrink-0">{link.label}</span>
              <span className="truncate px-3 text-text-muted">/ {link.value}</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">-&gt;</span>
            </a>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
