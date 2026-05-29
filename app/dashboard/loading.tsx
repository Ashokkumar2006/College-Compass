export default function DashboardLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 w-full flex flex-col gap-8">
      <div className="h-10 bg-[#F1F5F9] rounded w-48 animate-pulse" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-[#E2E8F0] p-5 animate-pulse h-24" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-[#E2E8F0] p-6 animate-pulse h-64" />
        ))}
      </div>
    </div>
  );
}