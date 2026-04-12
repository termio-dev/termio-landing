import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { SiteHeader } from "@/components/SiteHeader";
import {
  getAllTags,
  getPostsByTag,
  slugifyTag,
  tagFromSlug,
} from "@/lib/blog";

const basePath = process.env.BASE_PATH ?? "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://termio.dev";

type Props = {
  params: Promise<{ tag: string }>;
};

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: slugifyTag(tag) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag: slug } = await params;
  const allTags = getAllTags();
  const tag = tagFromSlug(slug, allTags);
  const displayName = tag ?? slug;

  return {
    title: `Posts tagged "${displayName}" | Termio Blog`,
    description: `Articles about ${displayName} on the Termio blog.`,
    alternates: {
      canonical: `${basePath}/blog/tag/${slug}/`,
    },
  };
}

export default async function TagPage({ params }: Props) {
  const { tag: slug } = await params;
  const allTags = getAllTags();
  const tag = tagFromSlug(slug, allTags);

  if (!tag) {
    return null;
  }

  const posts = getPostsByTag(tag);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${siteUrl}${basePath}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteUrl}${basePath}/blog/`,
      },
      { "@type": "ListItem", position: 3, name: `Tag: ${tag}` },
    ],
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteHeader active="blog" />
      <div className="mx-auto max-w-4xl px-6 py-32">
        <Link
          href="/blog/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          All articles
        </Link>

        <div className="mb-16 max-w-2xl">
          <Badge
            variant="outline"
            className="mb-4 border-amber/30 bg-background/30 text-amber"
          >
            {tag}
          </Badge>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Articles tagged &ldquo;{tag}&rdquo;
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {posts.length} {posts.length === 1 ? "article" : "articles"} about{" "}
            {tag}.
          </p>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="rounded-3xl border border-border bg-card/50 p-6"
            >
              <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" />
                  <time dateTime={post.date}>{post.date}</time>
                </span>
                <span>{post.author}</span>
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
                {post.tags.map((t) => (
                  <Link key={t} href={`/blog/tag/${slugifyTag(t)}/`}>
                    <Badge
                      variant="outline"
                      className="border-border/70 transition-colors hover:border-amber/30"
                    >
                      {t}
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
