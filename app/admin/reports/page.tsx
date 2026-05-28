"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/organisms/Navbar";
import Badge from "@/components/atoms/Badge";
import { useAuth } from "@/context/AuthContext";

interface Reports {
  totalColleges: number;
  totalUsers: number;
  totalReviews: number;
  pendingReviews: number;
  approvedReviews: number;
  totalFavorites: number;
  topColleges: Array<{
    id: string;
    name: string;
    stream?: string;
    _count: { favorites: number; reviews: number };
  }>;
}

export default function AdminReportsPage() {
  const [reports, setReports] = useState<Reports | null>(null);
  const [loading, setLoading] = useState(true);
  const { accessToken } = useAuth();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch("/api/admin/reports", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const data = await res.json();
        setReports(data.reports);
      } catch {
        setReports(null);
      } finally {
        setLoading(false);
      }
    };
    if (accessToken) fetchReports();
  }, [accessToken]);

  const metrics = reports ? [
    { label: "Total Colleges", value: reports.totalColleges.toLocaleString() },
    { label: "Total Users", value: reports.totalUsers.toLocaleString() },
    { label: "Total Reviews", value: reports.totalReviews.toLocaleString() },
    { label: "Pending Reviews", value: reports.pendingReviews.toLocaleString() },
    { label: "Approved Reviews", value: reports.approvedReviews.toLocaleString() },
    { label: "Total Saves", value: reports.totalFavorites.toLocaleString() },
  ] : [];

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10 w-full flex flex-col gap-8">

        <div>
          <h1 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-3xl font-bold text-[#0F172A]">
            Reports & Analytics
          </h1>
          <p className="text-[#64748B] mt-1">Live platform data from database</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-[#E2E8F0] p-5 animate-pulse h-24" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {metrics.map((m) => (
                <div key={m.label} className="bg-white rounded-xl border border-[#E2E8F0] p-5 flex flex-col gap-1">
                  <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-2xl font-bold text-[#0F172A]">
                    {m.value}
                  </span>
                  <span className="text-[#64748B] text-sm">{m.label}</span>
                </div>
              ))}
            </div>

            {reports?.topColleges && reports.topColleges.length > 0 && (
              <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-[#E2E8F0]">
                  <h2 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="font-bold text-[#0F172A] text-lg">
                    Most Saved Colleges
                  </h2>
                </div>
                <table className="w-full">
                  <thead className="bg-[#F8FAFC]">
                    <tr>
                      {["#", "College", "Saves", "Reviews"].map((h) => (
                        <th key={h} className="text-left px-6 py-3 text-sm font-semibold text-[#64748B]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {reports.topColleges.map((college, i) => (
                      <tr key={college.id} className="border-t border-[#F1F5F9]">
                        <td className="px-6 py-4 text-[#94A3B8] text-sm font-bold">{i + 1}</td>
                        <td className="px-6 py-4 font-semibold text-[#0F172A] text-sm">{college.name}</td>
                        <td className="px-6 py-4 text-[#64748B] text-sm">{college._count.favorites}</td>
                        <td className="px-6 py-4 text-[#64748B] text-sm">{college._count.reviews}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}