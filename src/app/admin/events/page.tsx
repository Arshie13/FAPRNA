import type { Metadata } from "next"
import EventAdminDashboard from "@/components/admin/NewsDashboard"

export const metadata: Metadata = {
  title: "Events Admin | FAPRNA-NV",
  description: "Admin dashboard for managing FAPRNA-NV events",
}

export default function NewsAdminPage() {
  return <EventAdminDashboard />
}
