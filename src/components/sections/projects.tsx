import Link from "next/link";
import { projectsContent } from "@/lib/content";
import { homeProjects, projects } from "@/lib/projects";
import { Row, RowTitle } from "@/components/ui/row";
import { ProjectCard } from "@/components/project-card";

export function Projects() {
  const [featured, ...rest] = homeProjects;

  return (
    <Row id="projects" rail="Projects">
      <RowTitle>{projectsContent.title}</RowTitle>
      <div className="grid gap-5">
        {featured ? <ProjectCard project={featured} featured /> : null}
        {rest.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2">
            {rest.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : null}
      </div>
      <Link
        href="/projects"
        className="mt-6 inline-flex font-mono text-sm font-medium text-accent hover:underline"
      >
        {projectsContent.allLabel} ({projects.length}) →
      </Link>
    </Row>
  );
}
