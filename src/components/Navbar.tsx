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
    <header className="w-full border-b bg-white">
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
          <Link href="/" className="text-sm font-medium text-[#003366] hover:text-[#003366]/80">
            Home
          </Link>
          <Link href="/membership" className="text-sm font-medium text-[#003366] hover:text-[#003366]/80">
            Membership
          </Link>
          <Link href="/event-registration" className="text-sm font-medium text-[#003366] hover:text-[#003366]/80">
            Events
          </Link>
          <Link href="/luminance" className="text-sm font-medium text-[#003366] hover:text-[#003366]/80">
            Luminance Awards
          </Link>
          <Link href="#contact" className="text-sm font-medium text-[#003366] hover:text-[#003366]/80">
            Contact
          </Link>
          
          {/* Enhanced More dropdown */}
          <div className="group relative">
            <button className="flex items-center gap-1 text-sm font-medium text-[#003366] hover:text-[#003366]/80 transition-colors">
              More <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180 duration-200" />
            </button>
            <div className="absolute right-0 top-full hidden w-56 rounded-lg bg-white shadow-lg group-hover:block border border-gray-100 overflow-hidden">
              <div className="py-1 space-y-1">
                <Link 
                  href="/board" 
                  className="block px-4 py-3 text-sm font-medium text-[#003366] hover:bg-[#003366]/10 transition-colors
                             border-b border-gray-100 last:border-b-0"
                >
                  Board Members
                </Link>
                <Link 
                  href="/bylaws" 
                  className="block px-4 py-3 text-sm font-medium text-[#003366] hover:bg-[#003366]/10 transition-colors
                             border-b border-gray-100 last:border-b-0"
                >
                  By Laws & Policies
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/register" className="hidden md:block">
            <Button className="rounded-full bg-red-600 px-6 text-white hover:bg-red-700 shadow-sm transition-all hover:shadow-md">
              Event Registration
            </Button>
          </Link>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
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
                  className="text-lg font-medium text-[#003366] hover:text-[#003366]/80 transition-colors px-2 py-3 rounded-lg hover:bg-[#003366]/10"
                  onClick={() => setIsOpen(false)}
                >
                  Membership
                </Link>
                <Link 
                  href="/event-registration" 
                  className="text-lg font-medium text-[#003366] hover:text-[#003366]/80 transition-colors px-2 py-3 rounded-lg hover:bg-[#003366]/10"
                  onClick={() => setIsOpen(false)}
                >
                  Events
                </Link>
                <Link 
                  href="#contact" 
                  className="text-lg font-medium text-[#003366] hover:text-[#003366]/80 transition-colors px-2 py-3 rounded-lg hover:bg-[#003366]/10"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
                <Link 
                  href="/board" 
                  className="text-lg font-medium text-[#003366] hover:text-[#003366]/80 transition-colors px-2 py-3 rounded-lg hover:bg-[#003366]/10"
                  onClick={() => setIsOpen(false)}
                >
                  Board
                </Link>
                <Link 
                  href="/by-laws" 
                  className="text-lg font-medium text-[#003366] hover:text-[#003366]/80 transition-colors px-2 py-3 rounded-lg hover:bg-[#003366]/10"
                  onClick={() => setIsOpen(false)}
                >
                  By Laws
                </Link>
                <Link href="/register" className="mt-4" onClick={() => setIsOpen(false)}>
                  <Button className="w-full rounded-full bg-red-600 text-white hover:bg-red-700 shadow-sm transition-all hover:shadow-md">
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