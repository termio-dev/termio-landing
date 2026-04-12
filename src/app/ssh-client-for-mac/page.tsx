import type { Metadata } from "next";
import Link from "next/link";
import {
  Apple,
  Download,
  GitBranch,
  KeyRound,
  Laptop,
  Terminal,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { DownloadCtaSection } from "@/components/DownloadCtaSection";
import { RelatedArticles } from "@/components/RelatedArticles";
import { SiteHeader } from "@/components/SiteHeader";
import {
  basePath,
  siteUrl,
  downloadLinks,
  primaryButtonClass,
  secondaryButtonClass,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "SSH Client for Mac | Termio",
  description:
    "Termio is a local-first SSH client for macOS with Apple Keychain integration, split-pane workspaces, Git-based sharing, and an AI copilot. Free to use.",
  alternates: {
    canonical: `${basePath}/ssh-client-for-mac/`,
  },
  openGraph: {
    title: "SSH Client for Mac | Termio",
    description:
      "A local-first SSH client for macOS with Keychain integration, split panes, and organized workspaces.",
    url: `${basePath}/ssh-client-for-mac/`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SSH Client for Mac | Termio",
    description:
      "A local-first SSH client for macOS with Keychain integration, split panes, and organized workspaces.",
    images: [`${basePath}/app_screenshot.png`],
  },
};

const relatedArticles = [
  {
    href: "/blog/terminal-app-with-apple-keychain-support-for-macos/",
    title: "Terminal App with Apple Keychain Support for macOS",
  },
  {
    href: "/blog/local-first-terminal-security-on-macos-and-linux/",
    title: "Local-First Terminal Security on macOS and Linux",
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
    operatingSystem: "macOS",
    description:
      "Local-first SSH client for macOS with Apple Keychain integration, split-pane workspaces, and Git-based sharing.",
    url: `${siteUrl}${basePath}/ssh-client-for-mac/`,
    downloadUrl: downloadLinks.mac,
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
      { "@type": "ListItem", position: 2, name: "SSH Client for Mac" },
    ],
  },
];

export default function SshClientForMacPage() {
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
              macOS
            </Badge>
            <h1 className="mb-5 text-4xl font-bold tracking-tight sm:text-5xl">
              SSH Client for Mac
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Termio is a local-first SSH client for macOS with Apple Keychain
              integration, split-pane workspaces, and Git-based sharing. Manage
              remote servers and local shells in one native terminal app.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={downloadLinks.mac} className={primaryButtonClass}>
                <Apple className="h-4 w-4" />
                Download for Mac
              </a>
              <Link
                href="/blog/terminal-app-with-apple-keychain-support-for-macos/"
                className={secondaryButtonClass}
              >
                Read Keychain workflow guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {[
            {
              icon: KeyRound,
              title: "Apple Keychain Integration",
              description:
                "Store SSH credentials in the native macOS Keychain instead of plain-text config files or cloud-based vaults.",
            },
            {
              icon: Laptop,
              title: "Native macOS Experience",
              description:
                "Built as a desktop app that feels at home on macOS with system-native shortcuts and window management.",
            },
            {
              icon: Terminal,
              title: "SSH + Local Terminal",
              description:
                "Run remote SSH sessions and local shells side by side in the same workspace with split panes.",
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
              Why macOS users need more than Terminal.app
            </h2>
            <p className="mb-5 leading-8 text-muted-foreground">
              The built-in terminal on macOS handles basic tasks well, but it
              does not include an SSH connection manager, workspace
              organization, or credential integration. If you manage more than
              a handful of remote hosts, you end up relying on scattered config
              files and separate tools.
            </p>
            <p className="leading-8 text-muted-foreground">
              Termio brings those pieces together. Organize connections into
              workspaces, store credentials in the Keychain, and share your
              setup through Git without exposing secrets.
            </p>
          </div>

          <div className="rounded-3xl border border-amber/20 bg-gradient-to-b from-amber/8 to-transparent p-7">
            <h2 className="mb-4 text-xl font-semibold tracking-tight">
              What to look for in a macOS SSH client
            </h2>
            <ul className="space-y-3 text-muted-foreground">
              {[
                "Apple Keychain integration for credential storage",
                "Organized workspaces for projects and environments",
                "Split panes for local and remote sessions",
                "Git-based sharing instead of proprietary cloud sync",
                "Per-connection scripts and startup files",
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

      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-3xl font-bold tracking-tight">
            macOS SSH workflow, organized
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card/50 p-6">
              <Terminal className="mb-4 h-5 w-5 text-amber" />
              <h3 className="mb-2 text-xl font-semibold tracking-tight">
                Split panes for real work
              </h3>
              <p className="leading-7 text-muted-foreground">
                Open SSH, local shell, and log tailing side by side. Split
                panes make it easy to compare environments or monitor while
                you deploy.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card/50 p-6">
              <GitBranch className="mb-4 h-5 w-5 text-amber" />
              <h3 className="mb-2 text-xl font-semibold tracking-tight">
                Share setup with Git
              </h3>
              <p className="leading-7 text-muted-foreground">
                Keep workspace structure in plain files and share it through
                Git, while credentials stay in each user&apos;s Keychain.
              </p>
            </div>
          </div>
        </div>
      </section>

      <DownloadCtaSection
        platform="mac"
        headline="Download Termio for Mac"
        description="If you need an SSH client that integrates with macOS Keychain, organizes connections into workspaces, and keeps all data local, give Termio a try."
        secondaryLink={{
          href: "/blog/termius-alternative-for-local-first-teams/",
          label: "Compare alternatives",
        }}
      />

      <RelatedArticles articles={relatedArticles} />
    </main>
  );
}
