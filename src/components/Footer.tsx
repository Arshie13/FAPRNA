"use client"

import Link from "next/link"
// import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer id="contact" className="w-full border-t bg-[#003366] py-10 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="mb-4 text-lg font-bold">FAPRNA-NV</h3>
            <p className="text-sm text-white/80">
              Filipino-American Advanced Practice Registered Nurses Association of Nevada
            </p>
            {/* uncomment this along with the imports in case they have socials */}
            {/* <div className="mt-4 flex space-x-4">
              <Link href="#" className="text-white/80 hover:text-white">
          <Facebook className="h-5 w-5" />
          <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-white/80 hover:text-white">
          <Twitter className="h-5 w-5" />
          <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-white/80 hover:text-white">
          <Instagram className="h-5 w-5" />
          <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-white/80 hover:text-white">
          <Linkedin className="h-5 w-5" />
          <span className="sr-only">LinkedIn</span>
              </Link>
            </div> */}
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/membership" className="text-white/80 hover:text-white">
                  Membership
                </Link>
              </li>
              <li>
                <Link href="/event-registration" className="text-white/80 hover:text-white">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/board" className="text-white/80 hover:text-white">
                  Board
                </Link>
              </li>
              <li>
                <Link href="/bylaws" className="text-white/80 hover:text-white">
                  By Laws
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h3 className="mb-4 text-lg font-bold">Contact Us</h3>
            <address className="not-italic">
              <p className="mb-2 text-sm text-white/80">Las Vegas, Nevada</p>
              <p className="mb-2 text-sm text-white/80">Email: info@faprna.org</p>
              <p className="mb-2 text-sm text-white/80">Vi Anne Calipusan (President): 702-335-8206</p>
              <p className="mb-2 text-sm text-white/80">Emer Sambo (Assistant PRO): 702-327-6162</p>
            </address>
          </div>
        </div>
        <div className="mt-8 border-t border-white/20 pt-6 text-center text-sm text-white/60">
          <p>© {new Date().getFullYear()} Wisdomous Software Solution. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
