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
 * @typedef {'primary' | 'secondary'} SkillWeight
 * @typedef {{
 *   name: string,
 *   icon?: { path: string },
 *   customIcon?: 'java' | 'aws' | 'sql' | 'rest',
 *   glow: string,
 *   scale?: number,
 *   weight?: SkillWeight,
 * }} Skill
 * @typedef {{ id: string, title: string, exploring?: boolean, skills: Skill[] }} SkillCategory
 */

/** Classic Java coffee-cup mark — Simple Icons only ships OpenJDK. */
const JAVA_CUP_PATH =
  "M8.2 3.2h7.1c.4 2.1.2 4.1-.5 5.9-.5 1.3-1.3 2.4-2.4 3.2-.4.3-.9.5-1.4.6v1.4c2.9.3 5.1 1.5 5.1 3.1 0 1.8-2.8 3.2-6.3 3.2S3.5 19.2 3.5 17.4c0-1.6 2.1-2.8 4.9-3.1V13c-.5-.1-1-.3-1.4-.6-1.1-.8-1.9-1.9-2.4-3.2-.7-1.8-.9-3.8-.5-5.9h4.1zm.9 1.5H6.3c-.2 1.5 0 2.9.5 4.1.4 1 1 1.8 1.7 2.3.3.2.6.3.9.3s.6-.1.9-.3c.7-.5 1.3-1.3 1.7-2.3.5-1.2.7-2.6.5-4.1H9.1zm7.6 1.1h1.3c1.4 0 2.5 1.1 2.5 2.5S19.4 10.8 18 10.8h-.8c.1-.8.1-1.7 0-2.5h.4c.6 0 1.1-.5 1.1-1.1s-.5-1.1-1.1-1.1h-.9zm-5.2 10.4c-2.7 0-4.5.8-4.5 1.5s1.8 1.5 4.5 1.5 4.5-.8 4.5-1.5-1.8-1.5-4.5-1.5z";

/** @type {SkillCategory[]} */
const skillCategories = [
  {
    id: "languages",
    title: "Languages",
    skills: [
      { name: "Python", icon: siPython, glow: "55 118 171", weight: "primary", scale: 1 },
      { name: "Java", customIcon: "java", glow: "234 45 46", weight: "secondary", scale: 1.02 },
      { name: "JavaScript", icon: siJavascript, glow: "247 223 30", weight: "primary", scale: 0.94 },
      { name: "TypeScript", icon: siTypescript, glow: "49 120 198", weight: "secondary", scale: 0.94 },
      { name: "SQL", customIcon: "sql", glow: "65 105 225", weight: "secondary", scale: 1 },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    skills: [
      { name: "React", icon: siReact, glow: "97 218 251", weight: "primary", scale: 1.06 },
      { name: "Next.js", icon: siNextdotjs, glow: "240 253 244", weight: "secondary", scale: 1 },
      { name: "Tailwind CSS", icon: siTailwindcss, glow: "6 182 212", weight: "secondary", scale: 1 },
      { name: "HTML", icon: siHtml5, glow: "227 79 38", weight: "secondary", scale: 1 },
      { name: "CSS", icon: siCss, glow: "102 51 153", weight: "secondary", scale: 1 },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    skills: [
      { name: "Node.js", icon: siNodedotjs, glow: "51 153 51", weight: "primary", scale: 1.04 },
      { name: "Express", icon: siExpress, glow: "240 253 244", weight: "secondary", scale: 1.06 },
      { name: "REST APIs", customIcon: "rest", glow: "74 222 128", weight: "secondary", scale: 1 },
      { name: "PostgreSQL", icon: siPostgresql, glow: "65 105 225", weight: "secondary", scale: 1 },
      { name: "MongoDB", icon: siMongodb, glow: "71 162 72", weight: "secondary", scale: 1 },
    ],
  },
  {
    id: "data-ai",
    title: "Data & AI",
    skills: [
      { name: "Pandas", icon: siPandas, glow: "150 100 255", weight: "secondary", scale: 0.98 },
      { name: "NumPy", icon: siNumpy, glow: "77 171 207", weight: "secondary", scale: 1.02 },
      { name: "scikit-learn", icon: siScikitlearn, glow: "247 147 30", weight: "secondary", scale: 1.06 },
      { name: "TensorFlow", icon: siTensorflow, glow: "255 111 0", weight: "secondary", scale: 1.02 },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    skills: [
      { name: "Git", icon: siGit, glow: "240 80 50", weight: "primary", scale: 1 },
      { name: "GitHub", icon: siGithub, glow: "240 253 244", weight: "secondary", scale: 1 },
      { name: "Docker", icon: siDocker, glow: "36 150 237", weight: "secondary", scale: 1.06 },
      { name: "Linux", icon: siLinux, glow: "252 198 36", weight: "secondary", scale: 1.08 },
      { name: "Postman", icon: siPostman, glow: "255 108 55", weight: "secondary", scale: 1 },
      { name: "Vercel", icon: siVercel, glow: "240 253 244", weight: "secondary", scale: 0.94 },
    ],
  },
  {
    id: "exploring",
    title: "Exploring",
    exploring: true,
    skills: [
      { name: "AWS", customIcon: "aws", glow: "255 153 0", weight: "secondary", scale: 1.08 },
      { name: "Kubernetes", icon: siKubernetes, glow: "50 108 229", weight: "secondary", scale: 1.04 },
    ],
  },
];

const rowVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.04, duration: 0.34, ease: "easeOut" },
  }),
};

