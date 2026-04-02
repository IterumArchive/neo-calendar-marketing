import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advanced Features - NeoSeries, NeoSpan & Chaining | NeoCalendar",
  description:
    "Master advanced NeoCalendar features: NeoSeries for sequence generation, NeoSpan for date ranges, method chaining for complex operations, and custom plugin development.",
  openGraph: {
    title: "Advanced Features - NeoSeries, NeoSpan & Chaining | NeoCalendar",
    description:
      "Master advanced NeoCalendar features: NeoSeries, NeoSpan, method chaining, and custom plugin development.",
  },
  twitter: {
    title: "Advanced Features - NeoSeries, NeoSpan & Chaining | NeoCalendar",
    description:
      "Master advanced NeoCalendar features: NeoSeries, NeoSpan, method chaining, and custom plugin development.",
  },
};

export default function AdvancedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
