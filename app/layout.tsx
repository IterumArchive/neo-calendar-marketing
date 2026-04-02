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
  title: "NeoCalendar - Universal Date Conversion Across 12 Calendar Systems",
  description:
    "Convert dates across 12 calendar systems with mathematical precision. Open-source TypeScript library supporting Gregorian, Julian, Hebrew, Islamic, Persian, and more. Built on Julian Day Number (JDN) with 1,500+ tests and zero-day error.",
  keywords: [
    "calendar conversion",
    "date conversion",
    "Julian Day Number",
    "JDN",
    "calendar systems",
    "Gregorian calendar",
    "Hebrew calendar",
    "Islamic calendar",
    "Persian calendar",
    "calendar library",
    "TypeScript calendar",
    "cross-calendar conversion",
    "astronomical calendar",
    "calendar arithmetic",
  ],
  authors: [{ name: "Iterum Archive", url: "https://iterumarchive.org" }],
  creator: "Iterum Archive",
  publisher: "Iterum Archive",
  metadataBase: new URL("https://neocalendar.iterumarchive.org"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://neocalendar.iterumarchive.org",
    title: "NeoCalendar - Universal Date Conversion Across 12 Calendar Systems",
    description:
      "Convert dates across 12 calendar systems with mathematical precision. Open-source TypeScript library with 1,500+ tests and zero-day error.",
    siteName: "NeoCalendar",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NeoCalendar - One Epoch. Many Calendars. Universal Clarity.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NeoCalendar - Universal Date Conversion Across 12 Calendar Systems",
    description:
      "Convert dates across 12 calendar systems with mathematical precision. Open-source TypeScript library.",
    images: ["/og-image.png"],
    creator: "@IterumArchive",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
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
      <head>
        {/* Performance Hints - Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://github.com" />
        <link rel="preconnect" href="https://raw.githubusercontent.com" />
        <link rel="preconnect" href="https://registry.npmjs.org" />

        {/* DNS Prefetch for CDNs */}
        <link rel="dns-prefetch" href="https://unpkg.com" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
