"use client";

import { useCallback, useRef, useState } from "react";
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
  siReact,
  siScikitlearn,
  siTailwindcss,
  siTensorflow,
  siTypescript,
  siVercel,
} from "simple-icons";

/**
 * @typedef {{
 *   name: string,
 *   icon?: { path: string, hex?: string },
 *   customIcon?: 'java' | 'aws' | 'sql' | 'rest' | 'python' | 'linux',
 *   brandColor: string,
 *   logoColor?: string,
 *   mono?: boolean,
 *   scale?: number,
 * }} Skill
 * @typedef {{ id: string, title: string, exploring?: boolean, skills: Skill[] }} SkillCategory
 */

/** Classic Java coffee-cup mark — Simple Icons only ships OpenJDK. */
const JAVA_CUP_PATH =
  "M8.2 3.2h7.1c.4 2.1.2 4.1-.5 5.9-.5 1.3-1.3 2.4-2.4 3.2-.4.3-.9.5-1.4.6v1.4c2.9.3 5.1 1.5 5.1 3.1 0 1.8-2.8 3.2-6.3 3.2S3.5 19.2 3.5 17.4c0-1.6 2.1-2.8 4.9-3.1V13c-.5-.1-1-.3-1.4-.6-1.1-.8-1.9-1.9-2.4-3.2-.7-1.8-.9-3.8-.5-5.9h4.1zm.9 1.5H6.3c-.2 1.5 0 2.9.5 4.1.4 1 1 1.8 1.7 2.3.3.2.6.3.9.3s.6-.1.9-.3c.7-.5 1.3-1.3 1.7-2.3.5-1.2.7-2.6.5-4.1H9.1zm7.6 1.1h1.3c1.4 0 2.5 1.1 2.5 2.5S19.4 10.8 18 10.8h-.8c.1-.8.1-1.7 0-2.5h.4c.6 0 1.1-.5 1.1-1.1s-.5-1.1-1.1-1.1h-.9zm-5.2 10.4c-2.7 0-4.5.8-4.5 1.5s1.8 1.5 4.5 1.5 4.5-.8 4.5-1.5-1.8-1.5-4.5-1.5z";

function hexToRgbChannels(hex) {
  const clean = hex.replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const n = Number.parseInt(full, 16);
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
}

