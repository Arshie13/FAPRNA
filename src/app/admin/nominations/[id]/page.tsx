import type { Metadata } from "next"
import NominationDetails from "@/components/admin/NominationDetails"
import { getNominationById } from "@/lib/actions/nomination-actions"
import { notFound } from "next/navigation"

type Params = Promise<{ id: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export async function generateMetadata(props: { 
  params: Params, 
  searchParams: SearchParams 
}): Promise<Metadata> {

  const params = await props.params
  const id = params.id
  const nomination = await getNominationById(id)

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

export default async function NominationDetailsPage(props: { 
  params: Params, 
  searchParams: SearchParams 
  }) {
  const params = await props.params
  const id = params.id
  const nomination = await getNominationById(id)

  if (!nomination) {
    notFound()
  }

  return <NominationDetails nomination={nomination} />
}
