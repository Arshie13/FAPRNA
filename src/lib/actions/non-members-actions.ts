"use server";

import { prisma } from "../utils"

export async function createNonMember(data: {
  fullName: string,
  email: string,
  phoneNumber?: string
}) {
  try {
    const result = await prisma.nonMember.create({
      data
    });

    return result;
  } catch (error) {
    console.error("Error creating non-member: ", error);
  }
}

export async function getAllNonMembers() {
  try {
    return await prisma.nonMember.findMany();
  } catch {
    console.error("Error fetching all non-members");
  }
}

export async function deleteNonMember(id: string) {
  try {
    await prisma.nonMember.delete({
      where: {
        id
      }
    });

    return { success: true }

  } catch {
    console.error("Error deleting non-member.");
  }
}