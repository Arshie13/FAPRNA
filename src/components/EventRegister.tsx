import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Users, DollarSign } from "lucide-react"
import Image from "next/image"

export default function EventRegistration() {
  return (
    <section className="w-full bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm uppercase tracking-wider text-gray-500">FAPRNA News</p>
          <h1 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">What&apos;s Happening at Our Association</h1>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
              NEW EVENT
            </h1>
          </div>

          <Card className="overflow-hidden border-0 shadow-2xl">
            <div className="relative">
              <div className="aspect-[4/3] w-full overflow-hidden md:aspect-[16/10] flex items-center justify-center">
                <Image
                  src="/maternal_and_child_health.png"
                  alt="Maternal and Child Health Event"
                  width={500}
                  height={500}
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>
            </div>

            <CardContent className="p-8">
              <div className="mb-8 text-center">
                <h3 className="mb-2 text-2xl font-bold text-blue-600">MARCH 2, 2024</h3>
                <p className="text-gray-600">Chairman&apos;s Auditorium at Optum 2716 N Tenaya Way, Las Vegas NV 89129</p>
              </div>

              <div className="mb-8 grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Date & Time</div>
                      <div className="text-sm text-gray-600">March 2, 2024 • 8:00 AM - 3:00 PM</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Location</div>
                      <div className="text-sm text-gray-600">Chairman&apos;s Auditorium at Optum</div>
                      <div className="text-sm text-gray-600">2716 N Tenaya Way, Las Vegas NV 89129</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Continuing Education</div>
                      <div className="text-sm text-gray-600">6 CEUs Available</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Registration Fee</div>
                      <div className="text-sm text-gray-600">Free for Members & Students</div>
                      <div className="text-sm text-gray-600">$25 for Non-Members</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8 rounded-lg bg-blue-50 p-6">
                <h4 className="mb-3 text-lg font-bold text-blue-800">Event Description</h4>
                <p className="text-gray-700">
                  Join us for an comprehensive educational session focused on maternal and child health. This event will
                  cover best practices, current research, and practical applications in maternal and pediatric care.
                  Perfect for advanced practice nurses looking to enhance their knowledge and earn continuing education
                  credits.
                </p>
              </div>

              <div className="text-center">
                <Link href="/register">
                  <Button className="rounded-full bg-blue-600 px-12 py-6 text-lg font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl">
                    CLICK TO REGISTER →
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="mt-12 text-center">
            <p className="text-gray-600">
              Questions about registration?{" "}
              <Link href="/contact" className="font-medium text-blue-600 hover:text-blue-700">
                Contact us
              </Link>{" "}
              for assistance.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
