"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  placeholder?: string;
  defaultValue?: string;
  onSearch?: (query: string) => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function SearchBar({
  placeholder = "Search colleges, courses, exams...",
  defaultValue = "",
  onSearch,
  size = "md",
  className = "",
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const router = useRouter();

  const handleSearch = () => {
    if (!query.trim()) return;
    if (onSearch) {
      onSearch(query.trim());
    } else {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  const sizeStyles = {
    sm: "h-10 text-sm",
    md: "h-12 text-sm",
    lg: "h-14 text-base",
  };

  const buttonSizeStyles = {
    sm: "px-4 text-sm",
    md: "px-6 text-sm",
    lg: "px-8 text-base",
  };

  return (
    <div
      className={`
        flex items-center bg-white border border-[#E2E8F0] 
        rounded-full shadow-md overflow-hidden
        focus-within:border-[#4F46E5] focus-within:ring-2 
        focus-within:ring-[#4F46E5]/10 transition-all duration-200
        ${className}
      `}
    >
      {/* Search Icon */}
      <div className="pl-4 text-[#94A3B8] shrink-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>

      {/* Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={`
          flex-1 px-3 outline-none bg-transparent
          text-[#0F172A] placeholder:text-[#94A3B8]
          ${sizeStyles[size]}
        `}
      />

      {/* Clear button */}
      {query && (
        <button
          onClick={() => setQuery("")}
          className="pr-2 text-[#94A3B8] hover:text-[#64748B] transition-colors shrink-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className={`
          bg-[#4F46E5] hover:bg-[#4338CA] text-white
          font-semibold transition-all duration-200
          shrink-0 h-full rounded-full m-1
          ${buttonSizeStyles[size]}
        `}
      >
        Search
      </button>
    </div>
  );
}