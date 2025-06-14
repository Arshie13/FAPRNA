import type { Metadata } from "next"
import NewsForm from "@/components/admin/NewsForm"
import { getNewsById } from "@/lib/actions/news-actions"
import { notFound } from "next/navigation"

type Props = Promise<{
  id: string
}>

export async function generateMetadata(props: { params: Props }): Promise<Metadata> {
  const params = await props.params;
  const id = await params.id
  console.log(id)
  const news = await getNewsById(id)

  if (!news) {
    return {
      title: "News Not Found | FAPRNA-NV Admin",
    }
  }

  return {
    title: `Edit ${news.title} | FAPRNA-NV Admin`,
    description: `Edit news item: ${news.description}`,
  }
}

export default async function EditNewsPage(props: { params: Props }) {
  const params = await props.params;
  const id = await params.id
  const news = await getNewsById(id)

  if (!news) {
    notFound()
  }

  return <NewsForm news={news} />
}