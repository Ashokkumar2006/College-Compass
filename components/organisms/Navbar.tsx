"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/atoms/Button";
import { useAuth } from "@/context/AuthContext";
import { useCompare } from "@/context/CompareContext";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout, isLoggedIn, isAdmin } = useAuth();
  const { compareList } = useCompare();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const navLinks = [
    { label: "Colleges", href: "/colleges" },
    { label: "Courses", href: "/courses" },
    { label: "Exams", href: "/exams" },
    { label: "Scholarships", href: "/scholarships" },
    { label: "Compare", href: "/compare", badge: compareList.length > 0 ? compareList.length : null },
  ];

  return (
    <nav
      className={`w-full bg-white border-b border-[#E2E8F0] fixed top-0 left-0 right-0 z-50 transition-shadow duration-200 ${
        scrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-[#4F46E5] rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
            </div>
            <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-[#0F172A] font-bold text-lg">
              CollegeCompass
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6 ml-auto">
            <div className="flex items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}
                  className="relative px-3 py-2 text-sm text-[#64748B] hover:text-[#4F46E5] font-medium rounded-lg hover:bg-[#F8FAFC] transition-all duration-200">
                  {link.label}
                  {link.badge && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#4F46E5] text-white text-xs rounded-full flex items-center justify-center">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
              {isAdmin && (
                <Link href="/admin" className="px-3 py-2 text-sm text-[#EF4444] hover:text-[#DC2626] font-medium rounded-lg hover:bg-[#FEE2E2] transition-all duration-200">
                  Admin
                </Link>
              )}
            </div>

            <div className="flex items-center gap-3">
              {isLoggedIn ? (
                <div className="relative group">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#4F46E5] transition-all cursor-pointer">
                    <div className="w-6 h-6 bg-[#4F46E5] rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {user?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-[#0F172A]">{user?.name?.split(" ")[0]}</span>
                  </div>
                  <div className="absolute right-0 top-10 bg-white border border-[#E2E8F0] rounded-xl shadow-lg w-48 py-2 hidden group-hover:flex flex-col z-50">
                    <Link href="/dashboard" className="px-4 py-2 text-sm text-[#64748B] hover:text-[#4F46E5] hover:bg-[#F8FAFC]">Dashboard</Link>
                    <Link href="/dashboard/profile" className="px-4 py-2 text-sm text-[#64748B] hover:text-[#4F46E5] hover:bg-[#F8FAFC]">Profile</Link>
                    <Link href="/dashboard/saved" className="px-4 py-2 text-sm text-[#64748B] hover:text-[#4F46E5] hover:bg-[#F8FAFC]">Saved Colleges</Link>
                    <div className="border-t border-[#E2E8F0] mt-1 pt-1">
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-[#EF4444] hover:bg-[#FEE2E2]">
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <Link href="/login"><Button variant="ghost" size="sm">Login</Button></Link>
                  <Link href="/register"><Button variant="primary" size="sm">Sign Up</Button></Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg text-[#64748B] hover:bg-[#F8FAFC] transition-colors">
            {mobileOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#E2E8F0] bg-white px-4 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
              className="px-3 py-2 text-sm text-[#64748B] hover:text-[#4F46E5] font-medium rounded-lg hover:bg-[#F8FAFC] transition-all">
              {link.label} {link.badge ? `(${link.badge})` : ""}
            </Link>
          ))}
          {isAdmin && (
            <Link href="/admin" onClick={() => setMobileOpen(false)} className="px-3 py-2 text-sm text-[#EF4444] font-medium rounded-lg hover:bg-[#FEE2E2]">
              Admin Panel
            </Link>
          )}
          <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-[#E2E8F0]">
            {isLoggedIn ? (
              <>
                <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                  <Button variant="secondary" size="sm" fullWidth>Dashboard</Button>
                </Link>
                <Link href="/dashboard/profile" onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" size="sm" fullWidth>Profile</Button>
                </Link>
                <Button variant="ghost" size="sm" fullWidth onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="secondary" size="sm" fullWidth>Login</Button>
                </Link>
                <Link href="/register" onClick={() => setMobileOpen(false)}>
                  <Button variant="primary" size="sm" fullWidth>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}