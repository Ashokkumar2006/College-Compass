"use client";

import React, { useState } from "react";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, accessToken, logout } = useAuth();
  const router = useRouter();
  const [name, setName] = useState(user?.name || "");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleUpdate = async () => {
    if (!name.trim()) {
      setError("Name cannot be empty");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-10 w-full flex flex-col gap-6">
        <h1 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-3xl font-bold text-[#0F172A]">
          My Profile
        </h1>

        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-8 flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#EEF2FF] rounded-full flex items-center justify-center">
              <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-2xl font-bold text-[#4F46E5]">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-xl font-bold text-[#0F172A]">
                {user?.name}
              </p>
              <p className="text-[#64748B] text-sm">{user?.email}</p>
              <p className="text-[#94A3B8] text-xs mt-1">{user?.role}</p>
            </div>
          </div>

          {error && (
            <div className="bg-[#FEE2E2] text-[#991B1B] text-sm px-4 py-3 rounded-lg">{error}</div>
          )}
          {success && (
            <div className="bg-[#D1FAE5] text-[#065F46] text-sm px-4 py-3 rounded-lg">
              Profile updated successfully!
            </div>
          )}

          <Input
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
          />
          <Input
            label="Email Address"
            value={user?.email || ""}
            disabled
            hint="Email cannot be changed"
          />
          <Input
            label="Account Type"
            value={user?.role || ""}
            disabled
          />

          <Button
            variant="primary"
            size="md"
            fullWidth
            loading={loading}
            onClick={handleUpdate}
          >
            Update Profile
          </Button>

          <div className="border-t border-[#E2E8F0] pt-4">
            <Button
              variant="danger"
              size="md"
              fullWidth
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}