"use client";

import { motion } from "framer-motion";

const education = [
  {
    level: "University",
    institution: "Manipal Institute of Technology, Bengaluru",
    credential: "Bachelor of Technology (B.Tech)",
    focus: "Information Technology",
    duration: "August 2024 - July 2028",
    result: "In progress",
    location: "Bengaluru, Karnataka",
  },
  {
    level: "Class XII",
    institution: "Aspire Junior College",
    credential: "TSBIE",
    focus: "MPC",
    duration: "Completed 2024",
    result: "84.5%",
    location: "Hyderabad, Telangana",
  },
  {
    level: "Class X",
    institution: "Sloka the Hyderabad Waldorf School",
    credential: "CBSE",
    focus: "Secondary School",
    duration: "Completed 2022",
    result: "87.5%",
    location: "Hyderabad, Telangana",
  },
];

export function Education() {
  return (
    <motion.section
      id="education"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="border-t border-[rgba(255,255,255,0.06)] px-6 py-28 sm:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:items-end">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.45em] text-text-muted">Academics</p>
            <h2 className="mt-5 font-heading text-[clamp(2.6rem,7vw,5.8rem)] font-bold leading-[0.9] tracking-[-0.06em] text-text-main">
              Education
            </h2>
          </div>
          <p className="max-w-md font-sans text-base leading-7 text-text-muted">
            Academic path across information technology, mathematics, physics, and computing fundamentals.
          </p>
        </div>

        <div className="mt-14 grid gap-5">
          {education.map((entry) => (
            <article
              key={`${entry.level}-${entry.institution}`}
              className="border border-[rgba(240,253,244,0.08)] bg-[rgba(255,255,255,0.015)] p-7 md:p-8"
            >
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-start">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-accent">{entry.level}</p>
                  <h3 className="mt-3 font-heading text-[clamp(1.4rem,3vw,2.1rem)] font-bold leading-tight text-text-main">
                    {entry.credential}
                  </h3>
                  <p className="mt-4 font-sans text-lg text-text-main">{entry.institution}</p>
                  <p className="mt-2 font-sans text-base leading-7 text-text-muted">{entry.focus}</p>
                </div>

                <div className="space-y-3 font-mono text-xs uppercase tracking-[0.16em] text-text-muted lg:text-right">
                  <p>{entry.duration}</p>
                  <p>{entry.location}</p>
                  <p className="text-primary">{entry.result}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
