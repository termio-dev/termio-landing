import type { Metadata } from "next";
import { CloudOff, GitBranch, ShieldCheck, Terminal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { ComparisonTable } from "@/components/ComparisonTable";
import { DownloadCtaSection } from "@/components/DownloadCtaSection";
import { RelatedArticles } from "@/components/RelatedArticles";
import { SiteHeader } from "@/components/SiteHeader";
import { basePath, siteUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Termio vs Warp | Terminal Comparison",
  description:
    "Compare Termio and Warp side by side. See how a local-first terminal with SSH management stacks up against a cloud-based AI terminal.",
  alternates: {
    canonical: `${basePath}/termio-vs-warp/`,
  },
  openGraph: {
    title: "Termio vs Warp | Terminal Comparison",
    description:
      "Compare Termio and Warp: local-first SSH management vs cloud-based AI terminal.",
    url: `${basePath}/termio-vs-warp/`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Termio vs Warp | Terminal Comparison",
    description:
      "Compare Termio and Warp: local-first SSH management vs cloud-based AI terminal.",
    images: [`${basePath}/app_screenshot.png`],
  },
};

const relatedArticles = [
  {
    href: "/blog/warp-vs-termio-which-terminal-fits-local-first-workflows/",
    title: "Warp vs Termio: Which Terminal Fits Local-First Workflows?",
  },
  {
    href: "/blog/local-first-developer-tools-why-keeping-terminal-data-on-your-machine-matters/",
    title: "Why Keeping Terminal Data on Your Machine Matters",
  },
  {
    href: "/blog/how-to-manage-ssh-connections-without-cloud-sync/",
    title: "How to Manage SSH Connections Without Cloud Sync",
  },
];

const comparisonRows = [
  { feature: "Local-only data", termio: true as const, competitor: false as const },
  { feature: "No account required", termio: true as const, competitor: false as const },
  { feature: "Git-based sharing", termio: true as const, competitor: false as const },
  { feature: "SSH connection manager", termio: true as const, competitor: false as const },
  { feature: "Organized workspaces", termio: true as const, competitor: false as const },
  { feature: "Per-connection scripts", termio: true as const, competitor: false as const },
  { feature: "AI copilot", termio: true as const, competitor: true as const },
  { feature: "Split panes", termio: true as const, competitor: true as const },
  { feature: "Drag & drop file upload", termio: true as const, competitor: false as const },
  { feature: "Free to use", termio: true as const, competitor: "partial" as const },
];

const faqItems = [
  {
    q: "Is Warp free?",
    a: "Warp has a free tier with limits. Some features, including team collaboration, require a paid plan. Termio is completely free with no feature gates.",
  },
  {
    q: "Does Warp require an account?",
    a: "Yes, Warp requires you to create an account and sign in to use it. Termio does not require any account or sign-in.",
  },
  {
    q: "Does Warp have an SSH connection manager?",
    a: "No, Warp focuses on the terminal experience and AI features but does not include an SSH connection manager or workspace organization. Termio includes both.",
  },
  {
    q: "Does Warp store data locally?",
    a: "Warp processes some data in the cloud for AI features and requires an account. Termio stores all data locally on your machine with no cloud sync.",
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
      { "@type": "ListItem", position: 2, name: "Termio vs Warp" },
    ],
  },
];

export default function TermioVsWarpPage() {
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
              Termio vs Warp
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Warp is a cloud-based terminal with AI features. Termio is a
              local-first terminal with SSH management, workspace organization,
              and Git-based sharing. Both have AI copilots and split panes, but
              they differ on data ownership and SSH workflows.
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
            competitorLabel="Warp"
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
                title: "Local data ownership",
                description:
                  "Termio stores all data on your machine. Warp requires a cloud account and processes data remotely for AI features.",
              },
              {
                icon: Terminal,
                title: "SSH connection management",
                description:
                  "Termio includes a built-in SSH connection manager with workspaces and per-connection scripts. Warp does not manage SSH connections.",
              },
              {
                icon: GitBranch,
                title: "Git-based collaboration",
                description:
                  "Share workspace layouts and connection configs through Git. Warp uses proprietary cloud sync for team features.",
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
            Why choose Termio over Warp
          </h2>
          <p className="mb-5 max-w-3xl leading-8 text-muted-foreground">
            If you manage SSH connections and want your terminal data to stay on
            your machine, Termio is designed for that workflow. It gives you
            workspace organization, native credential storage, and Git-based
            sharing without requiring a cloud account.
          </p>
          <p className="max-w-3xl leading-8 text-muted-foreground">
            Warp is a good choice if you primarily need a modern local terminal
            with AI features and are comfortable with cloud-based data handling.
            Termio is the better fit when SSH management, local-first data, and
            team collaboration through Git are priorities.
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
        description="A local-first terminal with SSH management, split panes, and AI copilot. Free on macOS, Windows, and Linux."
        secondaryLink={{
          href: "/blog/warp-vs-termio-which-terminal-fits-local-first-workflows/",
          label: "Read the full comparison",
        }}
      />

      <RelatedArticles articles={relatedArticles} />
    </main>
  );
}
