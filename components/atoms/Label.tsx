import React from "react";

interface LabelProps {
  children: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
  className?: string;
}

export default function Label({
  children,
  htmlFor,
  required = false,
  className = "",
}: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={`
        text-sm font-medium text-[#0F172A]
        ${className}
      `}
    >
      {children}
      {required && (
        <span className="text-[#EF4444] ml-1">*</span>
      )}
    </label>
  );
}