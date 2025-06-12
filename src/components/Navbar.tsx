"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header id="top" className="w-full border-b bg-white">
      <div className="flex h-32 items-center justify-center px-10 md:px-6">
        <div className="flex items-center gap-2 mx-5">
          <Link href="/" className="flex items-center">
            <div className="flex flex-col">
              <div className="flex items-center">
                <Image src="/faprna_logo.png" alt="FAPRNA-NV Logo" width={40} height={40} className="mr-2" />
                <span className="text-xl font-bold text-[#003366]">FAPRNA-NV</span>
              </div>
              <div className="hidden flex-col text-xs text-[#003366] md:flex">
                <span>Filipino-American Advanced Practice</span>
                <span>Registered Nurses Association</span>
              </div>
            </div>
          </Link>
        </div>

        <nav className="hidden mx-5 md:flex md:items-center md:gap-6">
          <Link 
            href="/" 
            className="text-sm font-medium text-[#003366] hover:text-[#003366] relative group transition-all duration-300"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#003366] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link 
            href="/membership" 
            className="text-sm font-medium text-[#003366] hover:text-[#003366] relative group transition-all duration-300"
          >
            Membership
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#003366] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link 
            href="/event-registration" 
            className="text-sm font-medium text-[#003366] hover:text-[#003366] relative group transition-all duration-300"
          >
            Events
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#003366] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link 
            href="/luminance" 
            className="text-sm font-medium text-[#003366] hover:text-[#003366] relative group transition-all duration-300"
          >
            Luminance Awards
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#003366] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link 
            href="#contact" 
            className="text-sm font-medium text-[#003366] hover:text-[#003366] relative group transition-all duration-300"
          >
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#003366] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          
          {/* Enhanced More dropdown with improved hover effects */}
          <div className="group relative z-50">
            <button className="flex items-center gap-1 text-sm font-medium text-[#003366] hover:text-[#003366] relative transition-all duration-300">
              More 
              <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180 duration-200" />
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#003366] transition-all duration-300 group-hover:w-[calc(100%+1rem)]"></span>
            </button>
            <div className="absolute right-0 top-full hidden w-56 rounded-lg bg-white shadow-lg group-hover:block border border-gray-100 overflow-hidden">
              <div className="py-1 space-y-1">
                <Link 
                  href="/about" 
                  className="block px-4 py-3 text-sm font-medium text-[#003366] hover:bg-[#003366]/10 transition-all
                             hover:pl-6 duration-300 border-b border-gray-100 last:border-b-0 relative
                             before:content-[''] before:absolute before:left-2 before:top-1/2 
                             before:-translate-y-1/2 before:w-1 before:h-1 before:rounded-full 
                             before:bg-[#003366] before:opacity-0 before:transition-all 
                             before:duration-300 hover:before:opacity-100 hover:before:left-3"
                >
                  About
                </Link>
                <Link 
                  href="/board" 
                  className="block px-4 py-3 text-sm font-medium text-[#003366] hover:bg-[#003366]/10 transition-all
                             hover:pl-6 duration-300 border-b border-gray-100 last:border-b-0 relative
                             before:content-[''] before:absolute before:left-2 before:top-1/2 
                             before:-translate-y-1/2 before:w-1 before:h-1 before:rounded-full 
                             before:bg-[#003366] before:opacity-0 before:transition-all 
                             before:duration-300 hover:before:opacity-100 hover:before:left-3"
                >
                  Board Members
                </Link>
                <Link 
                  href="/bylaws" 
                  className="block px-4 py-3 text-sm font-medium text-[#003366] hover:bg-[#003366]/10 transition-all
                             hover:pl-6 duration-300 border-b border-gray-100 last:border-b-0 relative
                             before:content-[''] before:absolute before:left-2 before:top-1/2 
                             before:-translate-y-1/2 before:w-1 before:h-1 before:rounded-full 
                             before:bg-[#003366] before:opacity-0 before:transition-all 
                             before:duration-300 hover:before:opacity-100 hover:before:left-3"
                >
                  By Laws & Policies
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/event-registration/details/MaternalandChildHealthEvent" className="hidden md:block">
            <Button className="rounded-full bg-red-600 px-6 text-white hover:bg-red-700 shadow-sm transition-all 
                            hover:shadow-md hover:scale-105 duration-300 transform">
              Event Registration
            </Button>
          </Link>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden hover:bg-[#003366]/10 
                              hover:text-[#003366] transition-colors duration-300">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle className="text-[#003366] border-b pb-4 mb-4">
                Navigation Menu
              </SheetTitle>
              <nav className="flex flex-col gap-4 pt-2">
                <Link
                  href="/membership"
                  className="text-lg font-medium text-[#003366] hover:text-[#003366] transition-all 
                             duration-300 px-4 py-3 rounded-lg hover:bg-[#003366]/10 relative
                             before:content-[''] before:absolute before:left-2 before:top-1/2 
                             before:-translate-y-1/2 before:w-1 before:h-1 before:rounded-full 
                             before:bg-[#003366] before:opacity-0 before:transition-all 
                             before:duration-300 hover:before:opacity-100 hover:before:left-3"
                  onClick={() => setIsOpen(false)}
                >
                  Membership
                </Link>
                <Link 
                  href="/event-registration" 
                  className="text-lg font-medium text-[#003366] hover:text-[#003366] transition-all 
                             duration-300 px-4 py-3 rounded-lg hover:bg-[#003366]/10 relative
                             before:content-[''] before:absolute before:left-2 before:top-1/2 
                             before:-translate-y-1/2 before:w-1 before:h-1 before:rounded-full 
                             before:bg-[#003366] before:opacity-0 before:transition-all 
                             before:duration-300 hover:before:opacity-100 hover:before:left-3"
                  onClick={() => setIsOpen(false)}
                >
                  Events
                </Link>
                <Link 
                  href="#contact" 
                  className="text-lg font-medium text-[#003366] hover:text-[#003366] transition-all 
                             duration-300 px-4 py-3 rounded-lg hover:bg-[#003366]/10 relative
                             before:content-[''] before:absolute before:left-2 before:top-1/2 
                             before:-translate-y-1/2 before:w-1 before:h-1 before:rounded-full 
                             before:bg-[#003366] before:opacity-0 before:transition-all 
                             before:duration-300 hover:before:opacity-100 hover:before:left-3"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
                <Link 
                  href="/board" 
                  className="text-lg font-medium text-[#003366] hover:text-[#003366] transition-all 
                             duration-300 px-4 py-3 rounded-lg hover:bg-[#003366]/10 relative
                             before:content-[''] before:absolute before:left-2 before:top-1/2 
                             before:-translate-y-1/2 before:w-1 before:h-1 before:rounded-full 
                             before:bg-[#003366] before:opacity-0 before:transition-all 
                             before:duration-300 hover:before:opacity-100 hover:before:left-3"
                  onClick={() => setIsOpen(false)}
                >
                  Board
                </Link>
                <Link 
                  href="/by-laws" 
                  className="text-lg font-medium text-[#003366] hover:text-[#003366] transition-all 
                             duration-300 px-4 py-3 rounded-lg hover:bg-[#003366]/10 relative
                             before:content-[''] before:absolute before:left-2 before:top-1/2 
                             before:-translate-y-1/2 before:w-1 before:h-1 before:rounded-full 
                             before:bg-[#003366] before:opacity-0 before:transition-all 
                             before:duration-300 hover:before:opacity-100 hover:before:left-3"
                  onClick={() => setIsOpen(false)}
                >
                  By Laws
                </Link>
                <Link href="/register" className="mt-4" onClick={() => setIsOpen(false)}>
                  <Button className="w-full rounded-full bg-red-600 text-white hover:bg-red-700 
                                  shadow-sm transition-all hover:shadow-md hover:scale-105 duration-300 transform">
                    Event Registration
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}