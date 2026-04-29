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
      className="px-6 py-24 sm:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-[1200px]">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.45em] text-text-muted">Contact</p>
        <h2 className="mt-5 max-w-5xl bg-[linear-gradient(90deg,#4ade80_0%,#facc15_100%)] bg-clip-text font-heading text-[clamp(4rem,10vw,9rem)] font-bold leading-[0.9] tracking-[-0.08em] text-transparent">
          Let&apos;s build something.
        </h2>

        <p className="mt-8 max-w-2xl font-mono text-[clamp(1rem,1.6vw,1.125rem)] leading-8 text-text-muted">
          Send a note if you want to talk AI systems, frontend builds, or useful experiments.
        </p>

        <div className="mt-12 flex flex-col gap-5 font-mono text-sm uppercase tracking-[0.2em] text-text-main sm:flex-row sm:flex-wrap sm:gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group inline-flex w-fit items-center gap-3 transition-colors duration-200 hover:text-primary"
            >
              <span>{link.label}</span>
              <span className="text-text-muted">/ {link.value}</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">-&gt;</span>
            </a>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
