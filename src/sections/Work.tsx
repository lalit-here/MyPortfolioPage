import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export function Work() {
  return (
    <section id="work" className="px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1200px]">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.45em] text-text-muted">Selected Builds</p>
        <h2 className="mt-5 font-heading text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.9] tracking-[-0.07em] text-text-main">
          Work
        </h2>

        <div className="mt-10 columns-1 gap-6 md:columns-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
