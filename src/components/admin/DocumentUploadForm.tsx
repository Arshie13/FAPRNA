"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
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
import { toast } from "sonner";
import { uploadDocument } from "@/lib/actions/document-actions";
import { DocumentUpload } from "@/components/admin/DocumentUpload";
import { useEdgeStore } from "@/lib/libstore/libstore-config";

interface FormValues {
  title: string;
  fileUrl: string;
  author: string;
  description: string;
}

export default function DocumentUploadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileUrl, setFileUrl] = useState<string>("");
  const [fileUploading, setFileUploading] = useState(false);
  const router = useRouter();
  const { edgestore } = useEdgeStore();

  const form = useForm<FormValues>({
    defaultValues: {
      title: "",
      author: "",
      fileUrl: "",
      description: ""
    },
  });

  const setPdfUrl = (url: string) => {
    console.log("url: ", url);
    setFileUrl(url);
    setFileUploading(false);
  };

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("author", values.author);
      formData.append("description", values.description);
      formData.append("pdfUrl", fileUrl);

      await uploadDocument(formData);

      toast("Document uploaded successfully");
      router.push("/admin/documents");
      router.refresh();
    } catch {
      toast("Failed to upload document. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="w-full min-h-screen py-4 sm:py-6 md:py-8 lg:py-12 px-4 sm:px-6 md:px-8"
      style={{ background: "#003366" }}
    >
      {/* Header */}
      <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white drop-shadow-lg">
          Upload Document
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white mt-2 sm:mt-3 md:mt-4 font-semibold drop-shadow">
          Upload a new PDF document to the system
        </p>
      </div>

      {/* Main Content */}
      <div className="grid gap-4 sm:gap-6 md:gap-8 lg:gap-10 grid-cols-1 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <Card className="p-3 sm:p-4 md:p-5 lg:p-6">
            <CardHeader className="pb-4 sm:pb-5 md:pb-6 lg:pb-8">
              <CardTitle className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
                Document Information
              </CardTitle>
              <CardDescription className="text-sm sm:text-base md:text-lg lg:text-xl">
                Fill in the details below to upload a new document.
              </CardDescription>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                    {/* File Upload */}
                    <DocumentUpload
                      setFileUrl={(url: string) => {
                        setPdfUrl(url);
                        setFileUploading(false);
                      }}
                      setUploading={setFileUploading}
                    />

                    {/* Title */}
                    <FormField
                      control={form.control}
                      name="title"
                      rules={{
                        required: "Title is required",
                        minLength: {
                          value: 3,
                          message: "Title must be at least 3 characters",
                        },
                      }}
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
                            Document Title
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter document title"
                              className="text-sm sm:text-base md:text-lg"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-sm sm:text-base md:text-lg">
                            A descriptive title for the document.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Author Name */}
                    <FormField
                      control={form.control}
                      name="author"
                      rules={{
                        required: "Author name is required",
                        minLength: {
                          value: 3,
                          message: "Author name must be at least 3 characters",
                        },
                      }}
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
                            Author Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter author name"
                              className="text-sm sm:text-base md:text-lg"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-sm sm:text-base md:text-lg">
                            Name of the document&apos;s author.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />


                    {/* Description */}
                    <FormField
                      control={form.control}
                      name="description"
                      rules={{
                        required: "Description is required",
                        minLength: {
                          value: 5,
                          message: "Description must be at least 5 characters",
                        },
                      }}
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
                            Description
                          </FormLabel>
                          <FormControl>
                            <textarea
                              placeholder="Enter a brief description of the document"
                              className="text-sm sm:text-base md:text-lg border rounded-md p-3 w-full min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-sm sm:text-base md:text-lg">
                            Provide a summary or key details about the document.
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
                    onClick={async () => {
                      await edgestore.publicFiles.confirmUpload({
                        url: fileUrl,
                      });
                    }}
                    className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold px-8 py-4 sm:px-10 sm:py-5 md:px-12 md:py-6 min-w-32 sm:min-w-36 md:min-w-40"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting || fileUploading}
                    className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold px-8 py-4 sm:px-10 sm:py-5 md:px-12 md:py-6 min-w-40 sm:min-w-44 md:min-w-48
                      bg-[#003366] text-white hover:bg-[#002244] hover:text-white transition-all duration-300 rounded-xl shadow-lg"
                  >
                    {(isSubmitting || fileUploading) && (
                      <Loader2 className="mr-2 h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 animate-spin" />
                    )}
                    Upload Document
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </div>

        <div className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10">
          {/* Upload Guidelines */}
          <Card className="p-3 sm:p-4 md:p-5 lg:p-6">
            <CardHeader className="pb-4 sm:pb-5 md:pb-6 lg:pb-8">
              <CardTitle className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
                Upload Guidelines
              </CardTitle>
              <CardDescription className="text-sm sm:text-base md:text-lg lg:text-xl">
                Important information about document uploads
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0 pb-4 sm:pb-5 md:pb-6 lg:pb-8">
              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base md:text-lg">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="mt-1 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-blue-500 flex-shrink-0" />
                  <p>Only PDF files are accepted</p>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="mt-1 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-blue-500 flex-shrink-0" />
                  <p>Maximum file size is 10MB</p>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="mt-1 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-blue-500 flex-shrink-0" />
                  <p>Public documents are visible to all members</p>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="mt-1 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-blue-500 flex-shrink-0" />
                  <p>Private documents are only visible to admins</p>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="mt-1 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-blue-500 flex-shrink-0" />
                  <p>Choose appropriate categories for better organization</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
