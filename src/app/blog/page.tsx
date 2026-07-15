import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical writing on backend engineering, distributed systems, AI systems, and developer tooling. Coming soon.",
  alternates: { canonical: "/blog" },
};

// Future posts will live in src/content/blog/*.mdx, rendered via
// app/blog/[slug]/page.tsx once the first articles are ready.
export default function BlogPage() {
  return (
    <ComingSoon
      kicker="Blog"
      title="Writing is in progress"
      description="I'm working on a technical blog covering backend engineering, distributed systems, AI systems, and developer tooling — including what I learn from building things from scratch."
      bullets={[
        "Backend engineering and system design",
        "Distributed systems and databases",
        "AI systems, agents, and prompt engineering",
        "Developer tooling and automation",
      ]}
    />
  );
}
