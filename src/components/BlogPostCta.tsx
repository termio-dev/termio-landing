"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Apple, AppWindow, ArrowRight, Download, Terminal } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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

function getPlatformOverride(): DownloadPlatform | null {
  if (typeof window === "undefined") {
    return null;
  }

  const value = new URLSearchParams(window.location.search).get("platform");

  if (value === "windows" || value === "mac" || value === "linux") {
    return value;
  }

  return null;
}

function getOrderedDownloads(platform: DownloadPlatform) {
  const primary = downloads.find((item) => item.platform === platform);
  const fallback = downloads.filter((item) => item.platform !== platform);

  return primary ? [primary, ...fallback] : downloads;
}

export function BlogPostCta() {
  const [platform, setPlatform] = useState<DownloadPlatform>("mac");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setPlatform(getPlatformOverride() ?? detectPlatform());
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const [primaryDownload, ...secondaryDownloads] = getOrderedDownloads(platform);
  const PrimaryIcon = primaryDownload.icon;

  return (
    <section className="mt-16">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-[radial-gradient(circle_at_top_left,rgba(232,168,56,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(74,222,128,0.12),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-8 sm:p-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber/70 to-transparent" />
        <div className="max-w-2xl">
          <Badge
            variant="outline"
            className="mb-4 border-amber/30 bg-background/30 text-amber"
          >
            Termio App
          </Badge>
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            Keep the workflow from this article in one terminal workspace.
          </h2>
          <p className="mb-8 leading-8 text-muted-foreground">
            Termio combines local shells, SSH sessions, platform-native security,
            and organized workspaces in one desktop app. Download the build for
            your platform and try it with your own setup.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={primaryDownload.href}
              className={cn(buttonVariants({ size: "lg" }))}
            >
              <PrimaryIcon className="h-4 w-4" />
              {primaryDownload.label}
              <Download className="h-4 w-4" />
            </a>
            {secondaryDownloads.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.platform}
                  href={item.href}
                  className={cn(buttonVariants({ size: "lg", variant: "secondary" }))}
                >
                  <Icon className="h-4 w-4" />
                  {item.shortLabel}
                </a>
              );
            })}
          </div>

          <Link
            href="/"
            className="mt-5 inline-flex items-center gap-2 text-sm text-amber transition-colors hover:text-foreground"
          >
            See the full feature overview
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
