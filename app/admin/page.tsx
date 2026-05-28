import Navbar from "@/components/organisms/Navbar";
import Badge from "@/components/atoms/Badge";
import Link from "next/link";

const stats = [
  { label: "Total Colleges", value: "5,240", change: "+12 this week", color: "#EEF2FF", text: "#4F46E5" },
  { label: "Total Users", value: "24,891", change: "+340 this week", color: "#D1FAE5", text: "#065F46" },
  { label: "Pending Reviews", value: "47", change: "Needs attention", color: "#FEF3C7", text: "#92400E" },
  { label: "AI Queries Today", value: "1,204", change: "+8% vs yesterday", color: "#E0F9FF", text: "#0E7490" },
];

const adminLinks = [
  { label: "Manage Colleges", href: "/admin/colleges", desc: "Add, edit, delete college data", icon: "🏛" },
  { label: "Manage Users", href: "/admin/users", desc: "View and manage student accounts", icon: "👥" },
  { label: "Manage Reviews", href: "/admin/reviews", desc: "Approve or reject pending reviews", icon: "⭐" },
  { label: "Reports", href: "/admin/reports", desc: "Analytics and platform insights", icon: "📊" },
];

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10 w-full flex flex-col gap-8">

        <div className="flex items-center justify-between">
          <div>
            <h1 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-3xl font-bold text-[#0F172A]">Admin Dashboard</h1>
            <p className="text-[#64748B] mt-1">Manage CollegeCompass platform</p>
          </div>
          <Badge variant="danger" size="md">Admin Access</Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-[#E2E8F0] p-5 flex flex-col gap-1">
              <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: stat.text }} className="text-3xl font-bold">{stat.value}</span>
              <span className="text-[#0F172A] text-sm font-medium">{stat.label}</span>
              <span className="text-[#94A3B8] text-xs">{stat.change}</span>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {adminLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 flex items-center gap-4 hover:shadow-md hover:border-[#4F46E5] transition-all cursor-pointer">
                <div className="w-12 h-12 bg-[#EEF2FF] rounded-xl flex items-center justify-center text-2xl shrink-0">
                  {link.icon}
                </div>
                <div>
                  <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="font-bold text-[#0F172A]">{link.label}</p>
                  <p className="text-[#64748B] text-sm">{link.desc}</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto shrink-0">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}