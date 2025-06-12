"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Users, TrendingUp, Award, Network, BookOpen} from "lucide-react"
import { useState, useRef } from "react"

export default function WhyJoin() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const benefitCategories = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Professional Development",
      color: "from-blue-500 to-blue-600",
      benefits: [
        "Develop personal and professional growth",
        "Gain practical experience, career and leadership skills",
        "Improve future career prospects",
        "Expand your resume making you more viable as a job candidate",
      ],
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Networking & Community",
      color: "from-red-500 to-red-600",
      benefits: [
        "Unlimited networking opportunities",
        "Engage with diverse professionals in different fields",
        "Give back to the community",
        "Support and resources in times of need",
      ],
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Industry Influence",
      color: "from-yellow-500 to-yellow-600",
      benefits: [
        "Influence policy affecting nursing at state and national levels",
        "Stay updated on industry trends and legislative rulings",
        "Carry respectability when presenting credentials",
        "Access to continuing education opportunities",
      ],
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Career Advancement",
      color: "from-blue-600 to-indigo-600",
      benefits: [
        "Connect to career boards and scholarship opportunities",
        "Stepping stones into additional career opportunities",
        "Access to continuing education opportunities",
        "Stay current with advances in technology",
      ],
    },
  ]

  // Touch handlers (update to always allow swipe, no auto-play resume)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX

  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current === 0 && touchEndX.current === 0) return
    const distance = touchStartX.current - touchEndX.current
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }
    // Reset
    touchStartX.current = 0
    touchEndX.current = 0

  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % benefitCategories.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + benefitCategories.length) % benefitCategories.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)

  }

  return (
    <section className="w-full bg-gradient-to-br from-slate-50 via-blue-50 to-red-50 py-20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mx-auto max-w-4xl text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-[#003366] text-sm font-medium mb-6">
            <Network className="w-4 h-4 mr-2" />
            MEMBERSHIP BENEFITS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#003366] mb-6">
            Why Join <span className="text-red-600">FAPRNA-NV</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Advance your nursing career and make a meaningful impact in the Filipino-American healthcare community
          </p>
        </div>

        {/* Desktop Benefits Grid - Hidden on mobile */}
        <div className="hidden md:grid md:grid-cols-2 gap-8 mb-16">
          {benefitCategories.map((category, index) => (
            <BenefitCard key={index} category={category} />
          ))}
        </div>

        {/* Mobile Carousel - Full-screen on mobile */}
        <div className="md:hidden mb-16">
          <div className="relative h-[70vh] max-h-[600px]">
            {/* Carousel Container */}
            <div
              className="h-full overflow-hidden"

              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex h-full transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {benefitCategories.map((category, index) => (
                  <div key={index} className="w-full h-full flex-shrink-0 px-4 flex items-center">

                    <BenefitCard category={category} />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}

              aria-label="Previous benefit"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-[#003366] hover:bg-white transition-all duration-200 z-10"
              aria-label="Next benefit"
            >
              <ChevronRight className="w-5 h-5" />
            </button> */}

          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {benefitCategories.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-[#003366] w-6" : "bg-gray-300 hover:bg-gray-400"

                }`}
                aria-label={`Go to benefit ${index + 1}`}
              />
            ))}
          </div>

          {/* Swipe Instruction */}
          <div className="text-center mt-4">
            <p className="text-xs text-gray-500">Swipe left or right to see more benefits</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-[#003366] via-red-600 to-yellow-500 p-1 rounded-2xl inline-block mb-6">
            <div className="bg-white rounded-xl px-8 py-6">
              <h3 className="text-2xl font-bold text-[#003366] mb-2">Join Us</h3>
              <p className="text-gray-600 mb-6">
                Join a community of dedicated Filipino-American nursing professionals
              </p>
              <Link href="/membership">
                <Button className="bg-gradient-to-r from-[#003366] to-red-600 hover:from-[#002244] hover:to-red-700 text-white px-12 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">

                  <Users className="w-5 h-5 mr-2" />
                  JOIN FAPRNA-NV TODAY
                </Button>
              </Link>
            </div>
          </div>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            By joining FAPRNA-NV, you become part of a prestigious network of advanced practice nurses committed to
            excellence in healthcare and community service.
          </p>
        </div>
      </div>
    </section>
  )
}

// Separate BenefitCard component for reusability
type BenefitCategory = {
  icon: React.ReactNode
  title: string
  color: string
  benefits: string[]
}

function BenefitCard({ category }: { category: BenefitCategory }) {
  return (
    <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 group h-full">

      <CardContent className="p-8">
        <div className="flex items-center mb-6">
          <div
            className={`p-3 rounded-xl bg-gradient-to-r ${category.color} text-white mr-4 group-hover:scale-110 transition-transform duration-300`}
          >
            {category.icon}
          </div>
          <h3 className="text-2xl font-bold text-[#003366]">{category.title}</h3>

        </div>
        <ul className="space-y-4">
          {category.benefits.map((benefit: string, benefitIndex: number) => (
            <li key={benefitIndex} className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700 leading-relaxed">{benefit}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

