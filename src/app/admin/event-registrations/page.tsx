import RegistrationDashboard from "@/components/admin/Registrations";
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Dashboard | FAPRNA-NV",
  description: "Main admin dashboard for FAPRNA-NV website management",
}

export default function RegistrationPage() {
  return <RegistrationDashboard />
}