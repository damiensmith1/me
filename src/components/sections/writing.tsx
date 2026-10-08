import Link from "next/link";
import { writingContent } from "@/lib/content";
import { getPosts } from "@/lib/blog";
import { Row, RowTitle } from "@/components/ui/row";
import { PostList } from "@/components/post-list";

const HOME_POST_COUNT = 3;

export function Writing() {
  const posts = getPosts();
  if (posts.length === 0) return null;

  return (
    <Row id="writing" rail="Writing">
      <RowTitle>{writingContent.title}</RowTitle>
      <PostList posts={posts.slice(0, HOME_POST_COUNT)} />
      {posts.length > HOME_POST_COUNT ? (
        <Link
          href="/blog"
          className="mt-6 inline-flex font-mono text-sm font-medium text-accent hover:underline"
        >
          {writingContent.allLabel} ({posts.length}) →
        </Link>
      ) : null}
    </Row>
  );
}
