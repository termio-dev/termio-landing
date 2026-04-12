"use client";

import { useSyncExternalStore } from "react";

import {
  Apple,
  AppWindow,
  Terminal,
  LayoutGrid,
  Code,
  Sparkles,
  SquareTerminal,
  GripVertical,
  Upload,
  Download,
  Monitor,
  ShieldCheck,
  GitBranch,
  HardDrive,
  CloudOff,
  UserX,
  FileText,
  Bug,
  GitFork,
  Send,
  Check,
  X,
  Minus,
  Quote,
  Boxes,
  Command,
  Cpu,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SiteHeader } from "@/components/SiteHeader";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://termio.dev";
type DownloadPlatform = "mac" | "windows" | "linux";

const downloadLinks = {
  mac: "https://github.com/termio-dev/termio/releases/latest/download/Termio-macos-universal.dmg",
  windows:
    "https://github.com/termio-dev/termio/releases/latest/download/Termio-windows-x64-setup.exe",
  linux:
    "https://github.com/termio-dev/termio/releases/latest/download/Termio-linux-x86_64.AppImage",
};

const downloads = [
  {
    platform: "mac" as DownloadPlatform,
    label: "Download for Mac",
    shortLabel: "macOS",
    href: downloadLinks.mac,
    icon: Apple,
  },
  {
    platform: "windows" as DownloadPlatform,
    label: "Download for Windows",
    shortLabel: "Windows",
    href: downloadLinks.windows,
    icon: AppWindow,
  },
  {
    platform: "linux" as DownloadPlatform,
    label: "Download for Linux",
    shortLabel: "Linux",
    href: downloadLinks.linux,
    icon: Terminal,
  },
];

function detectPlatform(): DownloadPlatform {
  if (typeof navigator === "undefined") {
    return "mac";
  }

  const platform = navigator.platform.toLowerCase();
  const userAgent = navigator.userAgent.toLowerCase();

  if (platform.includes("win") || userAgent.includes("windows")) {
    return "windows";
  }

  if (platform.includes("linux") || userAgent.includes("linux")) {
    return "linux";
  }

  return "mac";
}

function parsePlatformOverride(platform: string | null): DownloadPlatform | null {
  if (platform === "windows" || platform === "mac" || platform === "linux") {
    return platform;
  }

  return null;
}

function getPlatformOverride(): DownloadPlatform | null {
  if (typeof window === "undefined") {
    return null;
  }

  return parsePlatformOverride(
    new URLSearchParams(window.location.search).get("platform"),
  );
}

function getResolvedPlatform(): DownloadPlatform {
  return getPlatformOverride() ?? detectPlatform();
}

function subscribeToPlatform(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const historyWindow = window as Window & {
    __termioLocationPatched?: boolean;
  };

  if (!historyWindow.__termioLocationPatched) {
    const { pushState, replaceState } = window.history;

    window.history.pushState = function (...args) {
      const result = pushState.apply(this, args);
      window.dispatchEvent(new Event("termio-locationchange"));
      return result;
    };

    window.history.replaceState = function (...args) {
      const result = replaceState.apply(this, args);
      window.dispatchEvent(new Event("termio-locationchange"));
      return result;
    };

    historyWindow.__termioLocationPatched = true;
  }

  window.addEventListener("popstate", callback);
  window.addEventListener("termio-locationchange", callback);

  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener("termio-locationchange", callback);
  };
}

function getOrderedDownloads(platform: DownloadPlatform) {
  const preferred = downloads.find((item) => item.platform === platform);
  const fallback = downloads.filter((item) => item.platform !== platform);

  return preferred ? [preferred, ...fallback] : downloads;
}

const features = [
  {
    icon: LayoutGrid,
    title: "Organized Workspaces",
    description:
      "Group connections into workspaces with folders and favorites. Switch contexts instantly.",
  },
  {
    icon: Code,
    title: "Code Snippets & Scripts",
    description:
      "Attach reusable scripts to any connection. One click to execute — no copy-pasting commands.",
  },
  {
    icon: Sparkles,
    title: "AI Copilot",
    description:
      "Built-in AI assistant with terminal context, tool execution, and per-connection memory.",
  },
  {
    icon: SquareTerminal,
    title: "Command Composer",
    description:
      "Write multi-line scripts in a full code editor, then stage or run them in the terminal.",
  },
  {
    icon: GripVertical,
    title: "Multi-Tiling",
    description:
      "Split terminals horizontally and vertically. Compose any layout with draggable panes.",
  },
  {
    icon: Upload,
    title: "Drag & Drop Upload",
    description:
      "Drop any file onto a connection to upload it. No separate SFTP client needed.",
  },
];

