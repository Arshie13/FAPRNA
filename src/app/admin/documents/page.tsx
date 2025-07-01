import type { Metadata } from "next"
import DocumentsAdminDashboard from "@/components/admin/DocumentsDashboard"

export const metadata: Metadata = {
  title: "Documents Admin | FAPRNA-NV",
  description: "Admin dashboard for managing PDF documents and files",
}

export default function DocumentsAdminPage() {
  return <DocumentsAdminDashboard />
}
