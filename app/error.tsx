"use client";

import { useEffect } from "react";
import Button from "@/components/atoms/Button";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
      <div className="text-center flex flex-col items-center gap-6 max-w-md">
        <div className="w-20 h-20 bg-[#FEE2E2] rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <div>
          <h1 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-2xl font-bold text-[#0F172A]">
            Something went wrong
          </h1>
          <p className="text-[#64748B] mt-2 text-sm">
            An unexpected error occurred. Please try again.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="primary" size="md" onClick={reset}>
            Try Again
          </Button>
          <Link href="/">
            <Button variant="secondary" size="md">Go Home</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}