"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"
import { uploadDocument } from "@/lib/actions/document-actions"
import { DocumentUpload } from "@/components/admin/DocumentUpload"

interface FormValues {
  title: string
  fileUrl: string
}

export default function DocumentUploadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fileUrl, setFileUrl] = useState<string>("")
  const [fileUploading, setFileUploading] = useState(false) // <-- add state
  const router = useRouter()

  const form = useForm<FormValues>({
    defaultValues: {
      title: "",
      fileUrl: ""
    },
  })

  const setPdfUrl = (url: string) => {
    console.log("url: ", url)
    setFileUrl(url)
    setFileUploading(false) // <-- set to false when upload is done
  }

  const onSubmit = async (values: FormValues) => {

    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append("title", values.title)
      formData.append("pdfUrl", fileUrl)

      await uploadDocument(formData)

      toast("Document uploaded successfully")
      router.push("/admin/documents")
      router.refresh()
    } catch {
      toast("Failed to upload document. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 flex items-center gap-4">
        <Button variant="outline" onClick={() => router.push("/admin/documents")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Documents
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Upload Document</h1>
          <p className="text-gray-500">Upload a new PDF document to the system</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Document Information</CardTitle>
              <CardDescription>Fill in the details below to upload a new document.</CardDescription>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-6">
                  {/* File Upload */}
                  <DocumentUpload
                    setFileUrl={(url: string) => {
                      setPdfUrl(url)
                      setFileUploading(false)
                    }}
                    setUploading={setFileUploading} // <-- pass setter
                  />

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Title */}
                    <FormField
                      control={form.control}
                      name="title"
                      rules={{
                        required: "Title is required",
                        minLength: { value: 3, message: "Title must be at least 3 characters" },
                      }}
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Document Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter document title" {...field} />
                          </FormControl>
                          <FormDescription>A descriptive title for the document.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => router.push("/admin/documents")}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting || fileUploading}>
                    {(isSubmitting || fileUploading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Upload Document
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Upload Guidelines */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Guidelines</CardTitle>
              <CardDescription>Important information about document uploads</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500" />
                  <p>Only PDF files are accepted</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500" />
                  <p>Maximum file size is 10MB</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500" />
                  <p>Public documents are visible to all members</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500" />
                  <p>Private documents are only visible to admins</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500" />
                  <p>Choose appropriate categories for better organization</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
