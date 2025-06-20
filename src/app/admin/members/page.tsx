import type { Metadata } from "next"
import MembersAdminDashboard from "@/components/admin/MembersDashboard"

export const metadata: Metadata = {
  title: "Members Admin | FAPRNA-NV",
  description: "Admin dashboard for managing FAPRNA-NV members",
}

export default function MembersAdminPage() {
  return <MembersAdminDashboard />
}
