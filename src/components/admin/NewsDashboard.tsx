"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Calendar, Edit, Eye, Trash2, Plus, Star, StarOff, Filter, Search, RefreshCw } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { getAllEvents, deleteEvent, setLatestEvent } from "@/lib/actions/event-actions"

type EventType = "EVENT" | "RECOGNITION" | "TEAM"

interface Event {
  id: string
  type: EventType
  title: string
  time: string
  date: Date
  location: string
  address: string
  description: string
  ceus: number
  image: string
  expected_attendees: number
  createdAt: Date
  updatedAt: Date
  isFinished: boolean
  isLatest: boolean
}

export default function EventAdminDashboard() {
  const [eventItems, setEventItems] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const router = useRouter()

  const fetchEvents = async () => {
    setIsLoading(true)
    try {
      const data = await getAllEvents();
      setEventItems(data);
      setIsLoading(false);
    } catch {
      toast("Failed to fetch event items");
      setIsLoading(false);
    }
  }

  // Handle delete event
  const handleDeleteEvent = async (id: string) => {
    try {
      await deleteEvent(id)
      toast("Event item deleted successfully")
      fetchEvents()
    } catch {
      toast("Failed to delete event item")
    }
  }

  // Handle set as latest
  const handleSetLatest = async (id: string) => {
    try {
      await setLatestEvent(id)
      toast("Event item set as latest successfully")
      fetchEvents()
    } catch {
      toast("Failed to update event item")
    }
  }

  // Filter events based on search query and active tab
  const filteredEvents = eventItems.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "events") return matchesSearch && event.type === "EVENT"
    if (activeTab === "recognition") return matchesSearch && event.type === "RECOGNITION"
    if (activeTab === "team") return matchesSearch && event.type === "TEAM"
    if (activeTab === "latest") return matchesSearch && event.isLatest
    if (activeTab === "finished") return matchesSearch && event.isFinished

    return matchesSearch
  })

  // Get badge color based on event type
  const getBadgeVariant = (type: EventType) => {
    switch (type) {
      case "EVENT":
        return "blue"
      case "RECOGNITION":
        return "purple"
      case "TEAM":
        return "green"
      default:
        return "secondary"
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Event Management</h1>
          <p className="text-gray-500">Manage all events, announcements, and recognitions</p>
        </div>
        <Link href="/admin/events/create">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Events
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Events Dashboard</CardTitle>
          <CardDescription>
            View, edit, and manage all event items. Click on a event item to see more details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search events..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={fetchEvents} className="gap-1">
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
                  <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => setActiveTab("all")}>All Events</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("events")}>Events</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("recognition")}>Recognition</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("team")}>Team</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setActiveTab("latest")}>Latest Events</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("finished")}>Finished Events</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6 grid w-full grid-cols-3 md:grid-cols-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="recognition">Recognition</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="latest">Latest</TabsTrigger>
              <TabsTrigger value="finished">Finished</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          Loading event items...
                        </TableCell>
                      </TableRow>
                    ) : filteredEvents.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No event items found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredEvents.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              {event.isLatest && <Star className="h-4 w-4 text-yellow-500" />}
                              {event.title}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={`bg-${getBadgeVariant(event.type)}-100 text-${getBadgeVariant(event.type)}-800 border-${getBadgeVariant(event.type)}-200`}
                            >
                              {event.type}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              {format(new Date(event.date), "MMM d, yyyy")}
                            </div>
                          </TableCell>
                          <TableCell>{event.location}</TableCell>
                          <TableCell>
                            {event.isFinished ? (
                              <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
                                Finished
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                                Active
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => router.push(`/event-registration/details/${event.id}`)}
                              >
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => router.push(`/admin/events/edit/${event.id}`)}
                              >
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleSetLatest(event.id)}>
                                {event.isLatest ? <StarOff className="h-4 w-4" /> : <Star className="h-4 w-4" />}
                                <span className="sr-only">
                                  {event.isLatest ? "Remove from latest" : "Set as latest"}
                                </span>
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                    <span className="sr-only">Delete</span>
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. This will permanently delete the event item &quot;
                                      {event.title}&quot;.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      className="bg-red-600 text-white hover:bg-red-700"
                                      onClick={() => handleDeleteEvent(event.id)}
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
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
