import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden md:h-[600px]">
      {/* Hero background image */}
      <div className="absolute inset-0 bg-cover bg-center">
        <Image 
          src="/heropage.jpeg"
          alt="Hero Background"
          fill
          className="object-cover object-center"
          priority
        />
     </div>

      {/* Content overlay */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <h1 className="mb-6 mt-2 text-4xl font-bold md:text-5xl lg:text-6xl">FAPRNA-NV</h1>
        <p className="mx-auto max-w-3xl text-lg font-medium md:text-xl lg:text-2xl">
          A non-profit, professional organization dedicated to unify and foster excellence of the Filipino-American
          Advanced Practice Nurses in Nevada.
        </p>
        <Link href="/event-registration" className="mt-8">
          <Button className="rounded-full bg-red-600 mb-12 px-8 py-2 text-lg font-bold uppercase hover:bg-red-700">
            Events!
          </Button>
        </Link>
      </div>
    </section>
  )
}
