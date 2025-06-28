import LoginForm from "@/components/Login"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Login | FAPRNA-NV",
  description: "Login to FAPRNA-NV admin dashboard",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 flex items-center justify-center p-4">
      <LoginForm />
    </div>
  )
}