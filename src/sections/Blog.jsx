const articles = [
  {
    title: "Designing Practical RAG Pipelines for Real Tasks",
    description: "A lean workflow for chunking, retrieval checks, and grounded answers that stay useful in production.",
    tags: ["AI/ML", "RAG", "Systems"],
    readTime: "6 min read",
    href: "#",
  },
  {
    title: "Building Agentic Backends With Review Checkpoints",
    description: "How to chain multi-step AI actions safely with explicit checkpoints and inspectable outputs.",
    tags: ["Backend", "Agents", "Reliability"],
    readTime: "8 min read",
    href: "#",
  },
  {
    title: "From Prompt Demos to Stable Product Flows",
    description: "Techniques for turning one-off prompt experiments into repeatable, user-facing systems.",
    tags: ["AI/ML", "Product", "Architecture"],
    readTime: "5 min read",
    href: "#",
  },
  {
    title: "Scraping Pipelines That Survive Messy Web Data",
    description: "Rate limits, retries, and extraction logs for scraping systems that stay deterministic under load.",
    tags: ["Backend", "Data", "Automation"],
    readTime: "7 min read",
    href: "#",
  },
];

export function Blog() {
  return (
    <section id="blog" className="border-t border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.015)] px-6 py-28 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:items-end">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.45em] text-text-muted">Writing</p>
            <h2 className="mt-5 font-heading text-[clamp(3.2rem,8.5vw,7.4rem)] font-bold leading-[0.88] tracking-[-0.07em] text-text-main">
              Blog
            </h2>
          </div>
          <p className="max-w-md font-sans text-base leading-7 text-text-muted">
            Articles on practical AI implementation, backend reliability, and system design trade-offs.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <a
              key={article.title}
              href={article.href}
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
    </section>
  );
}
