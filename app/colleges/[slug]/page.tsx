"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import ReviewSection from "@/components/organisms/ReviewSection";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import RatingWidget from "@/components/molecules/RatingWidget";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCompare } from "@/context/CompareContext";
import { useFavorites } from "@/context/FavoritesContext";

interface Course {
  id: string;
  courseName: string;
  duration: string;
  eligibility: string;
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: { name: string };
}

interface College {
  id: string;
  name: string;
  location: string;
  rank?: number;
  fees?: number;
  placement?: string;
  rating?: number;
  images: string[];
  slug: string;
  courses: Course[];
  reviews: Review[];
}

export default function CollegeDetailPage() {
  const { slug } = useParams();
  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuth();
  const { addToCompare, isInCompare, isFull } = useCompare();
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        const res = await fetch(`/api/colleges/${slug}`);
        const data = await res.json();
        setCollege(data.college);
      } catch {
        setCollege(null);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchCollege();
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

  if (!college) {
    return (
      <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
        <Navbar />
        <div className="flex items-center justify-center flex-1 py-20">
          <p className="text-[#64748B]">College not found.</p>
        </div>
        <Footer />
      </main>
    );
  }

  const reviews = college.reviews.map((r) => ({
    id: r.id,
    name: r.user.name,
    rating: r.rating,
    comment: r.comment,
    date: new Date(r.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" }),
  }));

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar />

      <div className="bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Link href="/colleges" className="text-[#C7D2FE] text-sm hover:text-white">Colleges</Link>
            <span className="text-[#C7D2FE]">›</span>
            <span className="text-white text-sm">{college.name}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 flex-wrap">
                {college.rank && <Badge variant="success" size="sm">Rank #{college.rank}</Badge>}
              </div>
              <h1 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-3xl md:text-4xl font-bold text-white">
                {college.name}
              </h1>
              <p className="text-[#C7D2FE] flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                {college.location}
              </p>
              <RatingWidget value={college.rating ?? 0} readonly size="md" showLabel={true} />
            </div>
            <div className="flex gap-3 flex-wrap">
              <Button
                variant="secondary"
                size="md"
                onClick={() => !isFull && addToCompare(college as any)}
                disabled={isInCompare(college.id) || isFull}
              >
                {isInCompare(college.id) ? "✓ Added" : isFull ? "Compare Full" : "+ Compare"}
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() => toggleFavorite(college.id)}
              >
                {isFavorite(college.id) ? "♥ Saved" : "♡ Save"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-[#E2E8F0] px-4 py-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Annual Fees", value: college.fees ? `₹${(college.fees / 100000).toFixed(1)}L` : "N/A" },
            { label: "Avg Placement", value: college.placement ?? "N/A" },
            { label: "Courses", value: college.courses.length },
            { label: "Rating", value: college.rating ? `${college.rating}/5` : "N/A" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center py-2">
              <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-xl font-bold text-[#0F172A]">{stat.value}</span>
              <span className="text-[#64748B] text-sm">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-10">

          {college.courses.length > 0 && (
            <section>
              <h2 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-2xl font-bold text-[#0F172A] mb-4">Courses Offered</h2>
              <div className="flex flex-col gap-3">
                {college.courses.map((course) => (
                  <div key={course.id} className="bg-white rounded-xl border border-[#E2E8F0] p-4 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-[#0F172A] text-sm">{course.courseName}</p>
                      <p className="text-[#64748B] text-xs mt-1">{course.duration} • {course.eligibility}</p>
                    </div>
                    <Badge variant="primary" size="sm">Details</Badge>
                  </div>
                ))}
              </div>
            </section>
          )}

          <ReviewSection reviews={reviews} isLoggedIn={isLoggedIn} collegeId={college.id} />
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 flex flex-col gap-4 sticky top-20">
            <h3 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="font-bold text-[#0F172A] text-lg">Quick Actions</h3>
            <Link href="/dashboard/recommendations">
              <Button variant="primary" size="md" fullWidth>Get AI Recommendation</Button>
            </Link>
            <Link href="/compare">
              <Button variant="secondary" size="md" fullWidth>Compare Colleges</Button>
            </Link>
            <div className="border-t border-[#E2E8F0] pt-4">
              <p className="text-[#64748B] text-sm font-medium mb-3">Admission Prediction</p>
              <div className="bg-[#D1FAE5] rounded-xl p-4 text-center">
                <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-2xl font-bold text-[#065F46]">72%</p>
                <p className="text-[#065F46] text-sm font-medium">High Chance</p>
                <p className="text-[#64748B] text-xs mt-1">Based on cutoff data</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}