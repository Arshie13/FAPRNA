"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "/heropage.jpg",
    "/heropage2.jpg",
    "/heropage3.jpg",
    "/heropage4.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative w-full overflow-hidden h-[600px] md:h-[700px]">
      {/* Hero background slideshow */}
      <div className="absolute inset-0">
        {images.map((src, index) => (
          <Image
            key={index}
            src={src || "/placeholder.svg"}
            alt="FAPRNA-NV Healthcare Professionals"
            fill
            className={`object-cover object-center transition-opacity duration-1000 ${index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            priority={index === 0}
          />
        ))}
        {/* Blue overlay */}
        <div className="absolute inset-0 bg-blue-900/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="text-white animate-fade-in-up">
              {/* Main Title */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in-up animation-delay-200 text-border">
                <span className="drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] text-red-600 hover:text-red-400 transition-colors duration-300 animate-text-shimmer bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text bg-size-200 animate-gradient-x">
                  FAPRNA
                </span>
                <span className="hover:text-gray-100 transition-colors duration-300">
                  -NV
                </span>
              </h1>

              {/* Description */}
              <p
                className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-2xl animate-fade-in-up animation-delay-300
                           hover:text-white transition-colors duration-300"
              >
                Filipino-American Advanced Practice Registered Nurses
                Association
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-400">
                <Link href="/event-registration">
                  <Button
                    className="group rounded-full bg-red-600 px-6 py-6 text-base font-semibold hover:bg-red-700 
                                 transition-all duration-300 hover:scale-105 hover:shadow-xl 
                                 hover:shadow-red-500/25 transform-gpu
                                 before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r 
                                 before:from-red-400 before:to-red-600 before:opacity-0 before:transition-opacity 
                                 before:duration-300 hover:before:opacity-20 relative overflow-hidden"
                  >
                    <span className="relative z-10">Upcoming Events</span>
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 relative z-10" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    variant="outline"
                    className="group rounded-full border-white bg-transparent px-6 py-6 text-base font-semibold text-white 
                           hover:bg-white hover:text-[#003366] transition-all duration-300 hover:scale-105 hover:shadow-xl 
                           hover:shadow-white/25 hover:border-white transform-gpu
                           backdrop-blur-sm hover:backdrop-blur-md"
                  >
                    <span>Learn More</span>
                    <svg
                      className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Content - Circular Badge */}
            <div className="hidden md:flex items-center justify-center">
              <div className="relative h-80 w-80 overflow-hidden rounded-full border-4 border-white/20 shadow-2xl animate-fade-in-up animation-delay-300">
                <div className="absolute inset-0 bg-gradient-to-b from-red-600/20 to-blue-900/20 animate-gradient-x"></div>
                <div className="absolute right-0 bottom-0 h-24 w-24 rounded-full bg-red-600 blur-2xl animate-fade-in-up animation-delay-400"></div>
                <div className="absolute left-0 top-0 h-24 w-24 rounded-full bg-blue-600 blur-2xl animate-fade-in-up animation-delay-400"></div>
                <div className="flex h-full w-full items-center justify-center">
                  <h2 className="text-center font-bold text-white text-4xl animate-fade-in-up animation-delay-400">
                    Serving
                    <br />
                    Since
                    <br />
                    2015
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          className="w-full"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}
