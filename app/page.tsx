"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import HeroSection from "@/components/organisms/HeroSection";
import CollegeList from "@/components/organisms/CollegeList";
import Button from "@/components/atoms/Button";
import Link from "next/link";

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

const steps = [
  {
    number: "01",
    title: "Enter Your Rank",
    description: "Enter your JEE or NEET rank. No signup needed.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>
      </svg>
    ),
  },
  {
    number: "02",
    title: "Get AI Recommendations",
    description: "Our AI suggests best colleges based on your rank and stream.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
  },
  {
    number: "03",
    title: "Compare & Decide",
    description: "Compare colleges side by side and make your best decision.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
  },
];

export default function HomePage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await fetch("/api/colleges?limit=6");
        const data = await res.json();
        setColleges(data.colleges || []);
      } catch {
        setColleges([]);
      } finally {
        setLoading(false);
      }
    };
    fetchColleges();
  }, []);

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar />
      <HeroSection />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-3xl font-bold text-[#0F172A]">
              Top Colleges
            </h2>
            <p className="text-[#64748B] mt-1">Handpicked colleges with best placements</p>
          </div>
          <Link href="/colleges">
            <Button variant="secondary" size="sm">View All →</Button>
          </Link>
        </div>
        <CollegeList colleges={colleges} loading={loading} />
      </section>

      <section className="bg-[#EEF2FF] py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-3xl font-bold text-[#0F172A]">
              How It Works
            </h2>
            <p className="text-[#64748B] mt-2">Find your perfect college in 3 simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2E8F0] flex flex-col gap-4">
                <div className="w-12 h-12 bg-[#EEF2FF] rounded-xl flex items-center justify-center">
                  {step.icon}
                </div>
                <div>
                  <span className="text-[#4F46E5] text-sm font-bold">{step.number}</span>
                  <h3 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-lg font-bold text-[#0F172A] mt-1">
                    {step.title}
                  </h3>
                  <p className="text-[#64748B] text-sm mt-1 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#4F46E5] py-16 px-4">
        <div className="max-w-3xl mx-auto text-center flex flex-col gap-6">
          <h2 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-3xl md:text-4xl font-bold text-white">
            Ready to Find Your Dream College?
          </h2>
          <p className="text-[#C7D2FE] text-lg">
            Join 2 lakh+ students who found their perfect college with CollegeCompass.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/register">
              <button className="bg-white text-[#4F46E5] px-8 py-3 rounded-full font-bold hover:bg-[#F8FAFC] transition-all">
                Get Started Free →
              </button>
            </Link>
            <Link href="/colleges">
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-[#4F46E5] transition-all">
                Browse Colleges
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}