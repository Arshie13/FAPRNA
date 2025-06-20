"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { ArrowLeft, User, Calendar, Award, MessageSquare, Check, X } from "lucide-react"
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
import { updateNominationStatus } from "@/lib/actions/nomination-actions"

interface NominationDetailsProps {
  nomination: {
    id: string
    nominatorId: string
    nominee1Id: string
    nominee2Id?: string
    nominee3Id?: string
    createdAt: Date
    updatedAt: Date
    category: string
    reason: string
    status: string
    nominator: {
      id: string
      fullName: string
      email: string
    }
    nominee1: {
      id: string
      fullName: string
      email: string
    }
    nominee2?: {
      id: string
      fullName: string
      email: string
    }
    nominee3?: {
      id: string
      fullName: string
      email: string
    }
  }
}

export default function NominationDetails({ nomination }: NominationDetailsProps) {
  const [isUpdating, setIsUpdating] = useState(false)
  const router = useRouter()

  const handleStatusUpdate = async (status: string) => {
    setIsUpdating(true)
    try {
      await updateNominationStatus(nomination.id, status)
      toast(`Nomination ${status.toLowerCase()} successfully`)
      router.push("/admin/nominations")
      router.refresh()
    } catch (error) {
      console.error(error)
      toast("Failed to update nomination status")
    } finally {
      setIsUpdating(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            Pending
          </Badge>
        )
      case "APPROVED":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            Approved
          </Badge>
        )
      case "REJECTED":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const nominees = [nomination.nominee1, nomination.nominee2, nomination.nominee3].filter(Boolean)

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 flex items-center gap-4">
        <Button variant="outline" onClick={() => router.push("/admin/nominations")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Nominations
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nomination Details</h1>
          <p className="text-gray-500">Review nomination information and take action</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Nomination Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-blue-500" />
                    {nomination.category}
                  </CardTitle>
                  <CardDescription>
                    Submitted on {format(new Date(nomination.createdAt), "MMMM d, yyyy 'at' h:mm a")}
                  </CardDescription>
                </div>
                {getStatusBadge(nomination.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Nomination Reason
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 whitespace-pre-wrap">{nomination.reason}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Nominees */}
          <Card>
            <CardHeader>
              <CardTitle>Nominees ({nominees.length})</CardTitle>
              <CardDescription>People nominated in this submission</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {nominees.map((nominee, index) => (
                  <div key={nominee.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-gray-900">{nominee.fullName}</h4>
                        {index === 0 && (
                          <Badge variant="outline" className="text-xs">
                            Primary
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{nominee.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Nominator Information */}
          <Card>
            <CardHeader>
              <CardTitle>Nominator</CardTitle>
              <CardDescription>Person who submitted this nomination</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                  <User className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{nomination.nominator.fullName}</h4>
                  <p className="text-sm text-gray-500">{nomination.nominator.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
              <CardDescription>Nomination history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                    <Calendar className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Nomination Submitted</p>
                    <p className="text-xs text-gray-500">
                      {format(new Date(nomination.createdAt), "MMM d, yyyy 'at' h:mm a")}
                    </p>
                  </div>
                </div>
                {nomination.updatedAt.getTime() !== nomination.createdAt.getTime() && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                      <Calendar className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Last Updated</p>
                      <p className="text-xs text-gray-500">
                        {format(new Date(nomination.updatedAt), "MMM d, yyyy 'at' h:mm a")}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          {nomination.status === "PENDING" && (
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
                <CardDescription>Review and decide on this nomination</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="w-full bg-green-600 hover:bg-green-700" disabled={isUpdating}>
                        <Check className="mr-2 h-4 w-4" />
                        Approve Nomination
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Approve Nomination</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to approve this nomination for {nomination.category}? This action cannot
                          be undone.
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
                        Reject Nomination
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Reject Nomination</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to reject this nomination for {nomination.category}? This action cannot
                          be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-600 text-white hover:bg-red-700"
                          onClick={() => handleStatusUpdate("REJECTED")}
                        >
                          Reject
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
