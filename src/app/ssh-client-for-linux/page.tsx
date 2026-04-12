import type { Metadata } from "next";
import Link from "next/link";
import {
  Download,
  GitBranch,
  Monitor,
  Package,
  ShieldCheck,
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
  title: "SSH Client for Linux | Termio",
  description:
    "Termio is a local-first SSH client for Linux with system keyring integration, split-pane workspaces, Git-based sharing, and an AI copilot. Distributed as an AppImage.",
  alternates: {
    canonical: `${basePath}/ssh-client-for-linux/`,
  },
  openGraph: {
    title: "SSH Client for Linux | Termio",
    description:
      "A local-first SSH client for Linux with keyring integration, split panes, and organized workspaces.",
    url: `${basePath}/ssh-client-for-linux/`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SSH Client for Linux | Termio",
    description:
      "A local-first SSH client for Linux with keyring integration, split panes, and organized workspaces.",
    images: [`${basePath}/app_screenshot.png`],
  },
};

const relatedArticles = [
  {
    href: "/blog/how-to-store-ssh-credentials-securely-on-linux/",
    title: "How to Store SSH Credentials Securely on Linux",
  },
  {
    href: "/blog/local-first-terminal-security-on-macos-and-linux/",
    title: "Local-First Terminal Security on macOS and Linux",
  },
  {
    href: "/blog/how-to-manage-ssh-connections-without-cloud-sync/",
    title: "How to Manage SSH Connections Without Cloud Sync",
  },
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Termio",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Linux",
    description:
      "Local-first SSH client for Linux with system keyring integration, split-pane workspaces, and Git-based sharing.",
    url: `${siteUrl}${basePath}/ssh-client-for-linux/`,
    downloadUrl: downloadLinks.linux,
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
      { "@type": "ListItem", position: 2, name: "SSH Client for Linux" },
    ],
  },
];

export default function SshClientForLinuxPage() {
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
              Linux
            </Badge>
            <h1 className="mb-5 text-4xl font-bold tracking-tight sm:text-5xl">
              SSH Client for Linux
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Termio is a local-first SSH client for Linux with system keyring
              integration, split-pane workspaces, and Git-based sharing.
              Distributed as an AppImage that works across distributions.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={downloadLinks.linux} className={primaryButtonClass}>
                <Download className="h-4 w-4" />
                Download for Linux
              </a>
              <Link
                href="/blog/how-to-store-ssh-credentials-securely-on-linux/"
                className={secondaryButtonClass}
              >
                Read Linux credential guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              title: "System Keyring Integration",
              description:
                "Store SSH credentials via the Secret Service API and libsecret instead of plain-text files or cloud vaults.",
            },
            {
              icon: Package,
              title: "AppImage Distribution",
              description:
                "A single portable file that runs on Ubuntu, Fedora, Arch, and other distributions without package manager setup.",
            },
            {
              icon: Monitor,
              title: "Works Across Distros",
              description:
                "Consistent experience regardless of desktop environment. Runs on X11 and Wayland.",
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
              Why Linux users need more than a terminal emulator
            </h2>
            <p className="mb-5 leading-8 text-muted-foreground">
              Most Linux terminal emulators handle local shells well, but they
              leave SSH management to config files and command-line flags. When
              you manage dozens of hosts across staging, production, and
              development, that scattered approach slows you down.
            </p>
            <p className="leading-8 text-muted-foreground">
              Termio adds workspace organization, credential storage through
              the system keyring, and per-connection scripts on top of a
              capable terminal. It keeps everything local and shareable through
              Git.
            </p>
          </div>

          <div className="rounded-3xl border border-amber/20 bg-gradient-to-b from-amber/8 to-transparent p-7">
            <h2 className="mb-4 text-xl font-semibold tracking-tight">
              What to look for in a Linux SSH client
            </h2>
            <ul className="space-y-3 text-muted-foreground">
              {[
                "System keyring integration for credential storage",
                "Workspace organization for hosts and environments",
                "Split panes for local and remote sessions",
                "Git-based sharing instead of proprietary cloud sync",
                "Distro-agnostic distribution (AppImage, deb, etc.)",
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
            Linux SSH workflow, organized
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card/50 p-6">
              <Terminal className="mb-4 h-5 w-5 text-amber" />
              <h3 className="mb-2 text-xl font-semibold tracking-tight">
                Split panes for real work
              </h3>
              <p className="leading-7 text-muted-foreground">
                Open SSH sessions, local shells, and log streams side by side.
                No need to juggle separate terminal windows or tmux sessions.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card/50 p-6">
              <GitBranch className="mb-4 h-5 w-5 text-amber" />
              <h3 className="mb-2 text-xl font-semibold tracking-tight">
                Share setup with Git
              </h3>
              <p className="leading-7 text-muted-foreground">
                Keep workspace structure in plain files and share it through
                Git, while each user keeps credentials in their own keyring.
              </p>
            </div>
          </div>
        </div>
      </section>

      <DownloadCtaSection
        platform="linux"
        headline="Download Termio for Linux"
        description="If you need an SSH client that integrates with the Linux system keyring, organizes connections into workspaces, and runs across distros, give Termio a try."
        secondaryLink={{
          href: "/blog/local-first-developer-tools-why-keeping-terminal-data-on-your-machine-matters/",
          label: "Why local-first matters",
        }}
      />

      <RelatedArticles articles={relatedArticles} />
    </main>
  );
}
