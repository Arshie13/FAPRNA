"use client"

import type React from "react"

import Image from "next/image"
import { useState, useEffect, useRef } from "react"

export default function CollaborationSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const carouselRef = useRef<HTMLDivElement>(null)

  const logos = [
    { src: "/collab1.png", alt: "EXEL Labs", name: "EXEL Labs" },
    { src: "/collab2.png", alt: "Dynamic Manpower Consulting", name: "Dynamic Manpower" },
    { src: "/collab3.png", alt: "Apollo Medical Group", name: "Apollo Medical" },
    { src: "/collab4.png", alt: "iCare Psychiatry", name: "iCare Psychiatry" },
    { src: "/collab5.png", alt: "Advance HealthCare Solutions", name: "Advance HealthCare" },
    { src: "/collab6.png", alt: "Goodwill Pharmacy", name: "Goodwill Pharmacy" },
  ]

  // Auto-play functionality
  useEffect(() => {

    if (!isAutoPlaying) return
  }, [logos.length])


  return (
    <section className="relative w-full bg-gradient-to-br from-slate-50 via-white to-blue-50 py-20 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-600 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-10 right-10 w-40 h-40 bg-red-600 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-green-600 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      <div className="container relative mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="inline-block rounded-full bg-blue-100 text-blue-800 px-4 py-2 text-sm font-medium uppercase tracking-wider">
              Our Partners
            </span>
          </div>
          <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl opacity-0 animate-fade-in-up">
            Trusted <span className="text-blue-600">Collaborations</span>
          </h2>
          <p
            className="mx-auto max-w-2xl text-lg text-gray-600 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Working together with leading healthcare organizations to advance nursing excellence and patient care across
            Nevada.
          </p>
        </div>

        {/* Desktop Grid - Hidden on mobile */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-6 gap-8 mb-16">
          {logos.map((logo, idx) => (
            <div
              key={logo.src}
              className="group flex flex-col items-center opacity-0 animate-fade-in-left"
              style={{ animationDelay: `${idx * 0.15 + 0.4}s` }}
            >
              <div className="relative w-full max-w-[200px] h-24 mb-4 rounded-2xl bg-white shadow-lg border border-gray-100 transition-all duration-500 group-hover:shadow-2xl group-hover:scale-105 group-hover:border-blue-200 group-hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-blue-100/0 group-hover:from-blue-50/30 group-hover:to-blue-100/20 rounded-2xl transition-all duration-500"></div>
                <Image
                  src={logo.src || "/placeholder.svg?height=96&width=200"}
                  alt={logo.alt}
                  fill
                  className="object-contain p-4 transition-all duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
              </div>
              <span className="text-sm font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                {logo.name}
              </span>
            </div>
          ))}
        </div>

        {/* Mobile Carousel - Visible only on mobile */}
        <div className="md:hidden mb-16">
          <div className="relative">
            {/* Carousel Container */}
            <div
              ref={carouselRef}
              className="overflow-hidden rounded-2xl"

            >
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from({ length: Math.ceil(logos.length / 2) }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0 px-4">
                    <div className="grid grid-cols-2 gap-4">
                      {logos.slice(slideIndex * 2, slideIndex * 2 + 2).map((logo) => (
                        <div key={logo.src} className="group flex flex-col items-center">
                          <div className="relative w-full h-24 mb-3 rounded-xl bg-white shadow-lg border border-gray-100 transition-all duration-300 group-active:scale-95">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-blue-100/10 rounded-xl"></div>
                            <Image
                              src={logo.src || "/placeholder.svg?height=96&width=200"}
                              alt={logo.alt}
                              fill
                              className="object-contain p-3"
                              sizes="50vw"
                            />
                          </div>
                          <span className="text-xs font-medium text-gray-700 text-center leading-tight">
                            {logo.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows removed */}
            {/*
            <button ...>...</button>
            <button ...>...</button>
            */}

          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: Math.ceil(logos.length / 2) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}

                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-blue-600 w-6" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Swipe Instruction removed */}

        </div>

        {/* Bottom CTA */}
        <div className="text-center opacity-0 animate-fade-in-up" style={{ animationDelay: "1.2s" }}>
          <p className="text-gray-600 mb-6">Interested in partnering with us?</p>
          <button className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:scale-105 group">
            <span>Get in Touch</span>
            <svg
              className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
          <path
            fill="#ffffff"
            fillOpacity="0.8"
            d="M0,32L80,37.3C160,43,320,53,480,58.7C640,64,800,64,960,58.7C1120,53,1280,43,1360,37.3L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  )
}
