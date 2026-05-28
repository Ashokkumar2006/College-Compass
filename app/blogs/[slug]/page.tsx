import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import Badge from "@/components/atoms/Badge";
import Link from "next/link";
import Button from "@/components/atoms/Button";

const blogs: Record<string, any> = {
  "jee-main-2025-guide": {
    title: "JEE Main 2025: Complete Guide to Preparation",
    category: "Engineering",
    date: "May 2025",
    readTime: "8 min",
    content: `
JEE Main 2025 is one of the most competitive engineering entrance exams in India. 
Here is everything you need to know to prepare effectively.

## Exam Pattern
JEE Main consists of three papers. Paper 1 is for B.Tech/B.E admissions and covers Physics, Chemistry, and Mathematics. 
The exam is conducted in two sessions — January and April.

## Syllabus Overview
The syllabus covers Class 11 and 12 topics in Physics, Chemistry, and Mathematics. 
Key topics include Mechanics, Thermodynamics, Organic Chemistry, and Calculus.

## Preparation Strategy
Start with NCERT books for building fundamentals. Then move to advanced books like HC Verma for Physics 
and RD Sharma for Mathematics. Solve previous year papers regularly.

## Important Dates
Registration typically opens in October for the January session and February for the April session.
Results are usually declared within 2-3 weeks of the exam.

## Top Colleges Accepting JEE Main
NITs, IIITs, and other CFTIs accept JEE Main scores. 
Top picks include NIT Trichy, NIT Warangal, and IIIT Hyderabad.
    `,
  },
  "neet-2025-college-guide": {
    title: "NEET 2025: How to Choose the Right Medical College",
    category: "Medical",
    date: "April 2025",
    readTime: "6 min",
    content: `
Choosing the right medical college after NEET is a crucial decision that will shape your entire medical career.

## Understanding Your Score
Your NEET score determines which colleges you can apply to. 
Scores above 600 open doors to top government medical colleges like AIIMS and JIPMER.

## Government vs Private Colleges
Government medical colleges offer subsidized fees ranging from ₹10,000 to ₹1 lakh per year. 
Private colleges can charge anywhere from ₹5 lakh to ₹25 lakh per year.

## Key Factors to Consider
Consider location, fees, infrastructure, faculty quality, and hospital affiliations when choosing a college.

## Counseling Process
NEET counseling is conducted by MCC for 15% All India Quota seats. 
State counseling handles 85% state quota seats.
    `,
  },
};

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const blog = blogs[params.slug];

  if (!blog) {
    return (
      <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
        <Navbar />
        <div className="flex flex-col items-center justify-center flex-1 py-20 gap-4">
          <p className="text-[#94A3B8] text-lg">Blog post not found.</p>
          <Link href="/blogs">
            <Button variant="primary" size="md">Back to Blogs</Button>
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-12 w-full flex flex-col gap-8">
        <div className="flex items-center gap-2 text-sm">
          <Link href="/blogs" className="text-[#4F46E5] hover:underline">Blog</Link>
          <span className="text-[#94A3B8]">›</span>
          <span className="text-[#64748B]">{blog.title}</span>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="primary" size="sm">{blog.category}</Badge>
            <span className="text-[#94A3B8] text-sm">{blog.date}</span>
            <span className="text-[#94A3B8] text-sm">· {blog.readTime} read</span>
          </div>
          <h1 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-3xl md:text-4xl font-bold text-[#0F172A] leading-tight">
            {blog.title}
          </h1>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-8">
          <div className="prose prose-slate max-w-none">
            {blog.content.split("\n").map((line: string, i: number) => {
              if (line.startsWith("## ")) {
                return (
                  <h2 key={i} style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-xl font-bold text-[#0F172A] mt-6 mb-3">
                    {line.replace("## ", "")}
                  </h2>
                );
              }
              if (line.trim()) {
                return <p key={i} className="text-[#64748B] leading-relaxed mb-4">{line}</p>;
              }
              return null;
            })}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
          <Link href="/blogs">
            <Button variant="secondary" size="sm">← Back to Blogs</Button>
          </Link>
          <Link href="/colleges">
            <Button variant="primary" size="sm">Explore Colleges →</Button>
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}