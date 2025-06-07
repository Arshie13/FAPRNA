import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Users, DollarSign } from "lucide-react"
import Image from "next/image"

const newEvent = {
  title: "Maternal and Child Health Event",
  date: "March 2, 2024",
  time: "8:00 AM - 3:00 PM",
  location: "Chairman's Auditorium at Optum",
  address: "2716 N Tenaya Way, Las Vegas NV 89129",
  description: "Join us for a comprehensive educational session focused on maternal and child health. This event will cover best practices, current research, and practical applications in maternal and pediatric care. Perfect for advanced practice nurses looking to enhance their knowledge and earn continuing education credits.",
  ceus: 6,
  images: ['/maternal_and_child_health.png'],
}

const eventDetails = [
  {
    title: "Wellness Workshop",
    date: "April 15, 2024",
    time: "10:00 AM - 1:00 PM",
    location: "Sunrise Hospital Conference Room",
    address: "3186 S Maryland Pkwy, Las Vegas NV 89109",
    description: "A half-day workshop focused on nurse well-being, stress reduction, and work-life balance techniques. Learn mindfulness practices and participate in interactive sessions designed to rejuvenate your professional practice.",
    ceus: 3,
    images: ['/nurse_wellness_workshop.png'],
  },
  {
    title: "Continuing Education Symposium",
    date: "May 10, 2024",
    time: "9:00 AM - 4:00 PM",
    location: "UNLV School of Nursing",
    address: "4505 S Maryland Pkwy, Las Vegas NV 89154",
    description: "This all-day symposium will feature expert-led sessions on chronic disease management, telehealth innovations, and evidence-based nursing interventions. Includes networking lunch and CEU certification.",
    ceus: 7,
    images: ['/continuing_education_symposium.png'],
  },
  {
    title: "Community Health Outreach",
    date: "June 5, 2024",
    time: "11:00 AM - 3:00 PM",
    location: "Doolittle Community Center",
    address: "1950 N J St, Las Vegas NV 89106",
    description: "A collaborative event where nurses engage with the local community to provide health screenings, education, and resources. Ideal for those interested in community-based practice and public health impact.",
    ceus: 4,
    images: ['/community_health_outreach.png'],
  },
  {
    title: "Leadership in Nursing Seminar",
    date: "July 20, 2024",
    time: "1:00 PM - 5:00 PM",
    location: "Spring Valley Hospital - Education Hall",
    address: "5400 S Rainbow Blvd, Las Vegas NV 89118",
    description: "Develop leadership skills and explore new strategies for managing clinical teams, improving patient outcomes, and navigating healthcare policy. Great for RNs aspiring to managerial roles.",
    ceus: 5,
    images: ['/leadership_in_nursing.png'],
  },
]


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

          {newEvent && (
            <Card className="overflow-hidden border-0 shadow-2xl">
              <div className="relative">
                <div className="aspect-[4/3] w-full overflow-hidden md:aspect-[16/10] flex items-center justify-center">
                  <Image
                    src={newEvent.images[0]}
                    alt={newEvent.title}
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
                  <h3 className="mb-2 text-2xl font-bold text-blue-600">{newEvent.date}</h3>
                  <p className="text-gray-600">{newEvent.location} {newEvent.address}</p>
                </div>

                <div className="mb-8 grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-medium">Date & Time</div>
                        <div className="text-sm text-gray-600">{newEvent.date} • {newEvent.time}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-medium">Location</div>
                        <div className="text-sm text-gray-600">{newEvent.location}</div>
                        <div className="text-sm text-gray-600">{newEvent.address}</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-medium">Continuing Education</div>
                        <div className="text-sm text-gray-600">{newEvent.ceus} CEUs Available</div>
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
                    {newEvent.description}
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
          )}

          {eventDetails && (
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {eventDetails.map((event, index) => (
                <Card key={index} className="overflow-hidden border-0 shadow-lg flex flex-col h-full">
                  <div className="relative">
                    <div className="aspect-[4/3] w-full overflow-hidden md:aspect-[16/10] flex items-center justify-center">
                      <Image
                        src={event.images[0]}
                        alt={event.title}
                        width={500}
                        height={500}
                        className="object-cover object-center"
                        priority
                      />
                      <div className="absolute inset-0 bg-black/10" />
                    </div>
                  </div>

                  <CardContent className="p-6 flex flex-col flex-1">
                    <h3 className="mb-2 text-xl font-bold text-blue-600">{event.title}</h3>
                    <p className="text-gray-600 mb-4">{event.date} • {event.time}</p>
                    <p className="text-gray-700 mb-4 flex-1">{event.description}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <Link href="/register" className="text-blue-600 hover:underline">Register Now</Link>
                      <span className="text-sm text-gray-500">{event.ceus} CEUs</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

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
