import type { Metadata } from "next"
import EventForm from "@/components/admin/EventForm"
import { getEventById } from "@/lib/actions/event-actions"
import { notFound } from "next/navigation"
import { IEvent } from "@/lib/interfaces"

type Props = Promise<{
  id: string
}>

export async function generateMetadata(props: { params: Props }): Promise<Metadata> {
  const params = await props.params;
  const id = await params.id
  const event = await getEventById(id)

  if (!event) {
    return {
      title: "Event Not Found | FAPRNA-NV Admin",
    }
  }

  return {
    title: `Edit ${event.title} | FAPRNA-NV Admin`,
    description: `Edit event item: ${event.description}`,
  }
}

export default async function EditEventPage(props: { params: Props }) {
  const params = await props.params;
  const id = await params.id
  const event = await getEventById(id) as IEvent

  if (!event) {
    notFound()
  }

  return <EventForm event={event} />
}