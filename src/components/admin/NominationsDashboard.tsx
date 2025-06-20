"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { Eye, Check, X, Clock, Search, Filter, RefreshCw, Award, User, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { getAllNominations, updateNominationStatus, getNominationStats } from "@/lib/actions/nomination-actions"
import { Nomination, NominationStats } from "@/lib/interfaces"

export default function NominationsAdminDashboard() {
  const [nominations, setNominations] = useState<Nomination[]>([])
  const [stats, setStats] = useState<NominationStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const router = useRouter()

  // Fetch nominations data
  const fetchNominations = async () => {
    setIsLoading(true)
    try {
      const [nominationsData, statsData] = await Promise.all([getAllNominations(), getNominationStats()])
      if (nominationsData.length === 0) {
        toast("No nominations found")
        setNominations([])
        setStats(null)
      } else {
        console.log("Fetched nominations:", nominationsData)
        toast("Nominations fetched successfully")
        setNominations(nominationsData)
      }
      setStats(statsData)
    } catch (error) {
      console.log("Error: ", error)
      toast("Failed to fetch nominations")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchNominations()
  }, [])

  // Handle status update
  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await updateNominationStatus(id, status)
      toast(`Nomination ${status.toLowerCase()} successfully`)
      fetchNominations()
    } catch (error) {
      console.error("Error: ", error)
      toast("Failed to update nomination status")
    }
  }

  // Filter nominations based on search query and active tab
  const filteredNominations = nominations.filter((nomination) => {
    const matchesSearch =
      nomination.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nomination.nominator.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nomination.nominee1.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nomination.reason.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "pending") return matchesSearch && nomination.status === "PENDING"
    if (activeTab === "approved") return matchesSearch && nomination.status === "APPROVED"
    if (activeTab === "rejected") return matchesSearch && nomination.status === "REJECTED"

    return matchesSearch
  })

  // Get badge variant based on status
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

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nominations Management</h1>
          <p className="text-gray-500">Review and manage user nominations</p>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Nominations</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <Check className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <X className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Nominations Dashboard</CardTitle>
          <CardDescription>
            Review, approve, or reject user nominations. Click on a nomination to see full details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search nominations..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={fetchNominations} className="gap-1">
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => setActiveTab("all")}>All Nominations</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("pending")}>Pending</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("approved")}>Approved</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("rejected")}>Rejected</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6 grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Nominator</TableHead>
                      <TableHead>Primary Nominee</TableHead>
                      <TableHead>Date Submitted</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          Loading nominations...
                        </TableCell>
                      </TableRow>
                    ) : filteredNominations.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No nominations found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredNominations.map((nomination) => (
                        <TableRow key={nomination.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <Award className="h-4 w-4 text-blue-500" />
                              {nomination.category}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-gray-500" />
                              <div>
                                <div className="font-medium">{nomination.nominator.fullName}</div>
                                <div className="text-sm text-gray-500">{nomination.nominator.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-gray-500" />
                              <div>
                                <div className="font-medium">{nomination.nominee1.fullName}</div>
                                <div className="text-sm text-gray-500">{nomination.nominee1.email}</div>
                                {(nomination.nominee2 || nomination.nominee3) && (
                                  <div className="text-xs text-blue-600">
                                    +{[nomination.nominee2, nomination.nominee3].filter(Boolean).length} more
                                  </div>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              {format(new Date(nomination.createdAt), "MMM d, yyyy")}
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(nomination.status)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => router.push(`/admin/nominations/${nomination.id}`)}
                              >
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View Details</span>
                              </Button>
                              {nomination.status === "PENDING" && (
                                <>
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button variant="ghost" size="icon">
                                        <Check className="h-4 w-4 text-green-600" />
                                        <span className="sr-only">Approve</span>
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Approve Nomination</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Are you sure you want to approve this nomination for {nomination.category}?
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                          className="bg-green-600 text-white hover:bg-green-700"
                                          onClick={() => handleStatusUpdate(nomination.id, "APPROVED")}
                                        >
                                          Approve
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button variant="ghost" size="icon">
                                        <X className="h-4 w-4 text-red-600" />
                                        <span className="sr-only">Reject</span>
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Reject Nomination</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Are you sure you want to reject this nomination for {nomination.category}?
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                          className="bg-red-600 text-white hover:bg-red-700"
                                          onClick={() => handleStatusUpdate(nomination.id, "REJECTED")}
                                        >
                                          Reject
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
