"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "../utils"
import { sendNominationEmail } from "../email"
import { isNominationOpen } from "./nomination-settings-action"

const CURRENT_YEAR = new Date().getFullYear()

// Create a nomination
export async function createNomination(data: {
  nominator: { fullName: string; email: string; phone: string }
  nominee: { fullName: string; email: string; phone: string }
  category: string
  reason: string
}) {
  try {
    // Check if nominations are open
    const nominationOpen = await isNominationOpen()
    if (!nominationOpen) {
      return { success: false, error: "Nominations are currently closed" }
    }

    // Find or create nominator
    let nominator = await prisma.member.findUnique({
      where: { email: data.nominator.email }
    })

    if (!nominator) {
      nominator = await prisma.member.create({
        data: {
          fullName: data.nominator.fullName,
          email: data.nominator.email,
          phone: data.nominator.phone,
          membershipStatus: "PENDING"
        }
      })
    }

    // Find or create nominee
    let nominee = await prisma.member.findUnique({
      where: { email: data.nominee.email }
    })

    if (!nominee) {
      nominee = await prisma.member.create({
        data: {
          fullName: data.nominee.fullName,
          email: data.nominee.email,
          phone: data.nominee.phone,
          membershipStatus: "PENDING"
        }
      })
    }

    // Check if nominator already nominated someone for this category
    const existingNomination = await prisma.nomination.findFirst({
      where: {
        nominatorId: nominator.id,
        category: data.category,
        year: CURRENT_YEAR
      }
    })

    if (existingNomination) {
      return { success: false, error: `You have already nominated someone for ${data.category} this year` }
    }

    // Create nomination
    const nomination = await prisma.nomination.create({
      data: {
        nominatorId: nominator.id,
        nomineeId: nominee.id,
        category: data.category,
        reason: data.reason,
        status: "PENDING",
        year: CURRENT_YEAR
      },
      include: {
        nominator: true,
        nominee: true
      }
    })

    // Send email notification
    await sendNominationEmail({
      category: nomination.category,
      nominee: {
        fullName: nominee.fullName,
        email: nominee.email
      },
      nominator: {
        fullName: nominator.fullName,
        email: nominator.email
      },
      reason: nomination.reason,
      createdAt: nomination.createdAt
    })

    revalidatePath("/luminance")
    revalidatePath("/admin/nominations")

    return { success: true, nomination }
  } catch (error) {
    console.error("Failed to create nomination:", error)
    return { success: false, error: "Failed to submit nomination" }
  }
}

// Get all nominations for admin
export async function getAllNominations() {
  try {
    const nominations = await prisma.nomination.findMany({
      include: {
        nominator: true,
        nominee: true
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return nominations
  } catch (error) {
    console.error("Failed to get nominations:", error)
    return []
  }
}

// Update nomination status
export async function updateNominationStatus(nominationId: string, status: string) {
  try {
    const updatedNomination = await prisma.nomination.update({
      where: { id: nominationId },
      data: { status },
      include: {
        nominator: true,
        nominee: true
      }
    })

    revalidatePath("/admin/nominations")
    return { success: true, nomination: updatedNomination }
  } catch (error) {
    console.error("Failed to update nomination status:", error)
    return { success: false, error: "Failed to update nomination status" }
  }
}

// Get nomination by ID
export async function getNominationById(id: string) {
  try {
    const nomination = await prisma.nomination.findUnique({
      where: { id },
      include: {
        nominator: true,
        nominee: true
      }
    })

    return nomination
  } catch (error) {
    console.error("Failed to get nomination:", error)
    return null
  }
}

// Get eligible members for nomination
export async function getEligibleMembers() {
  try {
    const members = await prisma.member.findMany({
      where: {
        membershipStatus: "APPROVED"
      },
      select: {
        id: true,
        fullName: true,
        email: true
      },
      orderBy: {
        fullName: "asc"
      }
    })

    return members
  } catch (error) {
    console.error("Failed to get eligible members:", error)
    return []
  }
}