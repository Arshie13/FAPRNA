import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import Image from "next/image"

export default function Membership() {
  const eventUrl =
    "https://www.zeffy.com/en-US/ticketing/449e228b-aeae-4517-b5d5-a939b97530e0?fbclid=IwY2xjawKvL7RleHRuA2FlbQIxMABicmlkETF2bXBvOTdlUm9SY3ZUSDNFAR7mWEb-FEnnAzHoJI5TPFFG5SyOhIUh1vB0kortICqY8L2DSbOdU8EAkTgLLA_aem_jbBbTgmjcw80epKBfnPsow"
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-2xl mx-auto">
          {/* Event Registration Section */}
          <div className="mb-8 space-y-6">
            <Card className="p-6 bg-gradient-to-br from-white to-blue-50 shadow-xl border-l-4 border-blue-500">
              <CardContent className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Registration</h3>

                {/* QR Code */}
                <div className="flex justify-center mb-6">
                  <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                    <Image
                      width={192}
                      height={192}
                      src="/faprna-reg.jpg"
                      alt="FAPRNA Membership QR Code"
                      className="w-48 h-48 object-contain"
                    />
                    <p className="text-sm text-gray-600 text-center mt-2 font-medium">FAPRNA Membership</p>
                  </div>
                </div>

                {/* Registration Button */}
                <div className="space-y-4">
                  <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 text-lg">
                    <a href={eventUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Membership Registration
                    </a>
                  </Button>

                  <p className="text-sm text-gray-500">
                    Click the button above or scan the QR code to register as a member
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
