import type { Metadata } from "next"
import AdminDashboard from "@/components/admin/AdminDashboard"

export const metadata: Metadata = {
  title: "Admin Dashboard | FAPRNA-NV",
  description: "Main admin dashboard for FAPRNA-NV website management",
}

export default function AdminPage() {
  return <AdminDashboard />
}
