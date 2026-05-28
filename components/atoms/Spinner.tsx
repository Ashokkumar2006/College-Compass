export default function Spinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClass = { sm: "w-5 h-5", md: "w-8 h-8", lg: "w-12 h-12" };
  return (
    <div className={`${sizeClass[size]} animate-spin border-4 border-[#E2E8F0] border-t-[#4F46E5] rounded-full`} />
  );
}