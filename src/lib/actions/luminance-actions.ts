"use server";

import { prisma } from "@/lib/utils"

export async function getCurrentWinners() {
  const result = await prisma.luminance.findMany({
    where: {
      isCurrent: true
    }
  });
  return result;
}

export async function getAllWinners() {
  const result = await prisma.luminance.findMany();
  return result;
}

export async function getPreviousWinners() {
  const result = await prisma.luminance.findMany({
    where: {
      isCurrent: false,
    }
  });

  return result;
}

export async function uploadWinner(name: string, fileUrl: string, isCurrent: boolean) {

  // offset the current winners
  await prisma.luminance.updateMany({
    where: {
      isCurrent: true,
    },
    data: {
      isCurrent: false
    }
  })

  // create new winners
  const result = await prisma.luminance.create({
    data: {
      name,
      fileUrl,
      isCurrent
    }
  });

  return result;
}

export async function deleteWinner(name: string) {

  await prisma.luminance.delete({
    where: { name }
  });
  return 200
}

export async function luminanceEventAction(action: string) {
  if (action === "start") {
    await prisma.luminanceToggle.update({
      where: {
        id: "1"
      },
      data: {
        hasStarted: true
      }
    });
  } else {
    await prisma.luminanceToggle.update({
      where: {
        id: "1"
      },
      data: {
        hasStarted: false
      }
    });
  }
}

export async function checkLuminanceEventStatus() {
  return await prisma.luminanceToggle.findFirst({
    where: {
      id: "1"
    },
    select: {
      hasStarted: true
    }
  })
}