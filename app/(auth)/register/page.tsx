"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { register } = useAuth();
  const router = useRouter();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    setLoading(true);
    setError("");
    const result = await register(name, email, password);
    setLoading(false);
    if (!result.success) {
      setError(result.error || "Registration failed");
      return;
    }
    router.push("/login?registered=true");
  };

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
          <h1 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-2xl font-bold text-[#0F172A] mt-4">Create your account</h1>
          <p className="text-[#64748B] text-sm">Free forever. No credit card needed.</p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-8 flex flex-col gap-5">
          {error && (
            <div className="bg-[#FEE2E2] text-[#991B1B] text-sm px-4 py-3 rounded-lg">{error}</div>
          )}
          <Input label="Full Name" type="text" placeholder="Rahul Sharma" value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="Email Address" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input label="Password" variant="password" placeholder="Min 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} hint="At least 8 characters" />
          <Button variant="primary" size="md" fullWidth loading={loading} onClick={handleRegister}>Create Account</Button>
          <p className="text-center text-sm text-[#64748B]">
            Already have an account?{" "}
            <Link href="/login" className="text-[#4F46E5] font-medium hover:underline">Login</Link>
          </p>
        </div>

        <p className="text-center text-xs text-[#94A3B8] mt-6">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </main>
  );
}