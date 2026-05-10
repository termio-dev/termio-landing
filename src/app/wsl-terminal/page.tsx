import type { Metadata } from "next";
import Link from "next/link";
import {
  AppWindow,
  Boxes,
  Download,
  GitBranch,
  MonitorCog,
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
  title: "Best WSL Terminal | Termio",
  description:
    "Run WSL distributions alongside PowerShell and SSH in one terminal workspace. Termio is a local-first WSL terminal for Windows with split panes and credential storage.",
  alternates: {
    canonical: `${basePath}/wsl-terminal/`,
  },
  openGraph: {
    title: "Best WSL Terminal | Termio",
    description:
      "Run WSL, PowerShell, and SSH in one terminal workspace with split panes and native credential storage.",
    url: `${basePath}/wsl-terminal/`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best WSL Terminal | Termio",
    description:
      "Run WSL, PowerShell, and SSH in one terminal workspace with split panes and native credential storage.",
    images: [`${basePath}/app_screenshot.png`],
  },
};

const relatedArticles = [
  {
    href: "/blog/best-terminal-app-for-windows-developers-using-wsl/",
    title: "Best Terminal App for Windows Developers Using WSL",
  },
  {
    href: "/blog/wsl-vs-powershell-when-to-use-each-on-windows/",
    title: "WSL vs PowerShell: When to Use Each on Windows",
  },
  {
    href: "/blog/wsl-and-powershell-in-one-workspace/",
    title: "WSL and PowerShell in One Workspace",
  },
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Termio",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Windows",
    description:
      "WSL terminal for Windows with split-pane workspaces, PowerShell integration, SSH management, and native credential storage.",
    url: `${siteUrl}${basePath}/wsl-terminal/`,
    downloadUrl: downloadLinks.windows,
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
      { "@type": "ListItem", position: 2, name: "Best WSL Terminal" },
    ],
  },
];

export default function WslTerminalPage() {
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
              Windows
            </Badge>
            <h1 className="mb-5 text-4xl font-bold tracking-tight sm:text-5xl">
              Best WSL Terminal
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Run WSL distributions alongside PowerShell and SSH sessions in one
              terminal workspace. Termio keeps Linux tooling, Windows automation,
              and remote servers together with split panes and native credential
              storage.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={downloadLinks.windows} className={primaryButtonClass}>
                <AppWindow className="h-4 w-4" />
                Download for Windows
              </a>
              <Link
                href="/blog/best-terminal-app-for-windows-developers-using-wsl/"
                className={secondaryButtonClass}
              >
                Read the WSL workflow guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {[
            {
              icon: Boxes,
              title: "WSL Distribution Support",
              description:
                "Run Ubuntu, Debian, Fedora, or any installed WSL distribution directly in a terminal pane.",
            },
            {
              icon: MonitorCog,
              title: "PowerShell Integration",
              description:
                "Keep native PowerShell tasks in the same workspace alongside WSL and SSH panes.",
            },
            {
              icon: ShieldCheck,
              title: "Native Credential Storage",
              description:
                "SSH credentials stay in the Windows credential system. No cloud sync, no plain-text files.",
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
              Why WSL needs a better terminal
            </h2>
            <p className="mb-5 leading-8 text-muted-foreground">
              Windows Terminal handles WSL tabs, but it does not organize SSH
              connections, store credentials natively, or provide workspace
              management. When your workflow spans WSL, PowerShell, and remote
              hosts, a basic tab-based terminal falls short.
            </p>
            <p className="leading-8 text-muted-foreground">
              Termio treats WSL panes as first-class citizens alongside SSH
              and PowerShell. Split the screen, organize by project, and keep
              credentials in Windows storage instead of config files.
            </p>
          </div>

          <div className="rounded-3xl border border-amber/20 bg-gradient-to-b from-amber/8 to-transparent p-7">
            <h2 className="mb-4 text-xl font-semibold tracking-tight">
              What to look for in a WSL terminal
            </h2>
            <ul className="space-y-3 text-muted-foreground">
              {[
                "WSL, PowerShell, and SSH in the same workspace",
                "Split panes for cross-environment workflows",
                "Organized workspaces for projects and environments",
                "Native Windows credential storage",
                "Git-based sharing for team setup consistency",
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
            WSL workflow, organized
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card/50 p-6">
              <Terminal className="mb-4 h-5 w-5 text-amber" />
              <h3 className="mb-2 text-xl font-semibold tracking-tight">
                Split panes across environments
              </h3>
              <p className="leading-7 text-muted-foreground">
                Keep one pane for WSL, one for PowerShell, and one for SSH.
                No need to juggle tabs or separate windows.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card/50 p-6">
              <GitBranch className="mb-4 h-5 w-5 text-amber" />
              <h3 className="mb-2 text-xl font-semibold tracking-tight">
                Share setup with Git
              </h3>
              <p className="leading-7 text-muted-foreground">
                Export workspace layout and connection config as plain files.
                Share through Git while credentials stay in Windows storage.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl rounded-3xl border border-amber/20 bg-gradient-to-b from-amber/8 to-transparent p-7">
          <h2 className="mb-3 text-2xl font-semibold tracking-tight">
            Looking for a Windows SSH client?
          </h2>
          <p className="mb-4 max-w-3xl leading-7 text-muted-foreground">
            Termio is also a free, local-first Windows SSH client with split
            panes, an SSH connection manager, and Windows Credential Manager
            integration. WSL distributions, PowerShell, and remote SSH sessions
            live together in the same workspace.
          </p>
          <Link
            href="/ssh-client-for-windows/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-amber hover:text-foreground transition-colors"
          >
            See the Windows SSH client page →
          </Link>
        </div>
      </section>

      <DownloadCtaSection
        platform="windows"
        headline="Download the WSL terminal"
        description="If you need a terminal that runs WSL, PowerShell, and SSH sessions in one organized workspace with split panes, give Termio a try."
        secondaryLink={{
          href: "/blog/wsl-and-powershell-in-one-workspace/",
          label: "WSL + PowerShell guide",
        }}
      />

      <RelatedArticles articles={relatedArticles} />
    </main>
  );
}
