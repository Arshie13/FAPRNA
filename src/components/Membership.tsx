"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Check, Users, Award, Clock, QrCode, Mail, Phone, User, ArrowRight } from "lucide-react"
import type React from "react"
import { useRef, useState } from "react"
import Image from "next/image"

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
      color: "from-yellow-300 to-yellow-500",
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
      color: "from-rose-500 to-rose-600",
    },
  ]

  const [current, setCurrent] = useState(0)
  const [selectedPlan, setSelectedPlan] = useState<(typeof membershipPlans)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    verificationCode: "",
  })
  const [isVerificationSent, setIsVerificationSent] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }
  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current
      if (Math.abs(diff) > 50) {
        if (diff > 0 && current < membershipPlans.length - 1) {
          setCurrent(current + 1)
        } else if (diff < 0 && current > 0) {
          setCurrent(current - 1)
        }
      }
    }
    touchStartX.current = null
    touchEndX.current = null
  }

  const handleJoinNow = (plan: (typeof membershipPlans)[0]) => {
    setSelectedPlan(plan)
    setIsModalOpen(true)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSendVerification = async () => {
    if (formData.email) {
      // Simulate sending verification code
      setIsVerificationSent(true)
      // In a real app, you would call your email service here
      console.log("Sending verification code to:", formData.email)
    }
  }

  const handleVerifyCode = () => {
    // Simulate code verification
    if (formData.verificationCode === "123456" || formData.verificationCode.length >= 4) {
      setIsVerified(true)
    }
  }

  const handlePayNow = () => {
    // Redirect to Zeffy with the selected plan
    window.open(membershipUrl, "_blank")
    setIsModalOpen(false)
    // Reset form
    setFormData({ name: "", email: "", phone: "", verificationCode: "" })
    setIsVerificationSent(false)
    setIsVerified(false)
  }

  const JoinNowButton = ({ plan }: { plan: (typeof membershipPlans)[0] }) => (
    <Button
      onClick={() => handleJoinNow(plan)}
      className={`w-full bg-gradient-to-r ${plan.color} text-white py-3 px-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
    >
      <ExternalLink className="w-5 h-5 mr-2" />
      Join Now
    </Button>
  )

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
          {/* Mobile carousel */}
          <div className="block md:hidden mb-16">
            <div
              className="relative w-full overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex transition-transform duration-300"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {membershipPlans.map((plan) => (
                  <div key={plan.id} className="min-w-full px-2">
                    <Card
                      className={`relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 ${
                        plan.popular ? "ring-4 ring-blue-500 ring-opacity-50" : ""
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute top-0 left-0 right-0">
                          <div className="bg-blue-500 text-white text-center py-2 text-sm font-semibold">
                            Most Popular
                          </div>
                        </div>
                      )}
                      <CardHeader
                        className={`bg-gradient-to-r ${plan.color} text-white ${plan.popular ? "pt-12" : "pt-6"}`}
                      >
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
                        <JoinNowButton plan={plan} />
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
              {/* Carousel navigation dots */}
              <div className="flex justify-center mt-4 gap-2">
                {membershipPlans.map((_, idx) => (
                  <button
                    key={idx}
                    className={`h-2 w-2 rounded-full ${current === idx ? "bg-[#003366]" : "bg-gray-300"}`}
                    onClick={() => setCurrent(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Desktop/tablet grid */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
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
                  <JoinNowButton plan={plan} />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Registration Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              {/* Backdrop */}
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />

              {/* Modal Content */}
              <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b px-6 py-4 rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">Complete Your Registration</h2>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  {selectedPlan && (
                    <div className="mt-2">
                      <Badge className={`bg-gradient-to-r ${selectedPlan.color} text-white`}>
                        {selectedPlan.name} - {selectedPlan.price}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Modal Body */}
                <div className="px-6 py-4 space-y-6">
                  {/* Registration Form */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email Address
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="Enter your email"
                          required
                          className="flex-1"
                        />
                        {!isVerificationSent && (
                          <Button
                            onClick={handleSendVerification}
                            disabled={!formData.email}
                            size="sm"
                            variant="outline"
                          >
                            Send Code
                          </Button>
                        )}
                      </div>
                    </div>

                    {isVerificationSent && !isVerified && (
                      <div className="space-y-2">
                        <Label htmlFor="verification" className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Email Verification Code
                        </Label>
                        <div className="flex gap-2">
                          <Input
                            id="verification"
                            value={formData.verificationCode}
                            onChange={(e) => handleInputChange("verificationCode", e.target.value)}
                            placeholder="Enter verification code"
                            className="flex-1"
                          />
                          <Button onClick={handleVerifyCode} disabled={!formData.verificationCode} size="sm">
                            Verify
                          </Button>
                        </div>
                        <p className="text-sm text-gray-500">Check your email for the verification code</p>
                      </div>
                    )}

                    {isVerified && (
                      <div className="flex items-center gap-2 text-green-600 text-sm">
                        <Check className="w-4 h-4" />
                        Email verified successfully!
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* QR Code Section */}
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="font-semibold mb-2 flex items-center justify-center gap-2">
                        <QrCode className="w-5 h-5" />
                        FAPRNA Membership QR Code
                      </h3>
                      <div className="flex justify-center mb-4">
                        <div className="bg-white p-4 rounded-lg shadow-md">
                          <Image
                            src="/faprna-reg.jpg"
                            alt="FAPRNA Membership QR Code"
                            width={200}
                            height={200}
                            className="mx-auto"
                          />
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        Scan this QR code for quick access to membership information
                      </p>
                    </div>
                  </div>

                  <Separator />

                  {/* Payment Instructions */}
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h3 className="font-semibold text-blue-900 mb-2">Next Steps:</h3>
                      <ol className="text-sm text-blue-800 space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                            1
                          </span>
                          Complete this registration form
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                            2
                          </span>
                          Click &quot;Pay Now to go to Zeffy&quot;
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                            3
                          </span>
                          Select the <strong>{selectedPlan?.name}</strong> plan on Zeffy
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                            4
                          </span>
                          Complete your payment to finalize registration
                        </li>
                      </ol>
                    </div>

                    <Button
                      onClick={handlePayNow}
                      disabled={!formData.name || !formData.email || !formData.phone || !isVerified}
                      className={`w-full bg-gradient-to-r ${selectedPlan?.color || "from-blue-500 to-indigo-600"} text-white py-3 text-lg font-semibold`}
                    >
                      <ArrowRight className="w-5 h-5 mr-2" />
                      Pay Now on Zeffy
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      You will be redirected to Zeffy to complete your payment. Make sure to select the same membership
                      plan you chose here.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

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
