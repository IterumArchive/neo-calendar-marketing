import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Code Examples & API Reference | NeoCalendar",
  description:
    "Interactive code examples and complete API reference for NeoCalendar. Installation guides, conversion examples, arithmetic operations, and TypeScript support.",
  openGraph: {
    title: "Code Examples & API Reference | NeoCalendar",
    description:
      "Interactive code examples and complete API reference for NeoCalendar. Installation guides and TypeScript support.",
  },
  twitter: {
    title: "Code Examples & API Reference | NeoCalendar",
    description:
      "Interactive code examples and complete API reference for NeoCalendar. Installation guides and TypeScript support.",
  },
};

export default function ApiExplorerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
