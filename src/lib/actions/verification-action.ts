"use server"

import { prisma } from "../utils"
import { sendVerificationEmail } from "../email"

// Generate a 6-digit verification code
function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function sendVerificationCode(email: string) {
  try {
    // Generate verification code
    const code = generateVerificationCode()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes from now

    // Store verification code in database
    await prisma.verificationCode.create({
      data: {
        email,
        code,
        expiresAt,
      },
    })

    // Send email
    const emailResult = await sendVerificationEmail(email, code)
    
    if (!emailResult.success) {
      throw new Error(emailResult.error)
    }

    return { success: true, message: "Verification code sent successfully" }
  } catch (error) {
    console.error("Failed to send verification code:", error)
    return { success: false, error: "Failed to send verification code" }
  }
}

export async function verifyCode(email: string, code: string) {
  try {
    // Find the verification code
    const verificationRecord = await prisma.verificationCode.findFirst({
      where: {
        email,
        code,
        used: false,
        expiresAt: {
          gt: new Date(), // Not expired
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    if (!verificationRecord) {
      return { success: false, error: "Invalid or expired verification code" }
    }

    // Mark as used
    await prisma.verificationCode.update({
      where: { id: verificationRecord.id },
      data: { used: true },
    })

    return { success: true, message: "Email verified successfully" }
  } catch (error) {
    console.error("Failed to verify code:", error)
    return { success: false, error: "Failed to verify code" }
  }
}

// Clean up expired verification codes (optional, can be run as a cron job)
export async function cleanupExpiredCodes() {
  try {
    await prisma.verificationCode.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    })
  } catch (error) {
    console.error("Failed to cleanup expired codes:", error)
  }
}