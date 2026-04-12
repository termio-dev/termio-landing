import Link from "next/link";
import { Terminal } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  active?: "home" | "blog";
  ctaHref?: string;
  ctaLabel?: string;
  ctaIcon?: React.ComponentType<{ className?: string }>;
};

export function SiteHeader({
  active,
  ctaHref,
  ctaLabel,
  ctaIcon: CtaIcon,
}: SiteHeaderProps) {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-amber" />
            <span className="font-semibold tracking-tight">Termio</span>
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link
              href="/"
              className={cn(
                "transition-colors hover:text-foreground",
                active === "home" ? "text-foreground" : "text-muted-foreground",
              )}
            >
              Home
            </Link>
            <Link
              href="/blog/"
              className={cn(
                "transition-colors hover:text-foreground",
                active === "blog" ? "text-foreground" : "text-muted-foreground",
              )}
            >
              Blog
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {ctaHref && ctaLabel ? (
            <a href={ctaHref} className={cn(buttonVariants({ size: "sm" }))}>
              {CtaIcon ? <CtaIcon className="h-4 w-4" /> : null}
              {ctaLabel}
            </a>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
