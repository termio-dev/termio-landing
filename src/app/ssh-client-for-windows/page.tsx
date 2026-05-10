import type { Metadata } from "next";
import Link from "next/link";
import {
  AppWindow,
  ArrowRight,
  Boxes,
  Check,
  Download,
  GitBranch,
  KeyRound,
  Minus,
  MonitorCog,
  ShieldCheck,
  Terminal,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { SiteHeader } from "@/components/SiteHeader";
import {
  basePath,
  siteUrl,
  downloadLinks,
  primaryButtonClass,
  secondaryButtonClass,
} from "@/lib/constants";

const windowsDownloadUrl = downloadLinks.windows;

export const metadata: Metadata = {
  title: "Windows SSH Client – Free, Local-First | Termio",
  description:
    "Free Windows SSH client with WSL, PowerShell, split panes, and Windows Credential Manager storage. Local-first secure shell software for Windows 10 and 11.",
  alternates: {
    canonical: `${basePath}/ssh-client-for-windows/`,
  },
  openGraph: {
    title: "Windows SSH Client – Free, Local-First | Termio",
    description:
      "Free Windows SSH client with WSL, PowerShell, split panes, and Windows Credential Manager storage. Local-first secure shell for Windows 10 and 11.",
    url: `${basePath}/ssh-client-for-windows/`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Windows SSH Client – Free, Local-First | Termio",
    description:
      "Free Windows SSH client with WSL, PowerShell, split panes, and Windows Credential Manager storage. Local-first secure shell for Windows 10 and 11.",
    images: [`${basePath}/app_screenshot.png`],
  },
};

const relatedArticles = [
  {
    href: "/blog/how-to-use-ssh-on-windows/",
    title: "How to Use SSH on Windows: A 2026 Guide",
  },
  {
    href: "/blog/how-to-ssh-to-a-windows-machine/",
    title: "How to SSH to a Windows Machine (OpenSSH Server Setup)",
  },
  {
    href: "/blog/putty-alternatives-for-windows-2026/",
    title: "PuTTY Alternatives for Windows in 2026",
  },
  {
    href: "/blog/best-free-ssh-client-for-windows/",
    title: "Best Free SSH Client for Windows (2026)",
  },
  {
    href: "/blog/best-terminal-app-for-windows-developers-using-wsl/",
    title: "Best Terminal App for Windows Developers Using WSL",
  },
  {
    href: "/blog/wsl-vs-powershell-when-to-use-each-on-windows/",
    title: "WSL vs PowerShell: When to Use Each on Windows",
  },
];

const faqItems = [
  {
    q: "What is the best SSH client for Windows in 2026?",
    a: "The best Windows SSH client depends on what you need. PuTTY remains popular but feels dated. The built-in OpenSSH client in PowerShell handles one-off connections well. For organized multi-host workflows, a modern Windows SSH client like Termio combines a connection manager, WSL, PowerShell, and SSH in one workspace — and it is free.",
  },
  {
    q: "Does Windows 10 and Windows 11 have a built-in SSH client?",
    a: "Yes. Windows 10 (1809 and later) and Windows 11 ship with OpenSSH as an Optional Feature. You can run \"ssh user@host\" directly from PowerShell or Command Prompt. The built-in client covers basic secure shell use, but it has no GUI, no connection manager, and no credential storage beyond the standard ssh-agent.",
  },
  {
    q: "Is PuTTY still a good Windows SSH client?",
    a: "PuTTY still works, but the UI is dated and it lacks split panes, native Windows Credential Manager integration, WSL support, and a modern session organizer. For new setups in 2026, most teams pick a more modern Windows SSH client.",
  },
  {
    q: "How do I install an SSH client on Windows?",
    a: "Windows includes OpenSSH as an Optional Feature — enable it from Settings → Apps → Optional features, or run \"Add-WindowsCapability\" from PowerShell. To get a GUI Windows SSH client like Termio, run \"winget install Termio\" or download the installer from termio.dev.",
  },
  {
    q: "Can I use SSH from WSL on Windows?",
    a: "Yes. WSL ships with the standard openssh-client, so \"ssh user@host\" works the same as on any Linux machine. Termio adds a GUI on top: you can launch WSL distributions and SSH sessions side by side in split panes, with credentials stored in Windows Credential Manager.",
  },
  {
    q: "Can I SSH from Windows to another Windows machine?",
    a: "Yes. Install OpenSSH Server on the target Windows machine (Settings → Optional features → Add OpenSSH Server, then start the service), open inbound TCP port 22 in Windows Defender Firewall, and connect from your local Windows SSH client. See our guide on how to SSH from Windows to Windows for full steps.",
  },
  {
    q: "Is Termio's Windows SSH software free?",
    a: "Yes. Termio is completely free for personal and commercial use on Windows, with no feature gates, no usage limits, and no required account. SSH client, connection manager, AI copilot, and split panes are all included.",
  },
  {
    q: "Does Termio store SSH credentials securely on Windows?",
    a: "Termio stores SSH passwords and key passphrases in Windows Credential Manager, the same OS-level secret store used by other Windows apps. Credentials never sync to the cloud and never leave your machine.",
  },
  {
    q: "Does Termio support SSH key authentication on Windows?",
    a: "Yes. Termio works with standard OpenSSH key files (~/.ssh/id_ed25519, id_rsa, etc.) and integrates with the Windows OpenSSH agent. Generate a key once with ssh-keygen and use it across every connection.",
  },
];

const comparisonRows = [
  {
    feature: "Free for commercial use",
    termio: true,
    putty: true,
    moba: "partial",
    builtin: true,
  },
  {
    feature: "Modern GUI",
    termio: true,
    putty: false,
    moba: true,
    builtin: false,
  },
  {
    feature: "SSH connection manager",
    termio: true,
    putty: "partial",
    moba: true,
    builtin: false,
  },
  {
    feature: "Split panes",
    termio: true,
    putty: false,
    moba: true,
    builtin: false,
  },
  {
    feature: "WSL integration",
    termio: true,
    putty: false,
    moba: true,
    builtin: false,
  },
  {
    feature: "PowerShell integration",
    termio: true,
    putty: false,
    moba: false,
    builtin: true,
  },
  {
    feature: "Windows Credential Manager",
    termio: true,
    putty: false,
    moba: false,
    builtin: false,
  },
  {
    feature: "AI copilot",
    termio: true,
    putty: false,
    moba: false,
    builtin: false,
  },
  {
    feature: "Local-only data",
    termio: true,
    putty: true,
    moba: true,
    builtin: true,
  },
  {
    feature: "Git-based workspace sharing",
    termio: true,
    putty: false,
    moba: false,
    builtin: false,
  },
];

const installSteps = [
  {
    name: "Install via winget (recommended)",
    text: 'Open PowerShell or Windows Terminal and run "winget install Termio". The installer will download and register the app automatically.',
  },
  {
    name: "Or install via direct download",
    text: "Download Termio-windows-x64-setup.exe from termio.dev or the GitHub releases page, then run the installer.",
  },
  {
    name: "Launch and create your first connection",
    text: "Open Termio, click 'New connection', enter host, port, and username, and choose either a password or an SSH key. Termio stores the credential in Windows Credential Manager.",
  },
  {
    name: "Optional: enable WSL and PowerShell tabs",
    text: "From the workspace sidebar, add a WSL distribution or a PowerShell pane. They live alongside your SSH sessions in the same window.",
  },
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Termio",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Windows 10, Windows 11",
    description:
      "Free local-first Windows SSH client and secure shell software with WSL support, PowerShell integration, split-pane workspaces, Windows Credential Manager storage, and AI copilot.",
    url: `${siteUrl}${basePath}/ssh-client-for-windows/`,
    downloadUrl: windowsDownloadUrl,
    image: `${siteUrl}${basePath}/app_screenshot.png`,
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
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to install Termio, a free Windows SSH client",
    description:
      "Install Termio on Windows 10 or Windows 11 via winget or a direct download, then create your first SSH connection.",
    totalTime: "PT3M",
    step: installSteps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.name,
      text: step.text,
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}${basePath}/` },
      { "@type": "ListItem", position: 2, name: "Windows SSH Client" },
    ],
  },
];

function Cell({
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
        className={`mx-auto h-4 w-4 ${highlight ? "text-[#4ade80]" : "text-[#4ade80]/60"}`}
      />
    );
  }
  if (value === "partial") {
    return (
      <Minus aria-label="Partial" className="mx-auto h-4 w-4 text-muted-foreground" />
    );
  }
  return <X aria-label="No" className="mx-auto h-4 w-4 text-muted-foreground/30" />;
}

export default function SshClientForWindowsPage() {
  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteHeader active="home" />

      {/* Hero */}
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
              Windows SSH Client — Free and Local-First
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Termio is a free Windows SSH client and secure shell software for
              Windows 10 and Windows 11. It combines an SSH connection manager,
              WSL distributions, PowerShell, and remote sessions in one
              local-first workspace, with credentials stored in Windows
              Credential Manager.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={windowsDownloadUrl} className={primaryButtonClass}>
                <AppWindow className="h-4 w-4" />
                Download for Windows
              </a>
              <Link
                href="/blog/how-to-use-ssh-on-windows/"
                className={secondaryButtonClass}
              >
                How to use SSH on Windows
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Three feature cards */}
      <section className="px-6 py-14">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {[
            {
              icon: Boxes,
              title: "WSL & PowerShell support",
              description:
                "Run WSL distributions and PowerShell beside your SSH sessions. One Windows SSH client for every shell you use.",
            },
            {
              icon: ShieldCheck,
              title: "Windows Credential Manager",
              description:
                "Store SSH passwords and key passphrases in the native Windows Credential Manager. Secrets never sync to a cloud account.",
            },
            {
              icon: KeyRound,
              title: "OpenSSH key authentication",
              description:
                "Works with standard OpenSSH keys (~/.ssh/id_ed25519, id_rsa) and the Windows OpenSSH agent. No proprietary key formats.",
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
              <p className="leading-7 text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Termio for Windows */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            Why Termio is the best Windows SSH client in 2026
          </h2>
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div>
              <p className="mb-5 leading-8 text-muted-foreground">
                Most Windows SSH clients were designed for a one-shell, one-host
                world. The reality of modern Windows development is different.
                You build in WSL, automate with PowerShell, and SSH into staging
                or production — sometimes all in the same hour. A basic SSH
                launcher does not connect those contexts.
              </p>
              <p className="mb-5 leading-8 text-muted-foreground">
                Termio is a Windows SSH client built around that workflow. It
                organizes connections into workspaces, supports split panes for
                WSL plus PowerShell plus SSH side by side, integrates with the
                native Windows Credential Manager, and lets your team share
                workspace structure through Git instead of a proprietary cloud
                sync. Your data, your machine, no account required.
              </p>
              <p className="leading-8 text-muted-foreground">
                It is also free. Termio has no feature gates, no usage limits,
                and no premium tier. The full Windows SSH software — connection
                manager, split panes, AI copilot, and credential storage — is
                included for personal and commercial use.
              </p>
            </div>

            <div className="rounded-3xl border border-amber/20 bg-gradient-to-b from-amber/8 to-transparent p-7">
              <h3 className="mb-4 text-xl font-semibold tracking-tight">
                What to look for in a Windows SSH client
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                {[
                  "WSL and PowerShell in the same workspace as SSH",
                  "OpenSSH key authentication and ssh-agent integration",
                  "Native Windows Credential Manager storage",
                  "Organized SSH connection manager with folders",
                  "Split panes for local and remote tasks",
                  "Git-friendly sharing instead of proprietary sync",
                  "Free for commercial use, no account required",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Secure Shell client section — captures "secure shell" phrasing */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            Secure Shell client for Windows with WSL and PowerShell
          </h2>
          <p className="mb-8 max-w-3xl leading-8 text-muted-foreground">
            Secure Shell (SSH) is the standard for remote access on Linux
            servers. On Windows, that often means juggling a CLI client, a
            separate connection manager, and a different terminal for WSL. A
            modern Secure Shell client for Windows should bring those together.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card/50 p-6">
              <Terminal className="mb-4 h-5 w-5 text-amber" />
              <h3 className="mb-2 text-xl font-semibold tracking-tight">
                Split panes for SSH, WSL, and PowerShell
              </h3>
              <p className="leading-7 text-muted-foreground">
                Open one pane for an SSH session, one for a WSL Ubuntu shell,
                and one for PowerShell. No more switching apps every time the
                shell context changes.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card/50 p-6">
              <MonitorCog className="mb-4 h-5 w-5 text-amber" />
              <h3 className="mb-2 text-xl font-semibold tracking-tight">
                Per-connection scripts
              </h3>
              <p className="leading-7 text-muted-foreground">
                Attach reusable scripts to any SSH connection — deploy hooks,
                log tails, db migrations. One click to run, no copy-paste.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card/50 p-6">
              <GitBranch className="mb-4 h-5 w-5 text-amber" />
              <h3 className="mb-2 text-xl font-semibold tracking-tight">
                Git-based workspace sharing
              </h3>
              <p className="leading-7 text-muted-foreground">
                Workspaces are plain text files. Commit them to Git so the
                team's SSH host list and folder structure stay versioned, while
                each user keeps credentials in their own Credential Manager.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card/50 p-6">
              <ShieldCheck className="mb-4 h-5 w-5 text-amber" />
              <h3 className="mb-2 text-xl font-semibold tracking-tight">
                Local-first, no cloud account
              </h3>
              <p className="leading-7 text-muted-foreground">
                No login, no account, no cloud sync. Your hosts, keys, and
                workspace files stay on your Windows machine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            Windows SSH client comparison: Termio vs PuTTY, MobaXterm, and
            built-in OpenSSH
          </h2>
          <p className="mb-8 max-w-3xl leading-8 text-muted-foreground">
            How does Termio compare to other Windows SSH software? PuTTY is the
            classic minimalist client. MobaXterm bundles many tools with a
            paid Pro tier. Built-in OpenSSH (PowerShell ssh) handles one-off
            commands. Here's where each fits.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="w-[260px] px-4 py-3 text-left font-medium text-muted-foreground">
                    Feature
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-amber">
                    Termio
                  </th>
                  <th className="px-4 py-3 text-center font-medium text-muted-foreground">
                    PuTTY
                  </th>
                  <th className="px-4 py-3 text-center font-medium text-muted-foreground">
                    MobaXterm
                  </th>
                  <th className="px-4 py-3 text-center font-medium text-muted-foreground">
                    Built-in OpenSSH
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-border ${i % 2 === 0 ? "bg-card/50" : ""}`}
                  >
                    <td className="px-4 py-3 text-foreground">{row.feature}</td>
                    <td className="px-4 py-3 text-center">
                      <Cell value={row.termio} highlight />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Cell value={row.putty} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Cell value={row.moba} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Cell value={row.builtin} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <Link
              href="/blog/putty-alternatives-for-windows-2026/"
              prefetch={false}
              className="text-amber transition-colors hover:text-foreground"
            >
              Read the full PuTTY alternatives roundup →
            </Link>
            <Link
              href="/blog/best-free-ssh-client-for-windows/"
              prefetch={false}
              className="text-amber transition-colors hover:text-foreground"
            >
              Best free SSH client for Windows →
            </Link>
          </div>
        </div>
      </section>

      {/* Install — HowTo */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            How to install Termio on Windows
          </h2>
          <p className="mb-8 max-w-3xl leading-8 text-muted-foreground">
            Two ways to install Termio on Windows 10 or Windows 11. The
            recommended path is winget, which keeps the app updatable through
            the standard Windows package manager.
          </p>
          <ol className="space-y-5">
            {installSteps.map((step, i) => (
              <li
                key={step.name}
                className="flex gap-4 rounded-2xl border border-border bg-card/50 p-5"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-amber/30 bg-amber/10 font-semibold text-amber">
                  {i + 1}
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-semibold tracking-tight">
                    {step.name}
                  </h3>
                  <p className="leading-7 text-muted-foreground">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-8">
            <a href={windowsDownloadUrl} className={primaryButtonClass}>
              <Download className="h-4 w-4" />
              Download Termio for Windows
            </a>
          </div>
        </div>
      </section>

      {/* Free SSH software emphasis */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            Free SSH software for Windows — no account, no usage limits
          </h2>
          <p className="max-w-3xl leading-8 text-muted-foreground">
            Termio is free SSH software for Windows. There is no premium tier,
            no team plan, and no required sign-in. The full Windows SSH client
            — connection manager, AI copilot, split panes, WSL integration,
            PowerShell tabs, and Windows Credential Manager support — is
            included at zero cost. Your hosts and keys stay on your machine.
            Workspace files are plain text and can be versioned in Git.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-3xl font-bold tracking-tight">
            Frequently asked questions about SSH on Windows
          </h2>
          <div className="grid gap-x-14 gap-y-8 md:grid-cols-2">
            {faqItems.map((item) => (
              <div key={item.q}>
                <h3 className="mb-2 text-lg font-semibold">{item.q}</h3>
                <p className="leading-7 text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl rounded-3xl border border-border bg-[radial-gradient(circle_at_top_left,rgba(232,168,56,0.16),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-8 sm:p-10">
          <div className="max-w-2xl">
            <h2 className="mb-3 text-3xl font-bold tracking-tight">
              Download the free Windows SSH client
            </h2>
            <p className="mb-8 leading-8 text-muted-foreground">
              Get a Windows SSH client that organizes connections, supports WSL
              and PowerShell in split panes, and stores credentials in Windows
              Credential Manager. Free forever, no account required.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={windowsDownloadUrl} className={primaryButtonClass}>
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

      {/* Related guides */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-6 text-2xl font-bold tracking-tight">
            Related guides
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {relatedArticles.map((article) => (
              <Link
                key={article.href}
                href={article.href}
                prefetch={false}
                className="rounded-2xl border border-border bg-card/50 p-5 transition-colors hover:border-amber/30"
              >
                <div className="mb-3 text-sm text-amber">Read next</div>
                <h3 className="mb-3 font-semibold leading-7">
                  {article.title}
                </h3>
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
