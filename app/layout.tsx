import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import PwaRegistration from "./pwa-registration";
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
  applicationName: "Time Wasted",
  title: {
    default: "Time Wasted",
    template: "%s | Time Wasted",
  },
  description:
    "A quiet counter for the time already gone. No explanation, just the numbers since 31.10.2002.",
  keywords: [
    "time wasted",
    "life counter",
    "elapsed time",
    "31.10.2002",
    "minimal counter",
  ],
  authors: [{ name: "Nero" }],
  creator: "Nero",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Time Wasted",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [{ url: "/icon.png", sizes: "512x512", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Time Wasted",
    description:
      "A private signal for the time already gone. Watch the numbers keep moving.",
    type: "website",
    locale: "en_US",
    siteName: "Time Wasted",
  },
  twitter: {
    card: "summary",
    title: "Time Wasted",
    description:
      "A quiet counter for the time already gone. No explanation, just the numbers.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f6f1" },
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <PwaRegistration />
        {children}
      </body>
    </html>
  );
}
