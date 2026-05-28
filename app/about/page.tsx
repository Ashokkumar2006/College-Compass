import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import Button from "@/components/atoms/Button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar />

      <div className="bg-gradient-to-b from-[#EEF2FF] to-[#F8FAFC] py-16 px-4">
        <div className="max-w-3xl mx-auto text-center flex flex-col gap-4">
          <h1 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-4xl font-bold text-[#0F172A]">
            About CollegeCompass
          </h1>
          <p className="text-[#64748B] text-lg leading-relaxed">
            We built CollegeCompass because we believe every student deserves unbiased, accurate information to make the most important decision of their life.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 w-full flex flex-col gap-12">

        {/* Mission */}
        <section className="flex flex-col gap-4">
          <h2 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-2xl font-bold text-[#0F172A]">Our Mission</h2>
          <p className="text-[#64748B] leading-relaxed">
            The Indian higher education search landscape is marred by data fragmentation, commercial bias, and unreliable information. CollegeCompass exists to change that — by providing a 100% ad-free, student-first platform with verified data on fees, placements, cutoffs, and reviews.
          </p>
        </section>

        {/* Values */}
        <section className="flex flex-col gap-6">
          <h2 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-2xl font-bold text-[#0F172A]">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Transparency", desc: "No paid rankings. No hidden agendas. Just honest data.", icon: "🔍" },
              { title: "Student First", desc: "Every feature is built for students, not for colleges or advertisers.", icon: "🎓" },
              { title: "AI Powered", desc: "Intelligent recommendations based on your rank and goals.", icon: "🤖" },
            ].map((v) => (
              <div key={v.title} className="bg-white rounded-xl border border-[#E2E8F0] p-6 flex flex-col gap-3">
                <span className="text-3xl">{v.icon}</span>
                <h3 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="font-bold text-[#0F172A]">{v.title}</h3>
                <p className="text-[#64748B] text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="bg-[#4F46E5] rounded-2xl p-8 text-white text-center">
          <h2 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-2xl font-bold mb-6">By The Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "5000+", label: "Colleges" },
              { value: "2L+", label: "Students" },
              { value: "100%", label: "Ad-free" },
              { value: "₹0", label: "Cost" },
            ].map((s) => (
              <div key={s.label}>
                <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-3xl font-bold">{s.value}</p>
                <p className="text-[#C7D2FE] text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center">
          <Link href="/colleges">
            <Button variant="primary" size="lg">Start Exploring Colleges</Button>
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}