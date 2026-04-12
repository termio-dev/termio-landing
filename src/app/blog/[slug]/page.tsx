import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { BlogPostCta } from "@/components/BlogPostCta";
import { MarkdownContent } from "@/components/MarkdownContent";
import { SiteHeader } from "@/components/SiteHeader";
import { getAllPostSlugs, getPostBySlug, slugifyTag } from "@/lib/blog";

const basePath = process.env.BASE_PATH ?? "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://termio.dev";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const postExists = getAllPostSlugs().includes(slug);

  if (!postExists) {
    return {};
  }

  const post = getPostBySlug(slug);

  return {
    title: `${post.title} | Termio Blog`,
    description: post.description,
    alternates: {
      canonical: `${basePath}/blog/${slug}/`,
    },
    openGraph: {
      title: `${post.title} | Termio Blog`,
      description: post.description,
      url: `${basePath}/blog/${slug}/`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Termio Blog`,
      description: post.description,
      images: [`${basePath}/app_screenshot.png`],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const postExists = getAllPostSlugs().includes(slug);

  if (!postExists) {
    notFound();
  }

  const post = getPostBySlug(slug);
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.date,
      image: `${siteUrl}${basePath}/app_screenshot.png`,
      author: {
        "@type": "Person",
        name: post.author,
      },
      mainEntityOfPage: `${siteUrl}${basePath}/blog/${post.slug}/`,
      publisher: {
        "@type": "Organization",
        name: "Termio",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}${basePath}/` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}${basePath}/blog/` },
        { "@type": "ListItem", position: 3, name: post.title },
      ],
    },
  ];

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteHeader active="blog" />
      <article className="mx-auto max-w-3xl px-6 py-28">
        <Link
          href="/blog/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to blog
        </Link>

        <header className="mb-10 border-b border-border pb-8">
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link key={tag} href={`/blog/tag/${slugifyTag(tag)}/`}>
                <Badge
                  variant="outline"
                  className="border-border/70 transition-colors hover:border-amber/30"
                >
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            {post.title}
          </h1>
          <p className="mb-5 text-lg leading-relaxed text-muted-foreground">
            {post.description}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" />
              <time dateTime={post.date}>{post.date}</time>
            </span>
            <span>{post.author}</span>
          </div>
        </header>

        <MarkdownContent markdown={post.body} />
        <BlogPostCta />
      </article>
    </main>
  );
}
