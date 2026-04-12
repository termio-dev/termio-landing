import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function RelatedArticles({
  articles,
}: {
  articles: Array<{ href: string; title: string }>;
}) {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">
          Related articles
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.href}
              href={article.href}
              className="rounded-2xl border border-border bg-card/50 p-5 transition-colors hover:border-amber/30"
            >
              <div className="mb-3 text-sm text-amber">Read next</div>
              <h3 className="mb-3 font-semibold leading-7">{article.title}</h3>
              <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                Open article
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
