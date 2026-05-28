"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/organisms/Navbar";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import RatingWidget from "@/components/molecules/RatingWidget";
import { useAuth } from "@/context/AuthContext";

interface Review {
  id: string;
  rating: number;
  comment: string;
  status: string;
  createdAt: string;
  user: { name: string };
  college: { name: string };
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const { accessToken } = useAuth();

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/reviews");
      const data = await res.json();
      setReviews(data.reviews || []);
    } catch {
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/reviews/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ status }),
      });
      setReviews(reviews.map((r) => r.id === id ? { ...r, status } : r));
    } catch {}
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const statusVariant = {
    PENDING: "warning" as const,
    APPROVED: "success" as const,
    REJECTED: "danger" as const,
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-10 w-full flex flex-col gap-6">
        <div>
          <h1 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-3xl font-bold text-[#0F172A]">
            Manage Reviews
          </h1>
          <p className="text-[#64748B] mt-1">
            {reviews.filter((r) => r.status === "PENDING").length} pending reviews
          </p>
        </div>

        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-[#E2E8F0] p-6 animate-pulse h-32" />
          ))
        ) : reviews.length === 0 ? (
          <div className="flex flex-col items-center py-16 gap-3">
            <p className="text-[#94A3B8] text-lg">No reviews yet</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-5 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="font-bold text-[#0F172A]">
                      {review.user?.name}
                    </p>
                    <p className="text-[#64748B] text-sm">
                      {review.college?.name} · {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant={statusVariant[review.status as keyof typeof statusVariant] ?? "outline"} size="sm">
                    {review.status}
                  </Badge>
                </div>

                <RatingWidget value={review.rating} readonly size="sm" showLabel={false} />
                <p className="text-[#64748B] text-sm leading-relaxed">{review.comment}</p>

                {review.status === "PENDING" && (
                  <div className="flex gap-3 pt-2 border-t border-[#F1F5F9]">
                    <Button variant="primary" size="sm" onClick={() => updateStatus(review.id, "APPROVED")}>
                      ✓ Approve
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => updateStatus(review.id, "REJECTED")}>
                      ✗ Reject
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}