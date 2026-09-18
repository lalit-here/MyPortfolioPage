"use client";

import { motion } from "framer-motion";
import {
  siC,
  siDjango,
  siDocker,
  siDotnet,
  siExpress,
  siFlask,
  siGit,
  siGithub,
  siJavascript,
  siMongodb,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siOpenjdk,
  siPostgresql,
  siPython,
  siReact,
  siSupabase,
  siTailwindcss,
  siVercel,
} from "simple-icons";

const skillMeta = {
  Python: {
    icon: siPython,
    glow: "radial-gradient(ellipse 90% 80% at 18% 50%, rgba(55, 118, 171, 0.22) 0%, rgba(255, 212, 59, 0.1) 38%, transparent 72%)",
  },
  Java: {
    icon: siOpenjdk,
    glow: "radial-gradient(ellipse 90% 80% at 18% 50%, rgba(234, 45, 46, 0.18) 0%, transparent 70%)",
  },
  C: {
    icon: siC,
    glow: "radial-gradient(ellipse 90% 80% at 18% 50%, rgba(168, 185, 204, 0.16) 0%, transparent 70%)",
  },
  JavaScript: {
    icon: siJavascript,
    glow: "radial-gradient(ellipse 90% 80% at 18% 50%, rgba(247, 223, 30, 0.16) 0%, transparent 70%)",
  },
  "C#": {
    icon: siDotnet,
    glow: "radial-gradient(ellipse 90% 80% at 18% 50%, rgba(81, 43, 212, 0.18) 0%, transparent 70%)",
  },
  "React.js": {
    icon: siReact,
    glow: "radial-gradient(ellipse 90% 80% at 18% 50%, rgba(97, 218, 251, 0.18) 0%, transparent 70%)",
  },
  "Next.js": {
    icon: siNextdotjs,
    glow: "radial-gradient(ellipse 90% 80% at 18% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 70%)",
  },
  "React Native": {
    icon: siReact,
    glow: "radial-gradient(ellipse 90% 80% at 18% 50%, rgba(97, 218, 251, 0.16) 0%, transparent 70%)",
  },
  "Tailwind CSS": {
    icon: siTailwindcss,
    glow: "radial-gradient(ellipse 90% 80% at 18% 50%, rgba(6, 182, 212, 0.18) 0%, transparent 70%)",
  },
  "Node.js": {
    icon: siNodedotjs,
    glow: "radial-gradient(ellipse 90% 80% at 18% 50%, rgba(51, 153, 51, 0.18) 0%, transparent 70%)",
  },
  "Express.js": {
    icon: siExpress,
    glow: "radial-gradient(ellipse 90% 80% at 18% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 70%)",
  },
  Django: {
    icon: siDjango,
    glow: "radial-gradient(ellipse 90% 80% at 18% 50%, rgba(9, 46, 32, 0.35) 0%, rgba(74, 222, 128, 0.1) 45%, transparent 72%)",
  },
  Flask: {
    icon: siFlask,
    glow: "radial-gradient(ellipse 90% 80% at 18% 50%, rgba(59, 171, 195, 0.14) 0%, transparent 70%)",
  },
  PostgreSQL: {
    icon: siPostgresql,
    glow: "radial-gradient(ellipse 90% 80% at 18% 50%, rgba(65, 105, 225, 0.18) 0%, transparent 70%)",
  },
  MySQL: {
    icon: siMysql,
    glow: "radial-gradient(ellipse 90% 80% at 18% 50%, rgba(68, 121, 161, 0.18) 0%, transparent 70%)",
  },
  MongoDB: {
    icon: siMongodb,
    glow: "radial-gradient(ellipse 90% 80% at 18% 50%, rgba(71, 162, 72, 0.18) 0%, transparent 70%)",
  },
  Supabase: {
    icon: siSupabase,
    glow: "radial-gradient(ellipse 90% 80% at 18% 50%, rgba(63, 207, 142, 0.16) 0%, transparent 70%)",
  },
  "Prompt Engineering": {
    glow: "radial-gradient(ellipse 90% 80% at 18% 50%, rgba(250, 204, 21, 0.12) 0%, transparent 70%)",
  },
  "LLM Workflows": {
    glow: "radial-gradient(ellipse 90% 80% at 18% 50%, rgba(74, 222, 128, 0.12) 0%, transparent 70%)",
  },
  "RAG Pipelines": {
    glow: "radial-gradient(ellipse 90% 80% at 18% 50%, rgba(56, 189, 248, 0.14) 0%, transparent 70%)",
  },
  "Git/GitHub": {
    icon: siGit,
    secondaryIcon: siGithub,
    glow: "radial-gradient(ellipse 90% 80% at 18% 50%, rgba(240, 80, 50, 0.16) 0%, rgba(255, 255, 255, 0.06) 42%, transparent 72%)",
  },
  Vercel: {
    icon: siVercel,
    glow: "radial-gradient(ellipse 90% 80% at 18% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 70%)",
  },
  Docker: {
    icon: siDocker,
    glow: "radial-gradient(ellipse 90% 80% at 18% 50%, rgba(36, 150, 237, 0.18) 0%, transparent 70%)",
  },
};

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

function SkillMark({ icon }) {
  if (!icon) {
    return (
      <span
        aria-hidden="true"
        className="inline-block h-3.5 w-3.5 shrink-0 rounded-[2px] border border-current opacity-70"
      />
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5 shrink-0"
    >
      <path d={icon.path} fill="currentColor" />
    </svg>
  );
}

function SkillItem({ name, level }) {
  const meta = skillMeta[name] ?? {
    glow: "radial-gradient(ellipse 90% 80% at 18% 50%, rgba(74, 222, 128, 0.1) 0%, transparent 70%)",
  };

  return (
    <li className="group relative isolate">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-2 -inset-y-1.5 z-0 opacity-0 transition-opacity duration-[250ms] ease-in-out group-hover:opacity-100 motion-reduce:transition-none"
        style={{ background: meta.glow }}
      />
      <div className="relative z-[1] flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.16em] text-text-main">
        <span className="inline-flex min-w-0 items-center gap-2.5">
          <span className="inline-flex items-center gap-1 text-text-muted transition-[color,transform,filter] duration-[250ms] ease-out group-hover:scale-[1.04] group-hover:text-[#f7fef9] group-hover:brightness-125 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
            <SkillMark icon={meta.icon} />
            {meta.secondaryIcon ? <SkillMark icon={meta.secondaryIcon} /> : null}
          </span>
          <span className="truncate transition-colors duration-[250ms] ease-out group-hover:text-[#f7fef9] motion-reduce:transition-none">
            {name}
          </span>
        </span>
        <span className="shrink-0 text-text-muted transition-colors duration-[250ms] ease-out group-hover:text-text-main/80 motion-reduce:transition-none">
          {level}/5
        </span>
      </div>
      <div className="relative z-[1] mt-2 h-[4px] w-full overflow-hidden bg-[rgba(240,253,244,0.08)]">
        <motion.div
          custom={level}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={barVariants}
          className="h-full bg-primary shadow-[0_0_12px_rgba(74,222,128,0.45)]"
        />
      </div>
    </li>
  );
}

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
                  <SkillItem key={item.name} name={item.name} level={item.level} />
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
