"use client";

import { useState, useEffect } from "react";
import { Mail } from "lucide-react";
import Image from "next/image";

const boardMembers = {
  president: {
    name: "Homer Tuazon",
    title: "President",
    email: "president@board.org",
    phone: "+1 (555) 123-4567",
    image: "/president.jpg",
  },
  vpExternal: {
    name: "Nikki Macalalad",
    title: "VP External Affairs",
    email: "vpexternal@board.org",
    phone: "+1 (555) 234-5678",
    image: "/vpExternal.jpg",
  },
  vpInternal: {
    name: "Maria Monica Aragon",
    title: "VP Internal Affairs",
    email: "vpinternal@board.org",
    phone: "+1 (555) 345-6789",
    image: "/vpInternal.jpg",
  },
  vpFinance: {
    name: "Marvi Socorro Navarra",
    title: "VP Finance",
    email: "vpfinance@board.org",
    phone: "+1 (555) 456-7890",
    image: "/vpFinance.jpg",
  },
  secretary: {
    name: "Dulce Novakovic",
    title: "Secretary",
    email: "secretary@board.org",
    phone: "+1 (555) 567-8901",
    image: "/secretary.jpg",
  },
  treasurer: {
    name: "Juliana Palijo",
    title: "Treasurer",
    email: "treasurer@board.org",
    phone: "+1 (555) 678-9012",
    image: "/treasurer.jpg",
  },
  asstTreasurer: {
    name: "Jennifer Barreras",
    title: "Assistant Treasurer",
    email: "assttreasurer@board.org",
    phone: "+1 (555) 789-0123",
    image: "/asstTreasurer.jpg",
  },
  auditor: {
    name: "Emerlinda Sambo",
    title: "Auditor",
    email: "auditor@board.org",
    phone: "+1 (555) 890-1234",
    image: "/auditor.jpg",
  },
  adviser1: {
    name: "Rhigel Tan",
    title: "Adviser",
    email: "adviser1@board.org",
    phone: "+1 (555) 901-2345",
    image: "/adviser1.jpg",
  },
  adviser2: {
    name: "Mary Betita",
    title: "Adviser",
    email: "adviser2@board.org",
    phone: "+1 (555) 012-3456",
    image: "/adviser2.jpg",
  },
  adviser3: {
    name: "Louvie Dizon",
    title: "Adviser",
    email: "adviser3@board.org",
    phone: "+1 (555) 123-4567",
    image: "/adviser3.jpg",
  },
  adviser4: {
    name: "Vi-Anne Calipusan",
    title: "Adviser",
    email: "adviser4@board.org",
    phone: "+1 (555) 234-5678",
    image: "/adviser4.jpg",
  },
};

interface MemberCardProps {
  member: typeof boardMembers.president;
  delay: number;
}

function MemberCard({ member, delay }: MemberCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`
        bg-white rounded-2xl border border-gray-200 p-8 shadow-xl
        transform transition-all duration-700 ease-out
        hover:scale-105 hover:shadow-2xl hover:border-blue-400 hover:bg-blue-50
        group cursor-pointer w-full max-w-sm mx-auto
        ${isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"}
      `}
    >
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-[#2740e0] shadow-xl group-hover:shadow-blue-400/50 transition-all duration-300 group-hover:scale-110 group-hover:border-blue-500">
          <Image
            src={member.image || "/placeholder.svg"}
            alt={member.name}
            width={144}
            height={144}
            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>        </div>

        <div className="space-y-3">
          <h3 className="font-bold text-xl md:text-2xl text-gray-800 group-hover:text-blue-700 transition-colors duration-300 leading-tight">
            {member.name}
          </h3>
          <p className="text-base md:text-lg font-semibold text-gray-600 group-hover:text-blue-600 transition-colors duration-300">
            {member.title}
          </p>
        </div>

        <div className="space-y-2 text-base text-gray-500">
          <p className="group-hover:text-blue-500 transition-colors duration-300 font-medium">
            {member.phone}
          </p>
          <a
            href={`mailto:${member.email}`}
            className="flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-300 font-medium"
          >
            <Mail className="w-5 h-5" />
            <span>{member.email}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function BoardOrgChart() {
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTitleVisible(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200 relative overflow-hidden">
      {/* Background texture overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.1) 1px, transparent 0)`,
          backgroundSize: "20px 20px",
        }}
      ></div>

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        {/* Main Title */}
        <div className="text-center mb-12">
          <h1
            className={`
    text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-6
    transform transition-all duration-1000 ease-out
    ${titleVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
  `}
          >
            Board
          </h1>
          <div
            className={`
    h-2 w-32 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full
    transform transition-all duration-1000 ease-out delay-300
    ${titleVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}
  `}
          ></div>
        </div>

        {/* President */}
        <div className="flex justify-center mb-12 md:mb-16">
          <div className="w-full max-w-md">
            <MemberCard member={boardMembers.president} delay={400} />
          </div>
        </div>

        {/* VP Level */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-12 md:mb-16 max-w-7xl mx-auto">
          <MemberCard member={boardMembers.vpInternal} delay={600} />
          <MemberCard member={boardMembers.vpExternal} delay={700} />
          <MemberCard member={boardMembers.vpFinance} delay={800} />
        </div>

        {/* Second Level */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-12 md:mb-16 max-w-8xl mx-auto">
          <MemberCard member={boardMembers.secretary} delay={1000} />
          <MemberCard member={boardMembers.treasurer} delay={1100} />
          <MemberCard member={boardMembers.asstTreasurer} delay={1200} />
          <MemberCard member={boardMembers.auditor} delay={1300} />
        </div>

        {/* Advisers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 max-w-8xl mx-auto">
          <MemberCard member={boardMembers.adviser1} delay={1500} />
          <MemberCard member={boardMembers.adviser2} delay={1600} />
          <MemberCard member={boardMembers.adviser3} delay={1700} />
          <MemberCard member={boardMembers.adviser4} delay={1800} />
        </div>
      </div>
    </div>
  );
}
