"use server";

import { EventRegistration } from "../interfaces";
import { prisma } from "../utils"
import { createNonMember } from "./non-members-actions";

export async function addMemberToEvent(data: {
  fullName: string,
  userEmail: string,
  eventTitle: string,
  isMember: boolean,
  phoneNumber?: string
}) {
  try {

    if (data.isMember === true) {
      // check if user is indeed a member
      const validateUser = await prisma.member.findUnique({
        where: {
          email: data.userEmail
        }
      })

      if (!validateUser) {
        return {
          success: false,
          message: "Sorry, but you are not a member. Please register as a non-member instead."
        }
      }
      // if user is a member, add directly to event attendees.
      const result = await prisma.eventUser.create({
        data: {
          member: { connect: { email: data.userEmail } },
          event: { connect: { title: data.eventTitle } },
          isPending: false
        }
      });

      return {
        success: true,
        data: result
      }

    } else {
      // if user is non-member, create non-member entry first, then add to event attendees.
      const nonMember = await createNonMember({
        fullName: data.fullName,
        email: data.userEmail,
        phoneNumber: data.phoneNumber
      });

      if (!nonMember) {
        return {
          success: false,
          message: "Something went wrong in creating non-member entry. Please try again."
        }
      }

      const result = await prisma.eventUser.create({
        data: {
          nonMember: { connect: { id: nonMember.id } },
          event: { connect: { title: data.eventTitle } },
          isPending: true
        }
      });

      return {
        success: true,
        data: result
      }
    }

  } catch {
    console.log("Error adding member to event.")
  }
}

export async function getAllEventRegistrations(): Promise<EventRegistration[] | undefined> {
  try {
    const attendees = await prisma.eventUser.findMany({
      include: {
        member: true,
        nonMember: true
      }
    });

    return attendees
  } catch {
    console.log("Error getting all members of the event")
  }
}

export async function approveEventRegistration(eventUserId: string) {
  try {
    const result = await prisma.eventUser.update({
      data: {
        isPending: false,
        rejected: false
      },
      where: {
        id: eventUserId
      }
    });

    console.log("result: ", result);

    return {
      success: true,
      message: "Event Registration has been approved!"
    }

  } catch (error) {
    console.error("Something went wrong: ", error)
    return {
      success: false,
      message: "Something went wrong. Please try again later."
    }
  }
}

export async function rejectEventRegistration(eventUserId: string) {
  try {
    await prisma.eventUser.update({
      data: {
        isPending: false,
        rejected: true
      },
      where: {
        id: eventUserId
      }
    });

    return {
      success: true,
      message: "Event Registration has been approved!"
    }

  } catch (error) {
    console.error("Something went wrong: ", error)
    return {
      success: false,
      message: "Something went wrong. Please try again later."
    }
  }
}

export async function getEventRegistrationStats() {
  try {
    const [total, pending, approved, rejected] = await Promise.all([
      prisma.eventUser.count(),
      prisma.eventUser.count({ where: { isPending: true } }),
      prisma.eventUser.count({ where: { isPending: false, rejected: false } }),
      prisma.eventUser.count({ where: { rejected: true } }),
    ])

    return {
      success: true,
      data: {
        total,
        pending,
        approved,
        rejected
      }
    }

  } catch (error) {
    console.error("Something went wrong: ", error);
    return {
      success: false,
      message: "Something went wrong in fetching event registration stats."
    }
  }
}