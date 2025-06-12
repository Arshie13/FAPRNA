"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Check, Users, Award, Clock } from "lucide-react"


export default function Component() {
  const membershipUrl =
    "https://www.zeffy.com/en-US/ticketing/449e228b-aeae-4517-b5d5-a939b97530e0?fbclid=IwY2xjawKvL7RleHRuA2FlbQIxMABicmlkETF2bXBvOTdlUm9SY3ZUSDNFAR7mWEb-FEnnAzHoJI5TPFFG5SyOhIUh1vB0kortICqY8L2DSbOdU8EAkTgLLA_aem_jbBbTgmjcw80epKBfnPsow"

  const membershipPlans = [
    {
      id: "retired",
      name: "Membership Retired NP",
      price: "$50",
      period: "Renews yearly",
      description: "Perfect for retired nursing professionals who want to stay connected",
      features: [
        "Access to FAPRNA community",
        "Newsletter and updates",
        "Networking opportunities",
        "Continuing education resources",
        "Member directory access",
      ],
      icon: <Clock className="w-6 h-6" />,
      popular: false,
      color: "from-emerald-500 to-teal-600",
    },
    {
      id: "1year",
      name: "Membership 1 year Practicing NP",
      price: "$100",
      period: "Renews yearly",
      description: "Ideal for practicing nurse practitioners seeking professional growth",
      features: [
        "All Retired NP benefits",
        "Professional development workshops",
        "Certification maintenance support",
        "Career advancement resources",
        "Mentorship opportunities",
        "Conference discounts",
      ],
      icon: <Users className="w-6 h-6" />,
      popular: true,
      color: "from-blue-500 to-indigo-600",
    },
    {
      id: "2year",
      name: "Membership 2 years Practicing NP",
      price: "$175",
      period: "Renews yearly",
      description: "Best value for committed professionals with extended benefits",
      features: [
        "All 1-year membership benefits",
        "Extended networking access",
        "Priority event registration",
        "Leadership development programs",
        "Research collaboration opportunities",
        "Advanced certification pathways",
        "Exclusive member events",
      ],
      icon: <Award className="w-6 h-6" />,
      popular: false,
      color: "from-purple-500 to-violet-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">


      {/* Main Content */}
      <main className="py-16 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-transparent to-red-100/20 pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent mb-6">
              Join Our Community
            </h1>
            <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
              Become a member of the Filipino-American Advanced Practice Registered Nurses Association and unlock
              exclusive benefits that support your professional journey.
            </p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Your membership grants you access to exclusive benefits and directly supports our mission. 🎯
            </p>
          </div>

          {/* Membership Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 ">
            {membershipPlans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 ${
                  plan.popular ? "ring-4 ring-blue-500 ring-opacity-50" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0">
                    <div className="bg-blue-500 text-white text-center py-2 text-sm font-semibold">Most Popular</div>
                  </div>
                )}

                <CardHeader className={`bg-gradient-to-r ${plan.color} text-white ${plan.popular ? "pt-12" : "pt-6"}`}>
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      {plan.icon}
                    </div>
                  </div>
                  <CardTitle className="text-center text-xl font-bold mb-2">{plan.name}</CardTitle>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-1">{plan.price}</div>
                    <div className="text-white/80 text-sm">{plan.period}</div>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <p className="text-gray-600 text-center mb-6">{plan.description}</p>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    className={`w-full bg-gradient-to-r ${plan.color} text-white py-3 px-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    <a href={membershipUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Join Now
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-blue-500">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 text-sm">💡</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Did you know? We fundraise with Zeffy</h3>
                <p className="text-gray-600">
                  We use Zeffy to ensure 100% of your membership fee goes directly to our mission and programs. No
                  hidden fees, no processing charges - your full contribution supports Filipino-American advanced
                  practice nurses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  )
}
