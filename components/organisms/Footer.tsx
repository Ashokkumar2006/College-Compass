import React from "react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    Platform: [
      { label: "Search Colleges", href: "/search" },
      { label: "Compare Colleges", href: "/compare" },
      { label: "AI Recommendation", href: "/dashboard/recommendations" },
      { label: "Admission Predictor", href: "/colleges" },
    ],
    Streams: [
      { label: "Engineering (JEE)", href: "/colleges?stream=engineering" },
      { label: "Medical (NEET)", href: "/colleges?stream=medical" },
      { label: "Exams", href: "/exams" },
      { label: "Scholarships", href: "/scholarships" },
    ],
    Company: [
      { label: "About Us", href: "/about" },
      { label: "Blog", href: "/blogs" },
      { label: "Contact", href: "/contact" },
    ],
  };

  return (
    <footer className="bg-[#0F172A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Brand */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#4F46E5] rounded-lg flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <span
                className="font-bold text-lg text-white"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                CollegeCompass
              </span>
            </Link>

            <p className="text-[#94A3B8] text-sm leading-relaxed max-w-xs">
              India's most trusted college discovery platform. 
              Find, compare and get AI-powered recommendations 
              for Engineering and Medical colleges.
            </p>

            {/* Stats */}
            <div className="flex gap-6 mt-2">
              <div>
                <p className="text-white font-bold text-lg">5000+</p>
                <p className="text-[#94A3B8] text-xs">Colleges</p>
              </div>
              <div>
                <p className="text-white font-bold text-lg">2L+</p>
                <p className="text-[#94A3B8] text-xs">Students</p>
              </div>
              <div>
                <p className="text-white font-bold text-lg">100%</p>
                <p className="text-[#94A3B8] text-xs">Ad-free</p>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category} className="flex flex-col gap-3">
              <h4
                className="text-white font-semibold text-sm"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                {category}
              </h4>
              <ul className="flex flex-col gap-2">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[#94A3B8] text-sm hover:text-white transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#1E293B] mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#64748B] text-sm">
            © {currentYear} CollegeCompass. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/about"
              className="text-[#64748B] text-sm hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/about"
              className="text-[#64748B] text-sm hover:text-white transition-colors"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}