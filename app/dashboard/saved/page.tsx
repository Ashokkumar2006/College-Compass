"use client";

import React, { useState } from "react";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Link from "next/link";

const initialSaved = [
  { id: "1", name: "IIT Bombay", location: "Mumbai, Maharashtra", stream: "Engineering", rating: 4.8, fees: 900000, slug: "iit-bombay" },
  { id: "2", name: "NIT Trichy", location: "Tamil Nadu", stream: "Engineering", rating: 4.5, fees: 600000, slug: "nit-trichy" },
  { id: "3", name: "AIIMS Delhi", location: "New Delhi", stream: "Medical", rating: 4.9, fees: 1500, slug: "aiims-delhi" },
];

export default function SavedCollegesPage() {
  const [saved, setSaved] = useState(initialSaved);

  const remove = (id: string) => setSaved(saved.filter((c) => c.id !== id));

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-10 w-full flex flex-col gap-6">
        <div>
          <h1 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-3xl font-bold text-[#0F172A]">Saved Colleges</h1>
          <p className="text-[#64748B] mt-1">{saved.length} colleges saved</p>
        </div>

        {saved.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <p className="text-[#94A3B8] text-lg font-medium">No saved colleges yet</p>
            <Link href="/colleges"><Button variant="primary" size="md">Browse Colleges</Button></Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {saved.map((college) => (
              <div key={college.id} className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-5 flex items-center justify-between gap-4 hover:shadow-md transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#EEF2FF] rounded-xl flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="font-bold text-[#0F172A]">{college.name}</p>
                    <p className="text-[#64748B] text-sm">{college.location}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="primary" size="sm">{college.stream}</Badge>
                      <span className="text-[#94A3B8] text-xs">₹{(college.fees / 100000).toFixed(1)}L/yr</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link href={`/colleges/${college.slug}`}>
                    <Button variant="secondary" size="sm">View</Button>
                  </Link>
                  <Button variant="danger" size="sm" onClick={() => remove(college.id)}>Remove</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}