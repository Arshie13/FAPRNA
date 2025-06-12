import HeroSection from "@/components/HeroSection";
import CollaborationSection from "@/components/CollaborationSection";
import WhyJoin from "@/components/Join";
import FaprnaNews from "@/components/News";

export default function Home() {
  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <HeroSection />
      <FaprnaNews />
      <CollaborationSection />
      <WhyJoin />
    </main>
  );
}
