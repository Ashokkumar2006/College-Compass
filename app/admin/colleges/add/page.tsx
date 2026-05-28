"use client";

import React, { useState } from "react";
import Navbar from "@/components/organisms/Navbar";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddCollegePage() {
  const { accessToken } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    name: "",
    location: "",
    rank: "",
    fees: "",
    placement: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.location) {
      setError("Name and location are required");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/colleges", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name: form.name,
          location: form.location,
          rank: form.rank ? parseInt(form.rank) : null,
          fees: form.fees ? parseFloat(form.fees) : null,
          placement: form.placement || null,
          images: [],
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSuccess(true);
      setTimeout(() => router.push("/admin/colleges"), 1500);
    } catch (err: any) {
      setError(err.message || "Failed to add college");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-10 w-full flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/colleges" className="text-[#4F46E5] text-sm hover:underline">
            ← Back to Colleges
          </Link>
        </div>

        <h1 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-3xl font-bold text-[#0F172A]">
          Add New College
        </h1>

        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-8 flex flex-col gap-5">
          {error && (
            <div className="bg-[#FEE2E2] text-[#991B1B] text-sm px-4 py-3 rounded-lg">{error}</div>
          )}
          {success && (
            <div className="bg-[#D1FAE5] text-[#065F46] text-sm px-4 py-3 rounded-lg">
              College added successfully! Redirecting...
            </div>
          )}

          <Input
            label="College Name *"
            placeholder="e.g. Indian Institute of Technology Bombay"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <Input
            label="Location *"
            placeholder="e.g. Mumbai, Maharashtra"
            value={form.location}
            onChange={(e) => handleChange("location", e.target.value)}
          />
          <Input
            label="National Rank"
            type="number"
            placeholder="e.g. 1"
            value={form.rank}
            onChange={(e) => handleChange("rank", e.target.value)}
          />
          <Input
            label="Annual Fees (₹)"
            type="number"
            placeholder="e.g. 900000"
            value={form.fees}
            onChange={(e) => handleChange("fees", e.target.value)}
          />
          <Input
            label="Average Placement"
            placeholder="e.g. ₹21 LPA"
            value={form.placement}
            onChange={(e) => handleChange("placement", e.target.value)}
          />

          <div className="flex gap-3 pt-2">
            <Button
              variant="primary"
              size="md"
              loading={loading}
              onClick={handleSubmit}
              fullWidth
            >
              Add College
            </Button>
            <Link href="/admin/colleges" className="flex-1">
              <Button variant="secondary" size="md" fullWidth>Cancel</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}