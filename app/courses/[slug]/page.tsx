"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Link from "next/link";

interface Course {
  id: string;
  courseName: string;
  duration: string;
  eligibility: string;
  college: {
    id: string;
    name: string;
    location: string;
    slug: string;
    fees?: number;
    placement?: string;
    rating?: number;
    rank?: number;
  };
}

export default function CourseDetailPage() {
  const { slug } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`/api/courses?collegeId=${slug}`);
        const data = await res.json();
        if (data.courses?.length > 0) setCourse(data.courses[0]);
      } catch {
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchCourse();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
        <Navbar />
        <div className="flex items-center justify-center flex-1 py-20">
          <div className="animate-spin w-10 h-10 border-4 border-[#4F46E5] border-t-transparent rounded-full" />
        </div>
        <Footer />
      </main>
    );
  }

  if (!course) {
    return (
      <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
        <Navbar />
        <div className="flex flex-col items-center justify-center flex-1 py-20 gap-4">
          <p className="text-[#94A3B8] text-lg">Course not found.</p>
          <Link href="/courses">
            <Button variant="primary" size="md">Browse Courses</Button>
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar />

      <div className="bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] py-12 px-4">
        <div className="max-w-5xl mx-auto flex flex-col gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/courses" className="text-[#C7D2FE] hover:text-white">Courses</Link>
            <span className="text-[#C7D2FE]">›</span>
            <span className="text-white">{course.courseName}</span>
          </div>
          <h1 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-3xl md:text-4xl font-bold text-white">
            {course.courseName}
          </h1>
          <p className="text-[#C7D2FE] text-lg">{course.college.name}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 flex flex-col gap-4">
            <h2 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-xl font-bold text-[#0F172A]">
              Course Details
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Course Name", value: course.courseName },
                { label: "Duration", value: course.duration },
                { label: "Eligibility", value: course.eligibility },
                { label: "College", value: course.college.name },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-1">
                  <span className="text-xs text-[#94A3B8] font-medium">{item.label}</span>
                  <span className="text-sm font-semibold text-[#0F172A]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 flex flex-col gap-4">
            <h2 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-xl font-bold text-[#0F172A]">
              About the College
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: "Location", value: course.college.location },
                { label: "Rank", value: course.college.rank ? `#${course.college.rank}` : "N/A" },
                { label: "Annual Fees", value: course.college.fees ? `₹${(course.college.fees / 100000).toFixed(1)}L` : "N/A" },
                { label: "Avg Placement", value: course.college.placement ?? "N/A" },
                { label: "Rating", value: course.college.rating ? `${course.college.rating}/5` : "N/A" },
              ].map((item) => (
                <div key={item.label} className="bg-[#F8FAFC] rounded-lg p-3 flex flex-col gap-1">
                  <span className="text-xs text-[#94A3B8]">{item.label}</span>
                  <span className="text-sm font-bold text-[#0F172A]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 flex flex-col gap-4 sticky top-20">
            <h3 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="font-bold text-[#0F172A] text-lg">
              Quick Actions
            </h3>
            <Link href={`/colleges/${course.college.slug}`}>
              <Button variant="primary" size="md" fullWidth>View College</Button>
            </Link>
            <Link href="/dashboard/recommendations">
              <Button variant="secondary" size="md" fullWidth>AI Recommendations</Button>
            </Link>
            <Link href="/compare">
              <Button variant="ghost" size="md" fullWidth>Compare Colleges</Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}