"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/utils"

// Get all documents
export async function getAllDocuments() {
  try {
    // Fetch documents from the database (example with select)
    const documents = await prisma.pDFFile.findMany({
      select: {
        id: true,
        name: true,
        fileUrl: true,
        createdAt: true
      }
    })
    return documents
  } catch (error) {
    console.error("Failed to fetch documents:", error)
    throw new Error("Failed to fetch documents")
  }
}

// Upload document
export async function uploadDocument(formData: FormData) {
  const title = formData.get("title") as string
  const fileUrl = formData.get("pdfUrl") as string

  try {
    const document = await prisma.pDFFile.create({
      data: {
        name: title,
        fileUrl
      }
    })
    revalidatePath("/admin/documents")
    return document
  } catch {
    throw new Error("error creating file")
  }
}

// Delete document
export async function deleteDocumentFromDb(id: string) {
  try {
    await prisma.pDFFile.delete({
      where: {
        id
      }
    })
    return { success: true }
  } catch (error) {
    console.error(`Failed to delete document with ID ${id}:`, error)
    throw new Error(`Failed to delete document with ID ${id}`)
  }
}
