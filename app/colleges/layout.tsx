import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Colleges",
  description: "Search and filter top engineering and medical colleges in India. Compare fees, placements, and get AI-powered recommendations.",
};

export default function CollegesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}