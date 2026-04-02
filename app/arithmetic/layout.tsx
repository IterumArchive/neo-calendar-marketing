import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Date Intelligence & Cross-Calendar Math | NeoCalendar",
  description: "Perform date arithmetic across calendar boundaries. Add days, months, years. Calculate durations and differences. Mathematically sound operations for any calendar system.",
  openGraph: {
    title: "Date Intelligence & Cross-Calendar Math | NeoCalendar",
    description: "Perform date arithmetic across calendar boundaries. Add days, months, years. Calculate durations and differences.",
  },
  twitter: {
    title: "Date Intelligence & Cross-Calendar Math | NeoCalendar",
    description: "Perform date arithmetic across calendar boundaries. Add days, months, years. Calculate durations and differences.",
  },
};

export default function ArithmeticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
