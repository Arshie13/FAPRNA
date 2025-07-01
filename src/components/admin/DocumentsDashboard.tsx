"use client"

import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  FileText,
  Trash2,
  Search,
  RefreshCw,
  Eye,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent } from "@/components/ui/tabs"
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
}

export default function DocumentsAdminDashboard() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const { edgestore } = useEdgeStore()
  // const router = useRouter()

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

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Documents Management</h1>
          <p className="text-gray-500">Upload and manage PDF documents and files</p>
        </div>
        <Link href="/admin/documents/upload">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Upload Document
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Documents Dashboard</CardTitle>
          <CardDescription>Manage all uploaded PDF documents and files.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search documents..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={fetchDocuments} className="gap-1 bg-transparent">
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value={activeTab}>
              <div className="rounded-md border">
                <Table>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          Loading documents...
                        </TableCell>
                      </TableRow>
                    ) : filteredDocuments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No documents found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredDocuments.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <FileText className="h-8 w-8 text-red-500" />
                              <div>
                                <div className="font-medium">{doc.name}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => window.open(doc.fileUrl, "_blank")}
                              >
                                <Eye className="h-4 w-4 text-blue-500" />
                                <span className="sr-only">View</span>
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
                                      This action cannot be undone. This will permanently delete the document &quot;
                                      {doc.name}&quot;.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      className="bg-red-600 text-white hover:bg-red-700"
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
