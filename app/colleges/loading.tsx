export default function CollegesLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 w-full flex gap-8">
      <aside className="hidden lg:flex flex-col gap-4 w-64 shrink-0">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-[#E2E8F0] p-4 animate-pulse h-48" />
        ))}
      </aside>
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden animate-pulse">
            <div className="h-40 bg-[#F1F5F9]" />
            <div className="p-4 flex flex-col gap-3">
              <div className="h-4 bg-[#F1F5F9] rounded w-3/4" />
              <div className="h-3 bg-[#F1F5F9] rounded w-1/2" />
              <div className="h-12 bg-[#F1F5F9] rounded" />
              <div className="h-8 bg-[#F1F5F9] rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}