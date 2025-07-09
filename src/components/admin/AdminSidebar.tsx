"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Newspaper,
  Users,
  FileText,
  ChevronRight,
  ChevronLeft,
  Award,
  Home,
  Medal,
  NotebookPen
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close sidebar on route change (for mobile)
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="h-7 w-7" />,
    },
    {
      title: "Events Management",
      href: "/admin/events",
      icon: <Newspaper className="h-7 w-7" />,
    },
    {
      title: "Nominations",
      href: "/admin/nominations",
      icon: <Award className="h-7 w-7" />,
    },
    {
      title: "Members",
      href: "/admin/members",
      icon: <Users className="h-7 w-7" />,
    },
    {
      title: "Documents",
      href: "/admin/documents",
      icon: <FileText className="h-7 w-7" />,
    },
    {
      title: "Luminance",
      href: "/admin/luminance",
      icon: <Medal className="h-7 w-7" />,
    },
    {
      title: "Event Registrations",
      href: "/admin/event-registrations",
      icon: <NotebookPen className="h-7 w-7" />,
    },
  ];

  const handleBackToSite = async () => {
    await signOut({
      callbackUrl: "/", // Redirect to home page after logout
    });
  };

  return (
    <>
      {/* Mobile sidebar toggle button */}
      <button
        className="fixed top-4 left-4 z-40 flex items-center justify-center rounded-md bg-white p-3 shadow-lg lg:hidden"
        onClick={() => setMobileOpen(true)}
        aria-label="Open sidebar"
        style={{ display: mobileOpen ? "none" : undefined }}
      >
        <ChevronRight className="h-8 w-8 text-[#003366]" />
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
          collapsed ? "w-24" : "w-80",
          "lg:static lg:z-auto",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          "lg:translate-x-0",
          "lg:sticky lg:top-0",
          "lg:h-screen"
        )}
        style={{
          minWidth: collapsed ? "6rem" : "20rem",
          position: mobileOpen ? "fixed" : undefined,
        }}
      >
        <div className="flex h-20 items-center justify-between border-b px-8">
          {!collapsed && (
            <Link href="/admin" className="flex items-center">
              <span className="text-2xl font-bold text-[#003366]">
                FAPRNA-NV
              </span>
            </Link>
          )}
          <div className="flex items-center gap-3">
            {/* Mobile close button */}
            <button
              className="lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-label="Close sidebar"
              style={{ display: mobileOpen ? undefined : "none" }}
            >
              <ChevronLeft className="h-7 w-7" />
            </button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className={cn("ml-auto p-3", collapsed && "mx-auto", "hidden lg:inline-flex")}
            >
              {collapsed ? (
                <ChevronRight className="h-7 w-7" />
              ) : (
                <ChevronLeft className="h-7 w-7" />
              )}
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-auto py-6">
          <nav className="space-y-3 px-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                title={item.title}
                className={cn(
                  "flex items-center rounded-xl px-6 py-5 text-lg font-semibold transition-colors",
                  item.href === "/admin"
                    ? pathname === "/admin"
                      ? "bg-[#a6e3fa] text-[#003366]"
                      : "text-gray-700 hover:bg-[#a6e3fa] hover:text-[#003366]"
                    : pathname === item.href || pathname.startsWith(`${item.href}/`)
                      ? "bg-[#a6e3fa] text-[#003366]"
                      : "text-gray-700 hover:bg-[#a6e3fa] hover:text-[#003366]",
                  collapsed && "justify-center px-3"
                )}
              >
                {item.icon}
                {!collapsed && (
                  <span className="ml-5 text-lg">{item.title}</span>
                )}
              </Link>
            ))}
          </nav>
        </div>
        <div className="border-t p-8 space-y-3">
          {/* Back to Site with Logout */}
          <Button
            variant="ghost"
            onClick={handleBackToSite}
            className={cn(
              "flex items-center rounded-xl px-6 py-5 text-lg font-semibold text-gray-700 hover:bg-[#a6e3fa] hover:text-[#003366] transition-colors w-full justify-start",
              collapsed && "justify-center px-3"
            )}
          >
            <Home className="h-7 w-7" />
            {!collapsed && <span className="ml-5 text-lg">Back to Site</span>}
          </Button>
        </div>
      </aside>
    </>
  );
}
