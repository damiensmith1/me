import Link from "next/link";
import type { Post } from "@/lib/blog";

export function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul className="border-b border-rule">
      {posts.map((post) => (
        <li key={post.slug} className="border-t border-rule">
          <Link
            href={`/blog/${post.slug}`}
            className="group grid items-baseline gap-1 py-4 sm:grid-cols-[6.5rem_minmax(0,1fr)_auto] sm:gap-4"
          >
            <span className="font-mono text-xs text-muted tabular-nums">{post.date}</span>
            <span className="font-display text-lg leading-snug font-medium tracking-[-0.01em] transition-colors group-hover:text-accent">
              {post.title}
              {post.draft ? (
                <span className="ml-2 align-middle font-mono text-[0.65rem] font-medium tracking-[0.08em] text-mark uppercase">
                  Draft
                </span>
              ) : null}
            </span>
            <span className="hidden font-mono text-xs text-muted sm:inline">
              {post.readingTime}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
