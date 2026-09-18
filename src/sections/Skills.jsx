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
  siMongodb,
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
  siVercel,
} from "simple-icons";

/**
 * @typedef {{ name: string, icon?: { path: string }, glow: string, scale?: number }} Skill
 * @typedef {{ id: string, title: string, exploring?: boolean, skills: Skill[] }} SkillCategory
 */

/** @type {SkillCategory[]} */
const skillCategories = [
  {
    id: "languages",
    title: "Languages",
    skills: [
      { name: "Python", icon: siPython, glow: "55 118 171", scale: 1 },
      { name: "Java", icon: siOpenjdk, glow: "234 45 46", scale: 1.04 },
      { name: "JavaScript", icon: siJavascript, glow: "247 223 30", scale: 0.94 },
      { name: "TypeScript", icon: siTypescript, glow: "49 120 198", scale: 0.94 },
      { name: "SQL", glow: "65 105 225", scale: 1 },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    skills: [
      { name: "React", icon: siReact, glow: "97 218 251", scale: 1.06 },
      { name: "Next.js", icon: siNextdotjs, glow: "240 253 244", scale: 1 },
      { name: "Tailwind CSS", icon: siTailwindcss, glow: "6 182 212", scale: 1 },
      { name: "HTML", icon: siHtml5, glow: "227 79 38", scale: 1 },
      { name: "CSS", icon: siCss, glow: "102 51 153", scale: 1 },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    skills: [
      { name: "Node.js", icon: siNodedotjs, glow: "51 153 51", scale: 1.04 },
      { name: "Express", icon: siExpress, glow: "240 253 244", scale: 1.06 },
      { name: "REST APIs", glow: "74 222 128", scale: 1 },
      { name: "PostgreSQL", icon: siPostgresql, glow: "65 105 225", scale: 1 },
      { name: "MongoDB", icon: siMongodb, glow: "71 162 72", scale: 1 },
    ],
  },
  {
    id: "data-ai",
    title: "Data & AI",
    skills: [
      { name: "Pandas", icon: siPandas, glow: "150 100 255", scale: 0.96 },
      { name: "NumPy", icon: siNumpy, glow: "77 171 207", scale: 1 },
      { name: "scikit-learn", icon: siScikitlearn, glow: "247 147 30", scale: 1 },
      { name: "TensorFlow", icon: siTensorflow, glow: "255 111 0", scale: 1 },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    skills: [
      { name: "Git", icon: siGit, glow: "240 80 50", scale: 1 },
      { name: "GitHub", icon: siGithub, glow: "240 253 244", scale: 1 },
      { name: "Docker", icon: siDocker, glow: "36 150 237", scale: 1.05 },
      { name: "Linux", icon: siLinux, glow: "252 198 36", scale: 1.02 },
      { name: "Postman", icon: siPostman, glow: "255 108 55", scale: 0.98 },
      { name: "Vercel", icon: siVercel, glow: "240 253 244", scale: 0.92 },
    ],
  },
  {
    id: "exploring",
    title: "Exploring",
    exploring: true,
    skills: [
      { name: "AWS", glow: "255 153 0", scale: 1 },
      { name: "Kubernetes", icon: siKubernetes, glow: "50 108 229", scale: 1 },
    ],
  },
];

const rowVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.035, duration: 0.32, ease: "easeOut" },
  }),
};

function NeutralLogo({ name }) {
  if (name === "AWS") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-full w-full">
        <path
          fill="currentColor"
          d="M4.2 14.8c1.9 1.1 4.4 1.7 7 1.7 2.3 0 4.6-.5 6.5-1.6.3-.2.5.1.4.3-2.1 1.8-5 2.8-8 2.8-3.2 0-6.1-1.1-8.2-3-.2-.2 0-.5.3-.4.7.1 1.3.2 2 .2zm13.6-1.4c.2-.2 0-.5-.4-.4-.8.2-1.7.3-2.6.3-3.5 0-6.6-1.5-8.4-3.7-.2-.2-.5 0-.3.2 1.7 2.8 5 4.6 8.8 4.6 1.1 0 2.1-.2 2.9-.4v-.6zM8.1 7.2h1.2l.9 2.7.9-2.7h1.2L10.5 12H9.3L8.1 7.2zm4.4 0H15c.7 0 1.2.2 1.5.5.3.3.5.7.5 1.2s-.2.9-.5 1.2c-.3.3-.8.5-1.4.5h-1.4V12H12.5V7.2zm1.2 1v1.6H15c.3 0 .5 0 .7-.2.1-.1.2-.3.2-.5s-.1-.4-.2-.5c-.2-.1-.4-.2-.7-.2h-1.3z"
        />
      </svg>
    );
  }

  if (name === "SQL") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-full w-full">
        <path
          fill="currentColor"
          d="M12 3c-3.9 0-7 1.1-7 2.5v13C5 19.9 8.1 21 12 21s7-1.1 7-2.5v-13C19 4.1 15.9 3 12 3zm0 1.5c3.3 0 5.5.9 5.5 1.5S15.3 7.5 12 7.5 6.5 6.6 6.5 6 8.7 4.5 12 4.5zM6.5 8.6c1.2.7 3.2 1.1 5.5 1.1s4.3-.4 5.5-1.1v2.3c0 .6-2.2 1.5-5.5 1.5S6.5 11.5 6.5 10.9V8.6zm0 4.5c1.2.7 3.2 1.1 5.5 1.1s4.3-.4 5.5-1.1v2.3c0 .6-2.2 1.5-5.5 1.5s-5.5-.9-5.5-1.5v-2.3zm0 4.5c1.2.7 3.2 1.1 5.5 1.1s4.3-.4 5.5-1.1v1.4c0 .6-2.2 1.5-5.5 1.5s-5.5-.9-5.5-1.5v-1.4z"
        />
      </svg>
    );
  }

  if (name === "REST APIs") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-full w-full">
        <path
          fill="currentColor"
          d="M7.5 8.5h2.2v7H7.5v-7zm4.1 0h2.1l2.1 7h-2.1l-.3-1.2H11.7L11.4 15.5H9.4l2.2-7zm.9 2.1-.6 2.5h1.3l-.7-2.5zM16.2 8.5H19c1.4 0 2.3.8 2.3 2.1 0 1-.5 1.7-1.4 2l1.6 2.9h-2.3l-1.4-2.6h-.6v2.6h-2v-7zm2 1.5h-.9v1.8h.9c.5 0 .8-.3.8-.9s-.3-.9-.8-.9z"
        />
      </svg>
    );
  }

  return <span className="block h-full w-full rounded-[1px] border border-current opacity-50" />;
}

