"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "../utils"

const CURRENT_YEAR = new Date().getFullYear()

// Get nomination settings for current year
export async function getNominationSettings() {
  try {
    const settings = await prisma.nominationSettings.findUnique({
      where: { year: CURRENT_YEAR }
    })
    
    return settings || {
      id: "",
      year: CURRENT_YEAR,
      isNominationOpen: false,
      nominationStartDate: null,
      nominationEndDate: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  } catch (error) {
    console.error("Failed to get nomination settings:", error)
    throw new Error("Failed to get nomination settings")
  }
}

// Toggle nomination period on/off
export async function toggleNomination(isOpen: boolean) {
  try {
    const settings = await prisma.nominationSettings.upsert({
      where: { year: CURRENT_YEAR },
      update: {
        isNominationOpen: isOpen,
        nominationStartDate: isOpen ? new Date() : null,
        nominationEndDate: isOpen ? null : new Date(),
        updatedAt: new Date()
      },
      create: {
        year: CURRENT_YEAR,
        isNominationOpen: isOpen,
        nominationStartDate: isOpen ? new Date() : null,
        nominationEndDate: isOpen ? null : new Date()
      }
    })

    revalidatePath("/admin/nominations")
    revalidatePath("/luminance")
    
    return { success: true, settings }
  } catch (error) {
    console.error("Failed to toggle nominations:", error)
    return { success: false, error: "Failed to toggle nominations" }
  }
}

// Check if nominations are currently open
export async function isNominationOpen() {
  try {
    const settings = await prisma.nominationSettings.findUnique({
      where: { year: CURRENT_YEAR }
    })
    
    return settings?.isNominationOpen || false
  } catch (error) {
    console.error("Failed to check nomination status:", error)
    return false
  }
}

// Get all nomination years
export async function getAllNominationYears() {
  try {
    const years = await prisma.nominationSettings.findMany({
      orderBy: { year: 'desc' }
    })
    
    return years
  } catch (error) {
    console.error("Failed to get nomination years:", error)
    return []
  }
}

// Create new nomination year
export async function createNominationYear(year: number) {
  try {
    const settings = await prisma.nominationSettings.create({
      data: {
        year,
        isNominationOpen: false
      }
    })
    
    revalidatePath("/admin/nominations")
    
    return { success: true, settings }
  } catch (error) {
    console.error("Failed to create nomination year:", error)
    return { success: false, error: "Failed to create nomination year" }
  }
}

// Get nomination statistics
export async function getNominationStats() {
  try {
    const [totalNominations, categoryStats] = await Promise.all([
      prisma.nomination.count({ 
        where: { 
          createdAt: {
            gte: new Date(`${CURRENT_YEAR}-01-01`),
            lt: new Date(`${CURRENT_YEAR + 1}-01-01`)
          }
        }
      }),
      prisma.nomination.groupBy({
        by: ['category'],
        where: { 
          createdAt: {
            gte: new Date(`${CURRENT_YEAR}-01-01`),
            lt: new Date(`${CURRENT_YEAR + 1}-01-01`)
          }
        },
        _count: {
          category: true
        }
      })
    ])

    const categories = categoryStats.reduce((acc, stat) => {
      acc[stat.category] = stat._count.category
      return acc
    }, {} as { [key: string]: number })

    return {
      totalNominations,
      categories
    }
  } catch (error) {
    console.error("Failed to get nomination stats:", error)
    return {
      totalNominations: 0,
      categories: {}
    }
  }
}