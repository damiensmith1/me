import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPosts, renderMarkdown } from "@/lib/blog";
import { Row } from "@/components/ui/row";

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", publishedTime: post.date },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <Row
      className="md:pt-16"
      last
      rail={
        <>
          <Link href="/blog" className="mb-4 block text-accent normal-case hover:underline">
            ← All writing
          </Link>
          <time dateTime={post.date} className="block tabular-nums">
            {post.date}
          </time>
          <span className="block">{post.readingTime} read</span>
          {post.draft ? <span className="mt-2 block text-mark">Draft</span> : null}
        </>
      }
    >
      <article>
        <h1 className="mb-5 font-display text-[clamp(2.2rem,6vw,3.6rem)] leading-[1] font-bold tracking-[-0.035em] text-balance">
          {post.title}
        </h1>
        {post.summary ? (
          <p className="mb-10 text-[1.3rem] leading-[1.45] text-muted text-pretty">{post.summary}</p>
        ) : null}
        <div
          className="post-body"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.body) }}
        />
      </article>
    </Row>
  );
}
