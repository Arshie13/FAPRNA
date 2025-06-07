"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Users, DollarSign } from "lucide-react"
import Image from "next/image"
import { newEvent, eventDetails } from "@/app/mock_data/index"

export default function EventRegistration() {
  return (
    <div className="relative min-h-screen">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-blue-100 to-orange-200">
        {/* Decorative circles */}
        <div className="absolute top-20 left-10 h-32 w-32 rounded-full bg-blue-300/40 blur-xl"></div>
        <div className="absolute top-40 right-20 h-24 w-24 rounded-full bg-purple-300/50 blur-lg"></div>
        <div className="absolute bottom-40 left-1/4 h-40 w-40 rounded-full bg-blue-400/30 blur-2xl"></div>
        <div className="absolute bottom-20 right-1/3 h-28 w-28 rounded-full bg-purple-400/40 blur-xl"></div>

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <section className="relative w-full py-16">
        <div className="container mx-auto px-4">
          {/* Header with enhanced styling */}
          <div className="mb-12 text-center">
            <div className="relative inline-block">
              <p className="mb-2 text-sm uppercase tracking-wider text-gray-500 relative z-10">FAPRNA News</p>
              <div className="absolute -top-2 -left-4 h-8 w-8 rounded-full bg-blue-200/30 blur-sm"></div>
            </div>
            <h1 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl relative">
              What&apos;s Happening at Our Association
            </h1>
          </div>

          <div className="mx-auto max-w-2xl">
            <div className="mb-8 text-center">
              <div className="relative inline-block">
                <h1 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl relative z-10">NEW EVENT</h1>
                {/* Decorative background for "NEW EVENT" */}
                <div className="absolute inset-0 -m-4 rounded-2xl bg-gradient-to-r from-blue-100/50 to-purple-100/50 blur-sm"></div>
              </div>
            </div>

            {newEvent && (
              <Card className="overflow-hidden border-0 shadow-2xl relative backdrop-blur-sm bg-white/95">
                {/* Card glow effect */}
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-200 to-purple-200 opacity-20 blur-sm"></div>

                <div className="relative">
                  <div className="aspect-[4/3] w-full overflow-hidden md:aspect-[16/10] flex items-center justify-center">
                    <Image
                      src={newEvent.images[0] || "/placeholder.svg"}
                      alt={newEvent.title}
                      width={500}
                      height={500}
                      className="object-cover object-center"
                      priority
                    />
                    <div className="absolute inset-0 bg-black/10" />
                  </div>
                </div>

                <CardContent className="p-8 relative">
                  <div className="mb-8 text-center">
                    <h3 className="mb-2 text-2xl font-bold text-blue-600">{newEvent.date}</h3>
                    <p className="text-gray-600">
                      {newEvent.location} {newEvent.address}
                    </p>
                  </div>

                  <div className="mb-8 grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50/50">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="font-medium">Date & Time</div>
                          <div className="text-sm text-gray-600">
                            {newEvent.date} • {newEvent.time}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-50/50">
                        <MapPin className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="font-medium">Location</div>
                          <div className="text-sm text-gray-600">{newEvent.location}</div>
                          <div className="text-sm text-gray-600">{newEvent.address}</div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50/50">
                        <Users className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="font-medium">Continuing Education</div>
                          <div className="text-sm text-gray-600">{newEvent.ceus} CEUs Available</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-50/50">
                        <DollarSign className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="font-medium">Registration Fee</div>
                          <div className="text-sm text-gray-600">Free for Members & Students</div>
                          <div className="text-sm text-gray-600">$25 for Non-Members</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-6 border border-blue-100/50">
                    <h4 className="mb-3 text-lg font-bold text-blue-800">Event Description</h4>
                    <p className="text-gray-700">{newEvent.description}</p>
                  </div>

                  <div className="text-center">
                    <Link
                      href={`/event-registration/details/${newEvent.title.split(" ").join("")}`}
                      className="inline-block"
                    >
                      <Button className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-12 py-6 text-lg font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-xl hover:scale-105">
                        CLICK TO LEARN MORE →
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="mx-auto max-w-4xl">
            {eventDetails && (
              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {eventDetails.map((event, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden border-0 shadow-lg flex flex-col h-full relative backdrop-blur-sm bg-white/90 hover:bg-white/95 transition-all duration-300 hover:shadow-xl hover:scale-105"
                  >
                    {/* Individual card glow */}
                    <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 opacity-0 hover:opacity-30 transition-opacity duration-300 blur-sm"></div>

                    <div className="relative">
                      <div className="aspect-[4/3] w-full overflow-hidden md:aspect-[16/10] flex items-center justify-center">
                        <Image
                          src={event.images[0] || "/placeholder.svg"}
                          alt={event.title}
                          width={500}
                          height={500}
                          className="object-cover object-center transition-transform duration-300 hover:scale-110"
                          priority
                        />
                        <div className="absolute inset-0 bg-black/10" />
                      </div>
                    </div>

                    <CardContent className="p-6 flex flex-col flex-1 relative">
                      <h3 className="mb-2 text-xl font-bold text-blue-600">{event.title}</h3>
                      <p className="text-gray-600 mb-4">
                        {event.date} • {event.time}
                      </p>
                      <p className="text-gray-700 mb-4 flex-1">{event.description}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <Link
                          href={`/event-registration/details/${event.title.split(" ").join("")}`}
                          className="text-blue-600 hover:text-purple-600 transition-colors font-medium hover:underline"
                        >
                          Learn More!
                        </Link>
                        <span className="text-sm text-gray-500 bg-blue-50 px-2 py-1 rounded-full">
                          {event.ceus} CEUs
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            <div className="mt-12 text-center">
              <div className="relative inline-block p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-blue-100/50">
                <p className="text-gray-600">
                  Questions about registration?{" "}
                  <Link href="/contact" className="font-medium text-blue-600 hover:text-purple-600 transition-colors">
                    Contact us
                  </Link>{" "}
                  for assistance.
                </p>
                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-blue-200/50"></div>
                <div className="absolute -bottom-2 -left-2 h-3 w-3 rounded-full bg-purple-200/50"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
