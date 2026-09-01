import Link from "next/link";
import {
  Boxes,
  Bug,
  Check,
  CloudOff,
  Code,
  Command,
  Cpu,
  FileText,
  GitBranch,
  GitFork,
  GripVertical,
  HardDrive,
  LayoutGrid,
  Minus,
  Monitor,
  Send,
  ShieldCheck,
  Sparkles,
  SquareTerminal,
  Terminal,
  Upload,
  UserX,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { DownloadButtons } from "@/components/DownloadButtons";
import { SiteHeader } from "@/components/SiteHeader";
import { WhatsNewSection } from "@/components/WhatsNewSection";
import { Separator } from "@/components/ui/separator";
import { latestRelease } from "@/lib/changelog";
import {
  basePath,
  downloadLinks,
  siteUrl,
} from "@/lib/constants";

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

const platformHighlights = [
  {
    id: "mac",
    eyebrow: "macOS-native workflows",
    title: "Feels at home on macOS.",
    description:
      "Keep credentials in Apple Keychain. Secrets stay on your Mac, not in the cloud.",
    icon: Command,
    featureTitle: "Apple Keychain Storage",
    points: [
      "Store credentials securely in the native macOS Keychain",
      "Keep secrets on your machine instead of syncing them through a cloud account",
      "Fit into the standard macOS security model without extra setup",
    ],
    cta: { href: "/ssh-client-for-mac/", label: "SSH client for Mac" },
  },
  {
    id: "windows",
    eyebrow: "Windows-native workflows",
    title: "Built for modern Windows terminals.",
    description:
      "Run WSL and PowerShell in the same workspace. Termio makes Windows a first-class environment for mixed shell workflows.",
    icon: Boxes,
    featureTitle: "Windows Subsystem for Linux",
    points: [
      "Launch and organize WSL distributions alongside SSH and local sessions",
      "Keep Linux-based tooling and native PowerShell workflows in the same workspace",
      "Move between Windows apps, PowerShell, and Linux shells without switching terminals",
    ],
    cta: { href: "/ssh-client-for-windows/", label: "SSH client for Windows" },
  },
  {
    id: "linux",
    eyebrow: "Linux-native workflows",
    title: "Made for Linux operators and builders.",
    description:
      "Store credentials in your system keyring through Secret Service. Local-first security, no cloud sync.",
    icon: Cpu,
    featureTitle: "System Keyring Storage",
    points: [
      "Store credentials securely through Secret Service on the local machine",
      "Keep secrets out of cloud services and third-party sync layers",
      "Stay aligned with native Linux desktop security practices",
    ],
    cta: { href: "/ssh-client-for-linux/", label: "SSH client for Linux" },
  },
] as const;

const exploreLinks = {
  byPlatform: [
    { href: "/ssh-client-for-mac/", label: "SSH client for Mac" },
    { href: "/ssh-client-for-windows/", label: "SSH client for Windows" },
    { href: "/ssh-client-for-linux/", label: "SSH client for Linux" },
    { href: "/wsl-terminal/", label: "WSL terminal for Windows" },
  ],
  byFeature: [
    { href: "/ssh-connection-manager/", label: "SSH connection manager" },
    { href: "/terminal-with-split-panes/", label: "Terminal with split panes" },
  ],
  vsAlternatives: [
    { href: "/termio-vs-warp/", label: "Termio vs Warp" },
    { href: "/termio-vs-termius/", label: "Termio vs Termius" },
    { href: "/termio-vs-iterm2/", label: "Termio vs iTerm2" },
  ],
  guides: [
    {
      href: "/blog/best-ssh-client-for-developers-on-macos-windows-and-linux/",
      label: "Best SSH client for developers",
    },
    {
      href: "/blog/termius-alternative-for-local-first-teams/",
      label: "Termius alternative for local-first teams",
    },
    {
      href: "/blog/how-to-organize-ssh-servers-by-workspace/",
      label: "How to organize SSH servers by workspace",
    },
    { href: "/blog/", label: "All articles" },
  ],
};

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
    softwareVersion: latestRelease.version,
    datePublished: latestRelease.date,
    releaseNotes: `${siteRoot}/#whats-new`,
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
    sameAs: [
      "https://github.com/termio-dev/termio",
      "https://github.com/termio-dev",
    ],
  },
];

