"use client";

import { motion } from "framer-motion";

const skills = [
  "Python",
  "Machine Learning",
  "Agentic AI",
  "LLMs",
  "Next.js",
  "Tailwind CSS",
  "Prompt Engineering",
  "RAG",
  "API Integration",
];

export function About() {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="px-6 py-24 sm:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-[1200px]">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.45em] text-text-muted">Profile</p>
        <h2 className="mt-5 font-heading text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.9] tracking-[-0.07em] text-text-main">
          About
        </h2>

        <p className="mt-12 max-w-4xl font-sans text-[clamp(1.125rem,2.1vw,1.5rem)] leading-9 text-text-main md:leading-10">
          I am still learning AI and machine learning, and I like being honest about that. Right now I am focused on
          building agentic AI systems that can take real tasks, break them down, and produce useful work instead of just
          impressive demos. I also have some frontend experience, which helps me turn experiments into interfaces people
          can actually use. I care most about making AI do practical heavy lifting, with clear outputs and fewer black
          boxes.
        </p>

        <div className="mt-10 flex max-w-5xl flex-wrap gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="border border-accent bg-transparent px-3 py-2 font-mono text-xs uppercase tracking-[0.16em] text-accent"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
