import React from "react";
import Badge from "@/components/atoms/Badge";
import RatingWidget from "@/components/molecules/RatingWidget";
import Button from "@/components/atoms/Button";
import Link from "next/link";

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

interface ComparisonTableProps {
  colleges: College[];
  onRemove?: (id: string) => void;
}

export default function ComparisonTable({
  colleges,
  onRemove,
}: ComparisonTableProps) {
  if (colleges.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <line x1="3" y1="9" x2="21" y2="9"/>
          <line x1="3" y1="15" x2="21" y2="15"/>
          <line x1="9" y1="3" x2="9" y2="21"/>
        </svg>
        <p className="text-[#94A3B8] text-lg font-medium">No colleges to compare</p>
        <p className="text-[#CBD5E1] text-sm">Add up to 3 colleges to compare</p>
      </div>
    );
  }

  const rows = [
    {
      label: "Location",
      render: (c: College) => (
        <span className="text-[#64748B] text-sm">{c.location}</span>
      ),
    },
    {
      label: "Rank",
      render: (c: College) =>
        c.rank ? (
          <Badge variant="primary" size="sm">#{c.rank}</Badge>
        ) : (
          <span className="text-[#94A3B8] text-sm">N/A</span>
        ),
    },
    {
      label: "Annual Fees",
      render: (c: College) => (
        <span className="text-[#0F172A] font-semibold text-sm">
          {c.fees ? `₹${(c.fees / 100000).toFixed(1)}L` : "N/A"}
        </span>
      ),
    },
    {
      label: "Avg Placement",
      render: (c: College) => (
        <span className="text-[#10B981] font-semibold text-sm">
          {c.placement ?? "N/A"}
        </span>
      ),
    },
    {
      label: "Rating",
      render: (c: College) => (
        <RatingWidget
          value={c.rating ?? 0}
          readonly
          size="sm"
          showLabel={true}
        />
      ),
    },
    {
      label: "Stream",
      render: (c: College) =>
        c.stream ? (
          <Badge variant="secondary" size="sm">{c.stream}</Badge>
        ) : (
          <span className="text-[#94A3B8] text-sm">N/A</span>
        ),
    },
  ];

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-[#E2E8F0] bg-white shadow-sm">
      <table className="w-full min-w-[600px]">
        {/* Header */}
        <thead>
          <tr className="border-b border-[#E2E8F0]">
            <th className="text-left px-6 py-4 text-sm font-semibold text-[#64748B] w-32 bg-[#F8FAFC]">
              Compare
            </th>
            {colleges.map((college) => (
              <th key={college.id} className="px-6 py-4 text-center">
                <div className="flex flex-col items-center gap-2">
                  {/* College Logo Placeholder */}
                  <div className="w-12 h-12 rounded-xl bg-[#EEF2FF] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                    </svg>
                  </div>
                  <span
                    className="font-bold text-[#0F172A] text-sm text-center leading-snug"
                    style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                  >
                    {college.name}
                  </span>
                  {onRemove && (
                    <button
                      onClick={() => onRemove(college.id)}
                      className="text-xs text-[#94A3B8] hover:text-[#EF4444] transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        {/* Rows */}
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.label}
              className={`border-b border-[#F1F5F9] ${i % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]"}`}
            >
              <td className="px-6 py-4 text-sm font-medium text-[#64748B]">
                {row.label}
              </td>
              {colleges.map((college) => (
                <td key={college.id} className="px-6 py-4 text-center">
                  <div className="flex justify-center">
                    {row.render(college)}
                  </div>
                </td>
              ))}
            </tr>
          ))}

          {/* Action Row */}
          <tr className="bg-white">
            <td className="px-6 py-4 text-sm font-medium text-[#64748B]">
              Details
            </td>
            {colleges.map((college) => (
              <td key={college.id} className="px-6 py-4 text-center">
                <Link href={`/colleges/${college.slug}`}>
                  <Button variant="primary" size="sm">
                    View College
                  </Button>
                </Link>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}