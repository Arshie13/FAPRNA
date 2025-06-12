"use client"

import { Button } from "@/components/ui/button"
import { Trophy, History, Home, StarIcon } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

interface LuminanceAwardsProps {
  onVote: () => void
}

// Golden Bokeh Orbs component
const GoldenBokeh = () => {
  const [orbs, setOrbs] = useState<
    { size: number; top: number; left: number; delay: number; duration: number; opacity: number }[]
  >([])

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    const orbCount = isMobile ? 12 : 25
    const maxSize = isMobile ? 40 : 80
    const minSize = isMobile ? 10 : 20

    const newOrbs = Array.from({ length: orbCount }).map(() => ({
      size: Math.random() * maxSize + minSize,
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: Math.random() * 6 + 4,
      opacity: Math.random() * (isMobile ? 0.4 : 0.7) + (isMobile ? 0.2 : 0.3),
    }))
    setOrbs(newOrbs)

    const handleResize = () => {
      const isMobileNow = window.innerWidth < 768
      const newOrbCount = isMobileNow ? 12 : 25
      const newMaxSize = isMobileNow ? 40 : 80
      const newMinSize = isMobileNow ? 10 : 20

      const resizedOrbs = Array.from({ length: newOrbCount }).map(() => ({
        size: Math.random() * newMaxSize + newMinSize,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: Math.random() * 6 + 4,
        opacity: Math.random() * (isMobileNow ? 0.4 : 0.7) + (isMobileNow ? 0.2 : 0.3),
      }))
      setOrbs(resizedOrbs)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {orbs.map((orb, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-float"
          style={{
            width: orb.size + "px",
            height: orb.size + "px",
            top: orb.top + "%",
            left: orb.left + "%",
            animationDelay: orb.delay + "s",
            animationDuration: orb.duration + "s",
            background: `radial-gradient(circle, rgba(255, 215, 0, ${orb.opacity}) 0%, rgba(212, 175, 55, ${orb.opacity * 0.8}) 30%, rgba(255, 215, 0, 0) 70%)`,
            filter: "blur(2px)",
            boxShadow: `0 0 ${orb.size * 0.5}px rgba(255, 215, 0, ${orb.opacity * 0.6})`,
          }}
        ></div>
      ))}
    </div>
  )
}

// Golden Sparkles component
const GoldenSparkles = () => {
  const [sparkles, setSparkles] = useState<
    { size: number; top: number; left: number; delay: number; duration: number }[]
  >([])

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    const sparkleCount = isMobile ? 20 : 40
    const maxSize = isMobile ? 3 : 4
    const minSize = isMobile ? 1 : 2

    const newSparkles = Array.from({ length: sparkleCount }).map(() => ({
      size: Math.random() * maxSize + minSize,
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }))
    setSparkles(newSparkles)

    const handleResize = () => {
      const isMobileNow = window.innerWidth < 768
      const newSparkleCount = isMobileNow ? 20 : 40
      const newMaxSize = isMobileNow ? 3 : 4
      const newMinSize = isMobileNow ? 1 : 2

      const resizedSparkles = Array.from({ length: newSparkleCount }).map(() => ({
        size: Math.random() * newMaxSize + newMinSize,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
      }))
      setSparkles(resizedSparkles)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none">
      {sparkles.map((sparkle, i) => (
        <div
          key={i}
          className="absolute animate-twinkle"
          style={{
            width: sparkle.size + "px",
            height: sparkle.size + "px",
            top: sparkle.top + "%",
            left: sparkle.left + "%",
            animationDelay: sparkle.delay + "s",
            animationDuration: sparkle.duration + "s",
            background: "#FFD700",
            borderRadius: "50%",
            boxShadow: "0 0 10px #FFD700",
          }}
        ></div>
      ))}
    </div>
  )
}

