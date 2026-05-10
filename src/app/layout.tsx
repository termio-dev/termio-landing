import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const basePath = process.env.BASE_PATH ?? "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://termio.dev";
const metadataBase = new URL(siteUrl);
const canonicalPath = basePath || "/";
const ogImage = `${basePath || ""}/app_screenshot.png`;

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase,
  title: "Termio: Terminal App, SSH Client, and Connection Manager",
  description:
    "Free local-first terminal app and SSH client for macOS, Windows, and Linux. Split panes, WSL, Apple Keychain & keyring storage, AI copilot.",
  keywords: [
    "terminal",
    "SSH",
    "SSH client",
    "connection manager",
    "split pane",
    "WSL terminal",
    "macOS terminal",
    "Windows terminal",
    "Linux terminal",
    "Tauri",
    "Rust",
    "desktop app",
  ],
  alternates: {
    canonical: canonicalPath,
    types: {
      "application/rss+xml": `${basePath}/feed.xml`,
    },
  },
  manifest: `${basePath}/site.webmanifest`,
  openGraph: {
    title: "Termio: Terminal App, SSH Client, and Connection Manager",
    description:
      "Free local-first terminal app and SSH client for macOS, Windows, and Linux. Split panes, WSL, Apple Keychain & keyring storage, AI copilot.",
    url: canonicalPath,
    siteName: "Termio",
    type: "website",
    images: [
      {
        url: ogImage,
        width: 1600,
        height: 900,
        alt: "Termio terminal and connection manager screenshot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Termio: Terminal App, SSH Client, and Connection Manager",
    description:
      "Free local-first terminal app and SSH client for macOS, Windows, and Linux. Split panes, WSL, Apple Keychain & keyring storage, AI copilot.",
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} dark`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
