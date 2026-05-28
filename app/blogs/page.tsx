import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import Badge from "@/components/atoms/Badge";
import Link from "next/link";

const blogs = [
  { id: "1", title: "JEE Main 2025: Complete Guide to Preparation", slug: "jee-main-2025-guide", category: "Engineering", date: "May 2025", readTime: "8 min", excerpt: "Everything you need to know about JEE Main 2025 — syllabus, pattern, preparation tips and college cutoffs." },
  { id: "2", title: "NEET 2025: How to Choose the Right Medical College", slug: "neet-2025-college-guide", category: "Medical", date: "April 2025", readTime: "6 min", excerpt: "A comprehensive guide to selecting the best medical college based on your NEET score and preferences." },
  { id: "3", title: "IIT vs NIT: Which is Right for You?", slug: "iit-vs-nit", category: "Engineering", date: "March 2025", readTime: "5 min", excerpt: "A detailed comparison of IITs and NITs across placements, fees, culture, and career outcomes." },
  { id: "4", title: "Top Scholarships for Engineering Students in 2025", slug: "engineering-scholarships-2025", category: "Scholarships", date: "March 2025", readTime: "4 min", excerpt: "Complete list of government and private scholarships available for engineering students in India." },
  { id: "5", title: "How AI is Changing College Admissions in India", slug: "ai-college-admissions", category: "Technology", date: "February 2025", readTime: "7 min", excerpt: "Explore how artificial intelligence is helping students make better college decisions with data-driven insights." },
];

const categoryVariant: Record<string, "primary" | "success" | "warning" | "secondary"> = {
  Engineering: "primary",
  Medical: "success",
  Scholarships: "warning",
  Technology: "secondary",
};

export default function BlogsPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar />

      <div className="bg-gradient-to-b from-[#EEF2FF] to-[#F8FAFC] py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-4xl font-bold text-[#0F172A]">Blog</h1>
          <p className="text-[#64748B] mt-3">Guides, tips and insights for students navigating college admissions</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 w-full flex flex-col gap-6">
        {blogs.map((blog) => (
          <Link key={blog.id} href={`/blogs/${blog.slug}`}>
            <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-6 flex flex-col gap-3 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center gap-2">
                <Badge variant={categoryVariant[blog.category] ?? "primary"} size="sm">{blog.category}</Badge>
                <span className="text-[#94A3B8] text-xs">{blog.date}</span>
                <span className="text-[#94A3B8] text-xs">· {blog.readTime} read</span>
              </div>
              <h2 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-xl font-bold text-[#0F172A] hover:text-[#4F46E5] transition-colors">
                {blog.title}
              </h2>
              <p className="text-[#64748B] text-sm leading-relaxed">{blog.excerpt}</p>
              <span className="text-[#4F46E5] text-sm font-medium">Read more →</span>
            </div>
          </Link>
        ))}
      </div>

      <Footer />
    </main>
  );
}