const faqItems = [
  {
    q: "Is Termio free?",
    a: "Yes. Termio is completely free to use with no feature gates, usage limits, or premium tiers.",
  },
  {
    q: "Where is my data stored?",
    a: "Everything is stored locally on your machine in ~/.termio. Connections, files, and settings never leave your computer.",
  },
  {
    q: "How do I share connections with my team?",
    a: "Workspaces are plain text files. Commit them to a Git repo, share via any VCS, or simply copy the files. No proprietary sync needed.",
  },
  {
    q: "Are my credentials secure?",
    a: "Credentials are stored in your native OS credential store, such as Apple Keychain, Secret Service on Linux, or Windows Credential Manager. They never leave your machine.",
  },
  {
    q: "Does the AI copilot send data externally?",
    a: "The AI copilot connects to the API provider you configure (e.g. OpenAI). Terminal context is sent only when you explicitly interact with the copilot. No data is sent otherwise.",
  },
  {
    q: "What platforms are supported?",
    a: "Termio is available on macOS, Windows, and Linux.",
  },
  {
    q: "How is Termio different from Termius?",
    a: "Termius is cloud-based and requires an account with a paid subscription. Termio is local-only, free, and lets you share via Git instead of proprietary sync.",
  },
  {
    q: "Can I use my own AI model?",
    a: "Yes. Termio works with any OpenAI-compatible API. Point it to your own endpoint, a local model, or any compatible provider.",
  },
] as const;

const platformHighlights: Record<
  DownloadPlatform,
  {
    eyebrow: string;
    title: string;
    description: string;
    feature: {
      icon: typeof Terminal;
      title: string;
      points: string[];
    };
  }
> = {
  windows: {
    eyebrow: "Windows-native workflows",
    title: "Built for modern Windows terminals.",
    description:
      "Run WSL and PowerShell in the same workspace. Termio makes Windows a first-class environment for mixed shell workflows.",
    feature: {
      icon: Boxes,
      title: "Windows Subsystem for Linux",
      points: [
        "Launch and organize WSL distributions alongside SSH and local sessions",
        "Keep Linux-based tooling and native PowerShell workflows in the same workspace",
        "Move between Windows apps, PowerShell, and Linux shells without switching terminals",
      ],
    },
  },
  mac: {
    eyebrow: "macOS-native workflows",
    title: "Feels at home on macOS.",
    description:
      "Keep credentials in Apple Keychain. Secrets stay on your Mac, not in the cloud.",
    feature: {
      icon: Command,
      title: "Apple Keychain Storage",
      points: [
        "Store credentials securely in the native macOS Keychain",
        "Keep secrets on your machine instead of syncing them through a cloud account",
        "Fit into the standard macOS security model without extra setup",
      ],
    },
  },
  linux: {
    eyebrow: "Linux-native workflows",
    title: "Made for Linux operators and builders.",
    description:
      "Store credentials in your system keyring through Secret Service. Local-first security, no cloud sync.",
    feature: {
      icon: Cpu,
      title: "System Keyring Storage",
      points: [
        "Store credentials securely through Secret Service on the local machine",
        "Keep secrets out of cloud services and third-party sync layers",
        "Stay aligned with native Linux desktop security practices",
      ],
    },
  },
};