export default function LuminanceAwards({ onVote }: LuminanceAwardsProps) {
  const [showHistory, setShowHistory] = useState(false)

  return (
    <div className="bg-black text-white relative min-h-screen overflow-hidden">
      {/* Golden Bokeh Background */}
      <GoldenBokeh />

      {/* Golden Sparkles */}
      <GoldenSparkles />

      <div className="relative z-10 max-w-5xl mx-auto px-8 sm:px-12 lg:px-16 pt-16 pb-8">
        {/* Navigation */}
        <div className="mb-8 flex justify-between items-center">
          <Button
            asChild
            variant="outline"
            className="transition-colors backdrop-blur-sm"
            style={{
              borderColor: "#D4AF37",
              color: "#D4AF37",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              boxShadow: "0 0 15px 0 rgba(212, 175, 55, 0.4)",
            }}
          >
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Back to FAPRNA Homepage
            </Link>
          </Button>

        </div>

        {/* Page Title */}
        <div className="text-center mb-12">
          <h1
            className="text-6xl font-serif tracking-wider bg-clip-text text-transparent bg-[length:200%_auto] animate-text-shimmer animate-pulse drop-shadow-2xl"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #FFD700 0%, #FFA500 15%, #FFD700 30%, #DAA520 45%, #FFD700 60%, #B8860B 75%, #FFD700 90%, #FFA500 100%)",
              textShadow: "0 0 30px rgba(255, 215, 0, 0.8)",
            }}
          >
            LUMINANCE AWARDS
          </h1>
          <div
            className="w-48 h-1 mx-auto mt-6 rounded-full"
            style={{
              background: "linear-gradient(to right, transparent, #FFD700, #FFA500, #FFD700, transparent)",
              boxShadow: "0 0 20px rgba(255, 215, 0, 0.6)",
            }}
          ></div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <Button
            onClick={() => setShowHistory(false)}
            variant={!showHistory ? "default" : "outline"}
            className="transition-all duration-300 backdrop-blur-sm text-lg px-8 py-4"
            style={
              !showHistory
                ? {
                    background: "linear-gradient(to right, #FFD700, #FFA500)",
                    color: "black",
                    boxShadow: "0 0 25px 0 rgba(255, 215, 0, 0.6)",
                    border: "2px solid #FFD700",
                  }
                : {
                    borderColor: "#D4AF37",
                    color: "#D4AF37",
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    boxShadow: "0 0 15px 0 rgba(212, 175, 55, 0.3)",
                  }
            }
          >
            <Trophy className="w-5 h-5 mr-2" />
            Current Recipients
          </Button>
          <Button
            onClick={() => setShowHistory(true)}
            variant={showHistory ? "default" : "outline"}
            className="transition-all duration-300 backdrop-blur-sm text-lg px-8 py-4"
            style={
              showHistory
                ? {
                    background: "linear-gradient(to right, #FFD700, #FFA500)",
                    color: "black",
                    boxShadow: "0 0 25px 0 rgba(255, 215, 0, 0.6)",
                    border: "2px solid #FFD700",
                  }
                : {
                    borderColor: "#D4AF37",
                    color: "#D4AF37",
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    boxShadow: "0 0 15px 0 rgba(212, 175, 55, 0.3)",
                  }
            }
          >
            <History className="w-5 h-5 mr-2" />
            Previous Recipients
          </Button>
        </div>

        {/* Current Winners - Display Image */}
        {!showHistory && (
          <div className="space-y-12">
            {/* Main Luminance Awards Image */}
            <div className="flex justify-center">
              <div className="relative max-w-4xl w-full">
                <div
                  className="absolute -inset-2 rounded-xl blur-lg"
                  style={{
                    background:
                      "linear-gradient(45deg, rgba(255, 215, 0, 0.4), rgba(255, 165, 0, 0.5), rgba(255, 215, 0, 0.4))",
                  }}
                ></div>
                <div
                  className="absolute -inset-1 rounded-xl"
                  style={{
                    background: "linear-gradient(45deg, #FFD700, #FFA500, #DAA520, #FFD700)",
                    padding: "2px",
                  }}
                >
                  <div className="bg-black rounded-xl h-full w-full"></div>
                </div>
                <Image
                  src="/award.jpg"
                  alt="LUMINANCE AWARDEES 2025 - Dr. Reimund Serafica winners in three categories: Advancement of Intentionality, Advancement in Inquiry, and Advancement with Impact"
                  width={1200}
                  height={1600}
                  className="w-full h-auto rounded-xl shadow-2xl relative z-10"
                  style={{
                    boxShadow: "0 25px 50px -12px rgba(255, 215, 0, 0.5), 0 0 50px rgba(255, 215, 0, 0.3)",
                  }}
                  priority
                />
              </div>
            </div>

            {/* Voting Button */}
            <div className="text-center mt-16">
              <Button
                onClick={onVote}
                size="lg"
                className="px-12 py-8 text-xl font-medium tracking-wide transition-all duration-300 backdrop-blur-sm transform hover:scale-105"
                style={{
                  background: "linear-gradient(45deg, #FFD700, #FFA500, #DAA520, #FFD700)",
                  backgroundSize: "300% 300%",
                  animation: "gradient-shift 3s ease infinite",
                  color: "black",
                  boxShadow: "0 0 30px 0 rgba(255, 215, 0, 0.7), 0 10px 30px rgba(255, 215, 0, 0.3)",
                  border: "2px solid #FFD700",
                }}
              >
                <StarIcon className="w-6 h-6 mr-3" />
                Submit Nomination
              </Button>
            </div>
          </div>
        )}

        {/* Historical Winners */}
        {showHistory && (
          <div className="space-y-12">
            <div className="text-center">
              <h2
                className="text-5xl font-serif font-light mb-8 tracking-wide"
                style={{
                  color: "#FFD700",
                  textShadow: "0 0 20px rgba(255, 215, 0, 0.6)",
                }}
              >
                Hall of Excellence
              </h2>
              <div
                className="w-40 h-1 mx-auto mb-12 rounded-full"
                style={{
                  background: "linear-gradient(to right, rgba(139, 92, 246, 0.5), #FFD700, rgba(139, 92, 246, 0.5))",
                  boxShadow: "0 0 20px rgba(255, 215, 0, 0.4)",
                }}
              ></div>

              <div
                className="bg-black/60 rounded-xl p-12 max-w-3xl mx-auto backdrop-blur-sm"
                style={{
                  borderColor: "rgba(255, 215, 0, 0.4)",
                  borderWidth: "2px",
                  boxShadow: "0 0 30px 0 rgba(255, 215, 0, 0.3)",
                }}
              >
                <p className="text-xl italic mb-6" style={{ color: "#FFD740" }}>
                  &quot;Previous award recipients will be showcased here as we continue to honor excellence in
                  Filipino-American advanced practice nursing.&quot;
                </p>
                <p className="text-gray-300 text-lg">
                  Check back for updates on our distinguished alumni and their continued contributions to the nursing
                  profession.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  )
}
