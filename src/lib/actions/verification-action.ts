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

    // Store verification code in database
    // await prisma.verificationCode.create({
    //   data: {
    //     email,
    //     code,
    //     expiresAt,
    //   },
    // })

    // Send email
    const emailResult = await sendVerificationEmail(email, code)

    if (!emailResult.success) {
      throw new Error(emailResult.error)
    }

    return { success: true, message: "Verification code sent successfully", code }
  } catch (error) {
    console.error("Failed to send verification code:", error)
    return { success: false, error: "Failed to send verification code" }
  }
}

export async function verifyCode(sentCode: string, codeInput: string) {

  if (sentCode !== codeInput) {
    return { success: false, error: "Invalid or expired verification code" }
  }

  return { success: true, message: "Email verified successfully" }
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