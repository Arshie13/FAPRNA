"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Send, Award, Star } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const categories = [
  {
    id: "intentionality",
    title: "ADVANCEMENT OF INTENTIONALITY",
    description:
      "An APRN people in fields and specialization who demonstrates clear direction and projection of career ladder including but not limited to Academia.",
    icon: <Star className="w-5 h-5" />,
  },
  {
    id: "inquiry",
    title: "ADVANCEMENT IN INQUIRY",
    description:
      "An APRN who excels in knowledge discovery, utilization and implementation including but not limited to research and evidence based practice.",
    icon: <Star className="w-5 h-5" />,
  },
  {
    id: "impact",
    title: "ADVANCEMENT WITH IMPACT",
    description:
      "An APRN who excels in any fields of specialization leading to change in practice, knowledge and policy, creating a novel advancement in overall outcome in advance practice nursing discipline and beyond.",
    icon: <Award className="w-5 h-5" />,
  },
]

// Star component for decorative elements
const AmberStar = ({ className = "", size = 4 }: { className?: string; size?: number }) => (
  <div
    className={`absolute w-${size} h-${size} bg-amber-300 rotate-45 transform animate-twinkle ${className}`}
    style={{
      clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
    }}
  ></div>
)

export default function VotingForm() {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [formData, setFormData] = useState({
    nomineeName: "",
    nomineeTitle: "",
    nomineeAddress: "",
    nomineeEmail: "",
    nomineePhone: "",
    nominatorName: "",
    nominatorEmail: "",
    nominatorPhone: "",
    reason: "",
    agreeTerms: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", { selectedCategory, ...formData })
    alert(
      "Thank you for your nomination! Your submission has been received and will be reviewed by our awards committee.",
    )
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Amber wave decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-1/2 h-full border-r border-amber-500/20 border-dashed"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full border-l border-amber-500/20 border-dashed"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-amber-radial"></div>
          <div className="absolute bottom-40 right-20 w-80 h-80 rounded-full bg-amber-radial"></div>
        </div>

        {/* Amber wave lines */}
        <div className="absolute top-0 left-0 w-full h-full">
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
            <path
              d="M0,100 C300,150 500,50 1200,100 L1200,0 L0,0 Z"
              fill="none"
              stroke="#f59e42"
              strokeWidth="1"
              strokeOpacity="0.3"
            />
            <path
              d="M0,200 C300,250 700,150 1200,200 L1200,0 L0,0 Z"
              fill="none"
              stroke="#f59e42"
              strokeWidth="1"
              strokeOpacity="0.2"
            />
            <path
              d="M0,300 C200,350 600,250 1200,300 L1200,0 L0,0 Z"
              fill="none"
              stroke="#f59e42"
              strokeWidth="1"
              strokeOpacity="0.1"
            />
          </svg>
        </div>

        {/* Stars */}
        <AmberStar className="top-20 left-[10%]" size={4} />
        <AmberStar className="top-40 right-[15%]" size={3} />
        <AmberStar className="bottom-32 left-[20%]" size={5} />
        <AmberStar className="bottom-60 right-[25%]" size={4} />
        <AmberStar className="top-80 left-[30%]" size={3} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16">
        <div className="mb-8 flex justify-between items-center">
          <Button
            asChild
            variant="outline"
            className="border-amber-500 text-amber-500 hover:bg-amber-500/10 transition-colors"
          >
            <Link href="/luminance?noTransition=true">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Awards
            </Link>
          </Button>

          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-black font-bold text-sm">FAPRNA</span>
            </div>
          </div>
        </div>

        <Card className="bg-black border border-amber-500/30 shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black text-center relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.2)_0%,_rgba(0,0,0,0)_70%)]"></div>
            <div className="relative z-10">
              <CardTitle className="text-3xl font-serif tracking-wide">LUMINANCE AWARDS NOMINATION</CardTitle>
              <p className="text-black/80 italic mt-2">Please fill out this form to nominate for an award</p>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Category Selection */}
              <div className="space-y-4">
                <Label className="text-xl font-serif text-amber-500 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-amber-500" />
                  1. Choose the Award Category
                </Label>
                <RadioGroup value={selectedCategory} onValueChange={setSelectedCategory}>
                  {categories.map((category) => (
                    <div key={category.id} className="relative">
                      <div
                        className={`p-4 rounded-lg border transition-all duration-300 ${
                          selectedCategory === category.id
                            ? "border-amber-500 bg-amber-500/10"
                            : "border-gray-800 bg-black/50 hover:border-amber-500/50"
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <RadioGroupItem
                            value={category.id}
                            id={category.id}
                            className={
                              selectedCategory === category.id ? "border-amber-500 text-amber-500" : "border-gray-600"
                            }
                          />
                          <div className="flex-1">
                            <Label
                              htmlFor={category.id}
                              className={`font-semibold text-lg flex items-center cursor-pointer ${
                                selectedCategory === category.id ? "text-amber-500" : "text-gray-300"
                              }`}
                            >
                              <span className="mr-2 text-amber-500">{category.icon}</span>
                              {category.title}
                            </Label>
                            <p
                              className={`text-sm mt-2 ${
                                selectedCategory === category.id ? "text-amber-300" : "text-gray-500"
                              }`}
                            >
                              {category.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Reason Section */}
              <div className="space-y-4 p-6 bg-black/50 rounded-lg border border-amber-500/20">
                <Label className="text-xl font-serif text-amber-500 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-amber-500" />
                  Reason for Nomination
                </Label>
                <Textarea
                  placeholder="In 300 words explain why this nominee deserves this award in this field..."
                  value={formData.reason}
                  onChange={(e) => handleInputChange("reason", e.target.value)}
                  className="min-h-32 bg-black border-amber-500/30 text-white placeholder-gray-500 focus:border-amber-500 focus:ring-amber-500/20"
                  maxLength={300}
                />
                <p className="text-sm text-amber-500/80 text-right">{formData.reason.length}/300 words</p>
              </div>

              {/* Nominee Information */}
              <div className="space-y-4 p-6 bg-black/50 rounded-lg border border-amber-500/20">
                <h3 className="text-xl font-serif text-amber-500 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-amber-500" />
                  2. Nominee&apos;s Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nomineeName" className="text-gray-300">
                      Nominee&apos;s Name (First and Last Name)
                    </Label>
                    <Input
                      id="nomineeName"
                      value={formData.nomineeName}
                      onChange={(e) => handleInputChange("nomineeName", e.target.value)}
                      className="bg-black border-amber-500/30 text-white focus:border-amber-500 focus:ring-amber-500/20"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="nomineeTitle" className="text-gray-300">
                      Title
                    </Label>
                    <Input
                      id="nomineeTitle"
                      value={formData.nomineeTitle}
                      onChange={(e) => handleInputChange("nomineeTitle", e.target.value)}
                      className="bg-black border-amber-500/30 text-white focus:border-amber-500 focus:ring-amber-500/20"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="nomineeAddress" className="text-gray-300">
                    Address
                  </Label>
                  <Input
                    id="nomineeAddress"
                    value={formData.nomineeAddress}
                    onChange={(e) => handleInputChange("nomineeAddress", e.target.value)}
                    className="bg-black border-amber-500/30 text-white focus:border-amber-500 focus:ring-amber-500/20"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nomineeEmail" className="text-gray-300">
                      E-mail
                    </Label>
                    <Input
                      id="nomineeEmail"
                      type="email"
                      value={formData.nomineeEmail}
                      onChange={(e) => handleInputChange("nomineeEmail", e.target.value)}
                      className="bg-black border-amber-500/30 text-white focus:border-amber-500 focus:ring-amber-500/20"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="nomineePhone" className="text-gray-300">
                      Cell Phone Number
                    </Label>
                    <Input
                      id="nomineePhone"
                      type="tel"
                      value={formData.nomineePhone}
                      onChange={(e) => handleInputChange("nomineePhone", e.target.value)}
                      className="bg-black border-amber-500/30 text-white focus:border-amber-500 focus:ring-amber-500/20"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Nominator Information */}
              <div className="space-y-4 p-6 bg-black/50 rounded-lg border border-amber-500/20">
                <h3 className="text-xl font-serif text-amber-500 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-amber-500" />
                  3. Nominator&apos;s Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nominatorName" className="text-gray-300">
                      Your Name
                    </Label>
                    <Input
                      id="nominatorName"
                      value={formData.nominatorName}
                      onChange={(e) => handleInputChange("nominatorName", e.target.value)}
                      className="bg-black border-amber-500/30 text-white focus:border-amber-500 focus:ring-amber-500/20"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="nominatorEmail" className="text-gray-300">
                      Your Email
                    </Label>
                    <Input
                      id="nominatorEmail"
                      type="email"
                      value={formData.nominatorEmail}
                      onChange={(e) => handleInputChange("nominatorEmail", e.target.value)}
                      className="bg-black border-amber-500/30 text-white focus:border-amber-500 focus:ring-amber-500/20"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="nominatorPhone" className="text-gray-300">
                    Your Phone Number
                  </Label>
                  <Input
                    id="nominatorPhone"
                    type="tel"
                    value={formData.nominatorPhone}
                    onChange={(e) => handleInputChange("nominatorPhone", e.target.value)}
                    className="bg-black border-amber-500/30 text-white focus:border-amber-500 focus:ring-amber-500/20"
                    required
                  />
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="flex items-center space-x-3 p-4 bg-black/50 rounded-lg border border-amber-500/20">
                <Checkbox
                  id="agreeTerms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked: boolean) => handleInputChange("agreeTerms", checked)}
                  className="border-amber-500 data-[state=checked]:bg-amber-500 data-[state=checked]:text-black"
                />
                <Label htmlFor="agreeTerms" className="text-gray-300">
                  I agree to the terms and conditions and confirm that all information provided is accurate.
                </Label>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-4">
                <Button
                  type="submit"
                  size="lg"
                  className="px-12 py-4 text-lg bg-amber-500 text-black hover:bg-amber-600 transition-colors shadow-lg shadow-amber-500/20 disabled:bg-gray-700 disabled:text-gray-400"
                  disabled={!selectedCategory || !formData.agreeTerms}
                >
                  <Send className="w-5 h-5 mr-2" />
                  Submit Nomination
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
