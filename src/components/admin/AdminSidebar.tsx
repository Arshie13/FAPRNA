"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Newspaper,
  Users,
  Settings,
  LogOut,
  ChevronRight,
  ChevronLeft,
  Award,
} from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default function AdminSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

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
      title: "Settings",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <aside>
      <div
        className={cn(
          "flex h-screen flex-col border-r bg-white transition-all duration-300",
          collapsed ? "w-16" : "w-64",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          {!collapsed && (
            <Link href="/admin" className="flex items-center">
              <span className="text-xl font-bold text-[#003366]">FAPRNA-NV</span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className={cn("ml-auto", collapsed && "mx-auto")}
          >
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
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
        <div className="border-t p-4">
          <Link
            href="/"
            className={cn(
              "flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors",
              collapsed && "justify-center px-2",
            )}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span className="ml-3">Back to Site</span>}
          </Link>
        </div>
      </div>
    </aside>
  )
}