function CustomLogo({ type }) {
  if (type === "java") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-full w-full">
        <path fill="currentColor" d={JAVA_CUP_PATH} />
      </svg>
    );
  }

  if (type === "aws") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-full w-full">
        <path
          fill="currentColor"
          d="M4.2 14.8c1.9 1.1 4.4 1.7 7 1.7 2.3 0 4.6-.5 6.5-1.6.3-.2.5.1.4.3-2.1 1.8-5 2.8-8 2.8-3.2 0-6.1-1.1-8.2-3-.2-.2 0-.5.3-.4.7.1 1.3.2 2 .2zm13.6-1.4c.2-.2 0-.5-.4-.4-.8.2-1.7.3-2.6.3-3.5 0-6.6-1.5-8.4-3.7-.2-.2-.5 0-.3.2 1.7 2.8 5 4.6 8.8 4.6 1.1 0 2.1-.2 2.9-.4v-.6zM8.1 7.2h1.2l.9 2.7.9-2.7h1.2L10.5 12H9.3L8.1 7.2zm4.4 0H15c.7 0 1.2.2 1.5.5.3.3.5.7.5 1.2s-.2.9-.5 1.2c-.3.3-.8.5-1.4.5h-1.4V12H12.5V7.2zm1.2 1v1.6H15c.3 0 .5 0 .7-.2.1-.1.2-.3.2-.5s-.1-.4-.2-.5c-.2-.1-.4-.2-.7-.2h-1.3z"
        />
      </svg>
    );
  }

  if (type === "sql") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-full w-full">
        <path
          fill="currentColor"
          d="M12 3c-3.9 0-7 1.1-7 2.5v13C5 19.9 8.1 21 12 21s7-1.1 7-2.5v-13C19 4.1 15.9 3 12 3zm0 1.5c3.3 0 5.5.9 5.5 1.5S15.3 7.5 12 7.5 6.5 6.6 6.5 6 8.7 4.5 12 4.5zM6.5 8.6c1.2.7 3.2 1.1 5.5 1.1s4.3-.4 5.5-1.1v2.3c0 .6-2.2 1.5-5.5 1.5S6.5 11.5 6.5 10.9V8.6zm0 4.5c1.2.7 3.2 1.1 5.5 1.1s4.3-.4 5.5-1.1v2.3c0 .6-2.2 1.5-5.5 1.5s-5.5-.9-5.5-1.5v-2.3zm0 4.5c1.2.7 3.2 1.1 5.5 1.1s4.3-.4 5.5-1.1v1.4c0 .6-2.2 1.5-5.5 1.5s-5.5-.9-5.5-1.5v-1.4z"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-full w-full">
      <path
        fill="currentColor"
        d="M7.5 8.5h2.2v7H7.5v-7zm4.1 0h2.1l2.1 7h-2.1l-.3-1.2H11.7L11.4 15.5H9.4l2.2-7zm.9 2.1-.6 2.5h1.3l-.7-2.5zM16.2 8.5H19c1.4 0 2.3.8 2.3 2.1 0 1-.5 1.7-1.4 2l1.6 2.9h-2.3l-1.4-2.6h-.6v2.6h-2v-7zm2 1.5h-.9v1.8h.9c.5 0 .8-.3.8-.9s-.3-.9-.8-.9z"
      />
    </svg>
  );
}

