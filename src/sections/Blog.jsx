"use client";

import { motion } from "framer-motion";

const articles = [
  {
    title: "Vibe coding is a tool, not a shortcut. Most people are using it wrong.",
    description:
      "A practical take on where AI-assisted coding helps, where it falls apart, and why judgment still matters more than the prompt.",
    tags: ["Vibe Coding", "AI", "Productivity", "Career"],
    readTime: "DEV article",
    href: "https://dev.to/lalit-here/vibe-coding-is-a-tool-not-a-shortcut-most-people-are-using-it-wrong-2gkn",
  },
];

export function Blog() {
  return (
    <motion.section
      id="blog"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="border-t border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.015)] px-6 py-28 sm:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:items-end">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.45em] text-text-muted">Writing</p>
            <h2 className="mt-5 font-heading text-[clamp(2.6rem,7vw,5.8rem)] font-bold leading-[0.9] tracking-[-0.06em] text-text-main">
              Blog
            </h2>
          </div>
          <p className="max-w-md font-sans text-base leading-7 text-text-muted">
            Notes on AI-assisted development, practical engineering judgment, and learning in public.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <a
              key={article.title}
              href={article.href}
              target="_blank"
              rel="noreferrer"
              className="group block border border-[rgba(240,253,244,0.08)] bg-[rgba(0,0,0,0.28)] p-6 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-[0_0_20px_rgba(74,222,128,0.15)]"
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted">{article.readTime}</p>
              <h3 className="mt-3 font-heading text-[clamp(1.35rem,2.6vw,2rem)] font-bold leading-tight text-text-main transition-colors group-hover:text-primary">
                {article.title}
              </h3>
              <p className="mt-4 font-sans text-base leading-7 text-text-muted">{article.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-accent px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-accent"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
