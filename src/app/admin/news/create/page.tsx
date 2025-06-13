import type { Metadata } from "next"
import NewsForm from "@/components/admin/NewsForm"

export const metadata: Metadata = {
  title: "Create News | FAPRNA-NV Admin",
  description: "Create new news items and events for FAPRNA-NV",
}

export default function CreateNewsPage() {
  return <NewsForm />
}
