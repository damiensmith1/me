import type { Metadata } from "next";
import { projectsContent } from "@/lib/content";
import { projects } from "@/lib/projects";
import { Row } from "@/components/ui/row";
import { ProjectCard } from "@/components/project-card";

export const metadata: Metadata = {
  title: projectsContent.pageTitle,
  description: projectsContent.pageIntro,
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <Row rail={`${projects.length} projects`} className="md:pt-22" last>
      <h1 className="mb-5 font-display text-[clamp(2.6rem,7vw,4.5rem)] leading-[0.95] font-bold tracking-[-0.04em]">
        {projectsContent.pageTitle}
      </h1>
      <p className="mb-10 max-w-[34rem] text-[1.3rem] leading-[1.45] text-pretty">
        {projectsContent.pageIntro}
      </p>
      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} withMedia />
        ))}
      </div>
    </Row>
  );
}
