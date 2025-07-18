"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavAndFooter =
    pathname.startsWith("/luminance") ||
    pathname.startsWith("/vote") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/login");

  return (
    <>
      {!hideNavAndFooter && <Navbar />}
      {children}
      {!hideNavAndFooter && <Footer />}
    </>
  );
}