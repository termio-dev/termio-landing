import { ArrowRight, Plus, RefreshCw, Wrench } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  earlierReleases,
  latestRelease,
  releaseUrl,
  releasesUrl,
  type ChangelogGroup,
} from "@/lib/changelog";

const groupIcons = {
  Added: Plus,
  Fixed: Wrench,
  Changed: RefreshCw,
} as const;

/** Renders `backtick` segments as inline code, the rest as plain text. */
function ChangelogText({ text }: { text: string }) {
  return (
    <>
      {text.split("`").map((segment, index) =>
        index % 2 === 1 ? (
          <code
            key={index}
            className="rounded bg-muted px-1 py-0.5 text-[0.8em] text-foreground"
          >
            {segment}
          </code>
        ) : (
          <span key={index}>{segment}</span>
        ),
      )}
    </>
  );
}

function ChangelogItems({ group }: { group: ChangelogGroup }) {
  return (
    <ul className="space-y-2.5">
      {group.items.map((item) => (
        <li
          key={item}
          className="relative pl-4 text-sm leading-relaxed text-muted-foreground before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-amber/60"
        >
          <ChangelogText text={item} />
        </li>
      ))}
    </ul>
  );
}

export function WhatsNewSection() {
  return (
    <section id="whats-new" className="scroll-mt-20 py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-2">
              What&apos;s new
            </h2>
            <p className="text-muted-foreground">
              Termio ships regularly. Here is what landed recently.
            </p>
          </div>
          <a
            href={releasesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-amber transition-colors hover:text-foreground"
          >
            All releases
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="rounded-2xl border border-border bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-6 sm:p-8">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <a
              href={releaseUrl(latestRelease.version)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold tracking-tight transition-colors hover:text-amber"
            >
              v{latestRelease.version}
            </a>
            <Badge
              variant="outline"
              className="border-amber/30 bg-background/30 text-amber"
            >
              Latest
            </Badge>
            <time
              dateTime={latestRelease.date}
              className="text-sm text-muted-foreground"
            >
              {latestRelease.dateLabel}
            </time>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {latestRelease.groups.map((group) => {
              const Icon = group.title ? groupIcons[group.title] : null;

              return (
                <div key={group.title}>
                  <h3 className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                    {Icon ? <Icon className="h-3.5 w-3.5 text-amber" /> : null}
                    {group.title}
                  </h3>
                  <ChangelogItems group={group} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-10">
          <h3 className="mb-5 text-sm font-semibold text-foreground">
            Earlier releases
          </h3>
          <div className="divide-y divide-border border-t border-border">
            {earlierReleases.map((release) => (
              <div
                key={release.version}
                className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6"
              >
                <div className="flex items-baseline gap-3">
                  <a
                    href={releaseUrl(release.version)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold transition-colors hover:text-amber"
                  >
                    v{release.version}
                  </a>
                  <time
                    dateTime={release.date}
                    className="text-xs text-muted-foreground"
                  >
                    {release.dateLabel}
                  </time>
                </div>
                {release.groups.map((group, index) => (
                  <ChangelogItems key={index} group={group} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
