import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Validation Dashboard - 1,500+ Tests, 0-Day Error | NeoCalendar",
  description:
    "Our validation proof: 1,500+ years tested across 12 calendars. Zero-day drift error. Public verification results and transparent testing methodology.",
  openGraph: {
    title: "Validation Dashboard - 1,500+ Tests, 0-Day Error | NeoCalendar",
    description:
      "Our validation proof: 1,500+ years tested across 12 calendars. Zero-day drift error. Public verification results.",
  },
  twitter: {
    title: "Validation Dashboard - 1,500+ Tests, 0-Day Error | NeoCalendar",
    description:
      "Our validation proof: 1,500+ years tested across 12 calendars. Zero-day drift error. Public verification results.",
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
