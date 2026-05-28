"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import CollegeList from "@/components/organisms/CollegeList";
import FilterGroup from "@/components/molecules/FilterGroup";
import SearchBar from "@/components/molecules/SearchBar";

interface College {
  id: string;
  name: string;
  location: string;
  rank?: number;
  fees?: number;
  placement?: string;
  rating?: number;
  images: string[];
  slug: string;
  stream?: string;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [selectedStreams, setSelectedStreams] = useState<string[]>([]);
  const [selectedFees, setSelectedFees] = useState<string[]>([]);

  const query = searchParams.get("q") || "";
  const rank = searchParams.get("rank") || "";
  const stream = searchParams.get("stream") || "";

  const fetchResults = async (searchQuery: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.set("q", searchQuery);
      const res = await fetch(`/api/search?${params.toString()}`);
      const data = await res.json();
      setColleges(data.colleges || []);
      setTotal(data.total || 0);
    } catch {
      setColleges([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults(query);
  }, [query]);

  const filtered = colleges.filter((c) => {
    if (selectedStreams.length > 0) {
      const s = c.stream?.toLowerCase() ?? "";
      if (!selectedStreams.some((f) => s.includes(f))) return false;
    }
    if (selectedFees.length > 0) {
      const fee = c.fees ?? 0;
      const f = selectedFees[0];
      if (f === "under-1l" && fee >= 100000) return false;
      if (f === "1l-5l" && (fee < 100000 || fee > 500000)) return false;
      if (f === "5l-10l" && (fee < 500000 || fee > 1000000)) return false;
      if (f === "above-10l" && fee <= 1000000) return false;
    }
    return true;
  });

  return (
    <>
      <div className="bg-white border-b border-[#E2E8F0] px-4 py-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          <div>
            <h1 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-2xl font-bold text-[#0F172A]">
              {query ? `Results for "${query}"` : rank ? `Colleges for Rank ${rank} — ${stream}` : "Search Colleges"}
            </h1>
          </div>
          <SearchBar
            size="md"
            placeholder="Search colleges, courses..."
            defaultValue={query}
            onSearch={fetchResults}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 w-full flex gap-8">
        <aside className="hidden lg:flex flex-col gap-4 w-64 shrink-0">
          <FilterGroup
            label="Stream"
            options={[
              { label: "Engineering", value: "engineering" },
              { label: "Medical", value: "medical" },
            ]}
            selected={selectedStreams}
            onChange={setSelectedStreams}
            multiSelect={true}
          />
          <FilterGroup
            label="Fees Range"
            options={[
              { label: "Under ₹1 Lakh", value: "under-1l" },
              { label: "₹1L - ₹5L", value: "1l-5l" },
              { label: "₹5L - ₹10L", value: "5l-10l" },
              { label: "Above ₹10L", value: "above-10l" },
            ]}
            selected={selectedFees}
            onChange={setSelectedFees}
            multiSelect={false}
          />
        </aside>

        <div className="flex-1 flex flex-col gap-4">
          <p className="text-[#64748B] text-sm">
            Showing <span className="font-semibold text-[#0F172A]">{filtered.length}</span> results
          </p>
          <CollegeList colleges={filtered} loading={loading} emptyMessage="No colleges found. Try a different search." />
        </div>
      </div>
    </>
  );
}

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar />
      <Suspense fallback={<div className="flex-1 flex items-center justify-center"><div className="animate-spin w-10 h-10 border-4 border-[#4F46E5] border-t-transparent rounded-full" /></div>}>
        <SearchContent />
      </Suspense>
      <Footer />
    </main>
  );
}