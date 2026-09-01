import type { Metadata } from "next";
import { Globe, LayoutGrid, ShieldCheck, Terminal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { ComparisonTable } from "@/components/ComparisonTable";
import { DownloadCtaSection } from "@/components/DownloadCtaSection";
import { RelatedArticles } from "@/components/RelatedArticles";
import { SiteHeader } from "@/components/SiteHeader";
import { basePath, siteUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Termio vs iTerm2 | Terminal Comparison",
  description:
    "Compare Termio and iTerm2 side by side. See how a cross-platform terminal with SSH management compares to macOS's most popular terminal emulator.",
  alternates: {
    canonical: `${basePath}/termio-vs-iterm2/`,
  },
  openGraph: {
    title: "Termio vs iTerm2 | Terminal Comparison",
    description:
      "Compare Termio and iTerm2: cross-platform SSH terminal vs macOS terminal emulator.",
    url: `${basePath}/termio-vs-iterm2/`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Termio vs iTerm2 | Terminal Comparison",
    description:
      "Compare Termio and iTerm2: cross-platform SSH terminal vs macOS terminal emulator.",
    images: [`${basePath}/app_screenshot.png`],
  },
};

const relatedArticles = [
  {
    href: "/blog/iterm2-vs-termio-do-you-need-an-ssh-manager-on-macos/",
    title: "iTerm2 vs Termio: Do You Still Need an SSH Manager on macOS?",
  },
  {
    href: "/blog/terminal-app-with-apple-keychain-support-for-macos/",
    title: "Terminal App with Apple Keychain Support for macOS",
  },
  {
    href: "/blog/best-ssh-client-for-developers-on-macos-windows-and-linux/",
    title: "Best SSH Client for Developers on macOS, Windows, and Linux",
  },
];

const comparisonRows = [
  { feature: "Cross-platform", termio: true as const, competitor: false as const },
  { feature: "SSH connection manager", termio: true as const, competitor: false as const },
  { feature: "Organized workspaces", termio: true as const, competitor: false as const },
  { feature: "Native credential storage", termio: true as const, competitor: false as const },
  { feature: "Per-connection scripts", termio: true as const, competitor: false as const },
  { feature: "AI copilot", termio: true as const, competitor: false as const },
  { feature: "Git-based sharing", termio: true as const, competitor: false as const },
  { feature: "Split panes", termio: true as const, competitor: true as const },
  { feature: "Drag & drop file upload", termio: true as const, competitor: false as const },
  { feature: "Free to use", termio: true as const, competitor: true as const },
];

const faqItems = [
  {
    q: "Does iTerm2 have an SSH connection manager?",
    a: "No, iTerm2 is a terminal emulator that does not include SSH connection management, workspace organization, or credential storage. You manage SSH connections through config files and command-line flags.",
  },
  {
    q: "Can iTerm2 organize workspaces?",
    a: "iTerm2 supports profiles and tab arrangements, but it does not have dedicated SSH workspace management with folders, favorites, and per-connection configuration like Termio.",
  },
  {
    q: "Is iTerm2 available on Windows or Linux?",
    a: "No, iTerm2 is macOS-only. Termio runs on macOS, Windows, and Linux, so your workflow stays consistent if you switch platforms or work across multiple operating systems.",
  },
  {
    q: "Is iTerm2 free?",
    a: "Yes, iTerm2 is free and open source. Termio is also free to use with all features included.",
  },
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
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
      { "@type": "ListItem", position: 2, name: "Termio vs iTerm2" },
    ],
  },
];

export default function TermioVsIterm2Page() {
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
              Comparison
            </Badge>
            <h1 className="mb-5 text-4xl font-bold tracking-tight sm:text-5xl">
              Termio vs iTerm2
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              iTerm2 is the most popular terminal emulator on macOS. Termio is a
              cross-platform terminal with built-in SSH management, workspace
              organization, and an AI copilot. Both are free, but they serve
              different needs.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-2xl font-bold tracking-tight">
            Feature comparison
          </h2>
          <ComparisonTable
            termioLabel="Termio"
            competitorLabel="iTerm2"
            rows={comparisonRows}
          />
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-3xl font-bold tracking-tight">
            Key differences
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Globe,
                title: "Cross-platform",
                description:
                  "Termio runs on macOS, Windows, and Linux. iTerm2 is macOS-only. Your workflow stays consistent across platforms.",
              },
              {
                icon: Terminal,
                title: "Built-in SSH management",
                description:
                  "Termio includes an SSH connection manager with workspaces and per-connection scripts. iTerm2 relies on manual SSH config files.",
              },
              {
                icon: ShieldCheck,
                title: "Credential storage",
                description:
                  "Termio stores SSH credentials in native OS storage (Keychain, Credential Manager, keyring). iTerm2 does not manage credentials.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border bg-card/50 p-6"
              >
                <item.icon className="mb-4 h-5 w-5 text-amber" />
                <h3 className="mb-2 text-xl font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="leading-7 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            Why choose Termio over iTerm2
          </h2>
          <p className="mb-5 max-w-3xl leading-8 text-muted-foreground">
            iTerm2 is an excellent terminal emulator if you only need a local
            shell on macOS. But if you manage SSH connections, work across
            platforms, or want organized workspaces with per-connection
            configuration, you need more than a terminal emulator.
          </p>
          <p className="max-w-3xl leading-8 text-muted-foreground">
            Termio gives you everything iTerm2 offers in terms of split panes
            and a capable terminal, plus SSH management, workspace organization,
            credential storage, AI assistance, and cross-platform support.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-2xl font-bold tracking-tight">
            Frequently asked questions
          </h2>
          <div className="space-y-6">
            {faqItems.map((item) => (
              <div key={item.q}>
                <h3 className="mb-2 text-lg font-semibold">{item.q}</h3>
                <p className="leading-7 text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DownloadCtaSection
        platform="mac"
        headline="Try Termio"
        description="A cross-platform terminal with SSH management, split panes, and AI copilot. Free on macOS, Windows, and Linux."
        secondaryLink={{
          href: "/blog/best-ssh-client-for-developers-on-macos-windows-and-linux/",
          label: "Read the SSH client guide",
        }}
      />

      <RelatedArticles articles={relatedArticles} />
    </main>
  );
}
