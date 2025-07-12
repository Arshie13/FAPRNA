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
        description: true,
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
  const description = formData.get("description") as string

  try {
    const document = await prisma.pDFFile.create({
      data: {
        name: title,
        description,
        fileUrl
      }
    });

    revalidatePath("/admin/documents")
    return document
  } catch (error) {
    console.error("Error: ", error)
    throw new Error("error uploading file")
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
