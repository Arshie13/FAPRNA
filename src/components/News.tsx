import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Award } from "lucide-react"
import Image from "next/image"

export default function FaprnaNews() {
  const newsItems = [
    {
      id: 1,
      type: "event",
      date: "MARCH 2, 2024",
      time: "8 am - 3pm",
      title: "Maternal and Child Health",
      subtitle: "GET IT RIGHT FROM THE START",
      location: "CHAIRMAN'S AUDITORIUM AT OPTUM",
      address: "2716 N TENAYA WAY, LAS VEGAS, NV 89128",
      ceus: "6 CEUs",
      image: "/placeholder.svg?height=300&width=400",
      bgColor: "bg-blue-500",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      id: 2,
      type: "proclamation",
      title: "Las Vegas Proclamation",
      subtitle: "From the Office of the Mayor",
      description: "Official recognition from the City of Las Vegas for our contributions to healthcare in the community.",
      image: "/placeholder.svg?height=300&width=400",
      bgColor: "bg-orange-500",
      icon: <Award className="h-5 w-5" />,
    },
    {
      id: 3,
      type: "group",
      title: "Board Members & Partners",
      subtitle: "Our Leadership Team",
      description: "Meet our dedicated board members and organizational partners working to advance nursing practice.",
      image: "/placeholder.svg?height=300&width=400",
      bgColor: "bg-yellow-300",
      icon: <Users className="h-5 w-5" />,
    },
  ]

  return (
    <section className="w-full bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm uppercase tracking-wider text-gray-500">FAPRNA-NV News</p>
          <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
            What&apos;s Happening at Our Association
          </h2>
          <p className="text-lg text-gray-600">Monthly meetings and update of scheduled events</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 px-4">
          {newsItems.map((item) => (
            <Card 
              key={item.id} 
              className={`${item.bgColor} group relative overflow-hidden border-0 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
            >
              {/* Image with gradient overlay */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={"/placeholder.png"}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  width={400}
                  height={300}
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent`} />
                
                {/* Top content */}
                <div className="relative z-10 flex h-full flex-col justify-between p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm">
                      {item.icon}
                      <span className="text-xs font-medium uppercase tracking-wide">
                        {item.type === "event" ? "Event" : item.type === "proclamation" ? "Recognition" : "Team"}
                      </span>
                    </div>
                    {item.ceus && (
                      <Badge className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm">
                        {item.ceus}
                      </Badge>
                    )}
                  </div>

                  {/* Event date/time */}
                  <div>
                    {item.date && (
                      <p className="mb-1 text-sm font-medium tracking-wider text-white/90">
                        {item.date}
                      </p>
                    )}
                    {item.time && (
                      <p className="mb-2 text-xs font-medium text-white/80">
                        {item.time}
                      </p>
                    )}
                    <h3 className="text-xl font-bold leading-tight">{item.title}</h3>
                    <p className="text-sm font-medium text-white/90">{item.subtitle}</p>
                  </div>
                </div>
              </div>

              {/* Bottom content */}
              <CardContent className="p-6 bg-white">
                {item.location && (
                  <div className="mb-4">
                    <p className="font-semibold text-gray-800">{item.location}</p>
                    <p className="text-sm text-gray-600">{item.address}</p>
                  </div>
                )}
                {item.description && (
                  <p className="mb-6 text-gray-700 line-clamp-3">
                    {item.description}
                  </p>
                )}
                <div className="mt-auto">
                  <button className="group relative inline-flex items-center text-sm font-semibold text-[#003366] hover:text-[#002244] transition-colors">
                    Learn More
                    <span className="ml-1.5 transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                    <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#003366] transition-all duration-300 group-hover:w-full"></span>
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}