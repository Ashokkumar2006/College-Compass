"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/organisms/Navbar";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import { useAuth } from "@/context/AuthContext";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  _count: { reviews: number; favorites: number };
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { accessToken } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/admin/users", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const data = await res.json();
        setUsers(data.users || []);
      } catch {
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    if (accessToken) fetchUsers();
  }, [accessToken]);

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10 w-full flex flex-col gap-6">

        <div>
          <h1 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-3xl font-bold text-[#0F172A]">
            Manage Users
          </h1>
          <p className="text-[#64748B] mt-1">{users.length} registered users</p>
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full max-w-md px-4 py-3 rounded-xl border border-[#E2E8F0] outline-none focus:border-[#4F46E5] text-sm text-[#0F172A] placeholder:text-[#94A3B8]"
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
                  {["Name", "Email", "Role", "Reviews", "Saved", "Joined"].map((h) => (
                    <th key={h} className="text-left px-6 py-4 text-sm font-semibold text-[#64748B]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((user, i) => (
                  <tr key={user.id} className={`border-b border-[#F1F5F9] ${i % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]"}`}>
                    <td className="px-6 py-4 font-semibold text-[#0F172A] text-sm">{user.name}</td>
                    <td className="px-6 py-4 text-[#64748B] text-sm">{user.email}</td>
                    <td className="px-6 py-4">
                      <Badge variant={user.role === "ADMIN" ? "danger" : "primary"} size="sm">{user.role}</Badge>
                    </td>
                    <td className="px-6 py-4 text-[#64748B] text-sm">{user._count.reviews}</td>
                    <td className="px-6 py-4 text-[#64748B] text-sm">{user._count.favorites}</td>
                    <td className="px-6 py-4 text-[#64748B] text-sm">
                      {new Date(user.createdAt).toLocaleDateString("en-IN")}
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