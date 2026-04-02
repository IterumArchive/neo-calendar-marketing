import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real-World Calendar Conversion Use Cases | NeoCalendar",
  description: "Discover how NeoCalendar solves real-world problems: historical research, religious observance tracking, astronomical calculations, and cross-cultural applications.",
  openGraph: {
    title: "Real-World Calendar Conversion Use Cases | NeoCalendar",
    description: "Discover how NeoCalendar solves real-world problems: historical research, religious observance, and astronomical calculations.",
  },
  twitter: {
    title: "Real-World Calendar Conversion Use Cases | NeoCalendar",
    description: "Discover how NeoCalendar solves real-world problems: historical research, religious observance, and astronomical calculations.",
  },
};

export default function UseCasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
