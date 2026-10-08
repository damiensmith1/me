import { writingContent } from "@/lib/content";
import { Row, RowTitle } from "@/components/ui/row";

export function Writing() {
  if (writingContent.posts.length === 0) return null;

  return (
    <Row id="writing" rail="Writing">
      <RowTitle>{writingContent.title}</RowTitle>
      <ul className="border-b border-rule">
        {writingContent.posts.map((post) => (
          <li key={post.href} className="border-t border-rule">
            <a
              href={post.href}
              className="group grid items-baseline gap-1 py-4 sm:grid-cols-[6.5rem_minmax(0,1fr)_auto] sm:gap-4"
            >
              <span className="font-mono text-xs text-muted tabular-nums">{post.date}</span>
              <span className="font-display text-lg leading-snug font-medium tracking-[-0.01em] transition-colors group-hover:text-accent">
                {post.title}
              </span>
              <span className="hidden font-mono text-xs text-muted sm:inline">
                {post.readingTime}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Row>
  );
}
