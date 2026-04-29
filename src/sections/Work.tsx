import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export function Work() {
  return (
    <section id="work" className="border-t border-[rgba(255,255,255,0.06)] px-6 py-28 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:items-end">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.45em] text-text-muted">Selected Builds</p>
            <h2 className="mt-5 font-heading text-[clamp(3.2rem,8.5vw,7.4rem)] font-bold leading-[0.88] tracking-[-0.07em] text-text-main">
              Work
            </h2>
          </div>
          <p className="max-w-md font-sans text-base leading-7 text-text-muted">
            Applied builds across AI systems, automation tooling, and frontend delivery with a focus on practical outcomes.
          </p>
        </div>

        <div className="mt-14 columns-1 gap-7 md:columns-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
