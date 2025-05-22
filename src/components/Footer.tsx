import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full border-t bg-white py-6">
      <div className="container mx-auto flex flex-col items-center justify-between px-4 md:flex-row">
        <div className="mb-4 text-center md:mb-0 md:text-left">
          <p className="text-sm text-gray-600">© {new Date().getFullYear()} FAPRNA-NV. All rights reserved.</p>
        </div>
        <div className="flex space-x-4">
          <Link href="/privacy" className="text-sm text-gray-600 hover:text-[#003366]">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-sm text-gray-600 hover:text-[#003366]">
            Terms of Service
          </Link>
          <Link href="/contact" className="text-sm text-gray-600 hover:text-[#003366]">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}
