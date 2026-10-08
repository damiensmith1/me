import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { writingContent } from "@/lib/content";
import { getPosts } from "@/lib/blog";
import { Row } from "@/components/ui/row";
import { PostList } from "@/components/post-list";

export const metadata: Metadata = {
  title: writingContent.pageTitle,
  description: writingContent.pageIntro,
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getPosts();
  if (posts.length === 0) notFound();

  return (
    <Row rail={`${posts.length} ${posts.length === 1 ? "post" : "posts"}`} className="md:pt-22" last>
      <h1 className="mb-5 font-display text-[clamp(2.6rem,7vw,4.5rem)] leading-[0.95] font-bold tracking-[-0.04em]">
        {writingContent.pageTitle}
      </h1>
      <p className="mb-10 max-w-[34rem] text-[1.3rem] leading-[1.45] text-pretty">
        {writingContent.pageIntro}
      </p>
      <PostList posts={posts} />
    </Row>
  );
}
