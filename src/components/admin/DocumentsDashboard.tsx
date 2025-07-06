"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  FileText,
  Trash2,
  Search,
  RefreshCw,
  Eye,
  Plus,
  Download,
  File,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { getAllDocuments, deleteDocumentFromDb } from "@/lib/actions/document-actions"
import { useEdgeStore } from "@/lib/libstore/libstore-config"

interface Document {
  id: string
  name: string
  fileUrl: string
  createdAt?: Date
  size?: string
}

export default function DocumentsAdminDashboard() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const { edgestore } = useEdgeStore()

  // Fetch documents data
  const fetchDocuments = async () => {
    setIsLoading(true)
    try {
      const documentsData = await getAllDocuments()
      setDocuments(documentsData)
    } catch {
      toast("Failed to fetch documents")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDocuments()
  }, [])

  // Handle delete document
  const handleDeleteDocument = async (fileUrl: string, id: string) => {
    try {
      await deleteDocumentFromDb(id)
      await edgestore.publicFiles.delete({
        url: fileUrl
      })
      toast("Document deleted successfully")
      fetchDocuments()
    } catch {
      toast("Failed to delete document")
    }
  }

  // Filter documents based on search query and active tab
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  // Get file type icon and color
  const getFileIcon = (fileName: string) => {
    const extension = fileName.toLowerCase().split('.').pop()
    
    switch (extension) {
      case 'pdf':
        return <FileText className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-red-500" />
      case 'doc':
      case 'docx':
        return <File className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-blue-500" />
      case 'xls':
      case 'xlsx':
        return <File className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-green-500" />
      default:
        return <FileText className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-gray-500" />
    }
  }

  return (
    <div
      className="w-full py-4 sm:py-6 md:py-8 lg:py-12 min-h-screen px-4 sm:px-6 md:px-8"
      style={{ background: "#003366" }}
    >
      <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white drop-shadow-lg">
            Documents Management
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white mt-2 sm:mt-3 font-semibold drop-shadow">
            Upload and manage PDF documents and files
          </p>
        </div>
        <Link href="/admin/documents/upload">
          <Button className="gap-2 sm:gap-3 md:gap-4 h-auto p-3 sm:p-4 md:p-5 lg:p-6 text-sm sm:text-base md:text-lg lg:text-xl font-semibold bg-white text-[#003366] hover:bg-gray-100 hover:text-[#003366] w-full sm:w-auto">
            <Plus className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" />
            Upload Document
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="p-2 sm:p-3 md:p-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 sm:pb-3 md:pb-4">
            <CardTitle className="text-xs sm:text-sm md:text-base lg:text-xl font-bold">Total Documents</CardTitle>
            <FileText className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold">{documents.length}</div>
          </CardContent>
        </Card>
        <Card className="p-2 sm:p-3 md:p-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 sm:pb-3 md:pb-4">
            <CardTitle className="text-xs sm:text-sm md:text-base lg:text-xl font-bold">PDF Files</CardTitle>
            <FileText className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-red-500">
              {documents.filter(doc => doc.fileUrl.toLowerCase().endsWith('.pdf')).length}
            </div>
          </CardContent>
        </Card>
        <Card className="p-2 sm:p-3 md:p-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 sm:pb-3 md:pb-4">
            <CardTitle className="text-xs sm:text-sm md:text-base lg:text-xl font-bold">Other Files</CardTitle>
            <File className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-blue-500">
              {documents.filter(doc => !doc.name.toLowerCase().endsWith('.pdf')).length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="p-2 sm:p-3 md:p-4">
        <CardHeader className="pb-4 sm:pb-5 md:pb-6">
          <CardTitle className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">Documents Dashboard</CardTitle>
          <CardDescription className="text-sm sm:text-base md:text-lg lg:text-xl">
            Manage all uploaded PDF documents and files. Click on a document to view or download.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 sm:mb-8 flex flex-col gap-4 sm:gap-6">
            <div className="relative w-full">
              <Search className="absolute left-3 sm:left-4 top-3 sm:top-4 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-gray-500" />
              <Input
                placeholder="Search documents..."
                className="pl-10 sm:pl-12 md:pl-14 h-10 sm:h-11 md:h-12 text-sm sm:text-base md:text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Button
                variant="outline"
                onClick={fetchDocuments}
                className="gap-2 sm:gap-3 h-10 sm:h-11 md:h-12 px-4 sm:px-5 md:px-6 text-sm sm:text-base md:text-lg order-1"
              >
                <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                Refresh
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6 sm:mb-8 grid w-full grid-cols-1 h-10 sm:h-12 md:h-14">
              <TabsTrigger value="all" className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold">All Documents</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              <div className="rounded-lg sm:rounded-xl border shadow-sm overflow-hidden">
                {/* Mobile Cards View */}
                <div className="block lg:hidden">
                  {isLoading ? (
                    <div className="p-8 text-center">
                      <div className="text-base sm:text-lg">Loading documents...</div>
                    </div>
                  ) : filteredDocuments.length === 0 ? (
                    <div className="p-8 text-center">
                      <div className="text-base sm:text-lg">No documents found.</div>
                    </div>
                  ) : (
                    <div className="space-y-4 p-4">
                      {filteredDocuments.map((doc) => (
                        <Card key={doc.id} className="p-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3 flex-1">
                              {getFileIcon(doc.fileUrl)}
                              <div className="flex-1">
                                <h3 className="font-semibold text-sm">{doc.name}</h3>
                                <div className="space-y-1 text-xs text-gray-600">
                                  <div>Document ID: {doc.id.slice(-8)}</div>
                                  {doc.createdAt && (
                                    <div>Uploaded: {new Date(doc.createdAt).toLocaleDateString()}</div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-1">
                              <Button variant="ghost" size="sm" onClick={() => window.open(doc.fileUrl, "_blank")}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => window.open(doc.fileUrl, "_blank")}>
                                <Download className="h-4 w-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="max-w-sm">
                                  <AlertDialogHeader>
                                    <AlertDialogTitle className="text-lg">Delete Document</AlertDialogTitle>
                                    <AlertDialogDescription className="text-sm">
                                      This will permanently delete &quot;{doc.name}&quot;.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter className="gap-2">
                                    <AlertDialogCancel className="text-sm px-4 py-2">Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      className="bg-red-600 text-white hover:bg-red-700 text-sm px-4 py-2"
                                      onClick={() => handleDeleteDocument(doc.fileUrl, doc.id)}
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>

                {/* Desktop Table View */}
                <div className="hidden lg:block">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50/50">
                        <TableHead className="text-sm md:text-base lg:text-lg font-bold py-3 md:py-4">Document</TableHead>
                        <TableHead className="text-sm md:text-base lg:text-lg font-bold py-3 md:py-4">Type</TableHead>
                        <TableHead className="text-sm md:text-base lg:text-lg font-bold py-3 md:py-4">Upload Date</TableHead>
                        <TableHead className="text-sm md:text-base lg:text-lg font-bold py-3 md:py-4 text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoading ? (
                        <TableRow>
                          <TableCell colSpan={4} className="h-24 sm:h-32 text-center text-base sm:text-lg md:text-xl">
                            Loading documents...
                          </TableCell>
                        </TableRow>
                      ) : filteredDocuments.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="h-24 sm:h-32 text-center text-base sm:text-lg md:text-xl">
                            No documents found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredDocuments.map((doc) => (
                          <TableRow key={doc.id} className="hover:bg-gray-50/50">
                            <TableCell className="py-3 sm:py-4 md:py-5">
                              <div className="flex items-center gap-3 sm:gap-4">
                                {getFileIcon(doc.name)}
                                <div>
                                  <div className="font-semibold text-sm sm:text-base md:text-lg">{doc.name}</div>
                                  <div className="text-xs sm:text-sm md:text-base text-gray-500">ID: {doc.id.slice(-8)}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="py-3 sm:py-4 md:py-5">
                              <span className="text-sm sm:text-base md:text-lg">
                                {doc.name.split('.').pop()?.toUpperCase() || 'Unknown'}
                              </span>
                            </TableCell>
                            <TableCell className="py-3 sm:py-4 md:py-5">
                              <span className="text-sm sm:text-base md:text-lg">
                                {doc.createdAt ? new Date(doc.createdAt).toLocaleDateString() : 'Unknown'}
                              </span>
                            </TableCell>
                            <TableCell className="text-right py-3 sm:py-4 md:py-5">
                              <div className="flex justify-end gap-1 sm:gap-2 md:gap-3">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12"
                                  onClick={() => window.open(doc.fileUrl, "_blank")}
                                >
                                  <Eye className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                                  <span className="sr-only">View</span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12"
                                  onClick={() => {
                                    const link = document.createElement('a')
                                    link.href = doc.fileUrl
                                    link.download = doc.name
                                    link.click()
                                  }}
                                >
                                  <Download className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                                  <span className="sr-only">Download</span>
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12">
                                      <Trash2 className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-red-500" />
                                      <span className="sr-only">Delete</span>
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent className="max-w-sm sm:max-w-md md:max-w-lg">
                                    <AlertDialogHeader>
                                      <AlertDialogTitle className="text-lg sm:text-xl md:text-2xl">Are you sure?</AlertDialogTitle>
                                      <AlertDialogDescription className="text-sm sm:text-base md:text-lg">
                                        This action cannot be undone. This will permanently delete the document &quot;{doc.name}&quot;.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter className="gap-2 sm:gap-3">
                                      <AlertDialogCancel className="text-sm sm:text-base md:text-lg px-4 sm:px-5 md:px-6 py-2 sm:py-3">Cancel</AlertDialogCancel>
                                      <AlertDialogAction
                                        className="bg-red-600 text-white hover:bg-red-700 text-sm sm:text-base md:text-lg px-4 sm:px-5 md:px-6 py-2 sm:py-3"
                                        onClick={() => handleDeleteDocument(doc.fileUrl, doc.id)}
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
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
