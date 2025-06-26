"use client";

import type React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";

// SVG icons from simpleicons.org for Facebook, Instagram, Twitter
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.019 4.388 10.995 10.125 11.854v-8.385H7.078v-3.47h3.047V9.413c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.491 0-1.953.926-1.953 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.068 24 18.092 24 12.073z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.974.976 1.247 2.243 1.31 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.063 1.366-.336 2.633-1.31 3.608-.975.976-2.242 1.248-3.608 1.31-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.974-.975-1.247-2.242-1.31-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.063-1.366.336-2.633 1.31-3.608.975-.976 2.242-1.248 3.608-1.31C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.13 4.602.388 3.635 1.355 2.668 2.322 2.41 3.495 2.352 4.772.013 8.332 0 8.741 0 12c0 3.259.013 3.668.072 4.948.058 1.277.316 2.45 1.283 3.417.967.967 2.14 1.225 3.417 1.283C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.277-.058 2.45-.316 3.417-1.283.967-.967 2.14-1.225 3.417-1.283C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.916 4.916 0 0 0-8.38 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.93-.856 2.011-.857 3.17 0 2.188 1.115 4.117 2.823 5.254a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.418A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.058 0 14.009-7.496 14.009-13.986 0-.21-.005-.423-.015-.634A10.012 10.012 0 0 0 24 4.557z" />
  </svg>
);

