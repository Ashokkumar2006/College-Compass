export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#E2E8F0] border-t-[#4F46E5] rounded-full animate-spin" />
        <p className="text-[#64748B] text-sm font-medium">Loading...</p>
      </div>
    </div>
  );
}