"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import Link from "next/link";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleReset = async () => {
    if (!password || !confirm) {
      setError("Please fill in all fields");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSuccess(true);
      setTimeout(() => router.push("/login"), 2000);
    } catch (err: any) {
      setError(err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <p className="text-[#EF4444]">Invalid reset link. Please request a new one.</p>
        <Link href="/forgot-password">
          <Button variant="primary" size="md">Request Reset Link</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-8 flex flex-col gap-5">
      {success ? (
        <div className="flex flex-col items-center gap-4 py-4 text-center">
          <div className="w-14 h-14 bg-[#D1FAE5] rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <p className="font-bold text-[#0F172A] text-lg">Password Reset!</p>
          <p className="text-[#64748B] text-sm">Redirecting to login...</p>
        </div>
      ) : (
        <>
          {error && (
            <div className="bg-[#FEE2E2] text-[#991B1B] text-sm px-4 py-3 rounded-lg">{error}</div>
          )}
          <Input
            label="New Password"
            variant="password"
            placeholder="Min 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            label="Confirm Password"
            variant="password"
            placeholder="Confirm your password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          <Button variant="primary" size="md" fullWidth loading={loading} onClick={handleReset}>
            Reset Password
          </Button>
        </>
      )}
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center gap-2 mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#4F46E5] rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
            </div>
            <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-xl font-bold text-[#0F172A]">CollegeCompass</span>
          </Link>
          <h1 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-2xl font-bold text-[#0F172A] mt-4">Set New Password</h1>
        </div>
        <Suspense fallback={<div className="animate-pulse bg-white rounded-2xl h-48" />}>
          <ResetPasswordContent />
        </Suspense>
      </div>
    </main>
  );
}