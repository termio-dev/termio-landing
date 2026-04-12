import type { Metadata } from "next";
import Link from "next/link";
import {
  AppWindow,
  ArrowRight,
  Boxes,
  Download,
  GitBranch,
  MonitorCog,
  ShieldCheck,
  Terminal,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { SiteHeader } from "@/components/SiteHeader";

const basePath = process.env.BASE_PATH ?? "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://termio.dev";
const windowsDownloadUrl =
  "https://github.com/termio-dev/termio/releases/latest/download/Termio-windows-x64-setup.exe";
const primaryButtonClass =
  "inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/80";
const secondaryButtonClass =
  "inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-secondary px-2.5 text-sm font-medium text-secondary-foreground transition-all hover:bg-secondary/80";

export const metadata: Metadata = {
  title: "SSH Client for Windows | Termio",
  description:
    "Termio is a local-first SSH client for Windows with WSL support, PowerShell integration, split-pane workspaces, Git-based sharing, and native credential storage.",
  alternates: {
    canonical: `${basePath}/ssh-client-for-windows/`,
  },
  openGraph: {
    title: "SSH Client for Windows | Termio",
    description:
      "A local-first SSH client for Windows with WSL, PowerShell, split panes, and organized workspaces.",
    url: `${basePath}/ssh-client-for-windows/`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "SSH Client for Windows | Termio",
    description:
      "A local-first SSH client for Windows with WSL, PowerShell, split panes, and organized workspaces.",
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
    operatingSystem: "Windows",
    description:
      "Local-first SSH client for Windows with WSL support, PowerShell integration, split-pane workspaces, and native credential storage.",
    url: `${siteUrl}${basePath}/ssh-client-for-windows/`,
    downloadUrl: windowsDownloadUrl,
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
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}${basePath}/` },
      { "@type": "ListItem", position: 2, name: "SSH Client for Windows" },
    ],
  },
];

export default function SshClientForWindowsPage() {
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
              SSH Client for Windows
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Termio is a local-first SSH client for Windows with WSL support,
              PowerShell integration, split-pane workspaces, and native
              credential storage. Keep remote servers, Windows automation, and
              Linux tooling in one terminal workspace.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={windowsDownloadUrl}
                className={primaryButtonClass}
              >
                <AppWindow className="h-4 w-4" />
                Download for Windows
              </a>
              <Link
                href="/blog/best-terminal-app-for-windows-developers-using-wsl/"
                className={secondaryButtonClass}
              >
                Read Windows workflow guide
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
              title: "WSL Support",
              description:
                "Run WSL distributions beside SSH sessions so Linux tooling stays close to the rest of your Windows workflow.",
            },
            {
              icon: MonitorCog,
              title: "PowerShell Integration",
              description:
                "Keep native PowerShell tasks in the same workspace as your remote hosts and WSL panes.",
            },
            {
              icon: ShieldCheck,
              title: "Native Credential Storage",
              description:
                "Store secrets in the Windows credential system instead of pushing connection data through cloud sync.",
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
              Why Windows users need more than a basic SSH client
            </h2>
            <p className="mb-5 leading-8 text-muted-foreground">
              A modern Windows workflow usually includes more than remote SSH.
              You may build in WSL, run native scripts in PowerShell, and keep
              one or more remote sessions open for staging or production. A
              basic SSH launcher does not connect those contexts well.
            </p>
            <p className="leading-8 text-muted-foreground">
              Termio is designed to keep those environments together. That makes
              it easier to move between local and remote work without juggling
              separate apps or disconnected terminal windows.
            </p>
          </div>

          <div className="rounded-3xl border border-amber/20 bg-gradient-to-b from-amber/8 to-transparent p-7">
            <h2 className="mb-4 text-xl font-semibold tracking-tight">
              What to look for in a Windows SSH client
            </h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                <span>WSL and PowerShell in the same workspace</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                <span>Organized SSH workspaces for projects and environments</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                <span>Split panes for local and remote tasks</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                <span>Credential storage that stays local to Windows</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                <span>Git-friendly sharing instead of proprietary sync</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-3xl font-bold tracking-tight">
            Windows SSH workflow, organized
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card/50 p-6">
              <Terminal className="mb-4 h-5 w-5 text-amber" />
              <h3 className="mb-2 text-xl font-semibold tracking-tight">
                Split panes for real work
              </h3>
              <p className="leading-7 text-muted-foreground">
                Keep one pane for WSL, one for PowerShell, and one for SSH. This
                makes Windows development feel coherent instead of fragmented.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card/50 p-6">
              <GitBranch className="mb-4 h-5 w-5 text-amber" />
              <h3 className="mb-2 text-xl font-semibold tracking-tight">
                Share setup with Git
              </h3>
              <p className="leading-7 text-muted-foreground">
                Keep workspace structure in plain files and share it through Git,
                while each user keeps credentials in native OS storage.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl rounded-3xl border border-border bg-[radial-gradient(circle_at_top_left,rgba(232,168,56,0.16),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-8 sm:p-10">
          <div className="max-w-2xl">
            <h2 className="mb-3 text-3xl font-bold tracking-tight">
              Download Termio for Windows
            </h2>
            <p className="mb-8 leading-8 text-muted-foreground">
              If you are searching for a better SSH client for Windows, start
              with a setup that supports WSL, PowerShell, and remote sessions in
              one local-first workspace.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={windowsDownloadUrl}
                className={primaryButtonClass}
              >
                <Download className="h-4 w-4" />
                Download for Windows
              </a>
              <Link
                href="/blog/termius-alternative-for-local-first-teams/"
                className={secondaryButtonClass}
              >
                Compare alternatives
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-6 text-2xl font-bold tracking-tight">
            Related articles
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {relatedArticles.map((article) => (
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
    </main>
  );
}
