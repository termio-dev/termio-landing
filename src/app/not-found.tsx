import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Home, Newspaper } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Page not found | Termio",
  description:
    "The page you were looking for does not exist. Browse Termio's homepage, blog, or SSH client guides instead.",
  robots: {
    index: false,
    follow: true,
  },
};

const suggestions = [
  { href: "/ssh-client-for-windows/", label: "Windows SSH client" },
  { href: "/ssh-client-for-mac/", label: "SSH client for Mac" },
  { href: "/ssh-client-for-linux/", label: "SSH client for Linux" },
  { href: "/wsl-terminal/", label: "WSL terminal for Windows" },
  { href: "/termio-vs-warp/", label: "Termio vs Warp" },
  { href: "/termio-vs-termius/", label: "Termio vs Termius" },
  { href: "/blog/", label: "All articles" },
];

export default function NotFound() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <section className="px-6 pb-20 pt-32">
        <div className="mx-auto max-w-3xl">
          <Badge
            variant="outline"
            className="mb-5 border-amber/30 bg-background/30 text-amber"
          >
            404
          </Badge>
          <h1 className="mb-5 text-4xl font-bold tracking-tight sm:text-5xl">
            That page does not exist.
          </h1>
          <p className="mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            The page you were looking for moved, was renamed, or never existed.
            Try the homepage or jump straight to one of the popular guides
            below.
          </p>

          <div className="mb-10 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85"
            >
              <Home className="h-4 w-4" />
              Back to home
            </Link>
            <Link
              href="/blog/"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-secondary px-4 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
            >
              <Newspaper className="h-4 w-4" />
              Read the blog
            </Link>
          </div>

          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Popular guides
          </h2>
          <ul className="space-y-2 text-sm">
            {suggestions.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  prefetch={false}
                  className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-amber"
                >
                  {s.label}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
