import type React from "react"
import type { Metadata } from "next"
import AdminSidebar from "@/components/admin/AdminSidebar"

export const metadata: Metadata = {
  title: "Admin Dashboard | FAPRNA-NV",
  description: "Admin dashboard for FAPRNA-NV website management",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="h-full overflow-hidden">
        <AdminSidebar />
      </div>
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  )
}
