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

/** Brand glow as RGB triples for tightly localized ambient light. */
const skillMeta = {
  Python: { icon: siPython, glow: "55 118 171", scale: 1 },
  Java: { icon: siOpenjdk, glow: "234 45 46", scale: 1.05 },
  JavaScript: { icon: siJavascript, glow: "247 223 30", scale: 0.94 },
  TypeScript: { icon: siTypescript, glow: "49 120 198", scale: 0.94 },
  SQL: { glow: "65 105 225", scale: 1 },
  React: { icon: siReact, glow: "97 218 251", scale: 1.08 },
  "Next.js": { icon: siNextdotjs, glow: "240 253 244", scale: 1 },
  "Tailwind CSS": { icon: siTailwindcss, glow: "6 182 212", scale: 1.02 },
  HTML: { icon: siHtml5, glow: "227 79 38", scale: 1 },
  CSS: { icon: siCss, glow: "102 51 153", scale: 1 },
  "Node.js": { icon: siNodedotjs, glow: "51 153 51", scale: 1.05 },
  Express: { icon: siExpress, glow: "240 253 244", scale: 1.08 },
  "REST APIs": { glow: "74 222 128", scale: 1 },
  PostgreSQL: { icon: siPostgresql, glow: "65 105 225", scale: 1.02 },
  MongoDB: { icon: siMongodb, glow: "71 162 72", scale: 1.02 },
  Pandas: { icon: siPandas, glow: "150 100 255", scale: 0.96 },
  NumPy: { icon: siNumpy, glow: "77 171 207", scale: 1 },
  "scikit-learn": { icon: siScikitlearn, glow: "247 147 30", scale: 1 },
  TensorFlow: { icon: siTensorflow, glow: "255 111 0", scale: 1 },
  Git: { icon: siGit, glow: "240 80 50", scale: 1 },
  GitHub: { icon: siGithub, glow: "240 253 244", scale: 1 },
  Docker: { icon: siDocker, glow: "36 150 237", scale: 1.06 },
  Linux: { icon: siLinux, glow: "252 198 36", scale: 1.04 },
  Postman: { icon: siPostman, glow: "255 108 55", scale: 0.98 },
  Vercel: { icon: siVercel, glow: "240 253 244", scale: 0.92 },
  AWS: { glow: "255 153 0", scale: 1 },
  Kubernetes: { icon: siKubernetes, glow: "50 108 229", scale: 1 },
};

const skillGroups = [
  {
    title: "Languages",
    items: ["Python", "Java", "JavaScript", "TypeScript", "SQL"],
  },
  {
    title: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "HTML", "CSS"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express", "REST APIs", "PostgreSQL", "MongoDB"],
  },
  {
    title: "Data & AI",
    items: ["Pandas", "NumPy", "scikit-learn", "TensorFlow"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "Docker", "Linux", "Postman", "Vercel"],
  },
  {
    title: "Currently Exploring",
    exploring: true,
    items: ["AWS", "Kubernetes"],
  },
];

const groupVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.04, duration: 0.34, ease: "easeOut" },
  }),
};

function NeutralMark({ name }) {
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

  return (
    <span className="block h-full w-full rounded-[2px] border border-current opacity-60" />
  );
}

function SkillMark({ icon, name, scale = 1 }) {
  return (
    <span className="relative flex h-[18px] w-[18px] shrink-0 items-center justify-center">
      <span
        className="flex h-[16px] w-[16px] items-center justify-center"
        style={{ transform: `scale(${scale})` }}
      >
        {icon ? (
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-full w-full">
            <path d={icon.path} fill="currentColor" />
          </svg>
        ) : (
          <NeutralMark name={name} />
        )}
      </span>
    </span>
  );
}

function SkillItem({ name, exploring = false }) {
  const meta = skillMeta[name] ?? { glow: "74 222 128", scale: 1 };
  const glow = meta.glow;

  return (
    <li>
      <button
        type="button"
        tabIndex={0}
        aria-label={exploring ? `${name}, currently exploring` : name}
        className={[
          "group relative inline-flex items-center gap-2.5 bg-transparent p-1 text-left",
          "outline-none transition-[color,opacity] duration-[220ms] ease-out",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
          exploring ? "opacity-[0.72] hover:opacity-100 focus-visible:opacity-100" : "opacity-100",
        ].join(" ")}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-[3px] top-1/2 z-0 h-4 w-4 -translate-y-1/2 rounded-full opacity-0 blur-[10px] transition-opacity duration-[220ms] ease-out group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
          style={{ backgroundColor: `rgb(${glow} / 0.55)` }}
        />
        <span
          className={[
            "relative z-[1] text-text-muted/80",
            "transition-[color,transform,filter,opacity] duration-[220ms] ease-out",
            "group-hover:scale-[1.04] group-hover:text-text-main group-hover:brightness-125",
            "group-focus-visible:scale-[1.04] group-focus-visible:text-text-main group-focus-visible:brightness-125",
            "motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-focus-visible:scale-100",
          ].join(" ")}
        >
          <SkillMark icon={meta.icon} name={name} scale={meta.scale} />
        </span>
        <span
          className={[
            "relative z-[1] font-sans text-[0.9375rem] font-medium leading-none tracking-normal text-text-main/78",
            "transition-colors duration-[220ms] ease-out",
            "group-hover:text-text-main group-focus-visible:text-text-main",
            "motion-reduce:transition-none",
          ].join(" ")}
        >
          {name}
        </span>
      </button>
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
      className="scroll-section border-t border-[rgba(255,255,255,0.06)] px-6 py-28 sm:px-10 lg:px-16"
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
            <p className="font-mono text-xs font-bold uppercase tracking-[0.45em] text-text-muted">My Stack</p>
            <h2 className="mt-5 font-heading text-[clamp(2.9rem,10vw,7.4rem)] font-bold leading-[0.88] tracking-[-0.07em] text-text-main">
              Skills
            </h2>
          </div>
          <p className="max-w-md font-sans text-base leading-7 text-text-muted">
            Technologies I use to build and ship — organized by how they show up in my work.
          </p>
        </div>

        <div className="mt-12 space-y-7 md:mt-14 md:space-y-8">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.title}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={groupVariants}
              className={
                index === 0
                  ? ""
                  : "border-t border-[rgba(240,253,244,0.05)] pt-7 md:pt-8"
              }
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.26em] text-accent">
                  {group.title}
                </h3>
                {group.exploring ? (
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted/70">
                    Learning in progress
                  </span>
                ) : null}
              </div>

              <ul className="mt-3.5 flex flex-wrap items-center gap-x-5 gap-y-2.5 sm:gap-x-6">
                {group.items.map((name) => (
                  <SkillItem key={name} name={name} exploring={Boolean(group.exploring)} />
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
