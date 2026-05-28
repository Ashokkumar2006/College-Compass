"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";

interface Scholarship {
  id: string;
  name: string;
  provider: string;
  amount?: number;
  eligibility: string;
  stream: string;
  deadline?: string;
}

const fallbackScholarships = [
  { id: "1", name: "AICTE Pragati Scholarship", provider: "AICTE", amount: 50000, stream: "Engineering", eligibility: "Female students in technical education" },
  { id: "2", name: "Central Sector Scholarship", provider: "Ministry of Education", amount: 12000, stream: "All Streams", eligibility: "Class 12 above 80% marks" },
  { id: "3", name: "INSPIRE Scholarship", provider: "DST", amount: 80000, stream: "Engineering", eligibility: "Top 1% in Class 12 boards" },
  { id: "4", name: "National Merit Scholarship", provider: "State Government", amount: 25000, stream: "Medical", eligibility: "NEET qualified students" },
];

export default function ScholarshipsPage() {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeStream, setActiveStream] = useState("all");

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const res = await fetch("/api/scholarships");
        const data = await res.json();
        setScholarships(data.scholarships?.length > 0 ? data.scholarships : fallbackScholarships);
      } catch {
        setScholarships(fallbackScholarships);
      } finally {
        setLoading(false);
      }
    };
    fetchScholarships();
  }, []);

  const filtered = activeStream === "all"
    ? scholarships
    : scholarships.filter((s) => s.stream.toLowerCase().includes(activeStream));

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar />

      <div className="bg-gradient-to-b from-[#EEF2FF] to-[#F8FAFC] py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-4xl font-bold text-[#0F172A]">
            Scholarships
          </h1>
          <p className="text-[#64748B] mt-3 text-lg">
            Find scholarships to fund your engineering or medical education
          </p>
          <div className="flex items-center justify-center gap-2 mt-6">
            {["all", "engineering", "medical"].map((s) => (
              <button key={s} onClick={() => setActiveStream(s)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeStream === s ? "bg-[#4F46E5] text-white" : "bg-white text-[#64748B] border border-[#E2E8F0] hover:border-[#4F46E5]"}`}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 w-full flex flex-col gap-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-[#E2E8F0] p-6 animate-pulse h-24" />
          ))
        ) : filtered.map((s) => (
          <div key={s.id} className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-all">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-xl font-bold text-[#0F172A]">{s.name}</h2>
                <Badge variant="primary" size="sm">{s.stream}</Badge>
              </div>
              <div className="flex flex-wrap gap-4 mt-1">
                {s.amount && <span className="text-sm font-semibold text-[#10B981]">₹{s.amount.toLocaleString()}/year</span>}
                <span className="text-xs text-[#94A3B8]">🏛 {s.provider}</span>
              </div>
              <p className="text-[#64748B] text-sm">✅ {s.eligibility}</p>
            </div>
            <Button variant="secondary" size="sm">Apply Now</Button>
          </div>
        ))}
      </div>

      <Footer />
    </main>
  );
}