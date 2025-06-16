"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "../utils"
import { INews } from "../interfaces"

// Get all news items
export async function getAllNews() {
  try {
    const news = await prisma.news.findMany({
      orderBy: {
        date: "desc",
      },
    })
    return news
  } catch (error) {
    console.error("Failed to fetch news:", error)
    throw new Error("Failed to fetch news")
  }
}

// Get news by ID
export async function getNewsById(id: string) {
  try {
    const news = await prisma.news.findUnique({
      where: { id },
    })
    return news
  } catch (error) {
    console.error(`Failed to fetch news id: ${id}:`, error)
    throw new Error(`Failed to fetch news id: ${id}`)
  }
}

// Create new news item
export async function createNews(data: INews) {
  try {
    // If this news is set as latest, unset any other latest news
    if (data.isLatest) {
      await prisma.news.updateMany({
        where: { isLatest: true },
        data: { isLatest: false },
      })
    }

    const news = await prisma.news.create({
      data,
    })

    revalidatePath("/admin/news")
    revalidatePath("/")
    revalidatePath("/event-registration")

    return news
  } catch (error) {
    console.error("Failed to create news:", error)
    throw new Error("Failed to create news")
  }
}

// Update news item
export async function updateNews(id: string, data: INews) {
  try {
    // If this news is set as latest, unset any other latest news
    console.log(!isNaN(data.ceus))
    if (data.isLatest) {
      await prisma.news.updateMany({
        where: {
          isLatest: true,
          id: { not: id },
        },
        data: { isLatest: false },
      })
    }

    const news = await prisma.news.update({
      where: { id },
      data: {
        ...data,
        ceus: typeof data.ceus === "string" ? Number(data.ceus) : data.ceus,
      }
    })

    revalidatePath("/admin/news")
    revalidatePath("/")
    revalidatePath("/event-registration")
    revalidatePath(`/event-registration/details/${id}`)

    return news
  } catch (error) {
    console.error(`Failed to update news with ID ${id}:`, error)
    throw new Error(`Failed to update news with ID ${id}`)
  }
}

// Delete news item
export async function deleteNews(id: string) {
  try {
    await prisma.news.delete({
      where: { id },
    })

    revalidatePath("/admin/news")
    revalidatePath("/")
    revalidatePath("/event-registration")

    return { success: true }
  } catch (error) {
    console.error(`Failed to delete news with ID ${id}:`, error)
    throw new Error(`Failed to delete news with ID ${id}`)
  }
}

// Set news as latest
export async function setLatestNews(id: string) {
  try {
    // Get current status
    const currentNews = await prisma.news.findUnique({
      where: { id },
      select: { isLatest: true },
    })

    // If setting to latest, unset any other latest news
    if (!currentNews?.isLatest) {
      await prisma.news.updateMany({
        where: { isLatest: true },
        data: { isLatest: false },
      })
    }

    // Toggle the isLatest status
    const news = await prisma.news.update({
      where: { id },
      data: { isLatest: !currentNews?.isLatest },
    })

    revalidatePath("/admin/news")
    revalidatePath("/")
    revalidatePath("/event-registration")

    return news
  } catch (error) {
    console.error(`Failed to update latest status for news with ID ${id}:`, error)
    throw new Error(`Failed to update latest status for news with ID ${id}`)
  }
}