/** Official dark brand fills (e.g. Pandas, NumPy) need a lift on this dark UI. */
function isLowLuminanceHex(hex) {
  if (!hex || hex === "currentColor") return false;
  const clean = hex.replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const n = Number.parseInt(full, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return 0.299 * r + 0.587 * g + 0.114 * b < 55;
}

/** Keep hue, lift luminance so local hover glow reads on dark backgrounds. */
function glowChannelsFromHex(hex) {
  const [r, g, b] = hexToRgbChannels(hex).split(" ").map(Number);
  if (0.299 * r + 0.587 * g + 0.114 * b >= 55) return `${r} ${g} ${b}`;
  return `${Math.round(r + (255 - r) * 0.48)} ${Math.round(g + (255 - g) * 0.48)} ${Math.round(b + (255 - b) * 0.48)}`;
}

/** @type {SkillCategory[]} */
const skillCategories = [
  {
    id: "languages",
    title: "Languages",
    skills: [
      { name: "Python", customIcon: "python", brandColor: hexToRgbChannels("3776AB"), scale: 1 },
      { name: "Java", customIcon: "java", logoColor: "#EA2D2E", brandColor: hexToRgbChannels("EA2D2E"), scale: 1.02 },
      { name: "JavaScript", icon: siJavascript, logoColor: `#${siJavascript.hex}`, brandColor: hexToRgbChannels(siJavascript.hex), scale: 0.94 },
      { name: "TypeScript", icon: siTypescript, logoColor: `#${siTypescript.hex}`, brandColor: hexToRgbChannels(siTypescript.hex), scale: 0.94 },
      { name: "SQL", customIcon: "sql", logoColor: "#94A3B8", brandColor: hexToRgbChannels("94A3B8"), scale: 1 },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    skills: [
      { name: "React", icon: siReact, logoColor: `#${siReact.hex}`, brandColor: hexToRgbChannels(siReact.hex), scale: 1.06 },
      { name: "Next.js", icon: siNextdotjs, mono: true, brandColor: "240 253 244", scale: 1 },
      { name: "Tailwind CSS", icon: siTailwindcss, logoColor: `#${siTailwindcss.hex}`, brandColor: hexToRgbChannels(siTailwindcss.hex), scale: 1 },
      { name: "HTML", icon: siHtml5, logoColor: `#${siHtml5.hex}`, brandColor: hexToRgbChannels(siHtml5.hex), scale: 1 },
      { name: "CSS", icon: siCss, logoColor: `#${siCss.hex}`, brandColor: hexToRgbChannels(siCss.hex), scale: 1 },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    skills: [
      { name: "Node.js", icon: siNodedotjs, logoColor: `#${siNodedotjs.hex}`, brandColor: hexToRgbChannels(siNodedotjs.hex), scale: 1.04 },
      { name: "Express", icon: siExpress, mono: true, brandColor: "240 253 244", scale: 1.06 },
      { name: "REST APIs", customIcon: "rest", logoColor: "#94A3B8", brandColor: hexToRgbChannels("94A3B8"), scale: 1 },
      { name: "PostgreSQL", icon: siPostgresql, logoColor: `#${siPostgresql.hex}`, brandColor: hexToRgbChannels(siPostgresql.hex), scale: 1 },
      { name: "MongoDB", icon: siMongodb, logoColor: `#${siMongodb.hex}`, brandColor: hexToRgbChannels(siMongodb.hex), scale: 1 },
    ],
  },
  {
    id: "data-ai",
    title: "Data & AI",
    skills: [
      { name: "Pandas", icon: siPandas, logoColor: `#${siPandas.hex}`, brandColor: glowChannelsFromHex(siPandas.hex), scale: 0.98 },
      { name: "NumPy", icon: siNumpy, logoColor: `#${siNumpy.hex}`, brandColor: glowChannelsFromHex(siNumpy.hex), scale: 1.02 },
      { name: "scikit-learn", icon: siScikitlearn, logoColor: `#${siScikitlearn.hex}`, brandColor: hexToRgbChannels(siScikitlearn.hex), scale: 1.06 },
      { name: "TensorFlow", icon: siTensorflow, logoColor: `#${siTensorflow.hex}`, brandColor: hexToRgbChannels(siTensorflow.hex), scale: 1.02 },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    skills: [
      { name: "Git", icon: siGit, logoColor: `#${siGit.hex}`, brandColor: hexToRgbChannels(siGit.hex), scale: 1 },
      { name: "GitHub", icon: siGithub, mono: true, brandColor: "240 253 244", scale: 1 },
      { name: "Docker", icon: siDocker, logoColor: `#${siDocker.hex}`, brandColor: hexToRgbChannels(siDocker.hex), scale: 1.06 },
      { name: "Linux", customIcon: "linux", brandColor: hexToRgbChannels(siLinux.hex), scale: 1.08 },
      { name: "Postman", icon: siPostman, logoColor: `#${siPostman.hex}`, brandColor: hexToRgbChannels(siPostman.hex), scale: 1 },
      { name: "Vercel", icon: siVercel, mono: true, brandColor: "240 253 244", scale: 0.94 },
    ],
  },
  {
    id: "exploring",
    title: "Currently Exploring",
    exploring: true,
    skills: [
      { name: "AWS", customIcon: "aws", logoColor: "#FF9900", brandColor: hexToRgbChannels("FF9900"), scale: 1.08 },
      { name: "Kubernetes", icon: siKubernetes, logoColor: `#${siKubernetes.hex}`, brandColor: hexToRgbChannels(siKubernetes.hex), scale: 1.04 },
    ],
  },
];

const categoryVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.035, duration: 0.32, ease: "easeOut" },
  }),
};

