"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Newspaper,
  Users,
  FileText,
  ChevronRight,
  ChevronLeft,
  Award,
  Home,
} from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

export default function AdminSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  // Close sidebar on route change (for mobile)
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Events Management",
      href: "/admin/events",
      icon: <Newspaper className="h-5 w-5" />,
    },
    {
      title: "Nominations",
      href: "/admin/nominations",
      icon: <Award className="h-5 w-5" />,
    },
    {
      title: "Members",
      href: "/admin/members",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Documents",
      href: "/admin/documents",
      icon: <FileText className="h-5 w-5" />,
    },
  ]

  const handleBackToSite = async () => {
    await signOut({
      callbackUrl: "/", // Redirect to home page after logout
    })
  }

  return (
    <>
      {/* Mobile sidebar toggle button */}
      <button
        className="fixed top-4 left-4 z-40 flex items-center justify-center rounded-md bg-white p-2 shadow-lg lg:hidden"
        onClick={() => setMobileOpen(true)}
        aria-label="Open sidebar"
        style={{ display: mobileOpen ? "none" : undefined }}
      >
        <ChevronRight className="h-6 w-6 text-[#003366]" />
      </button>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed z-50 top-0 left-0 h-screen flex flex-col border-r bg-white transition-all duration-300",
          collapsed ? "w-16" : "w-64",
          "lg:static lg:z-auto",
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0",
          "lg:translate-x-0",
          "lg:sticky lg:top-0",
          "lg:h-screen" // <-- ensure full height on desktop
        )}
        style={{
          minWidth: collapsed ? "4rem" : "16rem",
          position: mobileOpen ? "fixed" : undefined, // always fixed on mobile, sticky on desktop
        }}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          {!collapsed && (
            <Link href="/admin" className="flex items-center">
              <span className="text-xl font-bold text-[#003366]">FAPRNA-NV</span>
            </Link>
          )}
          <div className="flex items-center gap-2">
            {/* Mobile close button */}
            <button
              className="lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-label="Close sidebar"
              style={{ display: mobileOpen ? undefined : "none" }}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className={cn("ml-auto", collapsed && "mx-auto")}
            >
              {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-auto py-4">
          <nav className="space-y-1 px-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                    ? "bg-blue-100 text-blue-800"
                    : "text-gray-700 hover:bg-gray-100",
                  collapsed && "justify-center px-2",
                )}
              >
                {item.icon}
                {!collapsed && <span className="ml-3">{item.title}</span>}
              </Link>
            ))}
          </nav>
        </div>
        <div className="border-t p-4 space-y-2">
          {/* Back to Site with Logout */}
          <Button
            variant="ghost"
            onClick={handleBackToSite}
            className={cn(
              "flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors w-full justify-start",
              collapsed && "justify-center px-2",
            )}
          >
            <Home className="h-5 w-5" />
            {!collapsed && <span className="ml-3">Back to Site</span>}
          </Button>
        </div>
      </aside>
    </>
  )
}