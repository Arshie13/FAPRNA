import DocumentsDashboard from "@/components/Documents";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Document Library | FAPRNA-NV",
  description: "Access important documents, bylaws, meeting minutes, and resources from FAPRNA-NV",
}

export default function DocumentsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <DocumentsDashboard />
      </main>
    </div>
  )
}
