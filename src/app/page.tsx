import HeroSection from "@/components/HeroSection";
import CollaborationSection from "@/components/CollaborationSection";
import PearlsCard from "@/components/PEARLSCard";
import WhyJoin from "@/components/Join";
import FaprnaNews from "@/components/News";

export default function Home() {
  return (
    <div className="grid grid-rows-[1] items-center justify-items-center min-h-screen p-0 pb-20 gap-8 sm:gap-16 sm:p-0 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <HeroSection />
        <CollaborationSection />
        <PearlsCard />
        <FaprnaNews />
        <WhyJoin />
      </main>
    </div>
  );
}
