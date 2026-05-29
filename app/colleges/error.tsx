"use client";

import Button from "@/components/atoms/Button";
import Link from "next/link";

export default function CollegesError({ reset }: { reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <p className="text-[#EF4444] font-medium">Failed to load colleges</p>
      <div className="flex gap-3">
        <Button variant="primary" size="sm" onClick={reset}>Try Again</Button>
        <Link href="/"><Button variant="secondary" size="sm">Go Home</Button></Link>
      </div>
    </div>
  );
}