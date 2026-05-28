"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";

interface Exam {
  id: string;
  name: string;
  stream: string;
  conductingBody: string;
  eligibility: string;
  syllabus?: string;
  importantDates?: any;
}

const fallbackExams = [
  { id: "1", name: "JEE Main", stream: "Engineering", conductingBody: "NTA", eligibility: "Class 12 with PCM", syllabus: "Physics, Chemistry, Mathematics" },
  { id: "2", name: "JEE Advanced", stream: "Engineering", conductingBody: "IIT", eligibility: "JEE Main qualified", syllabus: "Physics, Chemistry, Mathematics (Advanced)" },
  { id: "3", name: "NEET UG", stream: "Medical", conductingBody: "NTA", eligibility: "Class 12 with PCB", syllabus: "Physics, Chemistry, Biology" },
  { id: "4", name: "MHT-CET", stream: "Engineering", conductingBody: "Maharashtra State", eligibility: "Class 12 with PCM", syllabus: "Physics, Chemistry, Mathematics" },
  { id: "5", name: "KCET", stream: "Engineering", conductingBody: "KEA Karnataka", eligibility: "Class 12 with PCM", syllabus: "Physics, Chemistry, Mathematics" },
];

export default function ExamsPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeStream, setActiveStream] = useState("all");

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await fetch("/api/exams");
        const data = await res.json();
        setExams(data.exams?.length > 0 ? data.exams : fallbackExams);
      } catch {
        setExams(fallbackExams);
      } finally {
        setLoading(false);
      }
    };
    fetchExams();
  }, []);

  const filtered = activeStream === "all"
    ? exams
    : exams.filter((e) => e.stream.toLowerCase().includes(activeStream));

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar />

      <div className="bg-gradient-to-b from-[#EEF2FF] to-[#F8FAFC] py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-4xl font-bold text-[#0F172A]">
            Entrance Exams
          </h1>
          <p className="text-[#64748B] mt-3 text-lg">
            Everything you need to know about Engineering and Medical entrance exams
          </p>
          <div className="flex items-center justify-center gap-2 mt-6">
            {["all", "engineering", "medical"].map((s) => (
              <button key={s} onClick={() => setActiveStream(s)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeStream === s ? "bg-[#4F46E5] text-white" : "bg-white text-[#64748B] border border-[#E2E8F0] hover:border-[#4F46E5]"}`}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 w-full flex flex-col gap-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-[#E2E8F0] p-6 animate-pulse h-24" />
          ))
        ) : filtered.map((exam) => (
          <div key={exam.id} className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-all">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-xl font-bold text-[#0F172A]">{exam.name}</h2>
                <Badge variant={exam.stream === "Engineering" ? "primary" : "success"} size="sm">{exam.stream}</Badge>
              </div>
              {exam.syllabus && <p className="text-[#64748B] text-sm">{exam.syllabus}</p>}
              <div className="flex flex-wrap gap-4 mt-1">
                <span className="text-xs text-[#94A3B8]">📋 {exam.conductingBody}</span>
                <span className="text-xs text-[#94A3B8]">✅ {exam.eligibility}</span>
              </div>
            </div>
            <Button variant="secondary" size="sm">View Details</Button>
          </div>
        ))}
      </div>

      <Footer />
    </main>
  );
}