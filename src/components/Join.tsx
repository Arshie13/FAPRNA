import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Users, TrendingUp, Award, Network, BookOpen } from "lucide-react"

export default function WhyJoin() {
  const benefitCategories = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Professional Development",
      color: "from-blue-500 to-blue-600",
      benefits: [
        "Develop personal and professional growth",
        "Gain practical experience, career and leadership skills",
        "Improve future career prospects",
        "Expand your resume making you more viable as a job candidate",
      ],
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Networking & Community",
      color: "from-red-500 to-red-600",
      benefits: [
        "Unlimited networking opportunities",
        "Engage with diverse professionals in different fields",
        "Give back to the community",
        "Support and resources in times of need",
      ],
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Industry Influence",
      color: "from-yellow-500 to-yellow-600",
      benefits: [
        "Influence policy affecting nursing at state and national levels",
        "Stay updated on industry trends and legislative rulings",
        "Carry respectability when presenting credentials",
        "Access to continuing education opportunities",
      ],
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Career Advancement",
      color: "from-blue-600 to-indigo-600",
      benefits: [
        "Connect to career boards and scholarship opportunities",
        "Stepping stones into additional career opportunities",
        "Access to continuing education opportunities",
        "Stay current with advances in technology",
      ],
    },
  ]

  // const stats = [
  //   { number: "500+", label: "Active Members" },
  //   { number: "15+", label: "Years of Excellence" },
  //   { number: "100+", label: "Professional Events" },
  //   { number: "50+", label: "Scholarship Recipients" },
  // ]

  return (
    <section className="w-full bg-gradient-to-br from-slate-50 via-blue-50 to-red-50 py-20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mx-auto max-w-4xl text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
            <Network className="w-4 h-4 mr-2" />
            MEMBERSHIP BENEFITS
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Why Join <span className="text-blue-600">FAPRNA-NV</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Advance your nursing career and make a meaningful impact in the Filipino-American healthcare community
          </p>
        </div>

        {/* Stats Section */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div> */}

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {benefitCategories.map((category, index) => (
            <Card
              key={index}
              className="border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 group"
            >
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-r ${category.color} text-white mr-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
                </div>
                <ul className="space-y-4">
                  {category.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 via-red-500 to-yellow-500 p-1 rounded-2xl inline-block mb-6">
            <div className="bg-white rounded-xl px-8 py-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Join Us</h3>
              <p className="text-gray-600 mb-6">
                Join a community of dedicated Filipino-American nursing professionals
              </p>
              <Link href="/join">
                <Button className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white px-12 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <Users className="w-5 h-5 mr-2" />
                  JOIN FAPRNA-NV TODAY
                </Button>
              </Link>
            </div>
          </div>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            By joining FAPRNA-NV, you become part of a prestigious network of advanced practice nurses committed to
            excellence in healthcare and community service.
          </p>
        </div>
      </div>
    </section>
  )
}
