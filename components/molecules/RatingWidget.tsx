"use client";

import React, { useState } from "react";

interface RatingWidgetProps {
  value?: number;
  max?: number;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
  onChange?: (rating: number) => void;
  showLabel?: boolean;
  className?: string;
}

export default function RatingWidget({
  value = 0,
  max = 5,
  readonly = false,
  size = "md",
  onChange,
  showLabel = true,
  className = "",
}: RatingWidgetProps) {
  const [hovered, setHovered] = useState(0);

  const sizeStyles = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-7 h-7",
  };

  const labelStyles = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const displayValue = hovered || value;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }).map((_, i) => {
          const starValue = i + 1;
          const filled = starValue <= displayValue;
          const halfFilled =
            !filled && starValue - 0.5 <= displayValue;

          return (
            <button
              key={i}
              type="button"
              disabled={readonly}
              onClick={() => !readonly && onChange?.(starValue)}
              onMouseEnter={() => !readonly && setHovered(starValue)}
              onMouseLeave={() => !readonly && setHovered(0)}
              className={`
                transition-all duration-100
                ${readonly ? "cursor-default" : "cursor-pointer hover:scale-110"}
              `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className={sizeStyles[size]}
                fill={filled || halfFilled ? "#F59E0B" : "none"}
                stroke={filled || halfFilled ? "#F59E0B" : "#CBD5E1"}
                strokeWidth="1.5"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </button>
          );
        })}
      </div>

      {showLabel && (
        <span className={`text-[#64748B] font-medium ${labelStyles[size]}`}>
          {value > 0 ? value.toFixed(1) : "No rating"}
        </span>
      )}
    </div>
  );
}