import type { MetadataRoute } from "next";

import { getAllPosts, getAllTags, slugifyTag } from "@/lib/blog";

const basePath = process.env.BASE_PATH ?? "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://termio.dev";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const tags = getAllTags();

  return [
    {
      url: `${siteUrl}${basePath}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}${basePath}/blog/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // Platform pages
    {
      url: `${siteUrl}${basePath}/ssh-client-for-windows/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}${basePath}/ssh-client-for-mac/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}${basePath}/ssh-client-for-linux/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // Comparison pages
    {
      url: `${siteUrl}${basePath}/termio-vs-warp/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}${basePath}/termio-vs-termius/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}${basePath}/termio-vs-iterm2/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // Feature pages
    {
      url: `${siteUrl}${basePath}/ssh-connection-manager/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}${basePath}/terminal-with-split-panes/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}${basePath}/wsl-terminal/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // Blog posts
    ...posts.map((post) => ({
      url: `${siteUrl}${basePath}/blog/${post.slug}/`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    // Tag pages
    ...tags.map((tag) => ({
      url: `${siteUrl}${basePath}/blog/tag/${slugifyTag(tag)}/`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
  ];
}
