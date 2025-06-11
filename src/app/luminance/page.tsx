"use client"

import LuminanceAwards from "@/components/Luminance"
import PageTransition from "@/components/page-transition"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense } from "react"

function LuminanceContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const noTransition = searchParams.get("noTransition") === "true"

  console.log("transitioning: ", noTransition)

  const handleVote = () => {
    router.push("/vote")
  }

  if (noTransition) {
    return <LuminanceAwards onVote={handleVote} />
  }

  return (
    <PageTransition title="LUMINANCE AWARDS">
      <LuminanceAwards onVote={handleVote} />
    </PageTransition>
  )
}

export default function LuminancePage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <LuminanceContent />
    </Suspense>
  )
}
