import type { Metadata } from "next"
import NewsAdminDashboard from "@/components/admin/NewsDashboard"

export const metadata: Metadata = {
  title: "News Admin | FAPRNA-NV",
  description: "Admin dashboard for managing FAPRNA-NV news and events",
}

export default function NewsAdminPage() {
  return <NewsAdminDashboard />
}
