"use server"


import nodemailer from 'nodemailer'

const faprnaEmail = 'javiernodemail@gmail.com'
// Ensure this code only runs server-side:
if (typeof window !== 'undefined') {
  console.warn("Nodemailer cannot run in the browser. Please call these functions from server-side code.")
}

export async function sendVerificationEmail(email: string, code: string) {
  if (typeof window !== 'undefined') {
    return { success: false, error: "Email can only be sent from the server." }
  }


  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Use app password for Gmail
    },
  })

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'FAPRNA Email Verification Code',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
        <h2 style="color: #003366; text-align: center;">FAPRNA Email Verification</h2>
        <p style="font-size: 16px;">Hello,<br/>We received a request to verify your email for FAPRNA membership. Your verification code is:</p>
        <div style="background-color: #ffffff; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 4px; margin: 20px 0; border-radius: 8px; border: 1px solid #ddd;">
          ${code}
        </div>
        <p style="font-size: 14px;">This code will expire in 10 minutes. If you didn't request this code, please ignore this email.</p>
        <p style="font-size: 12px; color: #666;">&copy; FAPRNA</p>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error('Failed to send email:', error)
    return { success: false, error: 'Failed to send verification email' }
  }
}

export async function sendRegistrationNotification(fullName: string, email: string, phone: string) {
  if (typeof window !== 'undefined') {
    return { success: false, error: "Email can only be sent from the server." }
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: faprnaEmail,
    subject: 'New FAPRNA Registration',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #003366;">New Member Registration</h2>
        <p>A new member has just registered with the following details:</p>
        <ul style="list-style: none; padding: 0;">
          <li><strong>Full Name:</strong> ${fullName}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
        </ul>
        <p>Please follow up if needed.</p>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error('Failed to send registration notification:', error)
    return { success: false, error: 'Failed to send registration notification' }
  }
}


interface Nomination {
  category: 'intentionality' | 'inquiry' | 'impact' | string;
  nominee: {
    fullName: string;
    email: string;
  };
  nominator: {
    fullName: string;
    email: string;
  };
  reason: string;
  createdAt: string | number | Date;
}

export async function sendNominationEmail(nomination: Nomination) {
  if (typeof window !== 'undefined') {
    return { success: false, error: "Email can only be sent from the server." }
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  const categoryTitles = {
    'intentionality': 'ADVANCEMENT OF INTENTIONALITY',
    'inquiry': 'ADVANCEMENT IN INQUIRY',
    'impact': 'ADVANCEMENT WITH IMPACT'
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'javiernodemail@gmail.com',
    subject: `New FAPRNA Luminance Nomination Submitted - ${new Date().getFullYear()}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #003366;">New Luminance Nomination Submitted</h2>
        <p>A new nomination has been submitted for the FAPRNA Luminance Awards ${new Date().getFullYear()}:</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #D4AF37; margin-bottom: 15px;">Nomination Details</h3>
          <ul style="list-style: none; padding: 0;">
            <li style="margin-bottom: 10px;"><strong>Category:</strong> ${categoryTitles[nomination.category as keyof typeof categoryTitles] || nomination.category}</li>
            <li style="margin-bottom: 10px;"><strong>Nominee:</strong> ${nomination.nominee.fullName}</li>
            <li style="margin-bottom: 10px;"><strong>Nominee Email:</strong> ${nomination.nominee.email}</li>
            <li style="margin-bottom: 10px;"><strong>Nominated by:</strong> ${nomination.nominator.fullName}</li>
            <li style="margin-bottom: 10px;"><strong>Nominator Email:</strong> ${nomination.nominator.email}</li>
            <li style="margin-bottom: 10px;"><strong>Submission Date:</strong> ${new Date(nomination.createdAt).toLocaleDateString()}</li>
          </ul>
        </div>

        <div style="background-color: #e8f4f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #003366; margin-bottom: 15px;">Nomination Reason</h3>
          <p style="line-height: 1.6; color: #333;">${nomination.reason}</p>
        </div>

        <p style="color: #666; font-size: 14px;">
          You can review and approve this nomination in the admin dashboard.
        </p>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error('Failed to send nomination email:', error)
    return { success: false, error: 'Failed to send nomination email' }
  }
}