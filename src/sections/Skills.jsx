const skillGroups = [
  {
    title: "Languages",
    items: [
      { name: "Python", level: 5 },
      { name: "TypeScript", level: 4 },
      { name: "JavaScript", level: 4 },
      { name: "SQL", level: 3 },
    ],
  },
  {
    title: "Frameworks",
    items: [
      { name: "Next.js", level: 4 },
      { name: "React", level: 4 },
      { name: "Tailwind CSS", level: 4 },
      { name: "FastAPI", level: 3 },
    ],
  },
  {
    title: "Databases",
    items: [
      { name: "PostgreSQL", level: 3 },
      { name: "Supabase", level: 3 },
      { name: "Vector DBs", level: 3 },
      { name: "Redis", level: 2 },
    ],
  },
  {
    title: "AI/ML",
    items: [
      { name: "LLM Workflows", level: 5 },
      { name: "RAG Pipelines", level: 4 },
      { name: "Prompt Engineering", level: 4 },
      { name: "Model Evaluation", level: 3 },
    ],
  },
  {
    title: "Tools",
    items: [
      { name: "Git/GitHub", level: 4 },
      { name: "Playwright", level: 4 },
      { name: "Vercel", level: 3 },
      { name: "Docker", level: 2 },
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="border-t border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.015)] px-6 py-28 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:items-end">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.45em] text-text-muted">Capabilities</p>
            <h2 className="mt-5 font-heading text-[clamp(3.2rem,8.5vw,7.4rem)] font-bold leading-[0.88] tracking-[-0.07em] text-text-main">
              Skills
            </h2>
          </div>
          <p className="max-w-md font-sans text-base leading-7 text-text-muted">
            Technical stack organized by role to keep strengths scannable in under a minute.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group) => (
            <article key={group.title} className="border border-[rgba(240,253,244,0.08)] bg-[rgba(0,0,0,0.3)] p-6">
              <h3 className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-accent">{group.title}</h3>
              <ul className="mt-5 space-y-4">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.16em] text-text-main">
                      <span>{item.name}</span>
                      <span className="text-text-muted">{item.level}/5</span>
                    </div>
                    <div className="mt-2 h-[4px] w-full bg-[rgba(240,253,244,0.08)]">
                      <div className="h-full bg-primary" style={{ width: `${(item.level / 5) * 100}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
