import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import LayoutShell from "@/app/layoutshell";
import { EdgeStoreProvider } from "@/lib/libstore/libstore-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FAPRNA",
  description: "Filipino-American Advanced Practice Registered Nurses Association",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen p-0 gap-8 sm:gap-16 sm:p-0 font-[family-name:var(--font-geist-sans)]">
          <LayoutShell>
            <EdgeStoreProvider>
              {children}
            </EdgeStoreProvider>
          </LayoutShell>
        </div>
      </body>
    </html>
  );
}