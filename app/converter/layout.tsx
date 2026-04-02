import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Universal Date Converter - Convert Between 12 Calendar Systems | NeoCalendar",
  description:
    "Convert dates across 12 calendar systems instantly. Gregorian, Julian, Hebrew, Islamic, Persian, and more. Real-time conversion with zero-day error guarantee.",
  openGraph: {
    title: "Universal Date Converter - 12 Calendar Systems | NeoCalendar",
    description:
      "Convert dates across 12 calendar systems instantly. Gregorian, Julian, Hebrew, Islamic, Persian, and more.",
  },
  twitter: {
    title: "Universal Date Converter - 12 Calendar Systems | NeoCalendar",
    description:
      "Convert dates across 12 calendar systems instantly. Gregorian, Julian, Hebrew, Islamic, Persian, and more.",
  },
};

export default function ConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
