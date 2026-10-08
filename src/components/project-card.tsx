import Link from "next/link";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { MediaFrame } from "@/components/project-media";

export function ProjectTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded border border-rule px-2 py-0.5 font-mono text-[0.72rem] text-muted"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

export function Terminal({ lines, className }: { lines: string[]; className?: string }) {
  return (
    <pre
      className={cn(
        "overflow-x-auto rounded-lg bg-background px-4 py-4 font-mono text-xs leading-[1.7] text-muted",
        className,
      )}
    >
      {lines.join("\n")}
    </pre>
  );
}

// Every card links to the project's own page. `featured` is the large
// home-page card; `withMedia` adds a thumbnail for the /projects grid.
export function ProjectCard({
  project,
  featured = false,
  withMedia = false,
}: {
  project: Project;
  featured?: boolean;
  withMedia?: boolean;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group grid content-start gap-2.5 rounded-[10px] bg-surface transition-transform hover:-translate-y-0.5",
        featured ? "p-8" : "p-6",
      )}
    >
      {withMedia ? (
        <MediaFrame
          media={project.media[0]}
          project={project}
          className="mb-2"
          sizes="(min-width: 640px) 20rem, 100vw"
        />
      ) : null}
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h3
          className={cn(
            "font-display leading-tight font-bold tracking-[-0.02em] transition-colors group-hover:text-accent",
            featured ? "text-[2rem]" : "text-2xl",
          )}
        >
          {project.name}
        </h3>
        <span className="font-mono text-xs whitespace-nowrap text-muted">{project.year}</span>
      </div>
      <p className="text-[1.05rem]">{project.summary}</p>
      <div className="mt-1">
        <ProjectTags tags={project.tags} />
      </div>
      {featured && project.terminal ? <Terminal lines={project.terminal} className="mt-3" /> : null}
    </Link>
  );
}
