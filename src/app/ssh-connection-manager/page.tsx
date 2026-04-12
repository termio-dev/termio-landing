import type { Metadata } from "next";
import {
  FileText,
  FolderOpen,
  GitBranch,
  LayoutGrid,
  ShieldCheck,
  Terminal,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { DownloadCtaSection } from "@/components/DownloadCtaSection";
import { RelatedArticles } from "@/components/RelatedArticles";
import { SiteHeader } from "@/components/SiteHeader";
import { basePath, siteUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "SSH Connection Manager | Termio",
  description:
    "Organize SSH connections into workspaces with folders, favorites, per-connection scripts, and native credential storage. Free and local-first.",
  alternates: {
    canonical: `${basePath}/ssh-connection-manager/`,
  },
  openGraph: {
    title: "SSH Connection Manager | Termio",
    description:
      "Organize SSH connections into workspaces with per-connection scripts and native credential storage.",
    url: `${basePath}/ssh-connection-manager/`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SSH Connection Manager | Termio",
    description:
      "Organize SSH connections into workspaces with per-connection scripts and native credential storage.",
    images: [`${basePath}/app_screenshot.png`],
  },
};

const relatedArticles = [
  {
    href: "/blog/how-to-organize-ssh-servers-by-workspace/",
    title: "How to Organize SSH Servers by Workspace",
  },
  {
    href: "/blog/how-to-manage-ssh-connections-without-cloud-sync/",
    title: "How to Manage SSH Connections Without Cloud Sync",
  },
  {
    href: "/blog/how-to-share-terminal-and-ssh-setups-with-git/",
    title: "How to Share Terminal and SSH Setups with Git",
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
      "SSH connection manager with workspace organization, per-connection scripts, and native OS credential storage.",
    url: `${siteUrl}${basePath}/ssh-connection-manager/`,
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
      { "@type": "ListItem", position: 2, name: "SSH Connection Manager" },
    ],
  },
];

export default function SshConnectionManagerPage() {
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
              SSH Connection Manager
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Organize SSH connections into workspaces with folders, favorites,
              and per-connection scripts. Termio stores credentials in native OS
              storage and keeps your setup shareable through Git.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {[
            {
              icon: LayoutGrid,
              title: "Workspace Organization",
              description:
                "Group connections by project, environment, or team. Switch between workspaces without losing context.",
            },
            {
              icon: FileText,
              title: "Per-Connection Scripts",
              description:
                "Attach startup scripts, environment variables, and configuration files to each SSH connection.",
            },
            {
              icon: ShieldCheck,
              title: "Native Credential Storage",
              description:
                "Credentials stay in macOS Keychain, Windows Credential Manager, or Linux keyring. Nothing leaves your machine.",
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
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            How connection management works in Termio
          </h2>
          <p className="mb-10 max-w-3xl leading-8 text-muted-foreground">
            Instead of maintaining scattered SSH config files, Termio gives you
            a visual workspace where each connection is a first-class object
            with its own configuration, scripts, and credentials.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: FolderOpen,
                step: "1",
                title: "Create a workspace",
                description:
                  "Group related connections together. One workspace per project, per client, or per environment.",
              },
              {
                icon: Terminal,
                step: "2",
                title: "Add connections",
                description:
                  "Add SSH hosts with their connection details. Attach startup scripts and environment variables.",
              },
              {
                icon: GitBranch,
                step: "3",
                title: "Share via Git",
                description:
                  "Export workspace structure as plain files. Share through Git while credentials stay in each user's OS keyring.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-border bg-card/50 p-6"
              >
                <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-lg bg-amber/10 text-sm font-bold text-amber">
                  {item.step}
                </div>
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

      <DownloadCtaSection
        platform="mac"
        headline="Try the SSH connection manager"
        description="Organize your SSH hosts into workspaces, attach per-connection scripts, and share setups through Git. Free on macOS, Windows, and Linux."
        secondaryLink={{
          href: "/blog/how-to-organize-ssh-servers-by-workspace/",
          label: "Read the workspace guide",
        }}
      />

      <RelatedArticles articles={relatedArticles} />
    </main>
  );
}
