"use client";

import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01, y: -4 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.2, delay: index * 0.1 }}
      className="mb-6 break-inside-avoid border border-[rgba(240,253,244,0.08)] bg-background p-6 transition-[border-color,box-shadow,transform] duration-200 hover:border-primary hover:shadow-[0_12px_34px_rgba(74,222,128,0.16)]"
    >
      <div className="flex items-start justify-between gap-6">
        <h3 className="font-heading text-[clamp(1.5rem,2.4vw,2rem)] font-bold leading-tight tracking-[-0.04em] text-text-main">
          {project.title}
        </h3>
        <span className="shrink-0 font-mono text-xs text-text-muted">{project.year}</span>
      </div>

      <p className="mt-5 font-mono text-[clamp(0.875rem,1.1vw,0.95rem)] leading-7 text-text-muted">
        {project.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="border border-primary px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-primary"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-8 flex gap-5 font-mono text-xs uppercase tracking-[0.2em] text-text-main">
        <a href={project.github} className="transition-colors duration-200 hover:text-primary">
          GitHub -&gt;
        </a>
        <a href={project.live} className="transition-colors duration-200 hover:text-primary">
          Live -&gt;
        </a>
      </div>
    </motion.article>
  );
}