function CustomLogo({ type, fill }) {
  if (type === "python") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-full w-full">
        <path
          fill="#3776AB"
          d="M11.914.048c-5.73 0-5.37 2.486-5.37 2.486l.006 2.576h5.464v.772H3.652S.046 5.518.046 11.958c0 6.44 3.546 6.216 3.546 6.216h2.118v-2.988s-.114-3.546 3.49-3.546h6.006s3.376.056 3.376-3.264V3.63S18.91.048 11.914.048zm-3.12 1.774a1.06 1.06 0 1 1 0 2.122 1.06 1.06 0 0 1 0-2.122z"
        />
        <path
          fill="#FFD43B"
          d="M12.087 23.952c5.73 0 5.37-2.486 5.37-2.486l-.006-2.576h-5.464v-.772h8.362s3.606.364 3.606-6.076c0-6.44-3.546-6.216-3.546-6.216h-2.118v2.988s.114 3.546-3.49 3.546H8.795s-3.376-.056-3.376 3.264v5.35s-.328 3.378 6.668 3.378zm3.12-1.774a1.06 1.06 0 1 1 0-2.122 1.06 1.06 0 0 1 0 2.122z"
        />
      </svg>
    );
  }

  if (type === "linux") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-full w-full">
        <path fill="#FCC624" d={siLinux.path} />
      </svg>
    );
  }

  if (type === "java") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-full w-full">
        <path fill={fill ?? "#EA2D2E"} d={JAVA_CUP_PATH} />
      </svg>
    );
  }

  if (type === "aws") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-full w-full">
        <path
          fill={fill ?? "#FF9900"}
          d="M4.2 14.8c1.9 1.1 4.4 1.7 7 1.7 2.3 0 4.6-.5 6.5-1.6.3-.2.5.1.4.3-2.1 1.8-5 2.8-8 2.8-3.2 0-6.1-1.1-8.2-3-.2-.2 0-.5.3-.4.7.1 1.3.2 2 .2zm13.6-1.4c.2-.2 0-.5-.4-.4-.8.2-1.7.3-2.6.3-3.5 0-6.6-1.5-8.4-3.7-.2-.2-.5 0-.3.2 1.7 2.8 5 4.6 8.8 4.6 1.1 0 2.1-.2 2.9-.4v-.6zM8.1 7.2h1.2l.9 2.7.9-2.7h1.2L10.5 12H9.3L8.1 7.2zm4.4 0H15c.7 0 1.2.2 1.5.5.3.3.5.7.5 1.2s-.2.9-.5 1.2c-.3.3-.8.5-1.4.5h-1.4V12H12.5V7.2zm1.2 1v1.6H15c.3 0 .5 0 .7-.2.1-.1.2-.3.2-.5s-.1-.4-.2-.5c-.2-.1-.4-.2-.7-.2h-1.3z"
        />
      </svg>
    );
  }

  if (type === "sql") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-full w-full">
        <path
          fill={fill ?? "#94A3B8"}
          d="M12 3c-3.9 0-7 1.1-7 2.5v13C5 19.9 8.1 21 12 21s7-1.1 7-2.5v-13C19 4.1 15.9 3 12 3zm0 1.5c3.3 0 5.5.9 5.5 1.5S15.3 7.5 12 7.5 6.5 6.6 6.5 6 8.7 4.5 12 4.5zM6.5 8.6c1.2.7 3.2 1.1 5.5 1.1s4.3-.4 5.5-1.1v2.3c0 .6-2.2 1.5-5.5 1.5S6.5 11.5 6.5 10.9V8.6zm0 4.5c1.2.7 3.2 1.1 5.5 1.1s4.3-.4 5.5-1.1v2.3c0 .6-2.2 1.5-5.5 1.5s-5.5-.9-5.5-1.5v-2.3zm0 4.5c1.2.7 3.2 1.1 5.5 1.1s4.3-.4 5.5-1.1v1.4c0 .6-2.2 1.5-5.5 1.5s-5.5-.9-5.5-1.5v-1.4z"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-full w-full">
      <path
        fill={fill ?? "#94A3B8"}
        d="M7.5 8.5h2.2v7H7.5v-7zm4.1 0h2.1l2.1 7h-2.1l-.3-1.2H11.7L11.4 15.5H9.4l2.2-7zm.9 2.1-.6 2.5h1.3l-.7-2.5zM16.2 8.5H19c1.4 0 2.3.8 2.3 2.1 0 1-.5 1.7-1.4 2l1.6 2.9h-2.3l-1.4-2.6h-.6v2.6h-2v-7zm2 1.5h-.9v1.8h.9c.5 0 .8-.3.8-.9s-.3-.9-.8-.9z"
      />
    </svg>
  );
}

function SkillLogo({ skill }) {
  const scale = skill.scale ?? 1;
  const fill = skill.mono ? "currentColor" : skill.logoColor ?? `#${skill.icon?.hex ?? "94A3B8"}`;

  return (
    <span className="relative flex h-6 w-6 shrink-0 items-center justify-center">
      <span className="flex h-[22px] w-[22px] items-center justify-center" style={{ transform: `scale(${scale})` }}>
        {skill.customIcon ? (
          <CustomLogo type={skill.customIcon} fill={fill} />
        ) : (
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-full w-full">
            <path d={skill.icon.path} fill={fill} />
          </svg>
        )}
      </span>
    </span>
  );
}

