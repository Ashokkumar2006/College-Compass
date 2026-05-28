import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import Badge from "@/components/atoms/Badge";

const activities = [
  { id: "1", type: "search", text: "Searched for IIT Bombay", time: "2 hours ago" },
  { id: "2", type: "save", text: "Saved NIT Trichy to favorites", time: "5 hours ago" },
  { id: "3", type: "compare", text: "Compared IIT Delhi vs IIT Bombay", time: "Yesterday" },
  { id: "4", type: "ai", text: "Got AI recommendations for JEE rank 1500", time: "Yesterday" },
  { id: "5", type: "search", text: "Searched for AIIMS Delhi", time: "2 days ago" },
  { id: "6", type: "save", text: "Saved BITS Pilani to favorites", time: "3 days ago" },
];

const typeConfig = {
  search: { label: "Search", variant: "primary" as const, icon: "🔍" },
  save: { label: "Saved", variant: "success" as const, icon: "♡" },
  compare: { label: "Compare", variant: "secondary" as const, icon: "⚖️" },
  ai: { label: "AI", variant: "warning" as const, icon: "🤖" },
};

export default function ActivityPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-10 w-full flex flex-col gap-6">
        <div>
          <h1 style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-3xl font-bold text-[#0F172A]">Recent Activity</h1>
          <p className="text-[#64748B] mt-1">Your recent actions on CollegeCompass</p>
        </div>
        <div className="flex flex-col gap-3">
          {activities.map((activity) => {
            const config = typeConfig[activity.type as keyof typeof typeConfig];
            return (
              <div key={activity.id} className="bg-white rounded-xl border border-[#E2E8F0] p-4 flex items-center gap-4 hover:shadow-sm transition-all">
                <div className="w-10 h-10 bg-[#F8FAFC] rounded-xl flex items-center justify-center text-lg shrink-0">
                  {config.icon}
                </div>
                <div className="flex-1">
                  <p className="text-[#0F172A] text-sm font-medium">{activity.text}</p>
                  <p className="text-[#94A3B8] text-xs mt-0.5">{activity.time}</p>
                </div>
                <Badge variant={config.variant} size="sm">{config.label}</Badge>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </main>
  );
}