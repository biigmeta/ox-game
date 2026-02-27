import LogInCard from "@/components/auth/LogInCard";
import BackToHomeButton from "@/components/general/BackToHomeButton";

export default function Page() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8">
      <LogInCard />
      <BackToHomeButton />
    </div>
  );
}
