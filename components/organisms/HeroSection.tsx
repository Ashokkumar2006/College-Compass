"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";

export default function HeroSection() {
  const router = useRouter();
  const [rank, setRank] = useState("");
  const [stream, setStream] = useState<"engineering" | "medical">("engineering");
  const [loading, setLoading] = useState(false);

  const handleGetRecommendations = async () => {
    if (!rank.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    router.push(
      `/search?rank=${encodeURIComponent(rank)}&stream=${stream}`
    );
    setLoading(false);
  };

  const stats = [
    { value: "5000+", label: "Colleges" },
    { value: "50,000+", label: "Courses" },
    { value: "2L+", label: "Students" },
    { value: "100%", label: "Ad-free" },
  ];

  const features = [
    "JEE Main & Advanced",
    "NEET UG",
    "State CETs",
    "MHT-CET",
    "KCET",
    "AI Powered",
    "Free Forever",
  ];

  return (
    <section className="bg-gradient-to-b from-[#EEF2FF] to-[#F8FAFC] py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-8">

        {/* Top Badge */}
        <Badge variant="primary" size="md">
          🎓 India's #1 Ad-free College Discovery Platform
        </Badge>

        {/* Heading */}
        <div className="flex flex-col gap-4">
          <h1
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            className="text-4xl md:text-6xl font-bold text-[#0F172A] leading-tight"
          >
            Find Your Perfect
            <span className="text-[#4F46E5]"> College </span>
            with AI
          </h1>
          <p className="text-[#64748B] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Enter your rank and stream — get instant AI-powered college
            recommendations. No ads, no bias, just data.
          </p>
        </div>

        {/* Rank Input Card */}
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border border-[#E2E8F0] p-6 flex flex-col gap-4">

          {/* Stream Toggle */}
          <div className="flex items-center bg-[#F8FAFC] border border-[#E2E8F0] rounded-full p-1 gap-1 w-fit mx-auto">
            <button
              onClick={() => setStream("engineering")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                stream === "engineering"
                  ? "bg-[#4F46E5] text-white shadow-sm"
                  : "text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              Engineering
            </button>
            <button
              onClick={() => setStream("medical")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                stream === "medical"
                  ? "bg-[#4F46E5] text-white shadow-sm"
                  : "text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              Medical
            </button>
          </div>

          {/* Rank Input + CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="number"
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              placeholder={
                stream === "engineering"
                  ? "Enter your JEE rank..."
                  : "Enter your NEET score..."
              }
              className="flex-1 px-4 py-3 rounded-xl border border-[#E2E8F0] text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/10 transition-all text-sm"
            />
            <Button
              variant="primary"
              size="md"
              loading={loading}
              onClick={handleGetRecommendations}
              disabled={!rank.trim()}
            >
              Get Colleges →
            </Button>
          </div>

          <p className="text-[#94A3B8] text-xs text-center">
            No login required • Instant results • 100% free
          </p>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap items-center justify-center gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span
                className="text-2xl font-bold text-[#0F172A]"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                {stat.value}
              </span>
              <span className="text-[#64748B] text-sm">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Feature Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {features.map((feature) => (
            <Badge key={feature} variant="outline" size="sm">
              {feature}
            </Badge>
          ))}
        </div>

      </div>
    </section>
  );
}