const allMembers = [
  {
    name: "Homer Tuazon",
    title: "President",
    email: "president@board.org",
    phone: "+1 (555) 123-4567",
    facebook: "https://facebook.com/homer.tuazon",
    instagram: "https://instagram.com/homer.tuazon",
    twitter: "https://x.com/homer_tuazon",
    image: "president.jpg",
  },
  {
    name: "Nikki Macalalad",
    title: "VP External Affairs",
    email: "vpexternal@board.org",
    phone: "+1 (555) 234-5678",
    facebook: "https://facebook.com/nikki.macalalad",
    instagram: "https://instagram.com/nikki.macalalad",
    twitter: "https://x.com/nikki_macalalad",
    image: "vpExternal.jpg",
  },
  {
    name: "Maria Monica Aragon",
    title: "VP Internal Affairs",
    email: "vpinternal@board.org",
    phone: "+1 (555) 345-6789",
    facebook: "https://facebook.com/maria.aragon",
    instagram: "https://instagram.com/maria.aragon",
    twitter: "https://x.com/maria_aragon",
    image: "vpInternal.jpg",
  },
  {
    name: "Marvi Socorro Navarra",
    title: "VP Finance",
    email: "vpfinance@board.org",
    phone: "+1 (555) 456-7890",
    facebook: "https://facebook.com/marvi.navarra",
    instagram: "https://instagram.com/marvi.navarra",
    twitter: "https://x.com/marvi_navarra",
    image: "vpFinance.jpg",
  },
  {
    name: "Dulce Novakovic",
    title: "Secretary",
    email: "secretary@board.org",
    phone: "+1 (555) 567-8901",
    facebook: "https://facebook.com/dulce.novakovic",
    instagram: "https://instagram.com/dulce.novakovic",
    twitter: "https://x.com/dulce_novakovic",
    image: "secretary.jpg",
  },
  {
    name: "Juliana Palijo",
    title: "Treasurer",
    email: "treasurer@board.org",
    phone: "+1 (555) 678-9012",
    facebook: "https://facebook.com/juliana.palijo",
    instagram: "https://instagram.com/juliana.palijo",
    twitter: "https://x.com/juliana_palijo",
    image: "treasurer.jpg",
  },
  {
    name: "Jennifer Barreras",
    title: "Assistant Treasurer",
    email: "assttreasurer@board.org",
    phone: "+1 (555) 789-0123",
    facebook: "https://facebook.com/jennifer.barreras",
    instagram: "https://instagram.com/jennifer.barreras",
    twitter: "https://x.com/jennifer_barreras",
    image: "asstTreasurer.jpg",
  },
  {
    name: "Emerlinda Sambo",
    title: "Auditor",
    email: "auditor@board.org",
    phone: "+1 (555) 890-1234",
    facebook: "https://facebook.com/emerlinda.sambo",
    instagram: "https://instagram.com/emerlinda.sambo",
    twitter: "https://x.com/emerlinda_sambo",
    image: "auditor.jpg",
  },
  {
    name: "Rhigel Tan",
    title: "Senior Adviser",
    email: "adviser1@board.org",
    phone: "+1 (555) 901-2345",
    facebook: "https://facebook.com/rhigel.tan",
    instagram: "https://instagram.com/rhigel.tan",
    twitter: "https://x.com/rhigel_tan",
    image: "adviser1.jpg",
  },
  {
    name: "Mary Betita",
    title: "Senior Adviser",
    email: "adviser2@board.org",
    phone: "+1 (555) 012-3456",
    facebook: "https://facebook.com/mary.betita",
    instagram: "https://instagram.com/mary.betita",
    twitter: "https://x.com/mary_betita",
    image: "adviser2.jpg",
  },
  {
    name: "Louvie Dizon",
    title: "Senior Adviser",
    email: "adviser3@board.org",
    phone: "+1 (555) 123-4567",
    facebook: "https://facebook.com/louvie.dizon",
    instagram: "https://instagram.com/louvie.dizon",
    twitter: "https://x.com/louvie_dizon",
    image: "adviser3.jpg",
  },
  {
    name: "Vi-Anne Calipusan",
    title: "Senior Adviser",
    email: "adviser4@board.org",
    phone: "+1 (555) 234-5678",
    facebook: "https://facebook.com/vianne.calipusan",
    instagram: "https://instagram.com/vianne.calipusan",
    twitter: "https://x.com/vianne_calipusan",
    image: "adviser4.jpg",
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Enhanced member change effect with smoother transitions
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

        // Smooth scroll to center the selected member
        scrollContainer.scrollTo({
          left: elementLeft - containerWidth / 2 + elementWidth / 2,
          behavior: "smooth",
        });
      }
    }

    // Enhanced fade transition with stagger effect
    setIsChanging(true);
    const timer = setTimeout(() => setIsChanging(false), 400);
    return () => clearTimeout(timer);
  }, [currentMember]);

  // Improved drag functionality with better click detection
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

    // Capture pointer for better tracking
    (e.target as Element).setPointerCapture?.(e.pointerId);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || !scrollContainerRef.current) return;

      const deltaX = Math.abs(e.clientX - dragStart.x);
      const deltaY = Math.abs(e.clientY - dragStart.y);

      // Only start scrolling if moved more than threshold
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

        // Release pointer capture
        (e.target as Element).releasePointerCapture?.(e.pointerId);

        // Small delay to prevent immediate click after drag
        if (hasMoved) {
          setTimeout(() => setHasMoved(false), 100);
        }
      }
    },
    [isDragging, hasMoved]
  );

  // Improved member click handler
  const handleMemberClick = useCallback(
    (index: number, e: React.MouseEvent | React.KeyboardEvent) => {
      // Prevent click if we just finished dragging
      if (hasMoved || isDragging) {
        e.preventDefault();
        return;
      }

      setCurrentMember(index);
    },
    [hasMoved, isDragging]
  );

  // Touch-friendly tap handler
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
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-blue-200 flex flex-col pb-4 sm:pb-6 md:pb-8 relative overflow-hidden">
      {/* Background Shapes - Static, no animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-5 left-5 w-20 h-20 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 bg-blue-400/40 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-5 w-24 h-24 sm:w-40 sm:h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 bg-blue-500/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 bg-blue-300/50 rounded-full blur-2xl" />
        <div className="absolute top-1/4 right-1/3 w-14 h-14 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 bg-white/70 rounded-full blur-2xl" />
      </div>

      {/* Featured Leader Section */}
      <div className="relative flex-1 z-10">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pt-4 sm:pt-6 md:pt-8 lg:pt-12">
          <div
            className={`transform transition-all duration-1000 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            {/* Main Content */}
            <div className="w-full max-w-5xl mx-auto transition-all duration-500 ease-out transform">
              <div className="rounded-2xl sm:rounded-3xl shadow-lg bg-white/95 backdrop-blur-sm border border-gray-200/50 p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col lg:flex-row items-center lg:items-stretch space-y-6 lg:space-y-0 lg:space-x-8 xl:space-x-12 min-h-[280px] sm:min-h-[320px] md:min-h-[360px] relative overflow-hidden">
                {/* Details - Left on desktop, below on mobile */}
                <div className="flex-1 flex flex-col justify-center order-2 lg:order-1 w-full relative z-10">
                  <div className="w-full h-full flex flex-col justify-center space-y-4 sm:space-y-5 md:space-y-6">
                    {/* Phone Contact */}
                    <div className="flex items-center gap-3 sm:gap-4 text-sm sm:text-base md:text-lg group">
                      <div className="p-2 sm:p-3 bg-gray-100 rounded-full shadow-sm group-hover:bg-gray-200 transition-all duration-300 flex-shrink-0">
                        <Phone className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-700" />
                      </div>
                      <span className="font-medium text-blue-800 group-hover:text-gray-900 transition-colors duration-300 break-all">
                        {featured.phone}
                      </span>
                    </div>

                    {/* Email Contact */}
                    <div className="flex items-center gap-3 sm:gap-4 text-sm sm:text-base md:text-lg group">
                      <div className="p-2 sm:p-3 bg-gray-100 rounded-full shadow-sm group-hover:bg-gray-200 transition-all duration-300 flex-shrink-0">
                        <Mail className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-700" />
                      </div>
                      <span className="font-medium text-blue-800 group-hover:text-gray-900 transition-colors duration-300 break-all">
                        {featured.email}
                      </span>
                    </div>

                    {/* Social Media */}
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-sm sm:text-base text-blue-700 font-medium mb-3 sm:mb-4">
                        Connect on Social Media:
                      </p>
                      <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
                        <a
                          href={featured.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 sm:p-3 bg-blue-500 rounded-full shadow-md hover:bg-blue-600 hover:scale-110 transition-all duration-300 group"
                        >
                          <FacebookIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </a>
                        <a
                          href={featured.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 sm:p-3 bg-pink-500 rounded-full shadow-md hover:bg-pink-600 hover:scale-110 transition-all duration-300 group"
                        >
                          <InstagramIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </a>
                        <a
                          href={featured.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 sm:p-3 bg-sky-500 rounded-full shadow-md hover:bg-sky-600 hover:scale-110 transition-all duration-300 group"
                        >
                          <TwitterIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image, Name, Title - Always on top on mobile, right and centered on desktop */}
                <div className="flex flex-col items-center justify-center flex-1 order-1 lg:order-2 w-full h-full relative z-10">
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="relative mb-4 sm:mb-6 flex justify-center">
                      <div
                        className={`w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl border-3 sm:border-4 border-white transition-all duration-500 ease-out ${
                          isChanging
                            ? "opacity-0 scale-95"
                            : "opacity-100 scale-100"
                        }`}
                        style={{
                          transitionDelay: isChanging ? "0ms" : "200ms",
                        }}
                      >
                        <Image
                          src={`/${featured.image}`}
                          alt={featured.name}
                          width={224}
                          height={224}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                      </div>
                    </div>
                    <div className="w-full text-center">
                      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-900 mb-2 sm:mb-3 md:mb-4 max-w-xs sm:max-w-sm md:max-w-md mx-auto leading-tight">
                        {featured.name}
                      </h1>
                      <p className="inline-block bg-blue-600 text-white font-semibold px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full text-sm sm:text-base md:text-lg lg:text-xl shadow-lg">
                        {featured.title}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Board Members Section */}
            <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-900 mb-3 sm:mb-4">
                  Executive Board Members
                </h2>
                <div className="w-12 sm:w-16 md:w-20 h-1 bg-blue-900 mx-auto rounded-full"></div>
              </div>

              {/* Scrollable Container */}
              <div className="flex justify-center">
                <div className="w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-lg relative overflow-hidden border border-gray-200/50">
                  {/* Gradient overlays */}
                  <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
                  <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>

                  {/* Scrollable Members Container */}
                  <div
                    ref={scrollContainerRef}
                    className={`flex overflow-x-auto space-x-3 sm:space-x-4 md:space-x-6 pb-4 transition-all duration-300 ${
                      isDragging ? "cursor-grabbing select-none" : "cursor-grab"
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
                        className={`flex-shrink-0 transform transition-all duration-700 ease-out ${
                          isVisible
                            ? "translate-y-0 opacity-100"
                            : "translate-y-6 opacity-0"
                        }`}
                        style={{
                          transitionDelay: `${(index + 1) * 60}ms`,
                          minWidth: "fit-content",
                        }}
                      >
                        <div
                          className={`group cursor-pointer transform transition-all duration-400 ease-out hover:scale-105 active:scale-95 p-2 relative touch-manipulation rounded-xl hover:bg-blue-100/80 hover:shadow-lg`}
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
                            className={`w-14 h-14 sm:w-16 sm:h-16 mt-1 md:w-20 md:h-20 lg:w-24 lg:h-24 mx-auto rounded-full overflow-hidden shadow-lg bg-white p-1 transition-all duration-400 ease-out ${
                              currentMember === index
                                ? "ring-3 sm:ring-4 ring-blue-600 scale-110 shadow-xl"
                                : "ring-2 ring-gray-200 group-hover:ring-blue-400 group-hover:shadow-xl"
                            }`}
                          >
                            <Image
                              src={`/${member.image}`}
                              alt={member.name}
                              width={96}
                              height={96}
                              className={`w-full h-full object-cover rounded-full transition-all duration-500 ease-out ${
                                currentMember === index
                                  ? "opacity-100"
                                  : "opacity-90 group-hover:opacity-100"
                              }`}
                              draggable={false}
                            />
                          </div>

                          {/* Member Name Label */}
                          <div className="mt-2 text-center">
                            <p
                              className={`text-xs sm:text-sm font-medium text-blue-800 transition-all duration-300 ${
                                currentMember === index
                                  ? "opacity-100 scale-105 font-semibold text-blue-900"
                                  : "opacity-70 group-hover:opacity-100 group-hover:text-blue-900"
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
                <div className="flex space-x-1.5 sm:space-x-2 bg-white/80 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-3 rounded-full shadow-md border border-gray-200/50">
                  {allMembers.map((_, index) => (
                    <div
                      key={index}
                      className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-400 ease-out ${
                        currentMember === index
                          ? "bg-blue-600 w-6 sm:w-8 shadow-lg"
                          : "bg-gray-300"
                      }`}
                      aria-label={`Member ${index + 1} indicator`}
                    />
                  ))}
                </div>
              </div>

              {/* Position Counter */}
              <div className="flex justify-center mt-3">
                <div className="text-xs sm:text-sm text-blue-600 bg-white/60 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1 rounded-full border border-gray-200/50">
                  {currentMember + 1} of {allMembers.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
