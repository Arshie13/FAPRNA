import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PearlsCard() {
  const pearlsItems = [
    { letter: "P", description: "Professional Advancement" },
    { letter: "E", description: "Educational Opportunities" },
    { letter: "A", description: "Advocacy Endorsements" },
    { letter: "R", description: "Research and Grants" },
    { letter: "L", description: "Leadership Development" },
    { letter: "S", description: "Service to Community" },
  ]

  return (
    <Card className="overflow-hidden w-full border-2 border-[#003366]/10 shadow-lg transition-all hover:shadow-xl">
      <CardHeader className="bg-gradient-to-r from-[#003366] to-[#0056b3] pb-6 text-white">
        <CardTitle className="text-center text-3xl font-bold">P.E.A.R.L.S</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <ul className="space-y-4">
          {pearlsItems.map((item) => (
            <li key={item.letter} className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#003366] text-lg font-bold text-white">
                {item.letter}
              </div>
              <div className="pt-1">
                <span className="font-medium">{item.description}</span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
