import type { Metadata } from "next"
import EventForm from "@/components/admin/EventForm"

export const metadata: Metadata = {
  title: "Create Event | FAPRNA-NV Admin",
  description: "Create new event items for FAPRNA-NV",
}

export default function CreateEventPage() {
  return <EventForm />
}