function AppScreenshot() {
  return (
    <div className="rounded-lg border border-border bg-[#111111] overflow-hidden shadow-2xl">
      {/* macOS title bar */}
      <div className="flex items-center px-4 py-2.5 bg-[#141414] border-b border-border">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#f87171]" />
          <div className="w-3 h-3 rounded-full bg-[#e8a838]" />
          <div className="w-3 h-3 rounded-full bg-[#4ade80]" />
        </div>
        <div className="flex-1 text-center text-xs text-[#888888] -ml-12">
          Termio
        </div>
      </div>
      {/* Screenshot placeholder — replace src with your actual screenshot */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${basePath}/app_screenshot.png`}
        alt="Termio desktop terminal and SSH manager showing organized workspaces and split panes"
        className="block h-auto w-full bg-[#111111]"
      />
    </div>
  );
}

function ComparisonCell({
  value,
  highlight,
}: {
  value: boolean | string;
  highlight?: boolean;
}) {
  if (value === true) {
    return (
      <Check
        className={`w-4 h-4 mx-auto ${highlight ? "text-[#4ade80]" : "text-[#4ade80]/60"}`}
      />
    );
  }
  if (value === "partial") {
    return <Minus className="w-4 h-4 mx-auto text-muted-foreground" />;
  }
  return <X className="w-4 h-4 mx-auto text-muted-foreground/30" />;
}

const siteRoot = `${siteUrl}${basePath}`;
const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Termio",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "macOS, Windows, Linux",
    description:
      "Desktop terminal app and SSH client with split-pane workspaces, WSL support, native OS credential storage, per-connection files, and AI copilot.",
    url: `${siteRoot}/`,
    downloadUrl: downloadLinks.windows,
    image: `${siteRoot}/app_screenshot.png`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Termio",
    url: `${siteRoot}/`,
    logo: `${siteRoot}/app_screenshot.png`,
  },
];

export default function Home() {
  const preferredPlatform = useSyncExternalStore<DownloadPlatform>(
    subscribeToPlatform,
    getResolvedPlatform,
    () => "mac",
  );
  const orderedDownloads = getOrderedDownloads(preferredPlatform);
  const primaryDownload = orderedDownloads[0];
  const platformHighlight = platformHighlights[preferredPlatform];

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteHeader
        active="home"
        ctaHref={primaryDownload.href}
        ctaLabel={primaryDownload.label}
        ctaIcon={Download}
      />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-14">
            <Badge
              variant="outline"
              className="mb-5 text-muted-foreground border-border/60"
            >
              <Monitor className="w-3 h-3 mr-1.5" />
              macOS · Linux · Windows
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.08] mb-5">
              Your terminal, <span className="text-amber">organized.</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              A desktop terminal and SSH manager with organized workspaces,
              built-in AI copilot, and git-based collaboration. Fully local —
              your data never leaves your machine.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              {orderedDownloads.map((item, index) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className={cn(
                      buttonVariants({
                        size: "lg",
                        variant: index === 0 ? "default" : "secondary",
                      }),
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {index === 0 ? item.label : item.shortLabel}
                  </a>
                );
              })}
            </div>
          </div>

          <AppScreenshot />
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-[radial-gradient(circle_at_top_left,rgba(232,168,56,0.16),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(74,222,128,0.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-8 sm:p-10">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber/70 to-transparent" />
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div className="max-w-md">
                <Badge
                  variant="outline"
                  className="mb-4 border-amber/30 bg-background/30 text-amber"
                >
                  {platformHighlight.eyebrow}
                </Badge>
                <h2 className="text-3xl font-bold tracking-tight mb-3">
                  {platformHighlight.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {platformHighlight.description}
                </p>
              </div>
              <div className="max-w-lg">
                <div className="rounded-2xl border border-amber/25 bg-background/55 p-6 backdrop-blur-sm shadow-[0_24px_80px_-48px_rgba(232,168,56,0.6)]">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber/30 bg-amber/10">
                      <platformHighlight.feature.icon className="w-5 h-5 text-amber" />
                    </div>
                    <h3 className="font-semibold leading-tight">
                      {platformHighlight.feature.title}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {platformHighlight.feature.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground"
                      >
                        <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator className="max-w-5xl mx-auto" />

      {/* Privacy & Collaboration */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight mb-2">
            Your data, your rules.
          </h2>
          <p className="text-muted-foreground mb-10">
            No cloud. No accounts. Just files on your machine.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Local-Only */}
            <div className="relative rounded-lg border border-[#4ade80]/20 bg-gradient-to-b from-[#4ade80]/5 to-transparent p-6">
              <div className="flex items-center gap-2.5 mb-4">
                <ShieldCheck className="w-5 h-5 text-green" />
                <h3 className="font-semibold">Local-Only Data</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                Termio never sends your data to the cloud. No account, no login,
                no centralized storage. Connections, credentials, and files stay
                on your machine.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2.5 text-sm">
                  <CloudOff className="w-4 h-4 text-green mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">
                    No cloud sync — zero network exposure
                  </span>
                </li>
                <li className="flex items-start gap-2.5 text-sm">
                  <UserX className="w-4 h-4 text-green mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">
                    No account or login system
                  </span>
                </li>
                <li className="flex items-start gap-2.5 text-sm">
                  <HardDrive className="w-4 h-4 text-green mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">
                    All secrets stored locally on disk
                  </span>
                </li>
              </ul>
            </div>

            {/* Git-Based Collaboration */}
            <div className="relative rounded-lg border border-amber/20 bg-gradient-to-b from-amber/5 to-transparent p-6">
              <div className="flex items-center gap-2.5 mb-4">
                <GitBranch className="w-5 h-5 text-amber" />
                <h3 className="font-semibold">Git-Based Collaboration</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                Workspaces are plain text files. Share them through Git, any
                VCS, or simple file transfer — no proprietary sync service
                needed.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2.5 text-sm">
                  <FileText className="w-4 h-4 text-amber mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">
                    Collections stored as plain text files
                  </span>
                </li>
                <li className="flex items-start gap-2.5 text-sm">
                  <GitFork className="w-4 h-4 text-amber mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">
                    Share via GitHub, GitLab, or self-hosted repos
                  </span>
                </li>
                <li className="flex items-start gap-2.5 text-sm">
                  <Send className="w-4 h-4 text-amber mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">
                    Works with any VCS or file transfer method
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Separator className="max-w-5xl mx-auto" />

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight mb-2">Features</h2>
          <p className="text-muted-foreground mb-10">
            Everything you need to manage terminals and connections.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-5 rounded-lg border border-border bg-card hover:border-amber/30 transition-colors"
              >
                <f.icon className="w-5 h-5 text-amber mb-3" />
                <h3 className="font-semibold mb-1.5">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator className="max-w-5xl mx-auto" />

      {/* Comparison */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight mb-2">
            How Termio compares
          </h2>
          <p className="text-muted-foreground mb-10">
            See what sets Termio apart from other terminal tools.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground w-[240px]">
                    Feature
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-amber">
                    Termio
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">
                    Warp
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">
                    Termius
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    feature: "Local-only data",
                    termio: true,
                    warp: false,
                    termius: false,
                  },
                  {
                    feature: "No account required",
                    termio: true,
                    warp: false,
                    termius: false,
                  },
                  {
                    feature: "Git-based sharing",
                    termio: true,
                    warp: false,
                    termius: false,
                  },
                  {
                    feature: "SSH connection manager",
                    termio: true,
                    warp: false,
                    termius: true,
                  },
                  {
                    feature: "Organized workspaces",
                    termio: true,
                    warp: false,
                    termius: true,
                  },
                  {
                    feature: "Per-connection scripts",
                    termio: true,
                    warp: false,
                    termius: "partial",
                  },
                  {
                    feature: "AI copilot",
                    termio: true,
                    warp: true,
                    termius: false,
                  },
                  {
                    feature: "Command composer",
                    termio: true,
                    warp: "partial",
                    termius: false,
                  },
                  {
                    feature: "Multi-tiling / split panes",
                    termio: true,
                    warp: true,
                    termius: false,
                  },
                  {
                    feature: "Drag & drop file upload",
                    termio: true,
                    warp: false,
                    termius: true,
                  },
                  {
                    feature: "Free to use",
                    termio: true,
                    warp: "partial",
                    termius: false,
                  },
                ].map((row, i) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-border ${i % 2 === 0 ? "bg-card/50" : ""}`}
                  >
                    <td className="py-3 px-4 text-foreground">{row.feature}</td>
                    <td className="py-3 px-4 text-center">
                      <ComparisonCell value={row.termio} highlight />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <ComparisonCell value={row.warp} />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <ComparisonCell value={row.termius} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Separator className="max-w-5xl mx-auto" />

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight mb-2">FAQ</h2>
          <p className="text-muted-foreground mb-10">
            Common questions about Termio.
          </p>
          <div className="grid sm:grid-cols-2 gap-x-14 gap-y-10">
            {faqItems.map((item) => (
              <div key={item.q}>
                <h3 className="font-semibold mb-2">{item.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator className="max-w-5xl mx-auto" />

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight mb-2">
            What users say
          </h2>
          <p className="text-muted-foreground mb-10">
            Feedback from developers using Termio.
          </p>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                quote:
                  "Finally a terminal manager that doesn't want my data in the cloud. I switched from Termius and never looked back.",
                name: "Alex K.",
                role: "DevOps Engineer",
              },
              {
                quote:
                  "The command composer alone saves me 20 minutes a day. Writing multi-line scripts and staging them in one click is a game changer.",
                name: "Maria S.",
                role: "Backend Developer",
              },
              {
                quote:
                  "I manage 40+ servers and Termio's workspace organization keeps everything sane. Plus sharing configs via Git with my team just works.",
                name: "James L.",
                role: "SRE Lead",
              },
            ].map((t) => (
              <div
                key={t.name}
                className="p-5 rounded-lg border border-border bg-card"
              >
                <Quote className="w-4 h-4 text-amber/30 mb-3" />
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {t.quote}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber/10 flex items-center justify-center text-xs font-semibold text-amber">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator className="max-w-5xl mx-auto" />

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-3">
            Ready to try Termio?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Download for your platform and get started in seconds.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {orderedDownloads.map((item, index) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={cn(
                    buttonVariants({
                      size: "lg",
                      variant: index === 0 ? "default" : "secondary",
                    }),
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {index === 0 ? item.label : item.shortLabel}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-amber" />
            <span>Termio</span>
          </div>
          <span>Built with ❤️ for developers</span>
          <a
            href="https://github.com/termio-dev/termio/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <Bug className="w-4 h-4" />
            <span>Found an issue?</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
