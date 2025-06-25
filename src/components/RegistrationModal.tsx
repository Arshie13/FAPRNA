"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Check, QrCode, Mail, Phone, User, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import Image from "next/image"
import { toast } from "sonner"
import { createMember } from "@/lib/actions/members-actions"
import { sendVerificationCode, verifyCode } from "@/lib/actions/verification-action"
import { sendRegistrationNotification } from "@/lib/email"

interface MembershipPlan {
  id: string
  name: string
  price: string
  period: string
  description: string
  features: string[]
  icon: React.ReactNode
  popular: boolean
  color: string
}

interface RegistrationModalProps {
  isOpen: boolean
  onClose: () => void
  selectedPlan: MembershipPlan | null
  membershipUrl: string
}

export default function RegistrationModal({ isOpen, onClose, selectedPlan, membershipUrl }: RegistrationModalProps) {
  const [isVerifying, setIsVerifying] = useState(false)
  const [isSendingCode, setIsSendingCode] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    verificationCode: "",
  })
  const [isVerificationSent, setIsVerificationSent] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [code, setCode] = useState<string>("")

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSendVerification = async () => {
    if (!formData.email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsSendingCode(true);
    try {
      const { code, error } = await sendVerificationCode(formData.email);

      if (error || !code) {
        toast.error(error);
        return;
      }

      setCode(code);
      setIsVerificationSent(true);
      toast.success("Verification code sent! Please check your email.");
    } catch (error) {
      console.error("Failed to send verification code:", error);
      toast.error("Failed to send verification code");
    } finally {
      setIsSendingCode(false);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isVerificationSent) {
      timer = setTimeout(() => {
        toast.error("Verification code has expired. Please request a new code.");
        setIsVerificationSent(false);
        setFormData((prev) => ({ ...prev, verificationCode: "" }));
      }, 2 * 60 * 1000); // 2 minutes
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isVerificationSent]); // Only re-run when isVerificationSent changes


  // might not reset the verification code timer and could cause issues later.
  const handleVerifyCode = async () => {
    if (!formData.verificationCode) {
      toast.error("Please enter the verification code")
      return
    }

    try {
      setIsVerifying(true)
      const result = await verifyCode(code, formData.verificationCode)

      if (result.success) {
        setIsVerified(true)
        toast.success("Email verified successfully!")
      } else {
        toast.error(result.error || "Invalid verification code. Please check and try again.")
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to verify code. Please try again.")
    } finally {
      setIsVerifying(false)
    }
  }

  const handleRegisterAndPay = async () => {
    if (!formData.name || !formData.email || !formData.phone || !isVerified || !selectedPlan) {
      toast.error("Please complete all fields and verify your email.")
      return
    }
    try {
      await createMember({
        fullName: formData.name,
        email: formData.email,
        membershipStatus: "PENDING",
        phoneNumber: formData.phone,
      })
      const notificationResult = await sendRegistrationNotification(
        formData.name,
        formData.email,
        formData.phone
      )

      if (notificationResult.success) {
        toast.success("Registration successful! Admin notification sent. Redirecting to payment...")
      } else {
        toast.success("Registration successful! Redirecting to payment...")
        console.warn("Failed to send notification email:", notificationResult.error)
      }

      window.open(membershipUrl, "_blank")
      onClose()
    } catch (error: unknown) {
      // Handle specific validation errors
      if (typeof error === "object" && error !== null && "message" in error && typeof (error as { message: unknown }).message === "string") {
        const message = (error as { message: string }).message;
        if (message.includes("email") || message.includes("Email")) {
          toast.error("This email address is already registered. Please use a different email.")
        } else if (message.includes("phone") || message.includes("Phone")) {
          toast.error("This phone number is already registered. Please use a different number.")
        } else {
          toast.error("Failed to register member. Please try again.")
        }
      } else {
        toast.error("Failed to register member. Please try again.")
      }
    } finally {
      setFormData({ name: "", email: "", phone: "", verificationCode: "" })
      setIsVerificationSent(false)
      setIsVerified(false)
    }
  }

  const handleClose = () => {
    setFormData({ name: "", email: "", phone: "", verificationCode: "" })
    setIsVerificationSent(false)
    setIsVerified(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Complete Your Registration</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {selectedPlan && (
            <div className="mt-2">
              <Badge className={`bg-gradient-to-r ${selectedPlan.color} text-white`}>
                {selectedPlan.name} - {selectedPlan.price}
              </Badge>
            </div>
          )}
        </div>

        <div className="px-6 py-4 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <div className="flex gap-2">
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1"
                />
                {!isVerificationSent && (
                  <Button
                    onClick={handleSendVerification}
                    disabled={!formData.email || isSendingCode}
                    size="sm"
                    variant="outline"
                  >
                    {isSendingCode ? "Sending..." : "Send Code"}
                  </Button>
                )}
              </div>
            </div>

            {isVerificationSent && !isVerified && (
              <div className="space-y-2">
                <Label htmlFor="verification" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Verification Code
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="verification"
                    value={formData.verificationCode}
                    onChange={(e) => handleInputChange("verificationCode", e.target.value)}
                    placeholder="Enter verification code"
                    className="flex-1"
                  />
                  <Button
                    onClick={handleVerifyCode}
                    disabled={!formData.verificationCode || isVerifying}
                    size="sm"
                  >
                    {isVerifying ? "Verifying..." : "Verify"}
                  </Button>
                </div>
                <p className="text-sm text-gray-500">Check your email for the verification code</p>
                <div className="flex gap-2">
                  <Button
                    onClick={handleSendVerification}
                    disabled={isSendingCode}
                    size="sm"
                    variant="ghost"
                    className="text-xs"
                  >
                    {isSendingCode ? "Resending..." : "Resend Code"}
                  </Button>
                </div>
              </div>
            )}

            {isVerified && (
              <div className="flex items-center gap-2 text-green-600 text-sm">
                <Check className="w-4 h-4" />
                Email verified successfully!
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>

          {isVerified && (
            <>
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="font-semibold mb-2 flex items-center justify-center gap-2">
                    <QrCode className="w-5 h-5" />
                    FAPRNA Membership QR Code
                  </h3>
                  <div className="flex justify-center mb-4">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                      <Image
                        src="/faprna-reg.jpg"
                        alt="FAPRNA Membership QR Code"
                        width={200}
                        height={200}
                        className="mx-auto"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Scan this QR code for quick access to membership information
                  </p>
                </div>
              </div>

              <Separator />
            </>
          )}

          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">Next Steps:</h3>
              <ol className="text-sm text-blue-800 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    1
                  </span>
                  Complete this registration form
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    2
                  </span>
                  Click &quot;Pay Now to go to Zeffy&quot;
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    3
                  </span>
                  Select the <strong>{selectedPlan?.name}</strong> plan on Zeffy
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    4
                  </span>
                  Complete your payment to finalize registration
                </li>
              </ol>
            </div>

            <Button
              onClick={handleRegisterAndPay}
              disabled={!formData.name || !formData.email || !formData.phone || !isVerified}
              className={`w-full bg-gradient-to-r ${selectedPlan?.color || "from-blue-500 to-indigo-600"} text-white py-3 text-lg font-semibold`}
            >
              <ArrowRight className="w-5 h-5 mr-2" />
              Pay Now on Zeffy
            </Button>

            <p className="text-xs text-gray-500 text-center">
              You will be redirected to Zeffy to complete your payment. Make sure to select the same membership
              plan you chose here.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
