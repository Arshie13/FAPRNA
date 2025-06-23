import type { Metadata } from "next"
import CreateMemberForm from "@/components/admin/CreateMember"

export const metadata: Metadata = {
  title: "Create Member | FAPRNA-NV Admin",
  description: "Add a new member to FAPRNA-NV",
}

export default function CreateMemberPage() {
  return <CreateMemberForm />
}