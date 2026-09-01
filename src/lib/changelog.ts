export type ChangelogGroup = {
  title?: "Added" | "Fixed" | "Changed";
  items: string[];
};

export type Release = {
  version: string;
  /** ISO date, used for structured data and <time dateTime>. */
  date: string;
  dateLabel: string;
  groups: ChangelogGroup[];
};

export const releases: Release[] = [
  {
    version: "1.2.3",
    date: "2026-09-01",
    dateLabel: "1 September 2026",
    groups: [
      {
        title: "Added",
        items: [
          "Collapsible sidebar — status bar button or `Cmd+B` (`Ctrl+Shift+B` on Windows and Linux). Remembers its state and width.",
          "`.deb` and `.rpm` packages alongside the AppImage.",
          "Optional system SSH client per connection, for servers requiring algorithms the built-in client cannot negotiate, or when you need `~/.ssh/config`, `ProxyJump`, certificates or agent forwarding.",
        ],
      },
      {
        title: "Fixed",
        items: [
          "SSH handshake failures now name the real cause instead of reporting “Unable to exchange encryption keys” for every mismatch.",
          "Windows: connections can be added to folders again.",
          "Linux: blank window on Ubuntu 26.04.",
          "Linux: freeze when returning focus to the window, most noticeable with multiple monitors.",
          "Workspaces whose folder was deleted are removed from the list instead of failing on every attempt.",
        ],
      },
      {
        title: "Changed",
        items: [
          "Dependencies updated, including the SSH and terminal stacks.",
          "Package-manager installs no longer offer in-app updates.",
        ],
      },
    ],
  },
  {
    version: "1.2.2",
    date: "2026-05-08",
    dateLabel: "8 May 2026",
    groups: [
      {
        items: [
          "Fixed system tools failing in terminals launched from the Linux AppImage.",
          "Light theme refinements.",
        ],
      },
    ],
  },
  {
    version: "1.2.1",
    date: "2026-04-20",
    dateLabel: "20 April 2026",
    groups: [
      { items: ["Microsoft Store packaging (MSIX) for Windows."] },
    ],
  },
  {
    version: "1.2.0",
    date: "2026-04-06",
    dateLabel: "6 April 2026",
    groups: [
      {
        items: [
          "WSL and PowerShell session backends on Windows, selectable per connection.",
        ],
      },
    ],
  },
  {
    version: "1.1.0",
    date: "2026-04-04",
    dateLabel: "4 April 2026",
    groups: [
      {
        items: [
          "Files open in your own editor, selectable in settings.",
          "Faster tab switching.",
        ],
      },
    ],
  },
];

export const latestRelease = releases[0];
export const earlierReleases = releases.slice(1);

export const releasesUrl = "https://github.com/termio-dev/termio/releases";

export function releaseUrl(version: string) {
  return `${releasesUrl}/tag/v${version}`;
}