function SkillLogo({ skill, sizeClass }) {
  const scale = skill.scale ?? 1;

  return (
    <span className={`relative flex shrink-0 items-center justify-center ${sizeClass}`}>
      <span className="flex h-[85%] w-[85%] items-center justify-center" style={{ transform: `scale(${scale})` }}>
        {skill.icon ? (
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-full w-full">
            <path d={skill.icon.path} fill="currentColor" />
          </svg>
        ) : (
          <CustomLogo type={skill.customIcon ?? "rest"} />
        )}
      </span>
    </span>
  );
}

function SkillItem({ skill, note, exploring = false }) {
  const isPrimary = skill.weight === "primary" && !exploring;
  const logoSize = isPrimary ? "h-6 w-6" : "h-5 w-5 sm:h-[22px] sm:w-[22px]";
  const baseOpacity = exploring ? "opacity-[0.68]" : isPrimary ? "opacity-100" : "opacity-[0.78]";

  return (
    <li
      className={[
        "min-w-0 transition-opacity duration-[200ms] ease-out",
        "group-hover/skills:opacity-[0.4] group-focus-within/skills:opacity-[0.4]",
        "hover:!opacity-100 focus-within:!opacity-100",
        "motion-reduce:transition-none",
        baseOpacity,
      ].join(" ")}
    >
      <button
        type="button"
        aria-label={exploring ? `${skill.name}, exploring` : `${skill.name}, ${note}`}
        className="group/skill relative inline-flex max-w-full items-start gap-3 bg-transparent py-1 text-left outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1 top-[11px] z-0 h-4 w-4 -translate-y-1/2 rounded-full opacity-0 blur-[10px] transition-opacity duration-[200ms] ease-out group-hover/skill:opacity-100 group-focus-visible/skill:opacity-100 motion-reduce:transition-none motion-reduce:group-hover/skill:opacity-0 motion-reduce:group-focus-visible/skill:opacity-35"
          style={{ backgroundColor: `rgb(${skill.glow} / 0.48)` }}
        />

        <span className="relative z-[1] mt-0.5 text-text-muted transition-[color,transform,filter] duration-[200ms] ease-out group-hover/skill:scale-[1.04] group-hover/skill:text-text-main group-hover/skill:brightness-125 group-focus-visible/skill:scale-[1.04] group-focus-visible/skill:text-text-main group-focus-visible/skill:brightness-125 motion-reduce:transition-none motion-reduce:group-hover/skill:scale-100 motion-reduce:group-focus-visible/skill:scale-100">
          <SkillLogo skill={skill} sizeClass={logoSize} />
        </span>

        <span className="relative z-[1] flex min-w-0 flex-col items-start">
          <span
            className={[
              "font-sans font-medium leading-none tracking-[-0.01em] transition-colors duration-[200ms] ease-out",
              "group-hover/skill:text-text-main group-focus-visible/skill:text-text-main motion-reduce:transition-none",
              isPrimary ? "text-[15px] text-text-main/92 sm:text-[16px]" : "text-[15px] text-text-main/75 sm:text-[15px]",
            ].join(" ")}
          >
            {skill.name}
          </span>
          <span className="mt-1.5 max-h-0 overflow-hidden font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted/0 transition-[max-height,color,opacity] duration-[200ms] ease-out group-hover/skill:max-h-5 group-hover/skill:text-text-muted/70 group-focus-visible/skill:max-h-5 group-focus-visible/skill:text-text-muted/70 motion-reduce:transition-none">
            {note}
          </span>
        </span>
      </button>
    </li>
  );
}

function SkillCategoryRow({ category, index }) {
  const note = category.exploring ? "Exploring" : category.title;

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={rowVariants}
      className="grid gap-4 md:grid-cols-[minmax(7.5rem,18%)_minmax(0,1fr)] md:items-start md:gap-x-10 lg:gap-x-14"
    >
      <h3 className="pt-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-text-muted/80">
        {category.title}
      </h3>

      <ul className="group/skills grid max-w-[42rem] grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-6">
        {category.skills.map((skill) => (
          <SkillItem
            key={skill.name}
            skill={skill}
            note={note}
            exploring={Boolean(category.exploring)}
          />
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
        <div className="max-w-xl">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.45em] text-text-muted">My Stack</p>
          <h2 className="mt-5 font-heading text-[clamp(2.9rem,10vw,7.4rem)] font-bold leading-[0.88] tracking-[-0.07em] text-text-main">
            Skills
          </h2>
          <p className="mt-5 font-sans text-base leading-7 text-text-muted">
            Technologies I use to build and experiment.
          </p>
        </div>

        <div className="mt-14 space-y-11 md:mt-16 md:space-y-14">
          {skillCategories.map((category, index) => (
            <SkillCategoryRow key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
