// import type { Metadata } from "next"
import { notFound } from "next/navigation"
import NewsForm from "@/components/admin/NewsForm"
import { getNewsById } from "@/lib/actions/news-actions"

// type Props = {
//   params: { id: string }
//   searchParams: { [key: string]: string | string[] | undefined }
// }

// export async function generateMetadata(
//   { params }: EditNewsPageProps
// ): Promise<Metadata> {
//   const id = params.id
//   const news = await getNewsById(id)

//   if (!news) {
//     return {
//       title: "News Not Found | FAPRNA-NV Admin",
//     }
//   }

//   return {
//     title: `Edit ${news.id} | FAPRNA-NV Admin`,
//     description: `Edit news item: ${news.description}`,
//   }
// }

export default async function EditNewsPage({
  params: { id }
}: {
  params: { id: string }
}) {
  const news = await getNewsById(id)

  if (!news) {
    notFound()
  }

  return <NewsForm news={news} />
}