import EventDetails from "@/components/EventDetails";
import { use } from "react";

type Params = Promise<{ title: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default function EventDetailsPage(props: {
  params: Params
  searchParams: SearchParams
}) {

  const params = use(props.params)
  const title = params.title

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <EventDetails title={title} />
      </main>
    </div>
  )
}