"use client";

import React, { useState } from "react";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterGroupProps {
  label: string;
  options: FilterOption[];
  selected?: string[];
  onChange?: (selected: string[]) => void;
  multiSelect?: boolean;
  className?: string;
}

export default function FilterGroup({
  label,
  options,
  selected = [],
  onChange,
  multiSelect = false,
  className = "",
}: FilterGroupProps) {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = (value: string) => {
    if (multiSelect) {
      const newSelected = selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value];
      onChange?.(newSelected);
    } else {
      onChange?.(selected.includes(value) ? [] : [value]);
    }
  };

  return (
    <div className={`border border-[#E2E8F0] rounded-xl bg-white ${className}`}>
      {/* Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <span className="font-semibold text-[#0F172A] text-sm">{label}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Options */}
      {isOpen && (
        <div className="px-4 pb-4 flex flex-col gap-2">
          {options.map((option) => {
            const isSelected = selected.includes(option.value);
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleToggle(option.value)}
                className={`
                  flex items-center gap-2 text-sm px-3 py-2 rounded-lg
                  transition-all duration-150 text-left w-full
                  ${isSelected
                    ? "bg-[#EEF2FF] text-[#4F46E5] font-medium"
                    : "text-[#64748B] hover:bg-[#F8FAFC]"
                  }
                `}
              >
                <div
                  className={`
                    w-4 h-4 rounded flex items-center justify-center
                    border transition-all duration-150 shrink-0
                    ${isSelected
                      ? "bg-[#4F46E5] border-[#4F46E5]"
                      : "border-[#CBD5E1]"
                    }
                  `}
                >
                  {isSelected && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                {option.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}