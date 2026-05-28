"use client";

import React, { useState } from "react";
import ReviewCard from "@/components/molecules/ReviewCard";
import Button from "@/components/atoms/Button";
import RatingWidget from "@/components/molecules/RatingWidget";

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  status?: "PENDING" | "APPROVED" | "REJECTED";
}

interface ReviewSectionProps {
  reviews: Review[];
  collegeId?: string;
  isLoggedIn?: boolean;
  showForm?: boolean;
}

export default function ReviewSection({
  reviews,
  collegeId,
  isLoggedIn = false,
  showForm = true,
}: ReviewSectionProps) {
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  const handleSubmit = async () => {
    if (!userRating || !comment.trim()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitting(false);
    setSubmitted(true);
    setUserRating(0);
    setComment("");
  };

  return (
    <section className="flex flex-col gap-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            className="text-2xl font-bold text-[#0F172A]"
          >
            Student Reviews
          </h2>
          <div className="flex items-center gap-3 mt-2">
            <RatingWidget
              value={avgRating}
              readonly
              size="md"
              showLabel={true}
            />
            <span className="text-[#64748B] text-sm">
              {reviews.length} review{reviews.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      {/* Write Review Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-6">
          <h3
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            className="font-bold text-[#0F172A] text-lg mb-4"
          >
            Write a Review
          </h3>

          {!isLoggedIn ? (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <p className="text-[#64748B] text-sm">
                Please login to write a review
              </p>
              <Button variant="primary" size="sm">
                Login to Review
              </Button>
            </div>
          ) : submitted ? (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <div className="w-12 h-12 bg-[#D1FAE5] rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <p className="text-[#0F172A] font-semibold">Review Submitted!</p>
              <p className="text-[#64748B] text-sm">
                Your review is pending approval.
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSubmitted(false)}
              >
                Write Another
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm font-medium text-[#0F172A] mb-2">
                  Your Rating
                </p>
                <RatingWidget
                  value={userRating}
                  readonly={false}
                  size="lg"
                  onChange={setUserRating}
                  showLabel={true}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-[#0F172A] mb-2">
                  Your Review
                </p>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience about placements, faculty, campus life..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/10 transition-all text-sm resize-none"
                />
              </div>
              <Button
                variant="primary"
                size="md"
                loading={submitting}
                disabled={!userRating || !comment.trim()}
                onClick={handleSubmit}
              >
                Submit Review
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <p className="text-[#94A3B8] font-medium">No reviews yet</p>
          <p className="text-[#CBD5E1] text-sm">Be the first to review</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              name={review.name}
              rating={review.rating}
              comment={review.comment}
              date={review.date}
              status={review.status}
            />
          ))}
        </div>
      )}
    </section>
  );
}