import type { Metadata } from "next"
import MemberDetails from "@/components/admin/MemberDetails"
import { getMemberById } from "@/lib/actions/members-actions"
import { notFound } from "next/navigation"

type Params = Promise<{ id: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export async function generateMetadata(props: { 
    params: Params, 
    searchParams: SearchParams 
  }): Promise<Metadata> {
  const params = await props.params
  const id = params.id
  const member = await getMemberById(id)

  if (!member) {
    return {
      title: "Member Not Found | FAPRNA-NV Admin",
    }
  }

  return {
    title: `${member.fullName} | FAPRNA-NV Admin`,
    description: `View member details for ${member.fullName}`,
  }
}

export default async function MemberDetailsPage(props: { 
  params: Params, 
  searchParams: SearchParams 
  }) {
  const params = await props.params
  const id = params.id
  const member = await getMemberById(id)

  if (!member) {
    notFound()
  }

  return <MemberDetails member={member} />
}
