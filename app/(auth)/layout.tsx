import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
  description: "Login or create your CollegeCompass account.",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}