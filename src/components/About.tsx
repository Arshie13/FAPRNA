"use client";

import { useState, useEffect, useRef } from "react";
import { Target, Eye, Mail, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const [isAnimating, setIsAnimating] = useState(false);

  const slides = [
    "/slide1.jpeg?height=500&width=900&text=Innovation+in+Action",
    "/slide2.jpeg?height=500&width=900&text=Leading+the+Future",
    "/slide3.jpeg?height=500&width=900&text=Excellence+Delivered",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setIsAnimating(true);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    if (isAnimating) {
      const timeout = setTimeout(() => setIsAnimating(false), 900);
      return () => clearTimeout(timeout);
    }
  }, [isAnimating]);

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
    name: 'Dr. Rhigel "Jay" Tan',
    role: "Ph.D., DNP, MSN, RN, APRN, GNP, ANP, PMHNP, FAAN",
    image: "/placeholder.svg?height=250&width=250&text=Founder",
  };

  const coFounders = [
    {
      name: "Mary Betita",
      role: "MD, MSN, BSBio, APRN, FNP-BC, MAP-C , WCS-C, EDS-C",
      image: "/cofounder1.png",
    },
  ];

  const foundingMembers = [
    {
      name: "Alona Angosta",
      role: "PhD, APRN, FNP, NP-C",
      details: "NSBN, Advanced Practice Advisory Committee",
      image: "/initialMember1.png",
    },
    {
      name: "Jennifer Kawi",
      role: "PhD, MSN, APRN, FNP-BC, CNE",
      details: "",
      image: "/initialMember2.png",
    },
    {
      name: "Richard Talusan",
      role: "DNP, MSN, APRN, FNP-BC, NEA-BC",
      details: "",
      image: "/initialMember3.jpeg",
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
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Hero Section with Auto Slideshow - Responsive for mobile, tablet, desktop */}
      <section
        id="home"
        ref={(el) => {
          sectionRefs.current.home = el;
        }}
        className="relative h-[250px] sm:h-[350px] md:h-[500px] bg-[#b81c1c] overflow-hidden flex flex-col md:flex-row"
      >
        {/* Mobile/tablet: slideshow as background with smooth crossfade */}
        <div className="absolute inset-0 block md:hidden z-0">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100 z-20" : "opacity-0 z-10"
              }`}
              style={{
                backgroundImage: `url(${slide})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transitionProperty: "opacity",
              }}
            >
              {/* Black overlay for contrast */}
              <div className="absolute inset-0 bg-[#000000]/40"></div>
              {/* Red overlay for brand color */}
              <div className="absolute inset-0 bg-[#b81c1c]/70"></div>
            </div>
          ))}
        </div>

        <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-between px-4 sm:px-8 md:px-12 lg:px-16 z-10 max-w-[120rem] mx-auto w-full">
          {/* Text Container - No right margin on desktop */}
          <div
            className={`flex-1 max-w-2xl transition-all duration-1000 ${
              isVisible("home")
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            } mt-6 sm:mt-8 md:mt-0 flex flex-col items-center md:items-start justify-center md:justify-start`}
          >
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-bold text-[#FFFFFF] mb-2 sm:mb-4 md:mb-6 text-center md:text-left w-full">
              FAPRNA - NV
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#FFFFFF] mb-2 sm:mb-4 md:mb-8 leading-relaxed text-center md:text-left w-full">
              A non-profit, professional organization dedicated to unify and
              foster excellence of the Filipino-American Advanced Practice
              Nurses in Nevada.
            </p>
          </div>
          {/* Slideshow Container - Adjusted left margin on desktop */}
          <div className="hidden md:flex flex-1 justify-center mt-6 md:mt-0 md:ml-8 lg:ml-12 xl:ml-16">
            <div
              className={`relative w-full max-w-xl md:max-w-2xl h-32 sm:h-48 md:h-96 rounded-lg overflow-hidden shadow-2xl transition-all duration-1000 ${
                isVisible("home")
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              {/* Smooth crossfade slideshow */}
              {slides.map((slide, index) => (
                <Image
                  key={index}
                  src={slide || "/placeholder.svg"}
                  alt={`Slide ${index + 1}`}
                  width={1200}
                  height={600}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                    index === currentSlide
                      ? "opacity-100 z-10"
                      : "opacity-0 z-0"
                  }`}
                  priority={index === 0}
                  style={{ transitionProperty: "opacity" }}
                />
              ))}
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
        className="py-12 md:py-20 bg-[#FFFFFF]"
      >
        <div className="container mx-auto px-4 md:px-8 max-w-10xl">
          <h1
            className={`text-4xl md:text-7xl lg:text-8xl font-extrabold text-center mb-10 md:mb-20 text-[#003366] transition-all duration-1000 ${
              isVisible("history")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            Our History
          </h1>
          <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-40">
            <div
              className={`w-full lg:w-1/3 text-center transition-all duration-1000 delay-300 ${
                isVisible("history")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="w-48 h-48 md:w-80 md:h-80 rounded-full overflow-hidden shadow-xl mx-auto border-4 border-[#FBBF24] mb-6">
                <Image
                  src="/founder.jpg"
                  alt={founder.name}
                  width={320}
                  height={320}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <h3 className="font-semibold text-xl md:text-2xl text-[#DC2626] mb-2">
                Founder
              </h3>
              <p className="text-base md:text-lg text-[#374151] font-medium">
                {founder.name}, {founder.role}
              </p>
            </div>
            <div
              className={`w-full lg:w-2/3 transition-all duration-1000 delay-500 ${
                isVisible("history")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <p className="text-base md:text-xl text-[#374151] leading-relaxed mb-4 md:mb-6">
                In 2013, the movement to create the Advanced Nurse Practitioners
                Association was initiated by Dr. Rhigel &quot;Jay&quot; Tan,
                Ph.D., DNP, MSN, RN, APRN, GNP, ANP, PMHNP, FAAN who was then a
                member of the Nevada State Board of Nursing (NSBN) and later on
                appointed as the first Asian and Filipino to sit as president of
                the NSBN, alongside with the co-founders:
              </p>
              <p className="text-base md:text-xl text-[#374151] leading-relaxed mb-4 md:mb-6">
                Mary Betita, MD, MSN, BSBio, APRN, FNP-BC, MAP-C , WCS-C, EDS-C
                Alona Angosta, PhD, APRN, FNP, NP-C (NSBN, Advanced Practice
                Advisory Committee) Jennifer Kawi, PhD, MSN, APRN, FNP-BC, CNE
                Richard Talusan, DNP, MSN, APRN, FNP-BC, NEA-BC
              </p>
              <p className="text-base md:text-xl text-[#374151] leading-relaxed">
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

      {/* Co-Founder & Founding Members Section */}
      <section
        id="team"
        ref={(el) => {
          sectionRefs.current.team = el;
        }}
        className="py-12 md:py-20 bg-[#003366]"
      >
        <div className="container mx-auto px-4 md:px-8 max-w-10xl">
          <h2
            className={`text-3xl md:text-6xl font-bold text-center mb-8 md:mb-16 text-[#FFFFFF] transition-all duration-1000 ${
              isVisible("team")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            Co-Founder
          </h2>
          {/* Co-Founders - Card Layout */}
          {coFounders.length === 1 ? (
            <div
              className={`bg-[#FFFFFF] rounded-2xl shadow-xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-16 transition-all duration-1000 max-w-5xl mx-auto ${
                isVisible("team")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              {/* Circle Image */}
              <div className="w-40 h-40 md:w-64 md:h-64 rounded-full overflow-hidden shadow-lg border-4 border-[#FBBF24] bg-[#F3F4F6] flex items-center justify-center transition-all duration-300 hover:border-[#F59E0B] hover:scale-105 hover:shadow-[#FBBF24]/60 mb-6 md:mb-0">
                {coFounders[0].image &&
                !coFounders[0].image.startsWith("/placeholder.svg") ? (
                  <Image
                    src={coFounders[0].image || "/placeholder.svg"}
                    alt={coFounders[0].name}
                    width={256}
                    height={256}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl md:text-4xl font-bold text-[#003366]">
                    {coFounders[0].name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                )}
              </div>
              {/* Details */}
              <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left transition-all duration-1000">
                <h3 className="font-semibold text-2xl md:text-3xl text-[#003366] mb-2 transition-all duration-1000">
                  {coFounders[0].name}
                </h3>
                <p className="text-lg md:text-xl text-[#003366] transition-all duration-1000">
                  {coFounders[0].role}
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-16">
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
                  <div className="w-40 h-40 md:w-64 md:h-64 rounded-full overflow-hidden shadow-lg mx-auto mb-4 md:mb-6 border-4 border-[#FBBF24] transition-all duration-300 group-hover:border-[#F59E0B] group-hover:scale-105 group-hover:shadow-[#FBBF24]/60 bg-[#F3F4F6] flex items-center justify-center">
                    {founder.image &&
                    !founder.image.startsWith("/placeholder.svg") ? (
                      <Image
                        src={founder.image || "/placeholder.svg"}
                        alt={founder.name}
                        width={256}
                        height={256}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl md:text-4xl font-bold text-[#003366] w-full text-center">
                        {founder.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-xl md:text-2xl text-[#003366] mb-2">
                    {founder.name}
                  </h3>
                  <p className="text-base md:text-lg text-[#003366] mb-1">
                    {founder.role}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Founding Members - White Card Container */}
          <h2
            className={`text-3xl md:text-6xl font-bold text-center mb-8 md:mb-16 text-[#FFFFFF] transition-all duration-1000 ${
              isVisible("founding-members")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            id="founding-members"
            ref={(el) => {
              sectionRefs.current["founding-members"] = el;
            }}
          >
            Founding Members
          </h2>
          <div
            className={`bg-[#FFFFFF] rounded-2xl shadow-xl p-8 md:p-12 transition-all duration-1000 ${
              isVisible("founding-members")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {foundingMembers.map((member, idx) => (
                <div
                  key={member.name}
                  className={`text-center group transition-all duration-1000 ${
                    isVisible("founding-members")
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${400 + idx * 200}ms` }}
                >
                  <div className="w-40 h-40 md:w-64 md:h-64 rounded-full overflow-hidden shadow-lg mx-auto mb-4 md:mb-6 border-4 border-[#FBBF24] transition-all duration-300 group-hover:border-[#F59E0B] group-hover:scale-105 group-hover:shadow-[#FBBF24]/60 bg-[#F3F4F6] flex items-center justify-center">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={256}
                        height={256}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl md:text-4xl font-bold text-[#003366]">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-xl md:text-2xl text-[#003366] mb-2">
                    {member.name}
                  </h3>
                  <p className="text-base md:text-lg text-[#003366] mb-1">
                    {member.role}
                  </p>
                  {member.details && (
                    <p className="text-sm md:text-base text-[#003366]">
                      {member.details}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section
        id="about"
        ref={(el) => {
          sectionRefs.current.about = el;
        }}
        className="py-12 md:py-20 bg-[#FFFFFF]"
      >
        <div className="container mx-auto px-4 md:px-8 max-w-9xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <Card
              className={`bg-[#FFFFFF] shadow-xl hover:shadow-2xl transition-all duration-1000 ${
                isVisible("about")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <CardContent className="p-6 md:p-12">
                <div className="flex items-center mb-4 md:mb-6">
                  <Target className="w-8 h-8 md:w-12 md:h-12 text-[#DC2626] mr-3 md:mr-4" />
                  <h3 className="text-2xl md:text-4xl font-bold text-[#003366]">
                    Our Mission
                  </h3>
                </div>
                <p className="text-base md:text-xl text-[#374151] leading-relaxed">
                  The Filipino-American Advanced Practice Registered Nurses of
                  Nevada (FAPRNA-NV) is a non-profit professional organization
                  dedicated to unify and foster professional excellence of the
                  Filipino-American Advanced Practice Nurses in Nevada.
                </p>
              </CardContent>
            </Card>
            <Card
              className={`bg-[#FFFFFF] shadow-xl hover:shadow-2xl transition-all duration-1000 delay-300 ${
                isVisible("about")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <CardContent className="p-6 md:p-12">
                <div className="flex items-center mb-4 md:mb-6">
                  <Eye className="w-8 h-8 md:w-12 md:h-12 text-[#FBBF24] mr-3 md:mr-4" />
                  <h3 className="text-2xl md:text-4xl font-bold text-[#003366]">
                    Our Vision
                  </h3>
                </div>
                <p className="text-base md:text-xl text-[#374151] leading-relaxed">
                  The vision of FAPRNA-NV is consistent with its mission to
                  uphold the positive image of the Filipino-American Advanced
                  Practice Nurse Practitioners as excellent professionals based
                  on the organization&#39;s founding intentions and principles;
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
        className="py-12 md:py-20 bg-[#003366]"
      >
        <div className="container mx-auto px-4 md:px-8 max-w-10xl">
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-16">
            <div
              className={`w-full lg:w-1/3 flex justify-center transition-all duration-1000 delay-700 ${
                isVisible("objectives")
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <div className="relative">
                <div className="w-48 h-48 md:w-100 md:h-100 bg-[#FFFFFF] rounded-full shadow-2xl flex items-center justify-center">
                  <div className="text-center">
                    <Image
                      src="/faprna_logo.png"
                      alt="FAPRNA Logo"
                      width={320}
                      height={320}
                      className="w-40 h-40 md:w-80 md:h-80 mx-auto mb-4 object-contain"
                    />
                  </div>
                </div>
                <h1 className="text-2xl md:text-4xl font-bold text-[#FFFFFF] text-center mt-4 md:mt-6">
                  P. E. A. R. L. S.
                </h1>
              </div>
            </div>
            <div className="w-full lg:w-2/3">
              <h2
                className={`text-3xl md:text-6xl font-bold mb-6 md:mb-12 text-[#FFFFFF] transition-all duration-1000 ${
                  isVisible("objectives")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                Objectives
              </h2>
              <div className="space-y-4 md:space-y-6">
                {objectives.map((objective, index) => (
                  <div
                    key={index}
                    className={`flex items-center bg-[#FFFFFF] rounded-lg p-4 md:p-6 shadow-md hover:shadow-lg transition-all duration-1000 ${
                      isVisible("objectives")
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-10"
                    }`}
                    style={{ transitionDelay: `${400 + index * 150}ms` }}
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-[#003366] text-[#FFFFFF] rounded-full flex items-center justify-center font-bold mr-4 md:mr-6 text-lg md:text-xl">
                      {pearls[index]}
                    </div>
                    <p className="text-base md:text-xl text-[#374151] font-medium">
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
        className="py-12 md:py-20 bg-[#FFFFFF]"
      >
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <Card
            className={`bg-[#003366] shadow-2xl max-w-6xl mx-auto transition-all duration-1000 ${
              isVisible("cta")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <CardContent className="p-6 md:p-16">
              <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-16">
                <div className="w-full lg:w-1/2 text-center mb-8 lg:mb-0">
                  <div className="w-32 h-32 md:w-48 md:h-48 bg-[#FFFFFF] rounded-full flex items-center justify-center shadow-2xl mx-auto mb-4 md:mb-6">
                    <Mail className="w-16 h-16 md:w-24 md:h-24 text-[#003366]" />
                  </div>
                </div>
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <h2 className="text-3xl md:text-6xl font-extrabold text-[#FFFFFF] mb-6 md:mb-12 drop-shadow-lg text-center lg:text-left">
                    Get in touch
                  </h2>
                  <div className="space-y-6 md:space-y-10">
                    <div
                      className={`flex items-center justify-center lg:justify-start transition-all duration-500 delay-300 ${
                        isVisible("cta")
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-10"
                      }`}
                    >
                      <div className="w-10 h-10 md:w-16 md:h-16 bg-[#FFFFFF] rounded-full flex items-center justify-center shadow-xl mr-4 md:mr-8">
                        <Phone className="w-6 h-6 md:w-9 md:h-9 text-[#003366]" />
                      </div>
                      <div className="text-center lg:text-left">
                        <p className="text-xl md:text-3xl text-[#FFFFFF] font-extrabold mb-1 md:mb-2">
                          Give us a Text
                        </p>
                        <p className="text-lg md:text-2xl text-[#FFFFFF] tracking-wide">
                          (702) 417-3865
                        </p>
                      </div>
                    </div>
                    <div
                      className={`flex items-center justify-center lg:justify-start transition-all duration-500 delay-400 ${
                        isVisible("cta")
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-10"
                      }`}
                    >
                      <div className="w-10 h-10 md:w-16 md:h-16 bg-[#FFFFFF] rounded-full flex items-center justify-center shadow-xl mr-4 md:mr-8">
                        <Mail className="w-6 h-6 md:w-9 md:h-9 text-[#003366]" />
                      </div>
                      <div className="text-center lg:text-left">
                        <p className="text-xl md:text-3xl text-[#FFFFFF] font-extrabold mb-1 md:mb-2">
                          Send us an Email
                        </p>
                        <p className="text-lg md:text-2xl text-[#FFFFFF] tracking-wide">
                          faprnanv702@gmail.com
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
    </div>
  );
}
