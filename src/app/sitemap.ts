import type { MetadataRoute } from "next";

import { getAllPosts, getAllTags, getPostsByTag, slugifyTag } from "@/lib/blog";

const basePath = process.env.BASE_PATH ?? "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://termio.dev";

export const dynamic = "force-static";

// Hardcoded per-page lastModified. Bump when the page is meaningfully edited
// — Google devalues sitemaps where every URL claims to have changed today.
const STATIC_PAGE_DATES: Record<string, string> = {
  "/": "2026-05-10",
  "/blog/": "2026-05-10",
  "/ssh-client-for-windows/": "2026-05-10",
  "/ssh-client-for-mac/": "2026-04-12",
  "/ssh-client-for-linux/": "2026-04-12",
  "/termio-vs-warp/": "2026-04-12",
  "/termio-vs-termius/": "2026-04-12",
  "/termio-vs-iterm2/": "2026-04-12",
  "/ssh-connection-manager/": "2026-04-12",
  "/terminal-with-split-panes/": "2026-04-12",
  "/wsl-terminal/": "2026-05-10",
};

function staticEntry(
  path: string,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  priority: number,
): MetadataRoute.Sitemap[number] {
  return {
    url: `${siteUrl}${basePath}${path}`,
    lastModified: new Date(STATIC_PAGE_DATES[path]),
    changeFrequency,
    priority,
  };
}

function latestPostDateForTag(tag: string): Date {
  const posts = getPostsByTag(tag);
  const latest = posts.reduce(
    (acc, p) => (p.date > acc ? p.date : acc),
    "1970-01-01",
  );
  return new Date(latest);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const tags = getAllTags();

  return [
    staticEntry("/", "weekly", 1),
    staticEntry("/blog/", "weekly", 0.8),
    staticEntry("/ssh-client-for-windows/", "weekly", 0.9),
    staticEntry("/ssh-client-for-mac/", "weekly", 0.9),
    staticEntry("/ssh-client-for-linux/", "weekly", 0.9),
    staticEntry("/termio-vs-warp/", "monthly", 0.8),
    staticEntry("/termio-vs-termius/", "monthly", 0.8),
    staticEntry("/termio-vs-iterm2/", "monthly", 0.8),
    staticEntry("/ssh-connection-manager/", "monthly", 0.8),
    staticEntry("/terminal-with-split-panes/", "monthly", 0.8),
    staticEntry("/wsl-terminal/", "monthly", 0.8),
    ...posts.map((post) => ({
      url: `${siteUrl}${basePath}/blog/${post.slug}/`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...tags.map((tag) => ({
      url: `${siteUrl}${basePath}/blog/tag/${slugifyTag(tag)}/`,
      lastModified: latestPostDateForTag(tag),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
  ];
}
