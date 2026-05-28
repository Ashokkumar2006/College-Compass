import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CompareProvider } from "@/context/CompareContext";
import { FavoritesProvider } from "@/context/FavoritesContext";

export const metadata: Metadata = {
  title: {
    default: "CollegeCompass — Find Your Perfect College",
    template: "%s | CollegeCompass",
  },
  description:
    "India's most trusted college discovery platform. Search, compare and get AI-powered recommendations for Engineering and Medical colleges.",
  keywords: [
    "college search india",
    "JEE colleges",
    "NEET colleges",
    "engineering colleges india",
    "medical colleges india",
    "college comparison",
    "admission prediction",
  ],
  openGraph: {
    title: "CollegeCompass — Find Your Perfect College",
    description:
      "India's most trusted college discovery platform for Engineering and Medical students.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen w-full bg-[#F8FAFC] overflow-x-hidden">
        <AuthProvider>
          <CompareProvider>
            <FavoritesProvider>
              <div className="pt-16">
                {children}
              </div>
            </FavoritesProvider>
          </CompareProvider>
        </AuthProvider>
      </body>
    </html>
  );
}