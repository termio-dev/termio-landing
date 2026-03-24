import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sansFont = JetBrains_Mono({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Termio — Terminal & Connection Manager",
  description:
    "Desktop terminal and SSH connection manager with split-pane workspaces, per-connection files, AI copilot, and a unified theme system. Built with Tauri and Rust.",
  keywords: [
    "terminal",
    "SSH",
    "connection manager",
    "split pane",
    "Tauri",
    "Rust",
    "desktop app",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sansFont.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
