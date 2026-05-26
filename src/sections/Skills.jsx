"use client";

import { motion } from "framer-motion";

const skillGroups = [
  {
    title: "Languages",
    items: [
      { name: "Python", level: 5 },
      { name: "Java", level: 4 },
      { name: "C", level: 4 },
      { name: "JavaScript", level: 3 },
      { name: "C#", level: 2 },
    ],
  },
  {
    title: "Frontend & Apps",
    items: [
      { name: "React.js", level: 4 },
      { name: "Next.js", level: 3 },
      { name: "React Native", level: 2 },
      { name: "Tailwind CSS", level: 2 },
    ],
  },
  {
    title: "Backend & APIs",
    items: [
      { name: "Node.js", level: 4 },
      { name: "Express.js", level: 3 },
      { name: "Django", level: 2 },
      { name: "Flask", level: 2 },
    ],
  },
  {
    title: "Databases",
    items: [
      { name: "PostgreSQL", level: 3 },
      { name: "MySQL", level: 4 },
      { name: "MongoDB", level: 3 },
      { name: "Supabase", level: 3 },
    ],
  },
  {
    title: "AI/LLM",
    items: [
      { name: "Prompt Engineering", level: 4 },
      { name: "LLM Workflows", level: 4 },
      { name: "RAG Pipelines", level: 3 },
    ],
  },
  {
    title: "Tools & Deployment",
    items: [
      { name: "Git/GitHub", level: 4 },
      { name: "Vercel", level: 3 },
      { name: "Docker", level: 1 },
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.05, duration: 0.38, ease: "easeOut" },
  }),
};

const barVariants = {
  hidden: { width: 0 },
  visible: (level) => ({
    width: `${(level / 5) * 100}%`,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function Skills() {
  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="scroll-section border-t border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.015)] px-6 py-28 sm:px-10 lg:px-16"
    >
      <p
        aria-hidden="true"
        className="pointer-events-none absolute right-6 top-6 hidden font-mono text-[10px] uppercase tracking-[0.24em] text-text-muted/45 sm:right-10 sm:block lg:right-16"
      >
        02 / Skills
      </p>
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.45em] text-text-muted">Capabilities</p>
            <h2 className="mt-5 font-heading text-[clamp(2.9rem,10vw,7.4rem)] font-bold leading-[0.88] tracking-[-0.07em] text-text-main">
              Skills
            </h2>
          </div>
          <p className="max-w-md font-sans text-base leading-7 text-text-muted">
            Current technical stack, rated honestly by comfort and hands-on usage.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group, index) => (
            <motion.article
              key={group.title}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={cardVariants}
              className="border border-[rgba(240,253,244,0.08)] bg-[rgba(0,0,0,0.3)] p-6 transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-[0_10px_24px_rgba(74,222,128,0.12)]"
            >
              <h3 className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-accent">{group.title}</h3>
              <ul className="mt-5 space-y-4">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <div className="flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.16em] text-text-main">
                      <span>{item.name}</span>
                      <span className="text-text-muted">{item.level}/5</span>
                    </div>
                    <div className="mt-2 h-[4px] w-full overflow-hidden bg-[rgba(240,253,244,0.08)]">
                      <motion.div
                        custom={item.level}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.6 }}
                        variants={barVariants}
                        className="h-full bg-primary shadow-[0_0_12px_rgba(74,222,128,0.45)]"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
