"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { ArrowLeft, Mail, Calendar, Award, Check, X, UserCheck, UserX, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { updateMemberStatus } from "@/lib/actions/members-actions"

type MembershipStatus = "APPROVED" | "DENIED" | "PENDING"

interface MemberDetailsProps {
  member: {
    id: string
    fullName: string
    email: string
    membershipStatus: MembershipStatus
    image: string
    nominationsMade: Array<{
      id: string
      category: string
      status: string
      createdAt: Date
    }>
    EventUser: Array<{
      id: string
      event: {
        id: string
        title: string
        date: Date
      }
    }>
    _count: {
      nominationsMade: number
      EventUser: number
    }
  }
}

export default function MemberDetails({ member }: MemberDetailsProps) {
  const [isUpdating, setIsUpdating] = useState(false)
  const router = useRouter()

  const handleStatusUpdate = async (status: MembershipStatus) => {
    setIsUpdating(true)
    try {
      await updateMemberStatus(member.id, status)
      toast(`Member ${status.toLowerCase()} successfully`)
      router.push("/admin/members")
      router.refresh()
    } catch (error) {
      console.error("Failed to update member status:", error)
      toast("Failed to update member status")
    } finally {
      setIsUpdating(false)
    }
  }

  const getStatusBadge = (status: MembershipStatus) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        )
      case "APPROVED":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            <UserCheck className="mr-1 h-3 w-3" />
            Approved
          </Badge>
        )
      case "DENIED":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
            <UserX className="mr-1 h-3 w-3" />
            Denied
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 flex items-center gap-4">
        <Button variant="outline" onClick={() => router.push("/admin/members")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Members
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Member Details</h1>
          <p className="text-gray-500">View and manage member information</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Member Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={member.image || "/placeholder.svg"} alt={member.fullName} />
                    <AvatarFallback className="text-lg">{getInitials(member.fullName)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl">{member.fullName}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Mail className="h-4 w-4" />
                      {member.email}
                    </CardDescription>
                  </div>
                </div>
                {getStatusBadge(member.membershipStatus)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{member._count.nominationsMade}</div>
                  <div className="text-sm text-blue-800">Nominations Made</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{member._count.EventUser}</div>
                  <div className="text-sm text-green-800">Events Attended</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Nominations */}
          <Card>
            <CardHeader>
              <CardTitle>Nominations Made ({member.nominationsMade.length})</CardTitle>
              <CardDescription>Nominations submitted by this member</CardDescription>
            </CardHeader>
            <CardContent>
              {member.nominationsMade.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Award className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No nominations made yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {member.nominationsMade.map((nomination) => (
                    <div key={nomination.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Award className="h-5 w-5 text-purple-500" />
                        <div>
                          <p className="font-medium">{nomination.category}</p>
                          <p className="text-sm text-gray-500">
                            {format(new Date(nomination.createdAt), "MMM d, yyyy")}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          nomination.status === "APPROVED"
                            ? "bg-green-100 text-green-800 border-green-200"
                            : nomination.status === "REJECTED"
                              ? "bg-red-100 text-red-800 border-red-200"
                              : "bg-yellow-100 text-yellow-800 border-yellow-200"
                        }
                      >
                        {nomination.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Events */}
          <Card>
            <CardHeader>
              <CardTitle>Events Attended ({member.EventUser.length})</CardTitle>
              <CardDescription>Events this member has participated in</CardDescription>
            </CardHeader>
            <CardContent>
              {member.EventUser.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No events attended yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {member.EventUser.map((eventUser) => (
                    <div key={eventUser.id} className="flex items-center gap-3 p-4 border rounded-lg">
                      <Calendar className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">{eventUser.event.title}</p>
                        <p className="text-sm text-gray-500">{format(new Date(eventUser.event.date), "MMM d, yyyy")}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Member Information */}
          <Card>
            <CardHeader>
              <CardTitle>Member Information</CardTitle>
              <CardDescription>Basic member details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Full Name</label>
                  <p className="text-gray-900">{member.fullName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email Address</label>
                  <p className="text-gray-900">{member.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Member ID</label>
                  <p className="text-gray-900 font-mono text-sm">{member.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Membership Status</label>
                  <div className="mt-1">{getStatusBadge(member.membershipStatus)}</div>
                </div>
                {/* Status Change Dropdown */}
                <div>
                  <label className="text-sm font-medium text-gray-500">Change Status</label>
                  <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
                    value={member.membershipStatus}
                    onChange={async (e) => {
                      const newStatus = e.target.value as MembershipStatus
                      if (newStatus !== member.membershipStatus) {
                        await handleStatusUpdate(newStatus)
                      }
                    }}
                    disabled={isUpdating}
                  >
                    <option value="PENDING">Pending</option>
                    <option value="APPROVED">Approved</option>
                    <option value="DENIED">Denied</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          {member.membershipStatus === "PENDING" && (
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
                <CardDescription>Review and decide on membership application</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="w-full bg-green-600 hover:bg-green-700" disabled={isUpdating}>
                        <Check className="mr-2 h-4 w-4" />
                        Approve Membership
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Approve Membership</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to approve {member.fullName}&apos;s membership application? This will
                          grant them full access to member benefits.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-green-600 text-white hover:bg-green-700"
                          onClick={() => handleStatusUpdate("APPROVED")}
                        >
                          Approve
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full border-red-200 text-red-600 hover:bg-red-50"
                        disabled={isUpdating}
                      >
                        <X className="mr-2 h-4 w-4" />
                        Deny Membership
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Deny Membership</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to deny {member.fullName}&apos;s membership application? This action
                          cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-600 text-white hover:bg-red-700"
                          onClick={() => handleStatusUpdate("DENIED")}
                        >
                          Deny
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Activity Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Activity Summary</CardTitle>
              <CardDescription>Member engagement overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Nominations Made</span>
                  <span className="text-sm font-medium">{member._count.nominationsMade}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Events Attended</span>
                  <span className="text-sm font-medium">{member._count.EventUser}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Account Status</span>
                  <span className="text-sm font-medium">{member.membershipStatus}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
