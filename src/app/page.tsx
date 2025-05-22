import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CollaborationSection from "@/components/CollaborationSection";
import PearlsCard from "@/components/PEARLSCard";
import WhyJoin from "@/components/Join";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <HeroSection />
        <CollaborationSection />
        <PearlsCard />
        <WhyJoin />
      </main>
      <Footer />
    </div>
  );
}
