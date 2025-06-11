"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Users, DollarSign, Clock, Award, ArrowRight } from "lucide-react"
import Image from "next/image"
import { newEvent, eventDetails } from "@/app/mock_data/index"

export default function EventRegistration() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-600/20 border border-blue-400/30 text-blue-200 text-sm font-medium mb-8">
              <Calendar className="w-4 h-4 mr-2" />
              FAPRNA-NV EVENTS
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Professional Development
              <span className="block text-blue-300">& Networking Events</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Advance your nursing career through exclusive educational opportunities, networking sessions, and
              professional development programs designed for Filipino-American advanced practice nurses.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Event Section */}
      {newEvent && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm font-semibold mb-6">
                <Award className="w-4 h-4 mr-2" />
                FEATURED EVENT
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{newEvent.title}</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Don&apos;t miss our signature professional development event of the year
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <Card className="overflow-hidden border-0 shadow-2xl bg-white">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Image Section */}
                  <div className="relative h-80 lg:h-auto">
                    <Image
                      src={newEvent.images[0] || "/placeholder.svg"}
                      alt={newEvent.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  {/* Content Section */}
                  <CardContent className="p-8 lg:p-12">
                    <div className="mb-8">
                      <div className="flex items-center text-blue-600 font-semibold mb-2">
                        <Calendar className="w-5 h-5 mr-2" />
                        {newEvent.date}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{newEvent.title}</h3>
                      <p className="text-gray-600 leading-relaxed mb-6">{newEvent.description}</p>
                    </div>

                    {/* Event Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <Clock className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-900">Time</div>
                            <div className="text-gray-600">{newEvent.time}</div>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <MapPin className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-900">Location</div>
                            <div className="text-gray-600">{newEvent.location}</div>
                            <div className="text-gray-500 text-sm">{newEvent.address}</div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <Users className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-900">CEUs</div>
                            <div className="text-gray-600">{newEvent.ceus} Credits Available</div>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <DollarSign className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-900">Registration</div>
                            <div className="text-gray-600">Free for Members</div>
                            <div className="text-gray-500 text-sm">$25 for Non-Members</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Link href={`/event-registration/details/${newEvent.title.split(" ").join("")}`}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold rounded-xl transition-all duration-300 group">
                        Register Now
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Events Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive calendar of professional development opportunities
            </p>
          </div>

          {eventDetails && (
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {eventDetails.map((event, index) => (
                  <Card
                    key={index}
                    className="group overflow-hidden border border-gray-200 hover:border-blue-300 shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={event.images[0] || "/placeholder.svg"}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {event.ceus} CEUs
                        </span>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="mb-6">
                        <div className="text-blue-600 font-semibold text-sm mb-2">
                          {event.date} • {event.time}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-4">{event.description}</p>
                        <div className="text-gray-500 text-sm flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {event.location}
                        </div>
                      </div>

                      <Link href={`/event-registration/details/${event.title.split(" ").join("")}`}>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 font-semibold rounded-lg transition-all duration-300 group">
                          Learn More & Register
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Stay Connected with FAPRNA-NV</h2>
            <p className="text-xl mb-8 opacity-90">
              Never miss an opportunity for professional growth. Subscribe to our newsletter for event updates,
              continuing education opportunities, and community news.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/membership">
                <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300">
                  Become a Member
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
