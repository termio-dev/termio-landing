import Link from "next/link";
import { Download } from "lucide-react";

import {
  downloadLinks,
  primaryButtonClass,
  secondaryButtonClass,
} from "@/lib/constants";

type Platform = "mac" | "windows" | "linux";

const platformLabels: Record<Platform, string> = {
  mac: "Download for Mac",
  windows: "Download for Windows",
  linux: "Download for Linux",
};

export function DownloadCtaSection({
  platform,
  headline,
  description,
  secondaryLink,
}: {
  platform: Platform;
  headline: string;
  description: string;
  secondaryLink?: { href: string; label: string };
}) {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-5xl rounded-3xl border border-border bg-[radial-gradient(circle_at_top_left,rgba(232,168,56,0.16),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-8 sm:p-10">
        <div className="max-w-2xl">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            {headline}
          </h2>
          <p className="mb-8 leading-8 text-muted-foreground">{description}</p>
          <div className="flex flex-wrap gap-3">
            <a href={downloadLinks[platform]} className={primaryButtonClass}>
              <Download className="h-4 w-4" />
              {platformLabels[platform]}
            </a>
            {secondaryLink ? (
              <Link
                href={secondaryLink.href}
                className={secondaryButtonClass}
              >
                {secondaryLink.label}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
