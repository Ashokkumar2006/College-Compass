"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/organisms/Navbar";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import { useAuth } from "@/context/AuthContext";

interface College {
  id: string;
  name: string;
  location: string;
  rank?: number;
  slug: string;
  _count: { courses: number; reviews: number };
}

export default function AdminCollegesPage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { accessToken } = useAuth();

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await fetch("/api/admin/colleges", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const data = await res.json();
        setColleges(data.colleges || []);
      } catch {
        setColleges([]);
      } finally {
        setLoading(false);
      }
    };
    if (accessToken) fetchColleges();
  }, [accessToken]);

  const deleteCollege = async (id: string) => {
    if (!confirm("Are you sure you want to delete this college?")) return;
    try {
      await fetch("/api/admin/colleges", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ collegeId: id }),
      });
      setColleges(colleges.filter((c) => c.id !== id));
    } catch {}
  };

  const filtered = colleges.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10 w-full flex flex-col gap-6">

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-3xl font-bold text-[#0F172A]">
              Manage Colleges
            </h1>
            <p className="text-[#64748B] mt-1">{colleges.length} colleges in database</p>
          </div>
          <Button variant="primary" size="md">+ Add College</Button>
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search colleges..."
          className="w-full max-w-md px-4 py-3 rounded-xl border border-[#E2E8F0] text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:border-[#4F46E5] text-sm"
        />

        {loading ? (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-[#E2E8F0] p-4 animate-pulse h-16" />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                <tr>
                  {["College", "Location", "Rank", "Courses", "Reviews", "Actions"].map((h) => (
                    <th key={h} className="text-left px-6 py-4 text-sm font-semibold text-[#64748B]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((college, i) => (
                  <tr key={college.id} className={`border-b border-[#F1F5F9] ${i % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]"}`}>
                    <td className="px-6 py-4 font-semibold text-[#0F172A] text-sm">{college.name}</td>
                    <td className="px-6 py-4 text-[#64748B] text-sm">{college.location}</td>
                    <td className="px-6 py-4 text-[#64748B] text-sm">#{college.rank ?? "N/A"}</td>
                    <td className="px-6 py-4 text-[#64748B] text-sm">{college._count.courses}</td>
                    <td className="px-6 py-4 text-[#64748B] text-sm">{college._count.reviews}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="danger" size="sm" onClick={() => deleteCollege(college.id)}>Delete</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}