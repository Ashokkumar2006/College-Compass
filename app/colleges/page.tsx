"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import CollegeList from "@/components/organisms/CollegeList";
import FilterGroup from "@/components/molecules/FilterGroup";
import SearchBar from "@/components/molecules/SearchBar";

/*export const metadata = {
  title: "Browse Colleges — CollegeCompass",
  description: "Search top engineering and medical colleges in India.",
};*/

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

export default function CollegesPage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedStreams, setSelectedStreams] = useState<string[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedFees, setSelectedFees] = useState<string[]>([]);
  const [total, setTotal] = useState(0);

  const fetchColleges = async (searchQuery = "") => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.set("search", searchQuery);
      const res = await fetch(`/api/colleges?${params.toString()}`);
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
    fetchColleges();
  }, []);

  const handleSearch = (query: string) => {
    setSearch(query);
    fetchColleges(query);
  };

const filtered = colleges.filter((c) => {
  if (selectedStreams.length > 0) {
    const collegeStream = (c.stream ?? "").toLowerCase();
    const matches = selectedStreams.some((s) =>
      collegeStream.includes(s.toLowerCase())
    );
    if (!matches) return false;
  }
  if (selectedStates.length > 0) {
    const collegeLocation = (c.location ?? "").toLowerCase();
    const matches = selectedStates.some((s) => {
      const stateName = s.toLowerCase().replace("-", " ");
      return collegeLocation.includes(stateName);
    });
    if (!matches) return false;
  }
  if (selectedFees.length > 0) {
    const fee = c.fees ?? 0;
    const feeFilter = selectedFees[0];
    if (feeFilter === "under-1l" && fee >= 100000) return false;
    if (feeFilter === "1l-5l" && (fee < 100000 || fee > 500000)) return false;
    if (feeFilter === "5l-10l" && (fee < 500000 || fee > 1000000)) return false;
    if (feeFilter === "above-10l" && fee <= 1000000) return false;
  }
  return true;
});

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar />

      <div className="bg-white border-b border-[#E2E8F0] px-4 py-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          <h1 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-3xl font-bold text-[#0F172A]">
            Browse Colleges
          </h1>
          <SearchBar
            placeholder="Search colleges by name, city..."
            size="md"
            onSearch={handleSearch}
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
            label="State"
            options={[
              { label: "Maharashtra", value: "maharashtra" },
              { label: "Delhi", value: "delhi" },
              { label: "Tamil Nadu", value: "tamil-nadu" },
              { label: "Karnataka", value: "karnataka" },
              { label: "Rajasthan", value: "rajasthan" },
            ]}
            selected={selectedStates}
            onChange={setSelectedStates}
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
            Showing <span className="font-semibold text-[#0F172A]">{filtered.length}</span> of {total} colleges
          </p>
          <CollegeList colleges={filtered} loading={loading} />
        </div>
      </div>

      <Footer />
    </main>
  );
}