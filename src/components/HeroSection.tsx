import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ChevronRight } from "lucide-react"


export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden h-[600px] md:h-[700px]">
      {/* Hero background image */}
      <div className="absolute inset-0">
        <Image
          src="/heropage.jpeg"
          alt="FAPRNA-NV Healthcare Professionals"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Blue overlay */}
        <div className="absolute inset-0 bg-blue-900/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="text-white">
              {/* Professional Organization Badge */}
              <div className="inline-block mb-6">
                <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide">
                  Non Profit Organization
                </span>
              </div>

              {/* Main Title */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="text-red-500">FAPRNA</span>
                <span className="text-white">-NV</span>
              </h1>

              {/* Description */}
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-2xl">
                A non-profit, professional organization dedicated to unify and foster excellence of the
                Filipino-American Advanced Practice Nurses in Nevada.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/event-registration">
                <Button className="group rounded-full bg-red-600 px-6 py-6 text-base font-semibold hover:bg-red-700 transition-all duration-300">
                  Upcoming Events
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                </Link>
                <Link href="/about">
                <Button
                  variant="outline"
                  className="rounded-full border-white bg-transparent px-6 py-6 text-base font-semibold text-white hover:bg-white/10"
                >
                    Learn More
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Content - Circular Badge */}
          <div className="hidden md:flex items-center justify-center">
            <div className="relative h-80 w-80 overflow-hidden rounded-full border-4 border-white/20 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-b from-red-600/20 to-blue-900/20"></div>
              <div className="absolute right-0 bottom-0 h-24 w-24 rounded-full bg-red-600 blur-2xl"></div>
              <div className="absolute left-0 top-0 h-24 w-24 rounded-full bg-blue-600 blur-2xl"></div>
              <div className="flex h-full w-full items-center justify-center">
                <h2 className="text-center font-bold text-white text-4xl">
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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ></path>
        </svg>
      </div>


    </section>
  )
}
