"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "../utils"

// Get all members with related data
export async function getAllMembers() {
  try {
    const members = await prisma.member.findMany({
      include: {
        _count: {
          select: {
            nominationsMade: true,
            EventUser: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    })
    return members
  } catch (error) {
    console.error("Failed to fetch members:", error)
    throw new Error("Failed to fetch members")
  }
}

// Get member by ID with related data
export async function getMemberById(id: string) {
  try {
    const member = await prisma.member.findUnique({
      where: { id },
      include: {
        nominationsMade: {
          select: {
            id: true,
            category: true,
            status: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        EventUser: {
          select: {
            id: true,
            event: {
              select: {
                id: true,
                title: true,
                date: true,
              },
            },
          },
          orderBy: {
            event: {
              date: "desc",
            },
          },
        },
        _count: {
          select: {
            nominationsMade: true,
            EventUser: true,
          },
        },
      },
    })
    return member
  } catch (error) {
    console.error(`Failed to fetch member with ID ${id}:`, error)
    throw new Error(`Failed to fetch member with ID ${id}`)
  }
}

// Update member status
export async function updateMemberStatus(id: string, status: "APPROVED" | "DENIED" | "PENDING") {
  try {
    const member = await prisma.member.update({
      where: { id },
      data: {
        membershipStatus: status,
      },
    })

    revalidatePath("/admin/members")
    revalidatePath(`/admin/members/${id}`)

    return member
  } catch (error) {
    console.error(`Failed to update member status for ID ${id}:`, error)
    throw new Error(`Failed to update member status for ID ${id}`)
  }
}

// Get member statistics
export async function getMemberStats() {
  try {
    const [total, approved, pending, denied] = await Promise.all([
      prisma.member.count(),
      prisma.member.count({ where: { membershipStatus: "APPROVED" } }),
      prisma.member.count({ where: { membershipStatus: "PENDING" } }),
      prisma.member.count({ where: { membershipStatus: "DENIED" } }),
    ])

    return {
      total,
      approved,
      pending,
      denied,
    }
  } catch (error) {
    console.error("Failed to fetch member stats:", error)
    throw new Error("Failed to fetch member stats")
  }
}

// Delete member (if needed)
export async function deleteMember(id: string) {
  try {
    await prisma.member.delete({
      where: { id },
    })

    revalidatePath("/admin/members")

    return { success: true }
  } catch (error) {
    console.error(`Failed to delete member with ID ${id}:`, error)
    throw new Error(`Failed to delete member with ID ${id}`)
  }
}

// Create new member
export async function createMember(data: {
  fullName: string
  email: string
  membershipStatus: "APPROVED" | "DENIED" | "PENDING"
  phoneNumber: string | null
}) {
  try {
    // Check if email already exists
    const existingMember = await prisma.member.findFirst({
      where: { email: data.email },
    })

    if (existingMember) {
      throw new Error("A member with this email already exists")
    }

    // Hash the password (you might want to use bcrypt in a real application)
    // For now, we'll store it as plain text, but in production you should hash it
    const member = await prisma.member.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        membershipStatus: data.membershipStatus,
        phoneNumber: data.phoneNumber || null,
      },
    })

    revalidatePath("/admin/members")

    return member
  } catch (error) {
    console.error("Failed to create member:", error)
    throw new Error("Failed to create member")
  }
}