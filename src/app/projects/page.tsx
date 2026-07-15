import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Case studies and write-ups on software projects, including systems built from scratch. Coming soon.",
  alternates: { canonical: "/projects" },
};

// Future case studies will live in src/content/projects/*.mdx, rendered via
// app/projects/[slug]/page.tsx once the first write-ups are ready.
export default function ProjectsPage() {
  return (
    <ComingSoon
      kicker="Projects"
      title="Case studies are in progress"
      description="I'm preparing write-ups on projects I've built from scratch and client work I can share publicly."
      bullets={[
        "Storage engines and database internals",
        "Distributed systems and load balancers",
        "Semantic search and document databases",
        "AI agent frameworks and workflow tooling",
      ]}
    />
  );
}
