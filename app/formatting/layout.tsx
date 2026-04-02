import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Date Formatting & Extended Features | NeoCalendar",
  description:
    "Explore advanced date formatting, locale support, custom templates, and extended features. Format dates for any calendar with precision and flexibility.",
  openGraph: {
    title: "Date Formatting & Extended Features | NeoCalendar",
    description:
      "Explore advanced date formatting, locale support, custom templates, and extended features.",
  },
  twitter: {
    title: "Date Formatting & Extended Features | NeoCalendar",
    description:
      "Explore advanced date formatting, locale support, custom templates, and extended features.",
  },
};

export default function FormattingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
