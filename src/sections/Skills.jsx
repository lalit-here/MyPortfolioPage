"use client";

import { motion } from "framer-motion";
import {
  siCss,
  siDocker,
  siExpress,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siKubernetes,
  siLinux,
  siNextdotjs,
  siNodedotjs,
  siNumpy,
  siOpenjdk,
  siPandas,
  siPostgresql,
  siPostman,
  siPython,
  siReact,
  siScikitlearn,
  siTailwindcss,
  siTensorflow,
  siTypescript,
} from "simple-icons";

const skillMeta = {
  Python: {
    icon: siPython,
    glow: "radial-gradient(circle at 35% 50%, rgba(55, 118, 171, 0.22) 0%, rgba(255, 212, 59, 0.1) 42%, transparent 72%)",
  },
  Java: {
    icon: siOpenjdk,
    glow: "radial-gradient(circle at 35% 50%, rgba(234, 45, 46, 0.18) 0%, transparent 70%)",
  },
  JavaScript: {
    icon: siJavascript,
    glow: "radial-gradient(circle at 35% 50%, rgba(247, 223, 30, 0.16) 0%, transparent 70%)",
  },
  TypeScript: {
    icon: siTypescript,
    glow: "radial-gradient(circle at 35% 50%, rgba(49, 120, 198, 0.2) 0%, transparent 70%)",
  },
  React: {
    icon: siReact,
    glow: "radial-gradient(circle at 35% 50%, rgba(97, 218, 251, 0.18) 0%, transparent 70%)",
  },
  "Next.js": {
    icon: siNextdotjs,
    glow: "radial-gradient(circle at 35% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 70%)",
  },
  "Tailwind CSS": {
    icon: siTailwindcss,
    glow: "radial-gradient(circle at 35% 50%, rgba(6, 182, 212, 0.18) 0%, transparent 70%)",
  },
  HTML: {
    icon: siHtml5,
    glow: "radial-gradient(circle at 35% 50%, rgba(227, 79, 38, 0.18) 0%, transparent 70%)",
  },
  CSS: {
    icon: siCss,
    glow: "radial-gradient(circle at 35% 50%, rgba(102, 51, 153, 0.18) 0%, transparent 70%)",
  },
  "Node.js": {
    icon: siNodedotjs,
    glow: "radial-gradient(circle at 35% 50%, rgba(51, 153, 51, 0.18) 0%, transparent 70%)",
  },
  Express: {
    icon: siExpress,
    glow: "radial-gradient(circle at 35% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 70%)",
  },
  "REST APIs": {
    glow: "radial-gradient(circle at 35% 50%, rgba(74, 222, 128, 0.12) 0%, transparent 70%)",
  },
  PostgreSQL: {
    icon: siPostgresql,
    glow: "radial-gradient(circle at 35% 50%, rgba(65, 105, 225, 0.18) 0%, transparent 70%)",
  },
  Pandas: {
    icon: siPandas,
    glow: "radial-gradient(circle at 35% 50%, rgba(21, 4, 88, 0.28) 0%, rgba(150, 100, 255, 0.1) 45%, transparent 72%)",
  },
  NumPy: {
    icon: siNumpy,
    glow: "radial-gradient(circle at 35% 50%, rgba(1, 50, 67, 0.28) 0%, rgba(77, 171, 207, 0.12) 45%, transparent 72%)",
  },
  "scikit-learn": {
    icon: siScikitlearn,
    glow: "radial-gradient(circle at 35% 50%, rgba(247, 147, 30, 0.16) 0%, transparent 70%)",
  },
  TensorFlow: {
    icon: siTensorflow,
    glow: "radial-gradient(circle at 35% 50%, rgba(255, 111, 0, 0.16) 0%, transparent 70%)",
  },
  Git: {
    icon: siGit,
    glow: "radial-gradient(circle at 35% 50%, rgba(240, 80, 50, 0.16) 0%, transparent 70%)",
  },
  GitHub: {
    icon: siGithub,
    glow: "radial-gradient(circle at 35% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 70%)",
  },
  Docker: {
    icon: siDocker,
    glow: "radial-gradient(circle at 35% 50%, rgba(36, 150, 237, 0.18) 0%, transparent 70%)",
  },
  Linux: {
    icon: siLinux,
    glow: "radial-gradient(circle at 35% 50%, rgba(252, 198, 36, 0.14) 0%, transparent 70%)",
  },
  Postman: {
    icon: siPostman,
    glow: "radial-gradient(circle at 35% 50%, rgba(255, 108, 55, 0.16) 0%, transparent 70%)",
  },
  AWS: {
    glow: "radial-gradient(circle at 35% 50%, rgba(255, 153, 0, 0.16) 0%, transparent 70%)",
  },
  Kubernetes: {
    icon: siKubernetes,
    glow: "radial-gradient(circle at 35% 50%, rgba(50, 108, 229, 0.18) 0%, transparent 70%)",
  },
};

