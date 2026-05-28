import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entrance Exams",
  description: "Complete guide to JEE Main, JEE Advanced, NEET and other engineering and medical entrance exams in India.",
};

export default function ExamsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}