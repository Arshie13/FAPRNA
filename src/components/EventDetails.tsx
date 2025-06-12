import { eventDetails } from "@/mock_data"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, DollarSign, Award, CheckCircle, Star } from "lucide-react"
import Link from "next/link"


const eventDetail = eventDetails[0]

export default function EventDetails() {
  return (
    eventDetail && (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>
          </div>

          <div className="relative container mx-auto px-4 py-16">


            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-600/20 border border-red-400/30 text-red-200 text-sm font-medium mb-8">
                <Award className="w-4 h-4 mr-2" />
                EVENT DETAILS
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{eventDetail.title}</h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Join us for an exceptional professional development experience designed to advance your nursing career
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Event Image */}
                  <Card className="overflow-hidden border-0 shadow-2xl">
                    <div className="relative h-80">
                      <Image
                        src={eventDetail.images[0] || "/placeholder.svg"}
                        alt={eventDetail.title}
                        fill
                        className="object-cover"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <div className="absolute top-6 right-6">
                        <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                          {eventDetail.ceus} CEUs Available
                        </span>
                      </div>
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                          <h2 className="text-xl font-bold text-gray-900 mb-2">{eventDetail.title}</h2>
                          <div className="flex items-center text-blue-600 font-semibold">
                            <Calendar className="w-4 h-4 mr-2" />
                            {eventDetail.date} • {eventDetail.time}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Event Description */}
                  <Card className="border-0 shadow-xl bg-white">
                    <CardContent className="p-8">
                      <div className="mb-8">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                            <Award className="w-6 h-6 text-white" />
                          </div>
                          <h2 className="text-2xl font-bold text-gray-900">About This Event</h2>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
                          <p className="text-gray-700 leading-relaxed text-lg">{eventDetail.description}</p>
                        </div>
                      </div>

                      {/* Event Highlights */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
                          <div className="flex items-center mb-3">
                            <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                            <h3 className="font-bold text-green-800">Professional Development</h3>
                          </div>
                          <p className="text-green-700 text-sm">Enhance your skills with expert-led sessions</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg p-6 border border-purple-200">
                          <div className="flex items-center mb-3">
                            <Users className="w-6 h-6 text-purple-600 mr-2" />
                            <h3 className="font-bold text-purple-800">Networking Opportunities</h3>
                          </div>
                          <p className="text-purple-700 text-sm">Connect with 100+ nursing professionals</p>
                        </div>
                        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-6 border border-orange-200">
                          <div className="flex items-center mb-3">
                            <Award className="w-6 h-6 text-orange-600 mr-2" />
                            <h3 className="font-bold text-orange-800">CEU Credits</h3>
                          </div>
                          <p className="text-orange-700 text-sm">
                            Earn {eventDetail.ceus} continuing education credits
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200">
                          <div className="flex items-center mb-3">
                            <Star className="w-6 h-6 text-blue-600 mr-2" />
                            <h3 className="font-bold text-blue-800">Expert Speakers</h3>
                          </div>
                          <p className="text-blue-700 text-sm">Learn from industry-leading professionals</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Event Details Card */}
                  <Card className="border-0 shadow-xl sticky top-6 bg-white">
                    <CardContent className="p-8">
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Calendar className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Event Information</h3>
                      </div>

                      <div className="space-y-6">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-start">
                            <Calendar className="w-6 h-6 text-blue-600 mr-4 mt-1" />
                            <div>
                              <div className="font-semibold text-gray-900 text-lg">{eventDetail.date}</div>
                              <div className="text-gray-600">{eventDetail.time}</div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-start">
                            <MapPin className="w-6 h-6 text-blue-600 mr-4 mt-1" />
                            <div>
                              <div className="font-semibold text-gray-900">{eventDetail.location}</div>
                              <div className="text-gray-600">{eventDetail.address}</div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-start">
                            <Users className="w-6 h-6 text-blue-600 mr-4 mt-1" />
                            <div>
                              <div className="font-semibold text-gray-900">Expected Attendance</div>
                              <div className="text-gray-600">100+ Nursing Professionals</div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                          <div className="flex items-start">
                            <DollarSign className="w-6 h-6 text-green-600 mr-4 mt-1" />
                            <div>
                              <div className="font-semibold text-green-800">Registration Fee</div>
                              <div className="text-green-600 font-medium">Free for FAPRNA Members</div>
                              <div className="text-gray-600">$25 for Non-Members</div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
                          <div className="flex items-start">
                            <Award className="w-6 h-6 text-blue-600 mr-4 mt-1" />
                            <div>
                              <div className="font-semibold text-blue-800">CEUs Available</div>
                              <div className="text-blue-600 font-medium">
                                {eventDetail.ceus} Continuing Education Credits
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 pt-6 border-t border-gray-200">
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white py-4 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl mb-4">
                          Register Now
                        </Button>
                        <p className="text-center text-sm text-gray-500">
                          Registration closes 48 hours before the event
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Member Benefits Card */}
                  <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-red-50">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Star className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Not a Member Yet?</h3>
                        <p className="text-gray-600 text-sm mb-4">
                          Join FAPRNA-NV and get free access to all events plus exclusive member benefits.
                        </p>
                        <Link href="/membership">
                          <Button
                            variant="outline"
                            className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
                          >
                            Learn About Membership
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  )
}
