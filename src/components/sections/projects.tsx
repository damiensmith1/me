import type { ReactNode } from "react";
import { projectsContent, type Project } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Row, RowTitle } from "@/components/ui/row";

function ProjectCard({ project, featured }: { project: Project; featured?: boolean }) {
  const body: ReactNode = (
    <>
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h3
          className={cn(
            "font-display leading-tight font-bold tracking-[-0.02em]",
            featured ? "text-[2rem]" : "text-2xl",
          )}
        >
          {project.name}
        </h3>
        {project.href ? (
          <span className="font-mono text-xs font-medium whitespace-nowrap text-accent">
            View ↗
          </span>
        ) : null}
      </div>
      <p className="text-[1.05rem]">{project.description}</p>
      <div className="mt-1 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded border border-rule px-2 py-0.5 font-mono text-[0.72rem] text-muted"
          >
            {tag}
          </span>
        ))}
      </div>
      {project.terminal ? (
        <pre className="mt-3 overflow-x-auto rounded-lg bg-background px-4 py-4 font-mono text-xs leading-[1.7] text-muted">
          {project.terminal.join("\n")}
        </pre>
      ) : null}
    </>
  );

  const classes = cn(
    "grid gap-2.5 rounded-[10px] bg-surface",
    featured ? "p-8" : "p-6",
    project.href && "transition-transform hover:-translate-y-0.5",
  );

  return project.href ? (
    <a href={project.href} target="_blank" rel="noopener noreferrer" className={classes}>
      {body}
    </a>
  ) : (
    <div className={classes}>{body}</div>
  );
}

export function Projects() {
  const [featured, ...rest] = projectsContent.items;

  return (
    <Row id="projects" rail="Projects">
      <RowTitle>{projectsContent.title}</RowTitle>
      <div className="grid gap-5">
        {featured ? <ProjectCard project={featured} featured /> : null}
        {rest.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2">
            {rest.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        ) : null}
      </div>
    </Row>
  );
}
