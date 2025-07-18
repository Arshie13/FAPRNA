"use client";
import type React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Mail } from "lucide-react";

const allMembers = [
  {
    name: "Homer Tuazon",
    title:
      "MD, DNP, APRN, MSN, BSN, BSP, PMHNP, DACACD. GHLP-F, WCS-C, EDS-C, CCRP, CCRA, CCRC",
    email: "faprnanv702@gmail.com",
    image: "president.jpeg",
    role: "President",
  },
  {
    name: "Nikki V. Macalalad",
    title: "MSN, BSEcon, BSPLS, RN, APRN, FNP-C, WCS-C, EDS-C",
    email: "faprnanv702@gmail.com",
    image: "vpExternal.png",
    role: "VP External Affairs",
  },
  {
    name: "Maria Monica Aragon",
    title: "MSN, RN, APRN, FNP-C, WCS-C, EDS-C",
    email: "faprnanv702@gmail.com",
    image: "vpInternal.jpeg",
    role: "VP Internal Affairs",
  },
  {
    name: "Marvi Socorro M. Navarra",
    title: "MD, MSN, BSN, APRN, FNP-C, WCS-C, EDS-C",
    email: "faprnanv702@gmail.com",
    image: "vpFinance.jpeg",
    role: "VP Finance",
  },
  {
    name: "Dulce Novakovic",
    title: "PhD (c), MSN, BSBA, RN, APRN, FNP-C, WCS-C, EDS-C",
    email: "faprnanv702@gmail.com",
    image: "secretary.jpeg",
    role: "Secretary",
  },
  {
    name: "Juliana A. Palijo",
    title: "APRN, MSN, FNP-C, CCRN, WCS-C, EDS-C",
    email: "faprnanv702@gmail.com",
    image: "treasurer.jpeg",
    role: "Treasurer",
  },
  {
    name: "Emerlinda Sambo",
    title: "MSN, RN, APRN, FNP-C, CWCN, WCS-C, EDS-C",
    email: "faprnanv702@gmail.com",
    image: "auditor.jpeg",
    role: "Auditor",
  },
  {
    name: 'Rhigel "Jay" A. Tan',
    title: "Ph.D., DNP, MSN, RN, APRN, GNP, ANP, PMHNP, FAAN",
    email: "faprnanv702@gmail.com",
    image: "adviser1.jpeg",
    role: "Founder / Adviser",
  },
  {
    name: "Mary A. Betita",
    title: "MD, MSN, BSBio, APRN, FNP-BC, MAP-C, WCS-C, EDS-C",
    email: "faprnanv702@gmail.com",
    image: "adviser3.jpeg",
    role: "Co-Founder / Adviser / Founding President",
  },
  {
    name: "Louvie Dizon",
    title: "DNP, MSN, BSN, BSBA, APRN, FNP-C, WCS-C, EDS-C, AACC",
    email: "faprnanv702@gmail.com",
    image: "adviser2.jpeg",
    role: "Adviser",
  },
  {
    name: 'Wilva "Vi-anne" B. Cadianza',
    title: "DNP, RN, APRN, FNP-C, WCS-C, EDS-C",
    email: "faprnanv702@gmail.com",
    image: "adviser4.jpeg",
    role: "Immediate Past President / Adviser",
  },
];

