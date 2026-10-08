import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

// Posts are Markdown files in content/blog/. The filename is the slug.
//
// ---
// title: Post title
// date: 2026-10-08
// summary: One sentence for the list and meta description.
// draft: true          # optional; drafts only show in `npm run dev`
// ---

const BLOG_DIR = path.join(process.cwd(), "content/blog");
const WORDS_PER_MINUTE = 230;

export type Post = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  summary: string;
  draft: boolean;
  readingTime: string;
  body: string;
};

function parseFrontmatter(source: string) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { data: {} as Record<string, string>, body: source };

  const data: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const i = line.indexOf(":");
    if (i === -1) continue;
    const value = line.slice(i + 1).replace(/\s+#.*$/, "").trim();
    data[line.slice(0, i).trim()] = value.replace(/^["']|["']$/g, "");
  }
  return { data, body: match[2] };
}

function readPost(file: string): Post {
  const slug = file.replace(/\.md$/, "");
  const { data, body } = parseFrontmatter(
    fs.readFileSync(path.join(BLOG_DIR, file), "utf8"),
  );
  const words = body.split(/\s+/).filter(Boolean).length;

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    summary: data.summary ?? "",
    draft: data.draft === "true",
    readingTime: `${Math.max(1, Math.round(words / WORDS_PER_MINUTE))} min`,
    body,
  };
}

// Newest first. Drafts are left out of production builds.
export function getPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const showDrafts = process.env.NODE_ENV === "development";

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map(readPost)
    .filter((post) => showDrafts || !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string) {
  return getPosts().find((post) => post.slug === slug);
}

export function renderMarkdown(body: string) {
  return marked.parse(body, { async: false });
}
