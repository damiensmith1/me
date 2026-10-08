import type { Metadata } from "next";
import { projectsContent } from "@/lib/content";
import { projectGroups, projects } from "@/lib/projects";
import { Row } from "@/components/ui/row";
import { ProjectCard } from "@/components/project-card";

export const metadata: Metadata = {
  title: projectsContent.pageTitle,
  description: projectsContent.pageIntro,
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const groups = projectGroups
    .map((group) => ({
      ...group,
      items: projects.filter((p) => p.group === group.id),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <>
      <Row rail={`${projects.length} projects`} className="md:pt-22 md:pb-14">
        <h1 className="mb-5 font-display text-[clamp(2.6rem,7vw,4.5rem)] leading-[0.95] font-bold tracking-[-0.04em]">
          {projectsContent.pageTitle}
        </h1>
        <p className="max-w-[34rem] text-[1.3rem] leading-[1.45] text-pretty">
          {projectsContent.pageIntro}
        </p>
      </Row>

      {groups.map((group, i) => (
        <Row
          key={group.id}
          id={group.id}
          last={i === groups.length - 1}
          rail={
            <>
              <span className="block">{group.label}</span>
              <span className="mt-2 block tracking-normal normal-case">{group.blurb}</span>
            </>
          }
        >
          <div className="grid gap-5 sm:grid-cols-2">
            {group.items.map((project) => (
              <ProjectCard key={project.slug} project={project} withMedia />
            ))}
          </div>
        </Row>
      ))}
    </>
  );
}
