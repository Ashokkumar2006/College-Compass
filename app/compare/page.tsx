"use client";

import React, { useState } from "react";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import ComparisonTable from "@/components/organisms/ComparisonTable";
import Button from "@/components/atoms/Button";
import Link from "next/link";
import { useCompare } from "@/context/CompareContext";

export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10 w-full flex flex-col gap-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-3xl font-bold text-[#0F172A]">
              Compare Colleges
            </h1>
            <p className="text-[#64748B] mt-1">
              {compareList.length === 0
                ? "Add colleges from the college pages to compare"
                : `Comparing ${compareList.length} college${compareList.length !== 1 ? "s" : ""}`}
            </p>
          </div>
          {compareList.length > 0 && (
            <Button variant="danger" size="sm" onClick={clearCompare}>
              Clear All
            </Button>
          )}
        </div>

        {compareList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-6">
            <div className="w-20 h-20 bg-[#EEF2FF] rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <line x1="3" y1="9" x2="21" y2="9"/>
                <line x1="3" y1="15" x2="21" y2="15"/>
                <line x1="9" y1="3" x2="9" y2="21"/>
              </svg>
            </div>
            <div className="text-center">
              <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-xl font-bold text-[#0F172A]">
                No colleges to compare
              </p>
              <p className="text-[#64748B] mt-2 text-sm">
                Visit college pages and click "+ Compare" to add colleges here
              </p>
            </div>
            <Link href="/colleges">
              <Button variant="primary" size="md">Browse Colleges</Button>
            </Link>
          </div>
        ) : (
          <ComparisonTable
            colleges={compareList}
            onRemove={removeFromCompare}
          />
        )}
      </div>

      <Footer />
    </main>
  );
}