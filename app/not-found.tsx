import Link from "next/link";
import Button from "@/components/atoms/Button";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
      <div className="text-center flex flex-col items-center gap-6">
        <div className="w-24 h-24 bg-[#EEF2FF] rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <div>
          <h1 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-6xl font-bold text-[#4F46E5]">404</h1>
          <h2 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-2xl font-bold text-[#0F172A] mt-2">Page Not Found</h2>
          <p className="text-[#64748B] mt-2">The page you're looking for doesn't exist.</p>
        </div>
        <Link href="/">
          <Button variant="primary" size="md">Go Back Home</Button>
        </Link>
      </div>
    </main>
  );
}