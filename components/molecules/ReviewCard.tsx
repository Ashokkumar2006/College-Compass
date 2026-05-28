import React from "react";
import Badge from "@/components/atoms/Badge";
import RatingWidget from "@/components/molecules/RatingWidget";

interface ReviewCardProps {
  name: string;
  avatar?: string;
  rating: number;
  comment: string;
  date: string;
  status?: "PENDING" | "APPROVED" | "REJECTED";
  showStatus?: boolean;
  className?: string;
}

export default function ReviewCard({
  name,
  avatar,
  rating,
  comment,
  date,
  status,
  showStatus = false,
  className = "",
}: ReviewCardProps) {
  const statusVariant = {
    PENDING: "warning" as const,
    APPROVED: "success" as const,
    REJECTED: "danger" as const,
  };

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={`bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-5 flex flex-col gap-3 hover:shadow-md transition-all duration-200 ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#EEF2FF] flex items-center justify-center shrink-0">
            {avatar ? (
              <img
                src={avatar}
                alt={name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <span className="text-[#4F46E5] font-semibold text-sm">
                {initials}
              </span>
            )}
          </div>
          <div>
            <p className="font-semibold text-[#0F172A] text-sm">{name}</p>
            <p className="text-[#94A3B8] text-xs">{date}</p>
          </div>
        </div>
        {showStatus && status && (
          <Badge variant={statusVariant[status]} size="sm">
            {status}
          </Badge>
        )}
      </div>

      <RatingWidget value={rating} readonly size="sm" showLabel={false} />

      <p className="text-[#64748B] text-sm leading-relaxed">{comment}</p>
    </div>
  );
}