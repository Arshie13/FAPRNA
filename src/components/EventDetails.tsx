import { eventDetails } from "@/app/mock_data";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Users, DollarSign } from "lucide-react";

const eventDetail = eventDetails[0];

export default function EventDetails() {
  return (
    eventDetail && (
      <section className="w-full bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">Event Details</h1>
          </div>
          <Card className="overflow-hidden border-0 shadow-2xl max-w-4xl mx-auto">
            <div className="relative">
              <div className="aspect-[4/3] w-full overflow-hidden md:aspect-[16/10] flex items-center justify-center">
                <Image
                  src={eventDetail.images[0]}
                  alt={eventDetail.title}
                  width={320}
                  height={240}
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>
            </div>

            <CardContent className="p-6">
              <div className="mb-8 text-center">
                <h3 className="mb-2 text-2xl font-bold text-blue-600">{eventDetail.date}</h3>
                <p className="text-gray-600">{eventDetail.location} {eventDetail.address}</p>
              </div>

              <div className="mb-8 grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Date & Time</div>
                      <div className="text-sm text-gray-600">{eventDetail.date} • {eventDetail.time}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Location</div>
                      <div className="text-sm text-gray-600">{eventDetail.location}</div>
                      <div className="text-sm text-gray-600">{eventDetail.address
                      }</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Expected Attendees</div>
                      <div className="text-sm text-gray-600">100+ Nurses</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">CEUs Offered</div>
                      <div className="text-sm text-gray-600">{eventDetail.ceus} CEUs</div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-700">{eventDetail.description}</p>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  )
}