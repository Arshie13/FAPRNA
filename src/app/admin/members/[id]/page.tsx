import type { Metadata } from "next"
import MemberDetails from "@/components/admin/MemberDetails"
import { getMemberById } from "@/lib/actions/members-actions"
import { notFound } from "next/navigation"

interface MemberDetailsPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: MemberDetailsPageProps): Promise<Metadata> {
  const member = await getMemberById(params.id)

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

export default async function MemberDetailsPage({ params }: MemberDetailsPageProps) {
  const member = await getMemberById(params.id)

  if (!member) {
    notFound()
  }

  return <MemberDetails member={member} />
}
