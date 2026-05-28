import React from "react";

type BadgeVariant =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "secondary"
  | "outline";

type BadgeSize = "sm" | "md";

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary:   "bg-[#EEF2FF] text-[#3730A3]",
  success:   "bg-[#D1FAE5] text-[#065F46]",
  warning:   "bg-[#FEF3C7] text-[#92400E]",
  danger:    "bg-[#FEE2E2] text-[#991B1B]",
  secondary: "bg-[#E0F9FF] text-[#0E7490]",
  outline:   "bg-white text-[#64748B] border border-[#E2E8F0]",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
};

export default function Badge({
  variant = "primary",
  size = "md",
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center justify-center
        rounded-full font-medium
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}