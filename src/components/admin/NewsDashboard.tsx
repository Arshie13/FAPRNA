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
import { deleteNews, setLatestNews } from "@/lib/actions/news-actions"

type NewsType = "EVENT" | "RECOGNITION" | "TEAM"

interface News {
  id: string
  type: NewsType
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

export default function NewsAdminDashboard() {
  const [newsItems, setNewsItems] = useState<News[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const router = useRouter()

  // Fetch news data
  const fetchNews = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/news")
      const data = await response.json();
      setNewsItems(data);
      setIsLoading(false);
    } catch {
      toast("Failed to fetch news items")
      setIsLoading(false);
    }
  }

  // Handle delete news
  const handleDeleteNews = async (id: string) => {
    try {
      await deleteNews(id)
      toast("News item deleted successfully")
      fetchNews()
    } catch {
      toast("Failed to delete news item")
    }
  }

  // Handle set as latest
  const handleSetLatest = async (id: string) => {
    try {
      await setLatestNews(id)
      toast("News item set as latest successfully")
      fetchNews()
    } catch {
      toast("Failed to update news item")
    }
  }

  // Filter news based on search query and active tab
  const filteredNews = newsItems.filter((news) => {
    const matchesSearch =
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.location.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "events") return matchesSearch && news.type === "EVENT"
    if (activeTab === "recognition") return matchesSearch && news.type === "RECOGNITION"
    if (activeTab === "team") return matchesSearch && news.type === "TEAM"
    if (activeTab === "latest") return matchesSearch && news.isLatest
    if (activeTab === "finished") return matchesSearch && news.isFinished

    return matchesSearch
  })

  // Get badge color based on news type
  const getBadgeVariant = (type: NewsType) => {
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
    fetchNews()
  }, [])

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">News Management</h1>
          <p className="text-gray-500">Manage all news, events, and announcements</p>
        </div>
        <Link href="/admin/news/create">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create News
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>News Dashboard</CardTitle>
          <CardDescription>
            View, edit, and manage all news items. Click on a news item to see more details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search news..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={fetchNews} className="gap-1">
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
                  <DropdownMenuItem onClick={() => setActiveTab("all")}>All News</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("events")}>Events</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("recognition")}>Recognition</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("team")}>Team</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setActiveTab("latest")}>Latest News</DropdownMenuItem>
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
                          Loading news items...
                        </TableCell>
                      </TableRow>
                    ) : filteredNews.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No news items found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredNews.map((news) => (
                        <TableRow key={news.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              {news.isLatest && <Star className="h-4 w-4 text-yellow-500" />}
                              {news.title}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={`bg-${getBadgeVariant(news.type)}-100 text-${getBadgeVariant(news.type)}-800 border-${getBadgeVariant(news.type)}-200`}
                            >
                              {news.type}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              {format(new Date(news.date), "MMM d, yyyy")}
                            </div>
                          </TableCell>
                          <TableCell>{news.location}</TableCell>
                          <TableCell>
                            {news.isFinished ? (
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
                                onClick={() => router.push(`/event-registration/details/${news.id}`)}
                              >
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => router.push(`/admin/news/edit/${news.id}`)}
                              >
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleSetLatest(news.id)}>
                                {news.isLatest ? <StarOff className="h-4 w-4" /> : <Star className="h-4 w-4" />}
                                <span className="sr-only">
                                  {news.isLatest ? "Remove from latest" : "Set as latest"}
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
                                      This action cannot be undone. This will permanently delete the news item &quot;
                                      {news.title}&quot;.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      className="bg-red-600 text-white hover:bg-red-700"
                                      onClick={() => handleDeleteNews(news.id)}
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
