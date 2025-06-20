import type { Metadata } from "next"
import NominationsAdminDashboard from "@/components/admin/NominationsDashboard"

export const metadata: Metadata = {
  title: "Nominations Admin | FAPRNA-NV",
  description: "Admin dashboard for managing user nominations",
}

export default function NominationsAdminPage() {
  return <NominationsAdminDashboard />
}