function SkillItem({ skill, exploring = false }) {
  const buttonRef = useRef(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, active: false });

  const updateSpotlight = useCallback((event) => {
    const el = buttonRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setSpotlight({ x, y, active: true });
  }, []);

  const clearSpotlight = useCallback(() => {
    setSpotlight((prev) => ({ ...prev, active: false }));
  }, []);

  const defaultLogoOpacity = exploring ? "opacity-[0.58]" : "opacity-[0.72]";
  const liftDark = !skill.mono && isLowLuminanceHex(skill.logoColor);

  return (
    <li>
      <button
        ref={buttonRef}
        type="button"
        aria-label={skill.name}
        onMouseMove={updateSpotlight}
        onMouseEnter={updateSpotlight}
        onMouseLeave={clearSpotlight}
        onBlur={clearSpotlight}
        className={[
          "group/skill relative inline-flex items-center gap-2.5 rounded-sm bg-transparent",
          "px-2.5 py-2.5 text-left outline-none",
          "transition-[transform] duration-[220ms] ease-out",
          "hover:-translate-y-px focus-visible:-translate-y-px",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent/60",
          "motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:focus-visible:translate-y-0",
        ].join(" ")}
      >
        <span
          aria-hidden="true"
          className={[
            "pointer-events-none absolute left-3.5 top-1/2 z-0 h-4 w-4 -translate-y-1/2 rounded-full",
            "opacity-0 blur-[12px] transition-opacity duration-[220ms] ease-out",
            "group-hover/skill:opacity-100 group-focus-visible/skill:opacity-100",
            "motion-reduce:hidden",
          ].join(" ")}
          style={{ backgroundColor: `rgb(${skill.brandColor} / 0.34)` }}
        />

        <span
          aria-hidden="true"
          className={[
            "pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-[220ms] ease-out",
            "group-hover/skill:opacity-100 group-focus-visible/skill:opacity-100",
            "motion-reduce:hidden",
          ].join(" ")}
          style={{
            background: spotlight.active
              ? `radial-gradient(circle 28px at ${spotlight.x}% ${spotlight.y}%, rgb(${skill.brandColor} / 0.1), transparent 72%)`
              : undefined,
          }}
        />

        <span
          className={[
            "relative z-[1] transition-[opacity,transform,filter] duration-[220ms] ease-out",
            defaultLogoOpacity,
            skill.mono ? "text-text-main/85" : "",
            liftDark ? "brightness-[1.75]" : "",
            "group-hover/skill:opacity-100 group-hover/skill:scale-[1.04]",
            liftDark ? "group-hover/skill:brightness-[2.05] group-focus-visible/skill:brightness-[2.05]" : "group-hover/skill:brightness-110 group-focus-visible/skill:brightness-110",
            "group-focus-visible/skill:opacity-100 group-focus-visible/skill:scale-[1.04]",
            "motion-reduce:transition-none motion-reduce:group-hover/skill:scale-100 motion-reduce:group-focus-visible/skill:scale-100",
          ].join(" ")}
        >
          <SkillLogo skill={skill} />
        </span>

        <span
          className={[
            "relative z-[1] font-sans text-[15px] font-medium leading-none tracking-[-0.01em] text-text-main/78",
            "transition-colors duration-[220ms] ease-out",
            "group-hover/skill:text-text-main group-focus-visible/skill:text-text-main",
            "motion-reduce:transition-none",
          ].join(" ")}
        >
          {skill.name}
        </span>
      </button>
    </li>
  );
}

function SkillCategoryBlock({ category, index }) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={categoryVariants}
    >
      <h3 className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-text-muted/70">
        {category.title}
      </h3>

      <ul className="mt-3.5 flex flex-wrap gap-x-1 gap-y-1 sm:gap-x-2 sm:gap-y-1.5">
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
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="mx-auto w-full max-w-[min(100%,56rem)] lg:max-w-[min(100%,62rem)]">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.45em] text-text-muted">My Stack</p>
            <h2 className="mt-5 font-heading text-[clamp(2.9rem,10vw,7.4rem)] font-bold leading-[0.88] tracking-[-0.07em] text-text-main">
              Skills
            </h2>
            <p className="mt-5 max-w-xl font-sans text-base leading-7 text-text-muted">
              Technologies I use to build and experiment.
            </p>
          </div>

          <div className="mt-12 space-y-9 sm:mt-14 sm:space-y-10">
            {skillCategories.map((category, index) => (
              <SkillCategoryBlock key={category.id} category={category} index={index} />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
