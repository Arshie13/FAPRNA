import NominationManagement from "@/components/admin/NominationManagement"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nomination Management | FAPRNA-NV Admin",
  description: "Manage nomination settings and submissions",
}

export default function NominationManagementPage() {
  return <NominationManagement />
}