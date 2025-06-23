"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2, User, Mail } from 'lucide-react'
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { createMember } from "@/lib/actions/members-actions"

interface FormValues {
  fullName: string
  email: string
  membershipStatus: "APPROVED" | "DENIED" | "PENDING"
  phoneNumber?: string
}

export default function CreateMemberForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const form = useForm<FormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      membershipStatus: "PENDING",
    },
  })

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true)
    try {
      await createMember({
        fullName: values.fullName,
        email: values.email,
        membershipStatus: values.membershipStatus,
        phoneNumber: values.phoneNumber || null,
      })
      
      toast("Member created successfully")
      router.push("/admin/members")
      router.refresh()
    } catch (error) {
      console.error("Failed to create member:", error)
      toast("Failed to create member. Please check if the email is already in use.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 flex items-center gap-4">
        <Button variant="outline" onClick={() => router.push("/admin/members")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Members
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Member</h1>
          <p className="text-gray-500">Add a new member to the FAPRNA-NV system</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Member Information</CardTitle>
              <CardDescription>Fill in the details below to create a new member account.</CardDescription>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Full Name */}
                    <FormField
                      control={form.control}
                      name="fullName"
                      rules={{
                        required: "Full name is required",
                        minLength: { value: 2, message: "Full name must be at least 2 characters" },
                      }}
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input placeholder="Enter full name" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormDescription>The member&apos;s full name as it should appear in the system.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Email */}
                    <FormField
                      control={form.control}
                      name="email"
                      rules={{
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input type="email" placeholder="Enter email address" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormDescription>This will be used for login and communications.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Membership Status */}
                    <FormField
                      control={form.control}
                      name="membershipStatus"
                      rules={{ required: "Please select a membership status" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Membership Status</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select membership status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="PENDING">Pending</SelectItem>
                              <SelectItem value="APPROVED">Approved</SelectItem>
                              <SelectItem value="DENIED">Denied</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>Set the initial membership status for this member.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => router.push("/admin/members")}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create Member
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Preview Card */}
          <Card>
            <CardHeader>
              <CardTitle>Member Preview</CardTitle>
              <CardDescription>Preview of how the member will appear in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <div className="text-center">
                  <p className="text-sm text-gray-500">{form.watch("email") || "member@example.com"}</p>
                  <div className="mt-2">
                    {form.watch("membershipStatus") === "APPROVED" && (
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Approved
                      </span>
                    )}
                    {form.watch("membershipStatus") === "PENDING" && (
                      <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                        Pending
                      </span>
                    )}
                    {form.watch("membershipStatus") === "DENIED" && (
                      <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                        Denied
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Guidelines */}
          <Card>
            <CardHeader>
              <CardTitle>Guidelines</CardTitle>
              <CardDescription>Important information when creating members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500" />
                  <p>Email addresses must be unique in the system</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500" />
                  <p>Members can update their profile information after login</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500" />
                  <p>Membership status can be changed later from the members list</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}