import EventDetails from "@/components/EventDetails";

export default function EventDetailsPage(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  { params }: { params: { title: string } }
) {

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <EventDetails />
      </main>
    </div>
  )
}