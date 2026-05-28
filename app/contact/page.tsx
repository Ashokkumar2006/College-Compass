"use client";

import React, { useState } from "react";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !message) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSent(true);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar />

      <div className="bg-gradient-to-b from-[#EEF2FF] to-[#F8FAFC] py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-4xl font-bold text-[#0F172A]">Contact Us</h1>
          <p className="text-[#64748B] mt-3">Have a question? We'd love to hear from you.</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10 w-full">
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-8">
          {sent ? (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <div className="w-14 h-14 bg-[#D1FAE5] rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-xl font-bold text-[#0F172A]">Message Sent!</p>
              <p className="text-[#64748B]">We'll get back to you within 24 hours.</p>
              <Button variant="primary" onClick={() => setSent(false)}>Send Another</Button>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <Input label="Full Name" placeholder="Rahul Sharma" value={name} onChange={(e) => setName(e.target.value)} />
              <Input label="Email Address" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-[#0F172A]">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help you?"
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/10 transition-all text-sm resize-none"
                />
              </div>
              <Button variant="primary" size="md" fullWidth loading={loading} onClick={handleSubmit}>
                Send Message
              </Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}