function SkillLogo({ skill }) {
  const scale = skill.scale ?? 1;

  return (
    <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
      <span className="flex h-[18px] w-[18px] items-center justify-center" style={{ transform: `scale(${scale})` }}>
        {skill.icon ? (
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-full w-full">
            <path d={skill.icon.path} fill="currentColor" />
          </svg>
        ) : (
          <NeutralLogo name={skill.name} />
        )}
      </span>
    </span>
  );
}

function SkillItem({ skill, exploring = false }) {
  return (
    <li
      className={[
        "transition-opacity duration-[200ms] ease-out",
        "group-hover/skills:opacity-[0.42] group-focus-within/skills:opacity-[0.42]",
        "hover:!opacity-100 focus-within:!opacity-100",
        "motion-reduce:transition-none",
        exploring ? "opacity-[0.78]" : "opacity-100",
      ].join(" ")}
    >
      <button
        type="button"
        aria-label={exploring ? `${skill.name}, currently exploring` : skill.name}
        className="group/skill relative inline-flex items-center gap-2.5 bg-transparent py-1 pr-1 text-left outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-0.5 top-1/2 z-0 h-[14px] w-[14px] -translate-y-1/2 rounded-full opacity-0 blur-[9px] transition-opacity duration-[200ms] ease-out group-hover/skill:opacity-100 group-focus-visible/skill:opacity-100 motion-reduce:transition-none motion-reduce:group-hover/skill:opacity-0 motion-reduce:group-focus-visible/skill:opacity-40"
          style={{ backgroundColor: `rgb(${skill.glow} / 0.5)` }}
        />

        <span className="relative z-[1] text-text-muted transition-[color,transform,filter] duration-[200ms] ease-out group-hover/skill:scale-[1.04] group-hover/skill:text-text-main group-hover/skill:brightness-125 group-focus-visible/skill:scale-[1.04] group-focus-visible/skill:text-text-main group-focus-visible/skill:brightness-125 motion-reduce:transition-none motion-reduce:group-hover/skill:scale-100 motion-reduce:group-focus-visible/skill:scale-100">
          <SkillLogo skill={skill} />
        </span>

        <span className="relative z-[1] font-sans text-[15px] font-medium leading-none tracking-[-0.01em] text-text-main/82 transition-colors duration-[200ms] ease-out group-hover/skill:text-text-main group-focus-visible/skill:text-text-main motion-reduce:transition-none sm:text-[16px]">
          {skill.name}
        </span>
      </button>
    </li>
  );
}

function SkillCategoryRow({ category, index }) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={rowVariants}
      className="grid gap-3 md:grid-cols-[minmax(7.5rem,22%)_minmax(0,1fr)] md:items-start md:gap-x-8 lg:grid-cols-[minmax(8rem,20%)_minmax(0,1fr)] lg:gap-x-10"
    >
      <h3 className="pt-1 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-text-muted">
        {category.title}
      </h3>

      <ul className="group/skills flex flex-wrap items-center gap-x-5 gap-y-2.5 sm:gap-x-6 sm:gap-y-3">
        {category.skills.map((skill) => (
          <SkillItem key={skill.name} skill={skill} exploring={Boolean(category.exploring)} />
        ))}
      </ul>
    </motion.div>
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
      className="scroll-section border-t border-[rgba(255,255,255,0.06)] px-6 py-28 sm:px-10 lg:px-16"
    >
      <p
        aria-hidden="true"
        className="pointer-events-none absolute right-6 top-6 hidden font-mono text-[10px] uppercase tracking-[0.24em] text-text-muted/45 sm:right-10 sm:block lg:right-16"
      >
        02 / Skills
      </p>

      <div className="mx-auto max-w-[1200px]">
        <div className="max-w-2xl">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.45em] text-text-muted">My Stack</p>
          <h2 className="mt-5 font-heading text-[clamp(2.9rem,10vw,7.4rem)] font-bold leading-[0.88] tracking-[-0.07em] text-text-main">
            Skills
          </h2>
          <p className="mt-5 max-w-md font-sans text-base leading-7 text-text-muted">
            Technologies I use to build and experiment.
          </p>
        </div>

        <div className="mt-12 space-y-8 md:mt-14 md:space-y-9">
          {skillCategories.map((category, index) => (
            <SkillCategoryRow key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
