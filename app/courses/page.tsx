"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import Link from "next/link";

interface Course {
  id: string;
  courseName: string;
  duration: string;
  eligibility: string;
  college: {
    name: string;
    slug: string;
    location: string;
    fees?: number;
    placement?: string;
  };
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/courses");
        const data = await res.json();
        setCourses(data.courses || []);
      } catch {
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filtered = courses.filter((c) =>
    c.courseName.toLowerCase().includes(search.toLowerCase()) ||
    c.college.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar />

      <div className="bg-white border-b border-[#E2E8F0] px-4 py-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          <h1 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-3xl font-bold text-[#0F172A]">
            Browse Courses
          </h1>
          <SearchBar
            placeholder="Search courses or colleges..."
            size="md"
            onSearch={setSearch}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 w-full flex flex-col gap-4">
        <p className="text-[#64748B] text-sm">
          Showing <span className="font-semibold text-[#0F172A]">{filtered.length}</span> courses
        </p>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-[#E2E8F0] p-6 animate-pulse h-48" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <p className="text-[#94A3B8] text-lg font-medium">No courses found</p>
            <p className="text-[#CBD5E1] text-sm">Try a different search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course) => (
              <div key={course.id} className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-5 flex flex-col gap-4 hover:shadow-md transition-all">
                <div className="flex flex-col gap-1">
                  <h3 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="font-bold text-[#0F172A] text-base">
                    {course.courseName}
                  </h3>
                  <p className="text-[#4F46E5] text-sm font-medium">{course.college.name}</p>
                  <p className="text-[#64748B] text-xs flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    {course.college.location}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 py-3 border-t border-b border-[#F1F5F9]">
                  <div>
                    <p className="text-xs text-[#94A3B8]">Duration</p>
                    <p className="text-sm font-semibold text-[#0F172A]">{course.duration}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#94A3B8]">Eligibility</p>
                    <p className="text-sm font-semibold text-[#0F172A]">{course.eligibility}</p>
                  </div>
                </div>

                {course.college.fees && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#94A3B8]">Annual Fees</span>
                    <span className="text-sm font-bold text-[#0F172A]">
                      ₹{(course.college.fees / 100000).toFixed(1)}L
                    </span>
                  </div>
                )}

                <Link href={`/colleges/${course.college.slug}`}>
                  <Button variant="secondary" size="sm" fullWidth>View College →</Button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}