const skillGroups = [
  {
    title: "Languages",
    items: ["Python", "Java", "JavaScript", "TypeScript"],
  },
  {
    title: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "HTML", "CSS"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express", "REST APIs", "PostgreSQL"],
  },
  {
    title: "Data & AI",
    items: ["Pandas", "NumPy", "scikit-learn", "TensorFlow"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "Docker", "Linux", "Postman"],
  },
  {
    title: "Currently Exploring",
    items: ["AWS", "Kubernetes"],
  },
];

const groupVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.05, duration: 0.38, ease: "easeOut" },
  }),
};

function SkillMark({ icon, name }) {
  if (!icon) {
    if (name === "AWS") {
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 shrink-0">
          <path
            fill="currentColor"
            d="M6.4 10.2h1.5l1.3 3.3 1.3-3.3h1.5l-2.1 5.1H8.5L6.4 10.2zm6.3 0h3.6c.9 0 1.5.2 1.9.6.4.4.6.9.6 1.5 0 .5-.1.9-.4 1.2-.2.3-.6.5-1 .7l1.6 2.1h-1.7l-1.4-1.9h-1.7v1.9h-1.5V10.2zm1.5 1.2v1.7h1.7c.3 0 .6-.1.8-.2.2-.2.3-.4.3-.7 0-.3-.1-.5-.3-.7-.2-.1-.5-.2-.8-.2h-1.7zM3.2 16.8c2.1 1.2 4.8 1.9 7.6 1.9 2.5 0 5-.6 7.1-1.8.3-.2.6.1.4.4-2.3 2-5.4 3.1-8.7 3.1-3.5 0-6.7-1.2-8.9-3.3-.2-.2 0-.5.3-.4.7.2 1.5.4 2.2.5z"
          />
        </svg>
      );
    }

    return (
      <span
        aria-hidden="true"
        className="inline-block h-3.5 w-3.5 shrink-0 rounded-[2px] border border-current opacity-70"
      />
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 shrink-0">
      <path d={icon.path} fill="currentColor" />
    </svg>
  );
}

function SkillItem({ name }) {
  const meta = skillMeta[name] ?? {
    glow: "radial-gradient(circle at 35% 50%, rgba(74, 222, 128, 0.1) 0%, transparent 70%)",
  };

  return (
    <li className="group relative isolate">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-3 -inset-y-2 z-0 rounded-sm opacity-0 transition-opacity duration-[250ms] ease-in-out group-hover:opacity-100 motion-reduce:transition-none"
        style={{ background: meta.glow }}
      />
      <div className="relative z-[1] inline-flex items-center gap-2.5 px-0.5 py-1 font-mono text-sm tracking-[0.02em] text-text-main/90">
        <span className="inline-flex text-text-muted transition-[color,transform,filter] duration-[250ms] ease-out group-hover:scale-[1.04] group-hover:text-[#f7fef9] group-hover:brightness-125 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
          <SkillMark icon={meta.icon} name={name} />
        </span>
        <span className="transition-colors duration-[250ms] ease-out group-hover:text-[#f7fef9] motion-reduce:transition-none">
          {name}
        </span>
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
            Tools and languages I use day to day, plus a few I am actively exploring.
          </p>
        </div>

        <div className="mt-14 space-y-10">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.title}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={groupVariants}
            >
              <h3 className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-text-main">
                {group.title}
              </h3>
              <ul className="mt-4 flex flex-wrap items-center gap-x-7 gap-y-3">
                {group.items.map((name) => (
                  <SkillItem key={name} name={name} />
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
