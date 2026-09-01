import type { Metadata } from "next";
import { CloudOff, GitBranch, Sparkles, Terminal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { ComparisonTable } from "@/components/ComparisonTable";
import { DownloadCtaSection } from "@/components/DownloadCtaSection";
import { RelatedArticles } from "@/components/RelatedArticles";
import { SiteHeader } from "@/components/SiteHeader";
import { basePath, siteUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Termio vs Termius | SSH Client Comparison",
  description:
    "Compare Termio and Termius side by side. See how a free, local-first SSH client stacks up against a cloud-based SSH manager with paid tiers.",
  alternates: {
    canonical: `${basePath}/termio-vs-termius/`,
  },
  openGraph: {
    title: "Termio vs Termius | SSH Client Comparison",
    description:
      "Compare Termio and Termius: free local-first SSH client vs cloud-based SSH manager.",
    url: `${basePath}/termio-vs-termius/`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Termio vs Termius | SSH Client Comparison",
    description:
      "Compare Termio and Termius: free local-first SSH client vs cloud-based SSH manager.",
    images: [`${basePath}/app_screenshot.png`],
  },
};

const relatedArticles = [
  {
    href: "/blog/switching-from-termius-to-termio/",
    title: "Switching From Termius to Termio: What Actually Changes",
  },
  {
    href: "/blog/termius-alternative-for-local-first-teams/",
    title: "Termius Alternative for Local-First Teams",
  },
  {
    href: "/blog/how-to-share-terminal-and-ssh-setups-with-git/",
    title: "How to Share Terminal and SSH Setups with Git",
  },
];

const comparisonRows = [
  { feature: "Local-only data", termio: true as const, competitor: false as const },
  { feature: "No account required", termio: true as const, competitor: false as const },
  { feature: "Git-based sharing", termio: true as const, competitor: false as const },
  { feature: "SSH connection manager", termio: true as const, competitor: true as const },
  { feature: "Organized workspaces", termio: true as const, competitor: true as const },
  { feature: "Per-connection scripts", termio: true as const, competitor: "partial" as const },
  { feature: "AI copilot", termio: true as const, competitor: false as const },
  { feature: "Split panes", termio: true as const, competitor: false as const },
  { feature: "Drag & drop file upload", termio: true as const, competitor: true as const },
  { feature: "Free to use", termio: true as const, competitor: false as const },
];

const faqItems = [
  {
    q: "Is Termius free?",
    a: "Termius has a free tier, but many features like SFTP, SSH key sync, and team sharing require a paid subscription. Termio is completely free with all features included.",
  },
  {
    q: "Does Termius store data in the cloud?",
    a: "Yes, Termius syncs connection data and credentials through their cloud service. Termio stores everything locally on your machine using native OS credential storage.",
  },
  {
    q: "Does Termius have split panes?",
    a: "Termius does not support split-pane terminal layouts. Termio includes full horizontal and vertical split-pane support.",
  },
  {
    q: "Can I share Termius configurations with my team?",
    a: "Termius offers team sharing through their paid cloud sync. Termio uses Git-based sharing, so your team can version-control workspace configs without a subscription.",
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
      { "@type": "ListItem", position: 2, name: "Termio vs Termius" },
    ],
  },
];

export default function TermioVsTermiusPage() {
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
              Termio vs Termius
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Termius is a cloud-based SSH client with paid tiers for advanced
              features. Termio is a free, local-first SSH client with split
              panes, AI copilot, and Git-based sharing. Both manage SSH
              connections, but they differ on pricing, data ownership, and
              features.
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
            competitorLabel="Termius"
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
                icon: CloudOff,
                title: "Free with all features",
                description:
                  "Termio includes every feature at no cost. Termius gates SFTP, key sync, and team features behind paid plans.",
              },
              {
                icon: Terminal,
                title: "Split panes and AI",
                description:
                  "Termio includes split-pane layouts and an AI copilot. Termius does not offer split panes or built-in AI assistance.",
              },
              {
                icon: GitBranch,
                title: "Git-based sharing",
                description:
                  "Share workspace configs through Git. Termius requires their cloud subscription for team collaboration.",
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
            Why switch from Termius
          </h2>
          <p className="mb-5 max-w-3xl leading-8 text-muted-foreground">
            Termius is a capable SSH client, but the subscription model and
            cloud dependency can be friction points. If you want a tool where
            every feature is free, data stays local, and team sharing works
            through Git, Termio is a straightforward alternative.
          </p>
          <p className="max-w-3xl leading-8 text-muted-foreground">
            Termio adds split panes and an AI copilot on top of the SSH
            management features you already use in Termius. Credentials stay in
            your operating system&apos;s native storage instead of syncing
            through a cloud vault.
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
        description="A free, local-first SSH client with split panes, AI copilot, and Git-based sharing. Available on macOS, Windows, and Linux."
        secondaryLink={{
          href: "/blog/termius-alternative-for-local-first-teams/",
          label: "Read the full comparison",
        }}
      />

      <RelatedArticles articles={relatedArticles} />
    </main>
  );
}
