export const basePath = process.env.BASE_PATH ?? "";
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://termio.dev";

export const downloadLinks = {
  mac: "https://github.com/termio-dev/termio/releases/latest/download/Termio-macos-universal.dmg",
  windows:
    "https://github.com/termio-dev/termio/releases/latest/download/Termio-windows-x64-setup.exe",
  linux:
    "https://github.com/termio-dev/termio/releases/latest/download/Termio-linux-x86_64.AppImage",
};

export type LinuxFormat = "appimage" | "deb" | "rpm";

export const linuxDownloads: {
  format: LinuxFormat;
  label: string;
  description: string;
  href: string;
}[] = [
  {
    format: "appimage",
    label: "AppImage",
    description: "Runs on any distribution",
    href: downloadLinks.linux,
  },
  {
    format: "deb",
    label: ".deb",
    description: "Debian, Ubuntu, Mint, Pop!_OS",
    href: "https://github.com/termio-dev/termio/releases/latest/download/Termio-linux-x86_64.deb",
  },
  {
    format: "rpm",
    label: ".rpm",
    description: "Fedora, RHEL, openSUSE",
    href: "https://github.com/termio-dev/termio/releases/latest/download/Termio-linux-x86_64.rpm",
  },
];

export const primaryButtonClass =
  "inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/80";
export const secondaryButtonClass =
  "inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-secondary px-2.5 text-sm font-medium text-secondary-foreground transition-all hover:bg-secondary/80";
