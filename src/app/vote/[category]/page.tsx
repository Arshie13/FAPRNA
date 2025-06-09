"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Vote } from "lucide-react"
import Link from "next/link"
import { use } from "react"

interface VotePageProps {
  params: Promise<{ category: string }>
}

export default function VotePage({ params }: VotePageProps) {
  const { category } = use(params)

  const categoryTitle = category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Button asChild variant="outline" className="mb-4">
            <Link href="/luminance">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Awards
            </Link>
          </Button>
        </div>

        <Card className="bg-gradient-to-br from-white to-blue-50 shadow-xl border-2 border-blue-200">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Vote className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Vote for {categoryTitle}</h1>
              <p className="text-gray-600">Cast your vote for the most deserving candidate in this category</p>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Voting Form</h3>
              <p className="text-blue-700">
                Voting form for <strong>{categoryTitle}</strong> will be implemented here. This component will contain
                the specific voting interface for this category.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
