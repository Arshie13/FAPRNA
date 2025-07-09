import type { Metadata } from "next"
import LuminanceDashboard from "@/components/admin/Luminance"

export const metadata: Metadata = {
  title: "Luminance Dashboard | FAPRNA-NV",
  description: "Luminance dashboard for managing Luminance Awardees",
}

export default function DocumentsAdminPage() {
  return <LuminanceDashboard />
}
