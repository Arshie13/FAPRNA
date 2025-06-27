"use client"

import type React from "react"
import { SessionProvider, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import AdminSidebar from "@/components/admin/AdminSidebar"
import AdminHeader from "@/components/admin/AdminHeader"

function AuthenticatedAdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return // Still loading

    if (!session) {
      router.push("/login")
      return
    }
  }, [session, status, router])

  // Show loading while checking auth
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    )
  }

  // Redirect if not authenticated
  if (!session) {
    return null
  }

  // Render admin layout for authenticated users
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="h-full overflow-hidden">
        <AdminSidebar />
      </div>
      <div className="flex-1 overflow-auto">
        <AdminHeader />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <AuthenticatedAdminLayout>{children}</AuthenticatedAdminLayout>
    </SessionProvider>
  )
}