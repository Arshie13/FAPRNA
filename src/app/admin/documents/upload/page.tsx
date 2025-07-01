import type { Metadata } from "next"
import DocumentUploadForm from "@/components/admin/DocumentUploadForm"

export const metadata: Metadata = {
  title: "Upload Document | FAPRNA-NV Admin",
  description: "Upload new PDF documents to FAPRNA-NV",
}

export default function DocumentUploadPage() {
  return <DocumentUploadForm />
}
