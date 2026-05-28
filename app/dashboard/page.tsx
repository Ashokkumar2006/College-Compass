"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useCompare } from "@/context/CompareContext";

export default function DashboardPage() {
  const { user, accessToken } = useAuth();
  const { favorites } = useFavorites();
  const { compareList } = useCompare();

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10 w-full flex flex-col gap-8">

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-3xl font-bold text-[#0F172A]">
              My Dashboard
            </h1>
            <p className="text-[#64748B] mt-1">
              Welcome back, {user?.name?.split(" ")[0]} 👋
            </p>
          </div>
          <Link href="/dashboard/recommendations">
            <Button variant="primary" size="md">Get AI Recommendations</Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Saved Colleges", value: favorites.length, color: "#EEF2FF", text: "#4F46E5" },
            { label: "Comparing", value: compareList.length, color: "#E0F9FF", text: "#0E7490" },
            { label: "Account Type", value: user?.role, color: "#D1FAE5", text: "#065F46" },
            { label: "Status", value: "Active", color: "#FEF3C7", text: "#92400E" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-[#E2E8F0] p-5 flex flex-col gap-2">
              <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: stat.text }} className="text-3xl font-bold">{stat.value}</span>
              <span className="text-[#64748B] text-sm">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="font-bold text-[#0F172A] text-lg">Saved Colleges</h2>
              <Link href="/dashboard/saved" className="text-[#4F46E5] text-sm hover:underline">View All</Link>
            </div>
            {favorites.length === 0 ? (
              <div className="flex flex-col items-center py-8 gap-3">
                <p className="text-[#94A3B8] text-sm">No saved colleges yet</p>
                <Link href="/colleges">
                  <Button variant="primary" size="sm">Browse Colleges</Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <p className="text-[#64748B] text-sm">{favorites.length} college{favorites.length !== 1 ? "s" : ""} saved</p>
                <Link href="/dashboard/saved">
                  <Button variant="secondary" size="sm" fullWidth>View Saved Colleges</Button>
                </Link>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="font-bold text-[#0F172A] text-lg">Compare List</h2>
              <Link href="/compare" className="text-[#4F46E5] text-sm hover:underline">Open Compare</Link>
            </div>
            {compareList.length === 0 ? (
              <div className="flex flex-col items-center py-8 gap-3">
                <p className="text-[#94A3B8] text-sm">No colleges in compare list</p>
                <Link href="/colleges">
                  <Button variant="primary" size="sm">Browse Colleges</Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {compareList.map((c) => (
                  <div key={c.id} className="flex items-center gap-3 p-3 rounded-lg border border-[#F1F5F9]">
                    <div className="w-8 h-8 bg-[#EEF2FF] rounded-lg flex items-center justify-center shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
                      </svg>
                    </div>
                    <span className="text-[#0F172A] text-sm font-medium">{c.name}</span>
                  </div>
                ))}
                <Link href="/compare">
                  <Button variant="secondary" size="sm" fullWidth>Compare Now</Button>
                </Link>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 flex flex-col gap-4">
            <h2 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="font-bold text-[#0F172A] text-lg">Account Details</h2>
            <div className="flex flex-col gap-3">
              {[
                { label: "Name", value: user?.name },
                { label: "Email", value: user?.email },
                { label: "Role", value: user?.role },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-3 rounded-lg bg-[#F8FAFC]">
                  <span className="text-[#64748B] text-sm">{item.label}</span>
                  <span className="text-[#0F172A] text-sm font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 flex flex-col gap-4">
            <h2 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="font-bold text-[#0F172A] text-lg">Quick Links</h2>
            <div className="flex flex-col gap-2">
              {[
                { label: "Browse All Colleges", href: "/colleges" },
                { label: "Get AI Recommendations", href: "/dashboard/recommendations" },
                { label: "Compare Colleges", href: "/compare" },
                { label: "View Exams", href: "/exams" },
                { label: "Find Scholarships", href: "/scholarships" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="flex items-center justify-between p-3 rounded-lg hover:bg-[#F8FAFC] transition-all group">
                  <span className="text-[#64748B] text-sm group-hover:text-[#4F46E5]">{link.label}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}