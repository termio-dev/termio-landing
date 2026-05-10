import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { SiteHeader } from "@/components/SiteHeader";
import { getAllPosts, slugifyTag } from "@/lib/blog";

const basePath = process.env.BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "Termio Blog",
  description:
    "Product notes, terminal workflow guides, and platform-specific articles about Termio, SSH, WSL, Keychain, and local-first developer tooling.",
  alternates: {
    canonical: `${basePath}/blog/`,
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen">
      <SiteHeader active="blog" />
      <div className="mx-auto max-w-4xl px-6 py-32">
        <div className="mb-16 max-w-2xl">
          <Badge
            variant="outline"
            className="mb-4 border-amber/30 bg-background/30 text-amber"
          >
            Blog
          </Badge>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            The Termio Blog
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Guides on SSH workflows, terminal organization, WSL, Apple Keychain,
            and local-first developer tooling.
          </p>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="rounded-3xl border border-border bg-card/50 p-6"
            >
              <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <div className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" />
                  <time dateTime={post.date}>{post.date}</time>
                </div>
                {" "}
                <div>{post.author}</div>
              </div>
              <h2 className="mb-3 text-2xl font-semibold tracking-tight">
                <Link
                  href={`/blog/${post.slug}/`}
                  className="transition-colors hover:text-amber"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mb-5 leading-7 text-muted-foreground">
                {post.description}
              </p>
              <div className="mb-6 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${slugifyTag(tag)}/`}
                    prefetch={false}
                  >
                    <Badge
                      variant="outline"
                      className="border-border/70 transition-colors hover:border-amber/30"
                    >
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
              <Link
                href={`/blog/${post.slug}/`}
                className="inline-flex items-center gap-2 text-sm font-medium text-amber"
              >
                Read article
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
