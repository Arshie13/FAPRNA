"use server";

import { prisma } from "../utils"
import { createNonMember } from "./non-members-actions";

export async function addMemberToEvent(data: {
  fullName: string,
  userEmail: string,
  eventTitle: string,
  isMember: boolean,
  phoneNumber?: string}) {
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

export async function getAllEventMembers(eventId: string) {
  try {
    const attendees = await prisma.eventUser.findMany({
      where: { eventId },
      include: {
        member: true,
        nonMember: true
      }
    });
    return attendees;
  } catch {
    console.log("Error getting all members of the event")
  }
}