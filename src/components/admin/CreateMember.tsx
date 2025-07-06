"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, User, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { createMember } from "@/lib/actions/members-actions";

interface FormValues {
  fullName: string;
  email: string;
  membershipStatus: "APPROVED" | "DENIED" | "PENDING";
  phoneNumber?: string;
}

export default function CreateMemberForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      membershipStatus: "PENDING",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      await createMember({
        fullName: values.fullName,
        email: values.email,
        membershipStatus: values.membershipStatus,
        phoneNumber: values.phoneNumber || null,
      });

      toast("Member created successfully");
      router.push("/admin/members");
      router.refresh();
    } catch (error) {
      console.error("Failed to create member:", error);
      toast(
        "Failed to create member. Please check if the email is already in use."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="w-full min-h-screen flex flex-col"
      style={{ background: "#003366" }}
    >
      {/* Header */}
      <div className="px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 md:pt-8 lg:pt-12 pb-6 sm:pb-8 md:pb-10 lg:pb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white drop-shadow-lg">
          Create New Member
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white mt-2 sm:mt-3 md:mt-4 font-semibold drop-shadow">
          Add a new member to the FAPRNA-NV system
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 md:pb-8 lg:pb-12">
        <div className="grid gap-4 sm:gap-6 md:gap-8 lg:gap-10 grid-cols-1 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <Card className="p-3 sm:p-4 md:p-5 lg:p-6">
              <CardHeader className="pb-4 sm:pb-5 md:pb-6 lg:pb-8">
                <CardTitle className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
                  Member Information
                </CardTitle>
                <CardDescription className="text-sm sm:text-base md:text-lg lg:text-xl">
                  Fill in the details below to create a new member account.
                </CardDescription>
              </CardHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <CardContent className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                      {/* Full Name */}
                      <FormField
                        control={form.control}
                        name="fullName"
                        rules={{
                          required: "Full name is required",
                          minLength: {
                            value: 2,
                            message: "Full name must be at least 2 characters",
                          },
                        }}
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
                              Full Name
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                                <Input
                                  placeholder="Enter full name"
                                  className="pl-10 text-sm sm:text-base md:text-lg"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormDescription className="text-sm sm:text-base md:text-lg">
                              The member&apos;s full name as it should appear in the
                              system.
                            </FormDescription>
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
                            <FormLabel className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
                              Email Address
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                                <Input
                                  type="email"
                                  placeholder="Enter email address"
                                  className="pl-10 text-sm sm:text-base md:text-lg"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormDescription className="text-sm sm:text-base md:text-lg">
                              This will be used for login and communications.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Membership Status */}
                      <FormField
                        control={form.control}
                        name="membershipStatus"
                        rules={{
                          required: "Please select a membership status",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
                              Membership Status
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="text-sm sm:text-base md:text-lg">
                                  <SelectValue placeholder="Select membership status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="PENDING">Pending</SelectItem>
                                <SelectItem value="APPROVED">
                                  Approved
                                </SelectItem>
                                <SelectItem value="DENIED">Denied</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription className="text-sm sm:text-base md:text-lg">
                              Set the initial membership status for this member.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between p-3 sm:p-6 pt-8 sm:pt-10 md:pt-12 pb-8 sm:pb-10 md:pb-12">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.push("/admin/members")}
                      className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold px-8 py-4 sm:px-10 sm:py-5 md:px-12 md:py-6 min-w-32 sm:min-w-36 md:min-w-40"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold px-8 py-4 sm:px-10 sm:py-5 md:px-12 md:py-6 min-w-40 sm:min-w-44 md:min-w-48"
                    >
                      {isSubmitting && (
                        <Loader2 className="mr-2 h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 animate-spin" />
                      )}
                      Create Member
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </div>

          <div className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10">
            {/* Preview Card */}
            <Card className="p-3 sm:p-4 md:p-5 lg:p-6">
              <CardHeader className="pb-4 sm:pb-5 md:pb-6 lg:pb-8">
                <CardTitle className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
                  Member Preview
                </CardTitle>
                <CardDescription className="text-sm sm:text-base md:text-lg lg:text-xl">
                  Preview of how the member will appear in the system
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 pb-4 sm:pb-5 md:pb-6 lg:pb-8">
                <div className="flex flex-col items-center space-y-4">
                  <div className="text-center">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold">
                      {form.watch("fullName") || "Member Name"}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-500">
                      {form.watch("email") || "member@example.com"}
                    </p>
                    <div className="mt-2 sm:mt-3">
                      {form.watch("membershipStatus") === "APPROVED" && (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs sm:text-sm font-medium text-green-800">
                          Approved
                        </span>
                      )}
                      {form.watch("membershipStatus") === "PENDING" && (
                        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs sm:text-sm font-medium text-yellow-800">
                          Pending
                        </span>
                      )}
                      {form.watch("membershipStatus") === "DENIED" && (
                        <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs sm:text-sm font-medium text-red-800">
                          Denied
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Guidelines */}
            <Card className="p-3 sm:p-4 md:p-5 lg:p-6">
              <CardHeader className="pb-4 sm:pb-5 md:pb-6 lg:pb-8">
                <CardTitle className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
                  Guidelines
                </CardTitle>
                <CardDescription className="text-sm sm:text-base md:text-lg lg:text-xl">
                  Important information when creating members
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 pb-4 sm:pb-5 md:pb-6 lg:pb-8">
                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base md:text-lg">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="mt-1 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-blue-500 flex-shrink-0" />
                    <p>Email addresses must be unique in the system</p>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="mt-1 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-blue-500 flex-shrink-0" />
                    <p>
                      Members can update their profile information after login
                    </p>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="mt-1 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-blue-500 flex-shrink-0" />
                    <p>
                      Membership status can be changed later from the members
                      list
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
