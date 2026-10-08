import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/content";
import { projects } from "@/lib/projects";
import { getPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    { path: "", changeFrequency: "monthly", priority: 1 },
    { path: "/projects", changeFrequency: "monthly", priority: 0.8 },
    ...projects.map((project) => ({
      path: `/projects/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...(getPosts().length > 0
      ? [{ path: "/blog", changeFrequency: "weekly" as const, priority: 0.7 }]
      : []),
    ...getPosts().map((post) => ({
      path: `/blog/${post.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
