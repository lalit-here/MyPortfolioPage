const education = {
  degree: "B.S. Computer Science",
  institution: "Jawaharlal Nehru Technological University",
  duration: "2022 - 2026",
};

export function Education() {
  return (
    <section id="education" className="border-t border-[rgba(255,255,255,0.06)] px-6 py-28 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:items-end">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.45em] text-text-muted">Academics</p>
            <h2 className="mt-5 font-heading text-[clamp(3.2rem,8.5vw,7.4rem)] font-bold leading-[0.88] tracking-[-0.07em] text-text-main">
              Education
            </h2>
          </div>
          <p className="max-w-md font-sans text-base leading-7 text-text-muted">
            Core CS foundation supporting backend systems, distributed workflows, and AI implementation.
          </p>
        </div>

        <article className="mt-14 max-w-4xl border border-[rgba(240,253,244,0.08)] bg-[rgba(255,255,255,0.015)] p-7 md:p-8">
          <h3 className="font-heading text-[clamp(1.4rem,3vw,2.1rem)] font-bold leading-tight text-text-main">
            {education.degree}
          </h3>
          <p className="mt-4 font-sans text-lg text-text-main">{education.institution}</p>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-text-muted">{education.duration}</p>
        </article>
      </div>
    </section>
  );
}
