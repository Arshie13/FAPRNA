"use client"

import type React from "react"
import { useState, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Users, TrendingUp, Award, Network, BookOpen, Heart, ArrowRight } from "lucide-react"

interface BenefitCategory {
  icon: React.ReactNode
  title: string
  color: string
  benefits: string[]
}

const benefitCategories: BenefitCategory[] = [
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
    color: "from-purple-500 to-purple-600",
    benefits: [
      "Connect to career boards and scholarship opportunities",
      "Stepping stones into additional career opportunities",
      "Access to continuing education opportunities",
      "Stay current with advances in technology",
    ],
  },
]

function BenefitCard({ category }: { category: BenefitCategory }) {
  return (
    <Card className="h-full border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color} text-white mr-3`}>{category.icon}</div>
          <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
        </div>
        <ul className="space-y-3">
          {category.benefits.map((benefit, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
              <span className="text-gray-700 text-sm leading-relaxed">{benefit}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export default function WhyJoinSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && currentSlide < benefitCategories.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else if (isRightSwipe && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }

    touchStartX.current = 0
    touchEndX.current = 0
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section className="w-full bg-gradient-to-br from-slate-50 via-blue-50 to-red-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
            <Network className="w-4 h-4 mr-2" />
            MEMBERSHIP BENEFITS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Join <span className="text-red-600">FAPRNA-NV</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advance your nursing career and make a meaningful impact in the Filipino-American healthcare community
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-6 mb-12">
          {benefitCategories.map((category, index) => (
            <BenefitCard key={index} category={category} />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden mb-8">
          <div className="relative">
            <div
              className="overflow-hidden rounded-lg"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex transition-transform duration-300 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {benefitCategories.map((category, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-2">
                    <BenefitCard category={category} />
                  </div>
                ))}
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center mt-4 space-x-2">
              {benefitCategories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentSlide ? "bg-blue-600 w-6" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 via-red-600 to-yellow-500 p-1 rounded-2xl inline-block">
            <div className="bg-white rounded-xl px-8 py-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to Make a Difference?</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Join our community of dedicated Filipino-American nursing professionals
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/membership">
                  <Button className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                    <Users className="w-5 h-5 mr-2" />
                    JOIN FAPRNA-NV TODAY
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>

                <Link href="https://www.zeffy.com/donation-form/donate-to-support-the-filipino-american-advanced-practice-registered-nurse-nv">
                  <Button
                    variant="outline"
                    className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 bg-transparent"
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    DONATE NOW
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Heart className="w-5 h-5 text-red-500 mr-2" />
                  <span className="font-semibold text-gray-900">Support Our Mission</span>
                </div>
                <p className="text-sm text-gray-600">
                  Your donation helps provide scholarships, continuing education, and community outreach programs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
