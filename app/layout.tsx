import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "tmux on watch — Live terminal on your wrist",
  description:
    "Stream tmux output to Apple Watch with full ANSI color support. Get notifications when long-running commands finish. One command to set up.",
  metadataBase: new URL("https://tmuxonwatch.com"),
  openGraph: {
    title: "tmux on watch — Live terminal on your wrist",
    description:
      "Stream tmux output to Apple Watch with full ANSI color support. One command to set up.",
    url: "https://tmuxonwatch.com",
    siteName: "tmux on watch",
    type: "website",
    images: [{ url: "/og.png", width: 1500, height: 1000 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "tmux on watch",
    description: "Live terminal on your wrist. Full ANSI color. One command to set up.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
