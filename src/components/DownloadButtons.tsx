"use client";

import { useSyncExternalStore } from "react";
import { Apple, AppWindow, Terminal } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { downloadLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";

type DownloadPlatform = "mac" | "windows" | "linux";

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

export function DownloadButtons({
  size = "lg",
  align = "start",
}: {
  size?: "default" | "sm" | "lg";
  align?: "start" | "center";
}) {
  const platform = useSyncExternalStore<DownloadPlatform>(
    subscribeToPlatform,
    getResolvedPlatform,
    () => "mac",
  );
  const ordered = getOrderedDownloads(platform);

  return (
    <div
      className={cn(
        "flex flex-wrap gap-3",
        align === "center" && "justify-center",
      )}
    >
      {ordered.map((item, index) => {
        const Icon = item.icon;

        return (
          <a
            key={item.platform}
            href={item.href}
            className={cn(
              buttonVariants({
                size,
                variant: index === 0 ? "default" : "secondary",
              }),
            )}
          >
            <Icon className="h-4 w-4" />
            {index === 0 ? item.label : item.shortLabel}
          </a>
        );
      })}
    </div>
  );
}
