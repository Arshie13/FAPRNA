"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Target, Eye, Shell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [visibleSections, setVisibleSections] = useState<string[]>([])
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})

  const slides = [
    "/placeholder.svg?height=500&width=900&text=Innovation+in+Action",
    "/placeholder.svg?height=500&width=900&text=Leading+the+Future",
    "/placeholder.svg?height=500&width=900&text=Excellence+Delivered",
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [slides.length])

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => [...prev, entry.target.id])
          }
        })
      },
      { threshold: 0.1 },
    )

    Object.keys(sectionRefs.current).forEach((id) => {
      if (sectionRefs.current[id]) {
        observer.observe(sectionRefs.current[id]!)
      }
    })

    return () => {
      Object.keys(sectionRefs.current).forEach((id) => {
        if (sectionRefs.current[id]) {
          observer.unobserve(sectionRefs.current[id]!)
        }
      })
    }
  }, [])

  const isVisible = (sectionId: string) => visibleSections.includes(sectionId)

  const coFounders = [
    { name: "John Smith", role: "CEO", image: "/placeholder.svg?height=200&width=200&text=JS" },
    { name: "Sarah Johnson", role: "CTO", image: "/placeholder.svg?height=200&width=200&text=SJ" },
    { name: "Mike Chen", role: "CFO", image: "/placeholder.svg?height=200&width=200&text=MC" },
    { name: "Lisa Brown", role: "COO", image: "/placeholder.svg?height=200&width=200&text=LB" },
  ]

  const boardMembers = [
    { name: "Robert Wilson", image: "/placeholder.svg?height=150&width=150&text=RW" },
    { name: "Emma Davis", image: "/placeholder.svg?height=150&width=150&text=ED" },
    { name: "James Miller", image: "/placeholder.svg?height=150&width=150&text=JM" },
    { name: "Anna Garcia", image: "/placeholder.svg?height=150&width=150&text=AG" },
    { name: "David Lee", image: "/placeholder.svg?height=150&width=150&text=DL" },
    { name: "Sophie Taylor", image: "/placeholder.svg?height=150&width=150&text=ST" },
    { name: "Chris Anderson", image: "/placeholder.svg?height=150&width=150&text=CA" },
    { name: "Maria Rodriguez", image: "/placeholder.svg?height=150&width=150&text=MR" },
  ]

  const pearls = ["P", "E", "A", "R", "L", "S"]
  const objectives = [
    "Achieve sustainable growth while maintaining quality standards",
    "Expand our global presence and market reach",
    "Invest in cutting-edge technology and innovation",
    "Foster a culture of excellence and continuous improvement",
    "Build lasting partnerships with clients and stakeholders",
    "Strengthen our commitment to sustainability and innovation",
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Auto Slideshow */}
      <section
        id="home"
        ref={(el) => { sectionRefs.current.home = el }}
        className="relative h-[500px] bg-red-600 overflow-hidden"
      >
        <div className="absolute inset-0 flex items-center justify-between px-8 lg:px-16">
          <div
            className={`flex-1 max-w-2xl transition-all duration-1000 ${isVisible("home") ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">FAPRNA - NV</h1>
            <p className="text-3xl text-white mb-8 leading-relaxed"> A non-profit, professional organization dedicated to unify and foster excellence of the Filipino-American
          Advanced Practice Nurses in Nevada.</p>
            <Button className="bg-white text-red-600 hover:bg-gray-100 font-semibold px-12 py-4 text-xl transition-transform duration-300 hover:scale-105">
              Learn More
            </Button>
          </div>
          <div className="flex-1 flex justify-center">
            <div
              className={`relative w-full max-w-lg h-96 rounded-lg overflow-hidden shadow-2xl transition-all duration-1000 ${isVisible("home") ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
            >
              {slides.map((slide, index) => (
                <img
                  key={index}
                  src={slide || "/placeholder.svg"}
                  alt={`Slide ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-3 transition-colors"
              >
                <ChevronLeft className="w-8 h-8 text-white" />
              </button>
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-3 transition-colors"
              >
                <ChevronRight className="w-8 h-8 text-white" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Our History */}
      <section id="history" ref={(el) => { sectionRefs.current.history = el }} className="py-20 bg-white">
        <div className="container mx-auto px-8 max-w-7xl">
          <h2
            className={`text-6xl font-bold text-center mb-16 text-blue-600 transition-all duration-1000 ${isVisible("history") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            Our History
          </h2>
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div
              className={`lg:w-1/3 text-center transition-all duration-1000 delay-300 ${isVisible("history") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="w-64 h-64 rounded-full overflow-hidden shadow-xl mx-auto border-4 border-yellow-400">
                <img
                  src="/placeholder.svg?height=250&width=250&text=Founder"
                  alt="Founder"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-semibold mt-6 text-red-600">Founder</h3>
            </div>
            <div
              className={`lg:w-2/3 transition-all duration-1000 delay-500 ${isVisible("history") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                Founded in 1985, FARINA has been at the forefront of innovation and excellence for nearly four decades.
                Our journey began with a simple vision: to create solutions that make a difference in people&#39;s lives.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                From humble beginnings in a small garage to becoming a global leader in our industry, we&#39;ve maintained
                our commitment to quality, innovation, and customer satisfaction.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed">
                Today, we continue to push boundaries and set new standards, always staying true to the values that our
                founder instilled in us from day one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Co-Founders */}
      <section id="team" ref={(el) => { sectionRefs.current.team = el }} className="py-20 bg-blue-600">
        <div className="container mx-auto px-8 max-w-7xl">
          <h2
            className={`text-6xl font-bold text-center mb-16 text-white transition-all duration-1000 ${isVisible("team") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            Co-Founders
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {coFounders.map((founder, index) => (
              <div
                key={index}
                className={`text-center group transition-all duration-1000 ${isVisible("team") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${400 + index * 200}ms` }}
              >
                <div className="w-40 h-40 rounded-full overflow-hidden shadow-lg mx-auto mb-6 border-4 border-white group-hover:border-yellow-400 transition-all duration-300 group-hover:scale-110 transform">
                  <img
                    src={founder.image || "/placeholder.svg"}
                    alt={founder.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-2xl text-white mb-2">{founder.name}</h3>
                <p className="text-xl text-blue-200">{founder.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section id="about" ref={(el) => { sectionRefs.current.about = el }} className="py-20 bg-white">
        <div className="container mx-auto px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card
              className={`bg-white shadow-xl hover:shadow-2xl transition-all duration-1000 ${isVisible("about") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <CardContent className="p-12">
                <div className="flex items-center mb-6">
                  <Target className="w-12 h-12 text-red-600 mr-4" />
                  <h3 className="text-4xl font-bold text-blue-600">Our Mission</h3>
                </div>
                <p className="text-xl text-gray-700 leading-relaxed">
                  To deliver innovative solutions that exceed expectations and create lasting value for our clients,
                  stakeholders, and communities. We strive to be the trusted partner that organizations turn to for
                  excellence and reliability.
                </p>
              </CardContent>
            </Card>
            <Card
              className={`bg-white shadow-xl hover:shadow-2xl transition-all duration-1000 delay-300 ${isVisible("about") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <CardContent className="p-12">
                <div className="flex items-center mb-6">
                  <Eye className="w-12 h-12 text-yellow-400 mr-4" />
                  <h3 className="text-4xl font-bold text-blue-600">Our Vision</h3>
                </div>
                <p className="text-xl text-gray-700 leading-relaxed">
                  To be the global leader in our industry, recognized for our innovation, integrity, and impact. We
                  envision a future where our solutions contribute to a better, more sustainable world for generations
                  to come.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section id="objectives" ref={(el) => { sectionRefs.current.objectives = el }} className="py-20 bg-yellow-400">
        <div className="container mx-auto px-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-2/3">
              <h2
                className={`text-6xl font-bold mb-12 text-blue-600 transition-all duration-1000 ${isVisible("objectives") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              >
                Objectives
              </h2>
              <div className="space-y-6">
                {objectives.map((objective, index) => (
                  <div
                    key={index}
                    className={`flex items-center bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-1000 ${isVisible("objectives") ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
                    style={{ transitionDelay: `${400 + index * 150}ms` }}
                  >
                    <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mr-6 text-xl">
                      {pearls[index]}
                    </div>
                    <p className="text-xl text-gray-700 font-medium">{objective}</p>
                  </div>
                ))}
              </div>
            </div>
            <div
              className={`lg:w-1/3 flex justify-center transition-all duration-1000 delay-700 ${isVisible("objectives") ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
            >
              <div className="relative">
                <div className="w-64 h-64 bg-white rounded-full shadow-2xl flex items-center justify-center">
                  <div className="text-center">
                    <Shell className="w-20 h-20 text-red-600 mx-auto mb-4" />
                    <p className="text-blue-600 font-bold text-2xl">CLAM</p>
                    <p className="text-gray-600 text-lg">VISUALS</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FARINA Section */}
      <section id="farina" ref={(el) => { sectionRefs.current.farina = el }} className="py-20 bg-blue-600">
        <div className="container mx-auto px-8 max-w-7xl text-center">
          <h2
            className={`text-8xl font-bold text-white mb-12 transition-all duration-1000 ${isVisible("farina") ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
          >
            FARINA
          </h2>
          <div
            className={`max-w-5xl mx-auto transition-all duration-1000 delay-300 ${isVisible("farina") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            {/* Decorative pseudo image element */}
            <div className="relative mb-8">
              <div className="w-full h-32 bg-gradient-to-r from-yellow-400 via-white to-yellow-400 rounded-lg shadow-lg"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
                </div>
              </div>
            </div>
            <p className="text-2xl text-white leading-relaxed">
              Excellence in every endeavor, innovation in every solution, and integrity in every relationship. This is
              the FARINA way.
            </p>
          </div>
        </div>
      </section>

      {/* Board of Directors */}
      <section id="board" ref={(el) => { sectionRefs.current.board = el }} className="py-20 bg-white">
        <div className="container mx-auto px-8 max-w-7xl">
          <h2
            className={`text-6xl font-bold text-center mb-16 text-blue-600 transition-all duration-1000 ${isVisible("board") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            Chairman Board of Directors
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {boardMembers.map((member, index) => (
              <div
                key={index}
                className={`text-center group transition-all duration-1000 ${isVisible("board") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${400 + (index % 4) * 150}ms` }}
              >
                <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg mx-auto mb-4 border-4 border-yellow-400 group-hover:border-red-600 transition-all duration-300 group-hover:scale-110 transform">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-medium text-lg text-gray-700">{member.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="cta" ref={(el) => { sectionRefs.current.cta = el }} className="py-20 bg-red-600">
        <div className="container mx-auto px-8 max-w-7xl">
          <Card
            className={`bg-white shadow-2xl max-w-6xl mx-auto transition-all duration-1000 ${isVisible("cta") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <CardContent className="p-16">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="lg:w-1/3 text-center">
                  <div className="w-40 h-40 bg-blue-600 rounded-full flex items-center justify-center shadow-xl mx-auto">
                    <span className="text-white font-bold text-3xl">LOGO</span>
                  </div>
                </div>
                <div className="lg:w-2/3">
                  <h2 className="text-5xl font-bold text-blue-600 mb-8">Ready to Get Started?</h2>
                  <div className="space-y-4">
                    <div
                      className={`flex items-center transition-all duration-500 delay-300 ${isVisible("cta") ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
                    >
                      <div className="w-4 h-4 bg-red-600 rounded-full mr-6"></div>
                      <p className="text-xl text-gray-700">Innovative solutions tailored to your needs</p>
                    </div>
                    <div
                      className={`flex items-center transition-all duration-500 delay-400 ${isVisible("cta") ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
                    >
                      <div className="w-4 h-4 bg-yellow-400 rounded-full mr-6"></div>
                      <p className="text-xl text-gray-700">Expert team with decades of experience</p>
                    </div>
                    <div
                      className={`flex items-center transition-all duration-500 delay-500 ${isVisible("cta") ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
                    >
                      <div className="w-4 h-4 bg-blue-600 rounded-full mr-6"></div>
                      <p className="text-xl text-gray-700">Proven track record of success</p>
                    </div>
                    <div
                      className={`flex items-center transition-all duration-500 delay-600 ${isVisible("cta") ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
                    >
                      <div className="w-4 h-4 bg-red-600 rounded-full mr-6"></div>
                      <p className="text-xl text-gray-700">24/7 support and consultation</p>
                    </div>
                  </div>
                  <Button
                    className={`mt-8 bg-red-600 hover:bg-red-700 text-white px-12 py-4 text-2xl transition-all duration-300 hover:scale-105 ${isVisible("cta") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                  >
                    Contact Us Today
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}