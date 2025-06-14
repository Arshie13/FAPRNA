// import type { Metadata } from "next"
import NewsForm from "@/components/admin/NewsForm"
import { getNewsById } from "@/lib/actions/news-actions"
import { notFound } from "next/navigation"

// type EditNewsPageProps = Promise<{
//   params: {
//     id: string
//   }
// }>

// export async function generateMetadata({ params }: EditNewsPageProps): Promise<Metadata> {
//   const id = params.id
//   const news = await getNewsById(id)

//   if (!news) {
//     return {
//       title: "News Not Found | FAPRNA-NV Admin",
//     }
//   }
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
//   return {
//     title: `Edit ${news.id} | FAPRNA-NV Admin`,
//     description: `Edit news item: ${news.description}`,
//   }
// }

export default async function EditNewsPage(props: { params: { id: string } }) {
  const { id } = await props.params
  const news = await getNewsById(id)

  if (!news) {
    notFound()
  }

  return <NewsForm news={news} />
}