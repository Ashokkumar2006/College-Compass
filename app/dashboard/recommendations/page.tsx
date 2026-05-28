"use client";

import React, { useState } from "react";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Link from "next/link";

interface Recommendation {
  name: string;
  slug: string;
  chance: "High" | "Medium" | "Low";
  reason: string;
}

export default function RecommendationsPage() {
  const [rank, setRank] = useState("");
  const [stream, setStream] = useState<"engineering" | "medical">("engineering");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Recommendation[]>([]);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  const chanceVariant = {
    High: "success" as const,
    Medium: "warning" as const,
    Low: "danger" as const,
  };

  const handleGet = async () => {
    if (!rank) return;
    setLoading(true);
    setError("");
    setResults([]);

    try {
      const res = await fetch("/api/recommendation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rank: parseInt(rank), stream }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);
      setResults(data.recommendations || []);
      setSearched(true);
    } catch (err: any) {
      setError(err.message || "Failed to get recommendations. Check your OpenAI API key.");
      setSearched(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-10 w-full flex flex-col gap-8">
        <div>
          <h1 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-3xl font-bold text-[#0F172A]">
            AI College Recommendations
          </h1>
          <p className="text-[#64748B] mt-1">
            Enter your rank and get personalized AI-powered college suggestions
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 flex flex-col gap-4">
          <div className="flex items-center bg-[#F8FAFC] border border-[#E2E8F0] rounded-full p-1 gap-1 w-fit">
            {["engineering", "medical"].map((s) => (
              <button key={s} onClick={() => setStream(s as "engineering" | "medical")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${stream === s ? "bg-[#4F46E5] text-white" : "text-[#64748B]"}`}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex gap-3 flex-col sm:flex-row">
            <input
              type="number"
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              placeholder={stream === "engineering" ? "Enter your JEE rank..." : "Enter your NEET score..."}
              className="flex-1 px-4 py-3 rounded-xl border border-[#E2E8F0] text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/10 text-sm"
            />
            <Button variant="primary" size="md" loading={loading} onClick={handleGet} disabled={!rank}>
              Get Recommendations →
            </Button>
          </div>

          <p className="text-[#94A3B8] text-xs">
            Powered by OpenAI • Based on real cutoff data • Free to use
          </p>
        </div>

        {searched && (
          <div className="flex flex-col gap-4">
            {error ? (
              <div className="bg-[#FEE2E2] text-[#991B1B] px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            ) : (
              <>
                <h2 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-xl font-bold text-[#0F172A]">
                  Top Recommendations for {stream === "engineering" ? "JEE Rank" : "NEET Score"} {rank}
                </h2>
                {results.map((r, i) => (
                  <div key={i} className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-all">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="font-bold text-[#0F172A] text-lg">{r.name}</span>
                        <Badge variant={chanceVariant[r.chance]} size="sm">{r.chance} Chance</Badge>
                      </div>
                      <p className="text-[#64748B] text-sm leading-relaxed">{r.reason}</p>
                    </div>
                    <Link href={`/colleges/${r.slug}`} className="shrink-0">
                      <Button variant="secondary" size="sm">View College</Button>
                    </Link>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}