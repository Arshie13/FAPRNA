"use client"

import { Button } from "@/components/ui/button"
import { Trophy, History, Vote, Home } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

interface LuminanceAwardsProps {
  onVote: () => void
}

// Star component for decorative elements
const GoldStar = ({ className = "", size = 4 }: { className?: string; size?: number }) => (
  <div
    className={`absolute w-${size} h-${size} bg-gold-300 rotate-45 transform animate-twinkle ${className}`}
    style={{
      clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
    }}
  ></div>
)

// Add a new PurpleStar component for twinkling stars with purple color
const PurpleStar = ({ className = "", size = 3 }: { className?: string; size?: number }) => (
  <div
    className={`absolute w-${size} h-${size} bg-purple-400 rotate-45 transform animate-twinkle ${className}`}
    style={{
      clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
    }}
  ></div>
)

// Add a new component for the twinkling background with subtle purple dots
const TwinklingBackground = () => {
  const [dots, setDots] = useState<
    { width: number; height: number; top: number; left: number; delay: number; duration: number }[]
  >([])

  useEffect(() => {
    const newDots = Array.from({ length: 60 }).map(() => ({
      width: Math.random() * 2 + 1,
      height: Math.random() * 2 + 1,
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 5 + 3,
    }))
    setDots(newDots)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Small twinkling dots with adjusted transparency */}
      {dots.map((dot, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-purple-300/40 animate-twinkle"
          style={{
            width: dot.width + "px",
            height: dot.height + "px",
            top: dot.top + "%",
            left: dot.left + "%",
            animationDelay: dot.delay + "s",
            animationDuration: dot.duration + "s",
          }}
        ></div>
      ))}
    </div>
  )
}

export default function LuminanceAwards({ onVote }: LuminanceAwardsProps) {
  const [showHistory, setShowHistory] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Twinkling background */}
      <TwinklingBackground />

      {/* Gold wave decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-1/2 h-full border-r border-gold-500/20 border-dashed"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full border-l border-gold-500/20 border-dashed"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-gold-radial"></div>
          <div className="absolute bottom-40 right-20 w-80 h-80 rounded-full bg-gold-radial"></div>
        </div>

        {/* Gold wave lines */}
        <div className="absolute top-0 left-0 w-full h-full">
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
            <path
              d="M0,100 C300,150 500,50 1200,100 L1200,0 L0,0 Z"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1"
              strokeOpacity="0.3"
            />
            <path
              d="M0,200 C300,250 700,150 1200,200 L1200,0 L0,0 Z"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1"
              strokeOpacity="0.2"
            />
            <path
              d="M0,300 C200,350 600,250 1200,300 L1200,0 L0,0 Z"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1"
              strokeOpacity="0.1"
            />
          </svg>
        </div>

        {/* Stars with purple tint */}
        <GoldStar className="top-20 left-[10%]" size={4} />
        <GoldStar className="top-40 right-[15%]" size={3} />
        <GoldStar className="bottom-32 left-[20%]" size={5} />
        <GoldStar className="bottom-60 right-[25%]" size={4} />
        <GoldStar className="top-80 left-[30%]" size={3} />

        {/* Add purple stars */}
        <PurpleStar className="top-40 left-[25%]" size={4} />
        <PurpleStar className="top-60 right-[30%]" size={3} />
        <PurpleStar className="bottom-40 left-[40%]" size={5} />
        <PurpleStar className="bottom-80 right-[15%]" size={4} />
        <PurpleStar className="top-1/3 left-[60%]" size={3} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <div className="mb-8 flex justify-between items-center">
          <Button
            asChild
            variant="outline"
            className="border-gold-500 text-gold-500 hover:bg-gold-500/10 transition-colors"
          >
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Back to FAPRNA Homepage
            </Link>
          </Button>

          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-black font-bold text-sm">FAPRNA</span>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button
            onClick={() => setShowHistory(false)}
            variant={!showHistory ? "default" : "outline"}
            className={`transition-all duration-300 ${
              !showHistory
                ? "bg-gradient-to-r from-gold-500 to-gold-600 text-black hover:from-gold-600 hover:to-gold-700 shadow-lg shadow-gold-500/20"
                : "border-gold-500 text-gold-500 hover:bg-gold-500/10"
            }`}
          >
            <Trophy className="w-4 h-4 mr-2" />
            Current Recipients
          </Button>
          <Button
            onClick={() => setShowHistory(true)}
            variant={showHistory ? "default" : "outline"}
            className={`transition-all duration-300 ${
              showHistory
                ? "bg-gradient-to-r from-gold-500 to-gold-600 text-black hover:from-gold-600 hover:to-gold-700 shadow-lg shadow-gold-500/20"
                : "border-gold-500 text-gold-500 hover:bg-gold-500/10"
            }`}
          >
            <History className="w-4 h-4 mr-2" />
            Previous Recipients
          </Button>
        </div>

        {/* Current Winners - Display Image */}
        {!showHistory && (
          <div className="space-y-8">
            {/* Main Luminance Awards Image */}
            <div className="flex justify-center">
              <div className="relative max-w-4xl w-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-gold-500/30 to-gold-500/20 rounded-lg blur-md"></div>
                <Image
                  src="/award.jpg"
                  alt="LUMINANCE AWARDEES 2025 - Dr. Reimund Serafica winners in three categories: Advancement of Intentionality, Advancement in Inquiry, and Advancement with Impact"
                  width={1200}
                  height={1600}
                  className="w-full h-auto rounded-lg shadow-2xl shadow-purple-500/20 border border-gold-500/30 relative z-10"
                  priority
                />
              </div>
            </div>

            {/* Voting Button */}
            <div className="text-center mt-12">
              <Button
                onClick={onVote}
                size="lg"
                className="bg-gradient-to-r from-gold-500 to-gold-600 text-black px-8 py-3 hover:from-gold-600 hover:to-gold-700 transition-colors shadow-lg shadow-gold-500/20"
              >
                <Vote className="w-5 h-5 mr-2" />
                Submit Nomination
              </Button>
            </div>
          </div>
        )}

        {/* Historical Winners */}
        {showHistory && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-serif font-light text-gold-500 mb-6 tracking-wide">Hall of Excellence</h2>
              <div className="w-32 h-0.5 bg-gradient-to-r from-purple-500/50 via-gold-500 to-purple-500/50 mx-auto mb-8"></div>

              <div className="bg-black/50 border border-gold-500/30 rounded-lg p-8 max-w-2xl mx-auto shadow-lg shadow-purple-500/10">
                <p className="text-gold-300 text-lg italic">
                  &quot;Previous award recipients will be showcased here as we continue to honor excellence in
                  Filipino-American advanced practice nursing.&quot;
                </p>
                <p className="text-gray-400 mt-4">
                  Check back for updates on our distinguished alumni and their continued contributions to the nursing
                  profession.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