function AppScreenshot() {
  return (
    <div className="rounded-lg border border-border bg-[#111111] overflow-hidden shadow-2xl">
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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${basePath}/app_screenshot.png`}
        alt="Termio desktop terminal and SSH manager showing organized workspaces and split panes"
        width={1600}
        height={900}
        fetchPriority="high"
        decoding="async"
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
        aria-label="Yes"
        className={`w-4 h-4 mx-auto ${highlight ? "text-[#4ade80]" : "text-[#4ade80]/60"}`}
      />
    );
  }
  if (value === "partial") {
    return (
      <Minus
        aria-label="Partial"
        className="w-4 h-4 mx-auto text-muted-foreground"
      />
    );
  }
  return (
    <X
      aria-label="No"
      className="w-4 h-4 mx-auto text-muted-foreground/30"
    />
  );
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <link
        rel="preload"
        as="image"
        href={`${basePath}/app_screenshot.png`}
        fetchPriority="high"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteHeader active="home" />

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
              A free, local-first desktop terminal and SSH client with
              organized workspaces, built-in AI copilot, and Git-based
              collaboration. Your data never leaves your machine.
            </p>
            <div className="mt-8">
              <DownloadButtons />
            </div>
          </div>

          <AppScreenshot />
        </div>
      </section>

      {/* Platform highlights — all three rendered statically */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight mb-3">
              Built for your platform.
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Native security and shell integration on macOS, Windows, and
              Linux. One terminal app for every environment your team works in.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {platformHighlights.map((p) => {
              const FeatureIcon = p.icon;
              return (
                <article
                  key={p.id}
                  className="rounded-2xl border border-amber/20 bg-gradient-to-b from-amber/5 to-transparent p-6"
                >
                  <Badge
                    variant="outline"
                    className="mb-4 border-amber/30 bg-background/30 text-amber"
                  >
                    {p.eyebrow}
                  </Badge>
                  <h3 className="mb-2 text-xl font-semibold tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>

                  <div className="rounded-xl border border-border bg-background/55 p-4 mb-5">
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-amber/30 bg-amber/10">
                        <FeatureIcon className="h-4 w-4 text-amber" />
                      </div>
                      <h4 className="text-sm font-semibold leading-tight">
                        {p.featureTitle}
                      </h4>
                    </div>
                    <ul className="space-y-2">
                      {p.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <div className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={p.cta.href}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-amber hover:text-foreground transition-colors"
                  >
                    {p.cta.label} →
                  </Link>
                </article>
              );
            })}
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
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <Link
              href="/termio-vs-warp/"
              className="text-amber hover:text-foreground transition-colors"
            >
              Full Termio vs Warp comparison →
            </Link>
            <Link
              href="/termio-vs-termius/"
              className="text-amber hover:text-foreground transition-colors"
            >
              Full Termio vs Termius comparison →
            </Link>
            <Link
              href="/termio-vs-iterm2/"
              className="text-amber hover:text-foreground transition-colors"
            >
              Full Termio vs iTerm2 comparison →
            </Link>
          </div>
        </div>
      </section>

      <Separator className="max-w-5xl mx-auto" />

      {/* What's new — latest release notes */}
      <WhatsNewSection />

      <Separator className="max-w-5xl mx-auto" />

      {/* Explore — internal linking hub */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight mb-2">
            Explore Termio
          </h2>
          <p className="text-muted-foreground mb-10">
            Dedicated guides for every platform, feature, and alternative.
          </p>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">
                By platform
              </h3>
              <ul className="space-y-2 text-sm">
                {exploreLinks.byPlatform.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      prefetch={false}
                      className="text-muted-foreground hover:text-amber transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">
                By feature
              </h3>
              <ul className="space-y-2 text-sm">
                {exploreLinks.byFeature.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      prefetch={false}
                      className="text-muted-foreground hover:text-amber transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">
                vs alternatives
              </h3>
              <ul className="space-y-2 text-sm">
                {exploreLinks.vsAlternatives.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      prefetch={false}
                      className="text-muted-foreground hover:text-amber transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">
                Guides
              </h3>
              <ul className="space-y-2 text-sm">
                {exploreLinks.guides.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      prefetch={false}
                      className="text-muted-foreground hover:text-amber transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
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

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-3">
            Ready to try Termio?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Download for your platform and get started in seconds.
          </p>
          <div className="flex justify-center">
            <DownloadButtons align="center" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-amber" />
            <div>Termio</div>
          </div>
          {" "}
          <div>Built with ❤️ for developers</div>
          {" "}
          <a
            href="https://github.com/termio-dev/termio/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <Bug className="w-4 h-4" />
            <div>Found an issue?</div>
          </a>
        </div>
      </footer>
    </main>
  );
}
