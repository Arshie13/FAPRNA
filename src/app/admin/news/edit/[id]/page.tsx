import type { Metadata } from "next"
import NewsForm from "@/components/admin/NewsForm"
import { getNewsById } from "@/lib/actions/news-actions"
import { notFound } from "next/navigation"

interface EditNewsPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: EditNewsPageProps): Promise<Metadata> {
  const news = await getNewsById(params.id)

  if (!news) {
    return {
      title: "News Not Found | FAPRNA-NV Admin",
    }
  }

  return {
    title: `Edit ${news.title} | FAPRNA-NV Admin`,
    description: `Edit news item: ${news.title}`,
  }
}

export default async function EditNewsPage({ params }: EditNewsPageProps) {
  const news = await getNewsById(params.id)

  if (!news) {
    notFound()
  }

  return <NewsForm news={news} />
}