export default function BoardOrgChart() {
  const [currentMember, setCurrentMember] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({
    x: 0,
    y: 0,
    scrollLeft: 0,
    time: 0,
  });
  const [hasMoved, setHasMoved] = useState(false);
  const [previousMember, setPreviousMember] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(true);
  const [showContent, setShowContent] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current;
      const selectedElement = scrollContainer.children[
        currentMember
      ] as HTMLElement;
      if (selectedElement) {
        const containerWidth = scrollContainer.offsetWidth;
        const elementLeft = selectedElement.offsetLeft;
        const elementWidth = selectedElement.offsetWidth;
        scrollContainer.scrollTo({
          left: elementLeft - containerWidth / 2 + elementWidth / 2,
          behavior: "smooth",
        });
      }
    }
    // Only animate if member actually changed
    if (currentMember !== previousMember) {
      setImageLoaded(false);
      setShowContent(false);
      setIsChanging(true);

      // First hide content completely
      setTimeout(() => {
        setPreviousMember(currentMember);
      }, 200);

      // Then show image
      setTimeout(() => {
        setImageLoaded(true);
      }, 600);

      // Finally show all content with staggered delays
      setTimeout(() => {
        setShowContent(true);
        setIsChanging(false);
      }, 800);
    }
  }, [currentMember, previousMember]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (!scrollContainerRef.current) return;
    e.preventDefault();
    setIsDragging(true);
    setHasMoved(false);
    setDragStart({
      x: e.clientX,
      y: e.clientY,
      scrollLeft: scrollContainerRef.current.scrollLeft,
      time: Date.now(),
    });
    (e.target as Element).setPointerCapture?.(e.pointerId);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || !scrollContainerRef.current) return;
      const deltaX = Math.abs(e.clientX - dragStart.x);
      const deltaY = Math.abs(e.clientY - dragStart.y);
      if (deltaX > 5 || deltaY > 5) {
        setHasMoved(true);
      }
      if (hasMoved) {
        e.preventDefault();
        const walk = (e.clientX - dragStart.x) * 1.5;
        scrollContainerRef.current.scrollLeft = dragStart.scrollLeft - walk;
      }
    },
    [isDragging, dragStart, hasMoved]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (isDragging) {
        setIsDragging(false);
        (e.target as Element).releasePointerCapture?.(e.pointerId);
        if (hasMoved) {
          setTimeout(() => setHasMoved(false), 100);
        }
      }
    },
    [isDragging, hasMoved]
  );

  const handleMemberClick = useCallback(
    (index: number, e: React.MouseEvent | React.KeyboardEvent) => {
      if (hasMoved || isDragging) {
        e.preventDefault();
        return;
      }
      setCurrentMember(index);
    },
    [hasMoved, isDragging]
  );

  const handleMemberTap = useCallback(
    (index: number) => {
      if (!hasMoved && !isDragging) {
        setCurrentMember(index);
      }
    },
    [hasMoved, isDragging]
  );

  const featured = allMembers[currentMember];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-[#EFF6FF] to-[#EEF2FF] flex flex-col pb-8 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#BFDBFE]/30 to-[#C7D2FE]/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-[#F1F5F9]/40 to-[#BFDBFE]/30 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-[#C7D2FE]/20 to-[#93C5FD]/20 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Header Section */}
      <div className="relative z-10 pt-12 pb-8">
        <div className="container mx-auto px-4 text-center">
          {/* Title Section */}
          <div className="relative">
            {/* Main Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#1E293B] via-[#1E3A8A] to-[#3730A3] bg-clip-text text-transparent mb-3 tracking-tight">
              Executive Board Members
            </h1>
          </div>
        </div>
      </div>

      {/* Featured Leader Section */}
      <div className="relative flex-1 z-10 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col items-center justify-center">
          <div
            className={`transform transition-all duration-1000 ease-out ${isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
              }`}
          >
            {/* Main Content */}
            <div className="w-full max-w-6xl sm:px-5 mx-auto transition-all duration-100 ease-out transform">
              <div className="relative bg-[#FFFFFF]/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-[#3B82F6]/20 border border-[#DBEAFE]/50 p-8 md:p-12 overflow-auto">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#DBEAFE]/30 to-transparent rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#EFF6FF]/40 to-transparent rounded-full blur-xl"></div>
                <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-center gap-8 lg:gap-16 justify-center">
                  {/* Profile Image Section */}
                  <div className="flex flex-col items-center lg:items-center">
                    <div className="relative group">
                      {/* Outer decorative ring */}
                      <div className="absolute -inset-6 bg-gradient-to-r from-[#2563EB]/20 to-[#4F46E5]/20 rounded-full blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-100"></div>
                      {/* Main profile container */}
                      <div className="relative">
                        <div className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden shadow-2xl border-4 border-[#FFFFFF] bg-[#FFFFFF] p-2 relative">
                          <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#2563EB] shadow-lg relative">
                            {/* Current image */}
                            <Image
                              key={`current-${featured.name}`}
                              src={`/${featured.image}`}
                              alt={featured.name}
                              width={256}
                              height={256}
                              className={`w-full h-full object-cover object-top transition-all duration-100 ease-out absolute inset-0 group-hover:scale-105 ${imageLoaded && showContent && !isChanging
                                ? "opacity-100 scale-100"
                                : "opacity-0 scale-110"
                                }`}
                              onLoad={() => setImageLoaded(true)}
                              priority
                            />
                            {/* Previous image for smooth transition */}
                            {isChanging && previousMember !== currentMember && (
                              <Image
                                key={`previous-${allMembers[previousMember].name}`}
                                src={`/${allMembers[previousMember].image}`}
                                alt={allMembers[previousMember].name}
                                width={256}
                                height={256}
                                className={`w-full h-full object-cover object-top transition-all duration-100 ease-out absolute inset-0 ${!showContent
                                  ? "opacity-0 scale-90"
                                  : "opacity-100 scale-100"
                                  }`}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Enhanced Role Badge */}
                    <div className="mt-6 relative">
                      <div
                        className={`relative bg-gradient-to-r from-[#2563EB] to-[#4F46E5] text-[#FFFFFF] font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-2xl shadow-xl border border-white/20 transition-all duration-100 ease-out w-full max-w-xs sm:max-w-md text-center mx-auto`}
                        style={{
                          transitionDelay:
                            imageLoaded && showContent && !isChanging ? "400ms" : "0ms",
                        }}
                      >
                        <span className="block text-sm sm:text-base md:text-lg lg:text-xl leading-snug tracking-wide break-words whitespace-normal">
                          {featured.role}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Details Section */}
                  <div className="flex-1 px-4 sm:px-6 limit-wd-40">
                    <div className="space-y-6 sm:space-y-8">
                      {/* Name and Title Section */}
                      <div className="text-center lg:text-left">
                        <h1
                          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E293B] mb-4 sm:mb-6 leading-tight transition-all duration-100 ease-out ${imageLoaded && showContent && !isChanging
                            ? "opacity-100 translate-y-0 scale-100"
                            : "opacity-0 translate-y-8 scale-95"
                            }`}
                          style={{
                            transitionDelay:
                              imageLoaded && showContent && !isChanging
                                ? "200ms"
                                : "0ms",
                          }}
                        >
                          {featured.name}
                        </h1>

                        {/* Credentials Box */}
                        <div
                          className={`bg-gradient-to-r from-[#F8FAFC] to-[#EFF6FF] rounded-xl sm:rounded-2xl px-3 py-4 sm:px-10 sm:py-5 md:p-6 border-l-4 border-[#2563EB] shadow-sm sm:shadow-lg shadow-[#3B82F6]/10 sm:shadow-[#3B82F6]/20 transition-all duration-100 ease-out ${imageLoaded && showContent && !isChanging
                            ? "opacity-100 translate-y-0 scale-100"
                            : "opacity-0 translate-y-10 scale-95"
                            }`}
                          style={{
                            transitionDelay:
                              imageLoaded && showContent && !isChanging
                                ? "500ms"
                                : "0ms",
                          }}
                        >
                          <p className="text-sm sm:text-base md:text-lg text-[#334155] leading-relaxed font-medium text-center sm:text-left">
                            {featured.title}
                          </p>
                        </div>
                      </div>

                      {/* Contact Section */}
                      <div
                        className={`bg-[#FFFFFF] rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md sm:shadow-lg shadow-[#3B82F6]/10 sm:shadow-[#3B82F6]/20 border border-[#DBEAFE] transition-all duration-100 ease-out ${imageLoaded && showContent && !isChanging
                          ? "opacity-100 translate-y-0 scale-100"
                          : "opacity-0 translate-y-12 scale-95"
                          }`}
                        style={{
                          transitionDelay:
                            imageLoaded && showContent && !isChanging
                              ? "600ms"
                              : "0ms",
                        }}
                      >
                        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                          <h3 className="text-lg sm:text-xl font-bold text-[#1E293B]">
                            Contact Information
                          </h3>
                        </div>

                        <div
                          className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gradient-to-r from-[#EFF6FF] to-[#EEF2FF] rounded-lg sm:rounded-xl border border-[#DBEAFE] shadow-sm sm:shadow-md shadow-[#3B82F6]/10 transition-all duration-100 ease-out ${imageLoaded && showContent && !isChanging
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 translate-x-8"
                            }`}
                          style={{
                            transitionDelay:
                              imageLoaded && showContent && !isChanging
                                ? "800ms"
                                : "0ms",
                          }}
                        >
                          <div
                            className={`p-2 sm:p-3 bg-[#FFFFFF] rounded-full shadow-sm sm:shadow-md border border-[#DBEAFE] transition-all duration-100 ease-out flex-shrink-0 ${imageLoaded && showContent && !isChanging
                              ? "scale-100 rotate-0"
                              : "scale-75 rotate-180"
                              }`}
                            style={{
                              transitionDelay:
                                imageLoaded && showContent && !isChanging
                                  ? "900ms"
                                  : "0ms",
                            }}
                          >
                            <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563EB]" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <a
                              href={`mailto:${featured.email}`}
                              className={`text-sm sm:text-base font-semibold text-[#1D4ED8] hover:text-[#1E40AF] transition-all duration-100 ease-out block break-all ${imageLoaded && showContent && !isChanging
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-4"
                                }`}
                              style={{
                                transitionDelay:
                                  imageLoaded && showContent && !isChanging
                                    ? "1100ms"
                                    : "0ms",
                              }}
                            >
                              {featured.email}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable Container */}
            <div className="flex justify-center mt-8 sm:mt-10 md:mt-12 lg:mt-16">
              <div className="limit-wd-46 px-4 py-6 sm:px-6 sm:py-8 bg-[#FFFFFF]/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-lg relative overflow-hidden border border-[#E5E7EB]/50">
                {/* Gradient overlays */}
                <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-r from-[#FFFFFF] via-[#FFFFFF]/80 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-[#FFFFFF] via-[#FFFFFF]/80 to-transparent z-10 pointer-events-none"></div>

                {/* Scrollable Members Container */}
                <div
                  ref={scrollContainerRef}
                  className={`flex overflow-x-auto space-x-3 sm:space-x-4 md:space-x-6 pb-4 transition-all duration-100 ${isDragging ? "cursor-grabbing select-none" : "cursor-grab"
                    } touch-pan-x scrollbar-hide`}
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                >
                  {allMembers.map((member, index) => (
                    <div
                      key={member.name}
                      className={`flex-shrink-0 transform transition-all duration-100 ease-out ${isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-6 opacity-0"
                        }`}
                      style={{
                        transitionDelay: `${(index + 1) * 60}ms`,
                        minWidth: "fit-content",
                      }}
                    >
                      <div
                        className={`group cursor-pointer transform transition-all duration-100 ease-out hover:scale-105 active:scale-95 p-2 relative touch-manipulation rounded-xl`}
                        onClick={(e) => handleMemberClick(index, e)}
                        onTouchEnd={() => handleMemberTap(index)}
                        tabIndex={0}
                        role="button"
                        aria-label={`View ${member.name}'s profile`}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleMemberClick(index, e);
                          }
                        }}
                      >
                        {/* Member Avatar */}
                        <div
                          className={`w-14 h-14 sm:w-16 sm:h-16 mt-1 md:w-20 md:h-20 lg:w-24 lg:h-24 mx-auto rounded-full overflow-hidden shadow-lg bg-[#FFFFFF] p-1 transition-all duration-100 ease-out ${currentMember === index
                            ? "ring-3 sm:ring-4 ring-[#2563EB] scale-110 shadow-xl"
                            : "ring-2 ring-[#E5E7EB] group-hover:ring-[#2563EB] group-hover:shadow-xl"
                            }`}
                        >
                          <Image
                            src={`/${member.image}`}
                            alt={member.name}
                            width={96}
                            height={96}
                            className={`w-full h-full object-cover object-top rounded-full transition-all duration-100 ease-out ${currentMember === index
                              ? "opacity-100"
                              : "opacity-90 group-hover:opacity-100"
                              }`}
                            draggable={false}
                          />
                        </div>
                        {/* Member Name Label */}
                        <div className="mt-2 text-center">
                          <p
                            className={`text-xs sm:text-sm font-medium text-[#1E40AF] transition-all duration-100 ${currentMember === index
                              ? "opacity-100 scale-105 font-semibold text-[#1E3A8A]"
                              : "opacity-70 group-hover:opacity-100 group-hover:text-[#1E3A8A]"
                              }`}
                          >
                            {member.name.split(" ")[0]}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Progress Indicator Dots */}
            <div className="flex justify-center mt-6">
              <div className="flex space-x-1.5 sm:space-x-2 bg-[#FFFFFF]/80 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-3 rounded-full shadow-md border border-[#E5E7EB]/50">
                {allMembers.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-100 ease-out ${currentMember === index
                      ? "bg-[#2563EB] w-6 sm:w-8 shadow-lg"
                      : "bg-[#D1D5DB]"
                      }`}
                    aria-label={`Member ${index + 1} indicator`}
                  />
                ))}
              </div>
            </div>

            {/* Position Counter */}
            <div className="flex justify-center mt-3">
              <div className="text-xs sm:text-sm text-[#2563EB] bg-[#FFFFFF]/60 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1 rounded-full border border-[#E5E7EB]/50">
                {currentMember + 1} of {allMembers.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
