import type { Metadata } from "next";
import {
  Columns2,
  Layers,
  Monitor,
  Rows2,
  Terminal,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { DownloadCtaSection } from "@/components/DownloadCtaSection";
import { RelatedArticles } from "@/components/RelatedArticles";
import { SiteHeader } from "@/components/SiteHeader";
import { basePath, siteUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terminal with Split Panes | Termio",
  description:
    "Split your terminal into horizontal and vertical panes to run SSH, local shells, and WSL side by side. Free on macOS, Windows, and Linux.",
  alternates: {
    canonical: `${basePath}/terminal-with-split-panes/`,
  },
  openGraph: {
    title: "Terminal with Split Panes | Termio",
    description:
      "Split your terminal into panes to run SSH, local shells, and WSL side by side.",
    url: `${basePath}/terminal-with-split-panes/`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terminal with Split Panes | Termio",
    description:
      "Split your terminal into panes to run SSH, local shells, and WSL side by side.",
    images: [`${basePath}/app_screenshot.png`],
  },
};

const relatedArticles = [
  {
    href: "/blog/how-split-panes-improve-devops-and-sre-terminal-workflows/",
    title: "How Split Panes Improve DevOps and SRE Terminal Workflows",
  },
  {
    href: "/blog/wsl-and-powershell-in-one-workspace/",
    title: "WSL and PowerShell in One Workspace",
  },
  {
    href: "/blog/best-ssh-client-for-developers-on-macos-windows-and-linux/",
    title: "Best SSH Client for Developers on macOS, Windows, and Linux",
  },
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Termio",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "macOS, Windows, Linux",
    description:
      "Terminal app with split-pane workspaces for running SSH, local shells, and WSL sessions side by side.",
    url: `${siteUrl}${basePath}/terminal-with-split-panes/`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${siteUrl}${basePath}/`,
      },
      { "@type": "ListItem", position: 2, name: "Terminal with Split Panes" },
    ],
  },
];

export default function TerminalWithSplitPanesPage() {
  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteHeader active="home" />

      <section className="px-6 pb-18 pt-32">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-3xl">
            <Badge
              variant="outline"
              className="mb-5 border-amber/30 bg-background/30 text-amber"
            >
              Feature
            </Badge>
            <h1 className="mb-5 text-4xl font-bold tracking-tight sm:text-5xl">
              Terminal with Split Panes
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Compose any layout with horizontal and vertical splits. Mix SSH
              sessions, local shells, and WSL panes in a single workspace.
              Resize by dragging, and each pane runs its own independent
              session.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {[
            {
              icon: Columns2,
              title: "Horizontal & Vertical Splits",
              description:
                "Split in any direction to build the layout that fits your workflow. Nest splits for complex arrangements.",
            },
            {
              icon: Layers,
              title: "Mix Session Types",
              description:
                "Run SSH, local shells, WSL, and PowerShell side by side. Each pane is an independent session.",
            },
            {
              icon: Monitor,
              title: "Cross-Platform",
              description:
                "The same split-pane experience on macOS, Windows, and Linux. No platform-specific workarounds.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-card/50 p-6"
            >
              <item.icon className="mb-4 h-5 w-5 text-amber" />
              <h2 className="mb-2 text-xl font-semibold tracking-tight">
                {item.title}
              </h2>
              <p className="leading-7 text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <h2 className="mb-3 text-3xl font-bold tracking-tight">
              Why split panes matter for terminal workflows
            </h2>
            <p className="mb-5 leading-8 text-muted-foreground">
              Switching between terminal windows or tabs breaks your focus.
              Split panes let you see everything at once: logs in one pane,
              code in another, a remote server in a third. This is especially
              valuable for DevOps and SRE work where you need to monitor and
              act simultaneously.
            </p>
            <p className="leading-8 text-muted-foreground">
              Unlike tmux, Termio split panes are native and graphical. Resize
              with a mouse, drag to rearrange, and keep the layout across
              sessions.
            </p>
          </div>

          <div className="rounded-3xl border border-amber/20 bg-gradient-to-b from-amber/8 to-transparent p-7">
            <h2 className="mb-4 text-xl font-semibold tracking-tight">
              Common split-pane layouts
            </h2>
            <ul className="space-y-3 text-muted-foreground">
              {[
                "SSH + local shell for deploy-and-verify workflows",
                "Two SSH sessions for comparing staging vs production",
                "WSL + PowerShell for Windows cross-environment work",
                "Log tailing + active session for real-time debugging",
                "Multiple remote hosts for cluster management",
              ].map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <DownloadCtaSection
        platform="mac"
        headline="Try split panes in Termio"
        description="Build any terminal layout with drag-to-resize split panes. Mix SSH, local shells, and WSL in a single workspace. Free on all platforms."
        secondaryLink={{
          href: "/blog/how-split-panes-improve-devops-and-sre-terminal-workflows/",
          label: "Read the split-pane guide",
        }}
      />

      <RelatedArticles articles={relatedArticles} />
    </main>
  );
}
