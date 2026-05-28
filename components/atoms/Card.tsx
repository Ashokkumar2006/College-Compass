import React from "react";

type CardVariant = "default" | "hover" | "flat" | "elevated";

interface CardProps {
  variant?: CardVariant;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  padding?: "none" | "sm" | "md" | "lg";
}

const variantStyles: Record<CardVariant, string> = {
  default:  "bg-white border border-[#E2E8F0] shadow-sm hover:shadow-md",
  hover:    "bg-white border border-[#E2E8F0] shadow-sm hover:shadow-lg hover:-translate-y-1 cursor-pointer",
  flat:     "bg-white border border-[#E2E8F0]",
  elevated: "bg-white shadow-lg border-0",
};

const paddingStyles = {
  none: "",
  sm:   "p-4",
  md:   "p-6",
  lg:   "p-8",
};

export default function Card({
  variant = "default",
  children,
  className = "",
  onClick,
  padding = "md",
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        rounded-xl transition-all duration-200
        ${variantStyles[variant]}
        ${paddingStyles[padding]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}