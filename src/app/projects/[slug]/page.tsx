import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/projects";
import { Row, RowTitle } from "@/components/ui/row";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { MediaGallery } from "@/components/project-media";
import { ProjectTags, Terminal } from "@/components/project-card";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];

  const links = [
    project.links.live && { label: "Try it", href: project.links.live, primary: true },
    project.links.repo && { label: "GitHub", href: project.links.repo },
    project.links.package && project.links.package,
  ].filter((link): link is { label: string; href: string; primary?: boolean } => Boolean(link));

  return (
    <>
      <Row
        className="md:pt-16 md:pb-14"
        rail={
          <>
            <Link href="/projects" className="mb-4 block text-accent normal-case hover:underline">
              ← All projects
            </Link>
            <span className="block">{project.year}</span>
          </>
        }
      >
        <h1 className="mb-5 font-display text-[clamp(2.6rem,7vw,4.5rem)] leading-[0.95] font-bold tracking-[-0.04em] text-balance">
          {project.name}
        </h1>
        <p className="mb-6 max-w-[36rem] text-[1.3rem] leading-[1.45] text-pretty">
          {project.summary}
        </p>
        <ProjectTags tags={project.tags} />
        {links.length > 0 ? (
          <div className="mt-7 flex flex-wrap gap-3">
            {links.map((link, i) => (
              <Button
                key={link.href}
                href={link.href}
                variant={link.primary || (i === 0 && !project.links.live) ? "primary" : "secondary"}
              >
                {link.label} ↗
              </Button>
            ))}
          </div>
        ) : null}
      </Row>

      {project.media.length > 0 ? (
        <section className="border-b border-rule">
          <Container className="py-10 md:py-14">
            <MediaGallery project={project} />
          </Container>
        </section>
      ) : null}

      <Row rail="About">
        <RowTitle>What it does</RowTitle>
        {project.description.map((paragraph) => (
          <p key={paragraph} className="mb-5">
            {paragraph}
          </p>
        ))}

        {project.highlights.length > 0 ? (
          <ul className="mt-8">
            {project.highlights.map((item) => (
              <li
                key={item}
                className="grid grid-cols-[1.25rem_minmax(0,1fr)] border-t border-rule py-3 text-base"
              >
                <span className="font-mono text-accent">+</span>
                {item}
              </li>
            ))}
          </ul>
        ) : null}

        {project.terminal ? <Terminal lines={project.terminal} className="mt-8 bg-surface" /> : null}
      </Row>

      {project.learnings?.length ? (
        <Row rail="Learnings">
          <RowTitle>What I learned</RowTitle>
          {project.learnings.map((paragraph) => (
            <p key={paragraph} className="mb-5">
              {paragraph}
            </p>
          ))}
        </Row>
      ) : null}

      <Row rail="Next" last>
        <Link href={`/projects/${next.slug}`} className="group block">
          <span className="font-display text-2xl font-bold tracking-[-0.02em] transition-colors group-hover:text-accent">
            {next.name} →
          </span>
          <span className="mt-1 block text-muted">{next.summary}</span>
        </Link>
      </Row>
    </>
  );
}
