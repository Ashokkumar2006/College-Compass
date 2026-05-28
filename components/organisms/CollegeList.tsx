import React from "react";
import Link from "next/link";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import RatingWidget from "@/components/molecules/RatingWidget";

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
  stream?: string;
}

interface CollegeListProps {
  colleges: College[];
  loading?: boolean;
  emptyMessage?: string;
}

function CollegeCard({ college }: { college: College }) {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">

      {/* Image */}
      <div className="h-40 bg-gradient-to-br from-[#EEF2FF] to-[#E0F2FE] relative overflow-hidden">
        {college.images?.[0] ? (
          <img
            src={college.images[0]}
            alt={college.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#A5B4FC"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>
        )}

        {/* Rank Badge */}
        {college.rank && (
          <div className="absolute top-3 left-3 bg-white rounded-full px-2.5 py-1 text-xs font-bold text-[#4F46E5] shadow-sm">
            #{college.rank}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3">

        {/* Name + Location */}
        <div>
          <h3
            className="font-bold text-[#0F172A] text-base leading-snug group-hover:text-[#4F46E5] transition-colors"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            {college.name}
          </h3>
          <p className="text-[#64748B] text-sm flex items-center gap-1 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            {college.location}
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-[#F1F5F9]">
          <div className="flex flex-col items-center">
            <span className="text-xs text-[#94A3B8]">Fees</span>
            <span className="text-sm font-semibold text-[#0F172A]">
              {college.fees
                ? `₹${(college.fees / 100000).toFixed(1)}L`
                : "N/A"}
            </span>
          </div>
          <div className="flex flex-col items-center border-x border-[#F1F5F9]">
            <span className="text-xs text-[#94A3B8]">Placement</span>
            <span className="text-sm font-semibold text-[#0F172A]">
              {college.placement ?? "N/A"}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs text-[#94A3B8]">Rating</span>
            <span className="text-sm font-semibold text-[#0F172A]">
              {college.rating ? `${college.rating}/5` : "N/A"}
            </span>
          </div>
        </div>

        {/* Rating + Stream */}
        <div className="flex items-center justify-between">
          <RatingWidget
            value={college.rating ?? 0}
            readonly
            size="sm"
            showLabel={false}
          />
          {college.stream && (
            <Badge variant="primary" size="sm">
              {college.stream}
            </Badge>
          )}
        </div>

        {/* CTA */}
        <Link href={`/colleges/${college.slug}`}>
          <Button variant="secondary" size="sm" fullWidth>
            View Details →
          </Button>
        </Link>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden animate-pulse">
      <div className="h-40 bg-[#F1F5F9]" />
      <div className="p-4 flex flex-col gap-3">
        <div className="h-4 bg-[#F1F5F9] rounded w-3/4" />
        <div className="h-3 bg-[#F1F5F9] rounded w-1/2" />
        <div className="h-12 bg-[#F1F5F9] rounded" />
        <div className="h-8 bg-[#F1F5F9] rounded" />
      </div>
    </div>
  );
}

export default function CollegeList({
  colleges,
  loading = false,
  emptyMessage = "No colleges found.",
}: CollegeListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (colleges.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <p className="text-[#94A3B8] text-lg font-medium">{emptyMessage}</p>
        <p className="text-[#CBD5E1] text-sm">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {colleges.map((college) => (
        <CollegeCard key={college.id} college={college} />
      ))}
    </div>
  );
}