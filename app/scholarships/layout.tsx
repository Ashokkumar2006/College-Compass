import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scholarships",
  description: "Find scholarships for engineering and medical students in India. Government and private scholarship listings.",
};

export default function ScholarshipsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}