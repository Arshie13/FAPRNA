"use client";

import { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Target,
  Eye,
  Mail,
  Phone,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const slides = [
    "/slide1.jpeg?height=500&width=900&text=Innovation+in+Action",
    "/slide2.jpeg?height=500&width=900&text=Leading+the+Future",
    "/slide3.jpeg?height=500&width=900&text=Excellence+Delivered",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => [...prev, entry.target.id]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const refsSnapshot = { ...sectionRefs.current };

    Object.keys(refsSnapshot).forEach((id) => {
      if (refsSnapshot[id]) {
        observer.observe(refsSnapshot[id]!);
      }
    });

    return () => {
      Object.keys(refsSnapshot).forEach((id) => {
        if (refsSnapshot[id]) {
          observer.unobserve(refsSnapshot[id]!);
        }
      });
    };
  }, []);

  const isVisible = (sectionId: string) => visibleSections.includes(sectionId);

  const founder = {
    name: "Dr. Rhigel “Jay” Tan",
    role: "DNP, APRN, PMHNP, GNP, ANP, FAAN",
    image: "/placeholder.svg?height=250&width=250&text=Founder",
  };

  const coFounders = [
    {
      name: "Mary Betita",
      role: "MD, MSN, APRN, FNP-BC, MAP (NSBN, Advanced Practice Advisory Committee)",
      image: "/cofounder1.png",
    },
    {
      name: "Alona Angosta",
      role: "PhD, APRN, FNP, NP-C (NSBN, Advanced Practice Advisory Committee)",
      image: "/cofounder2.png",
    },
    {
      name: "Jennifer Kawi",
      role: "PhD, MSN, APRN, FNP-BC, CNE",
      image: "/cofounder3.png",
    },
    {
      name: "Richard Talusan",
      role: "DNP, MSN, APRN, FNP-BC, NEA-BC",
      image: "/placeholder.svg?height=200&width=200&text=LB",
    },
  ];

  const pearls = ["P", "E", "A", "R", "L", "S"];
  const objectives = [
    "Professional Advancement",
    "Educational and Mentorship Opportunities",
    "Advocacy Endorsements for Healthcare Issues",
    "Research and Grant Opportunities",
    "Leadership Development and Support",
    "Service to Community and the General Public",
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Auto Slideshow */}
      <section
        id="home"
        ref={(el) => {
          sectionRefs.current.home = el;
        }}
        className="relative h-[500px] bg-[#b81c1c] overflow-hidden"
      >
        <div className="absolute inset-0 flex items-center justify-between px-8 lg:px-16">
          <div
            className={`flex-1 max-w-2xl transition-all duration-1000 ${
              isVisible("home")
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
              FAPRNA - NV
            </h1>
            <p className="text-3xl text-white mb-8 leading-relaxed">
              {" "}
              A non-profit, professional organization dedicated to unify and
              foster excellence of the Filipino-American Advanced Practice
              Nurses in Nevada.
            </p>
          </div>
          <div className="flex-1 flex justify-center">
            <div
              className={`relative w-full max-w-lg h-96 rounded-lg overflow-hidden shadow-2xl transition-all duration-1000 ${
                isVisible("home")
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              {slides.map((slide, index) => (
                <Image
                  key={index}
                  src={slide}
                  alt={`Slide ${index + 1}`}
                  width={900}
                  height={500}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
              <button
                onClick={() =>
                  setCurrentSlide(
                    (prev) => (prev - 1 + slides.length) % slides.length
                  )
                }
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-3 transition-colors"
              >
                <ChevronLeft className="w-8 h-8 text-white" />
              </button>
              <button
                onClick={() =>
                  setCurrentSlide((prev) => (prev + 1) % slides.length)
                }
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-3 transition-colors"
              >
                <ChevronRight className="w-8 h-8 text-white" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Our History */}
      <section
        id="history"
        ref={(el) => {
          sectionRefs.current.history = el;
        }}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-8 max-w-10xl">
          <h2
            className={`text-6xl font-bold text-center mb-16 text-[#003366] transition-all duration-1000 ${
              isVisible("history")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            Our History
          </h2>
          <div className="flex flex-col lg:flex-row items-center gap-40">
            <div
              className={`lg:w-1/3 text-center transition-all duration-1000 delay-300 ${
                isVisible("history")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="w-80 h-80 rounded-full overflow-hidden shadow-xl mx-auto border-4 border-yellow-400 mb-6">
                <Image
                  src="/founder.jpg"
                  alt={founder.name}
                  width={320}
                  height={320}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <h3 className="font-semibold text-2xl text-red-600 mb-2">
                Founder
              </h3>
              <p className="text-lg text-gray-700 font-medium">
                {founder.name}, {founder.role}
              </p>
            </div>
            <div
              className={`lg:w-2/3 transition-all duration-1000 delay-500 ${
                isVisible("history")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                In 2013, the movement to create the Advanced Nurse Practitioners
                Association was initiated by Dr. Rhigel “Jay” Tan, DNP, APRN,
                PMHNP, GNP, ANP, FAAN who was then a member of the Nevada State
                Board of Nursing (NSBN) and later on appointed as the first
                Asian and Filipino to sit as president of the NSBN, alongside
                with the co-founders:
              </p>
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                Mary Betita, MD, MSN, APRN, FNP-BC, MAP (NSBN, Advanced Practice
                Advisory Committee) Alona Angosta, PhD, APRN, FNP, NP-C (NSBN,
                Advanced Practice Advisory Committee) Jennifer Kawi, PhD, MSN,
                APRN, FNP-BC, CNE Richard Talusan, DNP, MSN, APRN, FNP-BC,
                NEA-BC
              </p>
              <p className="text-xl text-gray-700 leading-relaxed">
                The FARPNA-NV was engaged in trying to influence legislators
                which was a very important turning point in the history of APRN
                practice in the State of Nevada to support a strong proponent
                for AB170 which . Assembly Bill (AB) 170 was first introduced by
                Assemblywoman Maggie Carltn on February 23, 2013. AB 170 revised
                various provisions regarding advanced practice nursing including
                changing the professional title of the Advanced Practitioner of
                Nursing )APN to an Advanced Practice Registered Nurse (APRN). In
                addition AB 170 removed the requirement for an APRN to maintain
                a collaborative agreement with a physician and allows APRNs to
                practicIt was signed into law by Governor Brain Sandoval and
                became effective July 1, 2013.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Co-Founders */}
      <section
        id="team"
        ref={(el) => {
          sectionRefs.current.team = el;
        }}
        className="py-20 bg-[#003366]"
      >
        <div className="container mx-auto px-8 max-w-10xl">
          <h2
            className={`text-6xl font-bold text-center mb-16 text-white transition-all duration-1000 ${
              isVisible("team")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            Co-Founders
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {coFounders.map((founder, index) => (
              <div
                key={index}
                className={`text-center group transition-all duration-1000 ${
                  isVisible("team")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${400 + index * 200}ms` }}
              >
                <div className="w-50 h-50 rounded-full overflow-hidden shadow-lg mx-auto mb-6 border-4 border-white group-hover:border-yellow-400 transition-all duration-300 group-hover:scale-110 transform bg-gray-100 flex items-center justify-center">
                  {founder.image &&
                  !founder.image.startsWith("/placeholder.svg") ? (
                    <Image
                      src={founder.image}
                      alt={founder.name}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl font-bold text-[#003366] w-full text-center">
                      {founder.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-2xl text-white mb-2">
                  {founder.name}
                </h3>
                <p className="text-xl text-blue-200">{founder.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section
        id="about"
        ref={(el) => {
          sectionRefs.current.about = el;
        }}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-8 max-w-9xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card
              className={`bg-white shadow-xl hover:shadow-2xl transition-all duration-1000 ${
                isVisible("about")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <CardContent className="p-12">
                <div className="flex items-center mb-6">
                  <Target className="w-12 h-12 text-red-600 mr-4" />
                  <h3 className="text-4xl font-bold text-[#003366]">
                    Our Mission
                  </h3>
                </div>
                <p className="text-xl text-gray-700 leading-relaxed">
                  The Filipino-American Advanced Practice Registered Nurses of
                  Nevada (FAPRNA-NV) is a non-profit professional organization
                  dedicated to unify and foster professional excellence of the
                  Filipino-American Advanced Practice Nurses in Nevada.
                </p>
              </CardContent>
            </Card>
            <Card
              className={`bg-white shadow-xl hover:shadow-2xl transition-all duration-1000 delay-300 ${
                isVisible("about")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <CardContent className="p-12">
                <div className="flex items-center mb-6">
                  <Eye className="w-12 h-12 text-yellow-400 mr-4" />
                  <h3 className="text-4xl font-bold text-[#003366]">
                    Our Vision
                  </h3>
                </div>
                <p className="text-xl text-gray-700 leading-relaxed">
                  The vision of FAPRNA-NV is consistent with its mission to
                  uphold the positive image of the Filipino-American Advanced
                  Practice Nurse Practitioners as excellent professionals based
                  on the organization’s founding intentions and principles;
                  adapt to modern innovation changes, support the professional
                  advancements, advocate on issues plaguing healthcare; and
                  create an impact on healthcare outcomes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section
        id="objectives"
        ref={(el) => {
          sectionRefs.current.objectives = el;
        }}
        className="py-20 bg-[#003366]"
      >
        <div className="container mx-auto px-8 max-w-10xl">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div
              className={`lg:w-1/3 flex justify-center transition-all duration-1000 delay-700 ${
                isVisible("objectives")
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <div className="relative">
                <div className="w-100 h-100 bg-white rounded-full shadow-2xl flex items-center justify-center">
                  <div className="text-center">
                    <Image
                      src="/faprna_logo.png"
                      alt="FAPRNA Logo"
                      width={320}
                      height={320}
                      className="w-80 h-80 mx-auto mb-4 object-contain"
                    />
                  </div>
                </div>
                <h1 className="text-4xl font-bold text-[#FFFFFF] text-center mt-6">
                  P. E. A. R. L. S.
                </h1>
              </div>
            </div>
            <div className="lg:w-2/3">
              <h2
                className={`text-6xl font-bold mb-12 text-[#ffffff] transition-all duration-1000 ${
                  isVisible("objectives")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                Objectives
              </h2>
              <div className="space-y-6">
                {objectives.map((objective, index) => (
                  <div
                    key={index}
                    className={`flex items-center bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-1000 ${
                      isVisible("objectives")
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-10"
                    }`}
                    style={{ transitionDelay: `${400 + index * 150}ms` }}
                  >
                    <div className="w-12 h-12 bg-[#003366] text-white rounded-full flex items-center justify-center font-bold mr-6 text-xl">
                      {pearls[index]}
                    </div>
                    <p className="text-xl text-gray-700 font-medium">
                      {objective}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        id="cta"
        ref={(el) => {
          sectionRefs.current.cta = el;
        }}
        className="py-20 bg-[#fffffff]"
      >
        <div className="container mx-auto px-8 max-w-7xl">
          <Card
            className={`bg-[#003366] shadow-2xl max-w-6xl mx-auto transition-all duration-1000 ${
              isVisible("cta")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <CardContent className="p-16">
              <div className="flex flex-col lg:flex-row items-center gap-16">
                <div className="lg:w-1/2 text-center">
                  <div className="w-48 h-48 bg-[#ffffff] rounded-full flex items-center justify-center shadow-2xl mx-auto mb-6">
                    <Mail className="w-24 h-24 text-[#003366]" />
                  </div>
                </div>
                <div className="lg:w-1/2 flex flex-col justify-center">
                  <h2 className="text-6xl font-extrabold text-[#ffffff] mb-12 drop-shadow-lg">
                    Get in touch
                  </h2>
                  <div className="space-y-10">
                    <div
                      className={`flex items-center transition-all duration-500 delay-300 ${
                        isVisible("cta")
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-10"
                      }`}
                    >
                      <div className="w-16 h-16 bg-[#ffffff] rounded-full flex items-center justify-center shadow-xl mr-8">
                        <Phone className="w-9 h-9 text-[#003366]" />
                      </div>
                      <div>
                        <p className="text-3xl text-[#ffffff] font-extrabold mb-2">
                          Give us a Text
                        </p>
                        <p className="text-2xl text-[#ffffff] tracking-wide">
                          (702) 875-3369
                        </p>
                      </div>
                    </div>
                    <div
                      className={`flex items-center transition-all duration-500 delay-400 ${
                        isVisible("cta")
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-10"
                      }`}
                    >
                      <div className="w-16 h-16 bg-[#ffffff] rounded-full flex items-center justify-center shadow-xl mr-8">
                        <Mail className="w-9 h-9 text-[#003366]" />
                      </div>
                      <div>
                        <p className="text-3xl text-[#ffffff] font-extrabold mb-2">
                          Send us an Email
                        </p>
                        <p className="text-2xl text-[#ffffff] tracking-wide">
                          info@FAPRNA.org
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      {/* Closing main container div */}
    </div>
  );
}
