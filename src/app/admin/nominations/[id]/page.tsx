import type { Metadata } from "next"
import NominationDetails from "@/components/admin/nomination-details"
import { getNominationById } from "@/lib/actions/nomination-actions"
import { notFound } from "next/navigation"

interface NominationDetailsPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: NominationDetailsPageProps): Promise<Metadata> {
  const nomination = await getNominationById(params.id)

  if (!nomination) {
    return {
      title: "Nomination Not Found | FAPRNA-NV Admin",
    }
  }

  return {
    title: `Nomination Details | FAPRNA-NV Admin`,
    description: `View nomination details for ${nomination.category}`,
  }
}

export default async function NominationDetailsPage({ params }: NominationDetailsPageProps) {
  const nomination = await getNominationById(params.id)

  if (!nomination) {
    notFound()
  }

  return <NominationDetails nomination={nomination} />
}
