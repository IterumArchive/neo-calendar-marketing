import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JDN Lookup Tool - Julian Day Number Reference | NeoCalendar",
  description:
    "Look up any Julian Day Number (JDN) and see the equivalent date across all 12 supported calendar systems. Essential reference tool for chronologists and historians.",
  openGraph: {
    title: "JDN Lookup Tool - Julian Day Number Reference | NeoCalendar",
    description:
      "Look up any Julian Day Number (JDN) and see the equivalent date across all 12 supported calendar systems.",
  },
  twitter: {
    title: "JDN Lookup Tool - Julian Day Number Reference | NeoCalendar",
    description:
      "Look up any Julian Day Number (JDN) and see the equivalent date across all 12 supported calendar systems.",
  },
};

export default function InspectorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
