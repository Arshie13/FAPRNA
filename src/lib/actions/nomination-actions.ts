"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "../utils"

// Get all nominations with related data
export async function getAllNominations() {
  try {
    const nominations = await prisma.nomination.findMany({
      include: {
        nominator: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
        nominee1: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
        nominee2: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
        nominee3: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })
    return nominations
  } catch (error) {
    console.error("Failed to fetch nominations:", error)
    throw new Error("Failed to fetch nominations")
  }
}

// Get nomination by ID with related data
export async function getNominationById(id: string) {
  try {
    const nomination = await prisma.nomination.findUnique({
      where: { id },
      include: {
        nominator: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
        nominee1: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
        nominee2: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
        nominee3: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      },
    })
    return nomination
  } catch (error) {
    console.error(`Failed to fetch nomination with ID ${id}:`, error)
    throw new Error(`Failed to fetch nomination with ID ${id}`)
  }
}

// Update nomination status
export async function updateNominationStatus(id: string, status: string) {
  try {
    const nomination = await prisma.nomination.update({
      where: { id },
      data: {
        status,
        updatedAt: new Date(),
      },
    })

    revalidatePath("/admin/nominations")
    revalidatePath(`/admin/nominations/${id}`)

    return nomination
  } catch (error) {
    console.error(`Failed to update nomination status for ID ${id}:`, error)
    throw new Error(`Failed to update nomination status for ID ${id}`)
  }
}

// Get nomination statistics
export async function getNominationStats() {
  try {
    const [total, pending, approved, rejected, categoryStats] = await Promise.all([
      prisma.nomination.count(),
      prisma.nomination.count({ where: { status: "PENDING" } }),
      prisma.nomination.count({ where: { status: "APPROVED" } }),
      prisma.nomination.count({ where: { status: "REJECTED" } }),
      prisma.nomination.groupBy({
        by: ["category"],
        _count: {
          category: true,
        },
      }),
    ])

    const categories = categoryStats.reduce(
      (acc, stat) => {
        acc[stat.category] = stat._count.category
        return acc
      },
      {} as { [key: string]: number },
    )

    return {
      total,
      pending,
      approved,
      rejected,
      categories,
    }
  } catch (error) {
    console.error("Failed to fetch nomination stats:", error)
    throw new Error("Failed to fetch nomination stats")
  }
}

// Delete nomination (if needed)
export async function deleteNomination(id: string) {
  try {
    await prisma.nomination.delete({
      where: { id },
    })

    revalidatePath("/admin/nominations")

    return { success: true }
  } catch (error) {
    console.error(`Failed to delete nomination with ID ${id}:`, error)
    throw new Error(`Failed to delete nomination with ID ${id}`)
  }
}
