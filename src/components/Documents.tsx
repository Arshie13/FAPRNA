"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import {
  FileText,
  Download,
  Search,
  Grid,
  List,
  Calendar,
  Eye,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { getAllDocuments } from "@/lib/actions/document-actions"

interface Document {
  id: string
  name: string
  description: string | null
  fileUrl: string
  createdAt: Date
}

export default function DocumentsDashboard() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setIsLoading(true)
        const docs = await getAllDocuments()
        // Filter only public documents for public view
        // const publicDocs = docs.filter((doc) => doc.isPublic)
        setDocuments(docs)
        setFilteredDocuments(docs)
      } catch (error) {
        console.error("Failed to fetch documents:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchDocuments()
  }, [])

  // Filter documents based on search and category
  useEffect(() => {
    let filtered = documents

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (doc) =>
          doc.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredDocuments(filtered)
  }, [documents, searchQuery])

  // Handle document download
  const handleDownload = (doc: Document) => {
    const link = document.createElement("a")
    link.href = doc.fileUrl
    link.download = doc.name
    link.click()
  }

  // Handle document view
  const handleView = (doc: Document) => {
    window.open(doc.fileUrl, "_blank")
  }

  const DocumentCard = ({ doc }: { doc: Document }) => (
    <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
      <div className="relative">

        {/* Document Info */}
        <CardContent className="p-6">
          <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {doc.name}
          </h3>
          <p className="line-clamp-6">
            {doc.description}
          </p>
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-2" />
              {format(new Date(doc.createdAt), "MMM d, yyyy")}
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleView(doc)}
              className="flex-1 hover:bg-blue-50 hover:border-blue-300 bg-transparent"
            >
              <Eye className="w-4 h-4 mr-2" />
              View
            </Button>
            <Button size="sm" onClick={() => handleDownload(doc)} className="flex-1 bg-blue-600 hover:bg-blue-700">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  )

  const DocumentListItem = ({ doc }: { doc: Document }) => (
    <Card className="hover:shadow-md transition-all duration-200 bg-white">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText className="w-6 h-6 text-white" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-gray-900 truncate pr-4">{doc.name}</h3>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {format(new Date(doc.createdAt), "MMM d, yyyy")}
              </span>
            </div>
          </div>

          <div className="flex gap-2 flex-shrink-0">
            <Button variant="outline" size="sm" onClick={() => handleView(doc)} className="bg-transparent">
              <Eye className="w-4 h-4" />
            </Button>
            <Button size="sm" onClick={() => handleDownload(doc)} className="bg-blue-600 hover:bg-blue-700">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-300 rounded w-64"></div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-300 h-64 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Document Library</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Access important documents, bylaws, meeting minutes, and resources from FAPRNA-NV
            </p>
          </div>

          {/* Search and Filters */}
          <Card className="bg-white border-0 shadow-lg mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex-1 w-full md:max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search documents..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-transparent"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* View Mode Toggle */}
                  <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="gap-2"
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="gap-2"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.location.reload()}
                    className="gap-2 bg-transparent"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Refresh
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Documents Display */}
        {filteredDocuments.length === 0 ? (
          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Documents Found</h3>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredDocuments.length} of {documents.length} documents
                {searchQuery && (
                  <span>
                    {" "}
                    for &quot;<strong>{searchQuery}</strong>&quot;
                  </span>
                )}
              </p>
            </div>

            {/* Documents Grid/List */}
            {viewMode === "grid" ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredDocuments.map((doc) => (
                  <DocumentCard key={doc.id} doc={doc} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredDocuments.map((doc) => (
                  <DocumentListItem key={doc.id} doc={doc} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
