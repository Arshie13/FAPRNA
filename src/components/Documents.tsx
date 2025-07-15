"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  FileText,
  Download,
  Search,
  Calendar,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getAllDocuments } from "@/lib/actions/document-actions";

interface Document {
  id: string;
  name: string;
  description: string | null;
  author: string | null;
  fileUrl: string;
  createdAt: Date;
}

export default function DocumentsDashboard() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileDetail, setShowMobileDetail] = useState(false);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setIsLoading(true);
        const docs = await getAllDocuments();
        setDocuments(docs);
        setFilteredDocuments(docs);
      } catch (error) {
        console.error("Failed to fetch documents:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDocuments();
  }, []);

  // Filter documents based on search query
  useEffect(() => {
    let filtered = documents;

    if (searchQuery) {
      filtered = filtered.filter(
        (doc) =>
          doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.author?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredDocuments(filtered);

    // If selected document is not in filtered results, select first filtered document
    if (
      filtered.length > 0 &&
      (!selectedDocument ||
        !filtered.find((doc) => doc.id === selectedDocument.id))
    ) {
      setSelectedDocument(filtered[0]);
    }
  }, [documents, searchQuery, selectedDocument]);

  // Handle document selection
  const handleDocumentSelect = (doc: Document) => {
    setSelectedDocument(doc);
    setShowMobileDetail(true);
  };

  // Handle document download
  const handleDownload = (doc: Document) => {
    const link = document.createElement("a");
    link.href = doc.fileUrl;
    link.download = doc.name;
    link.click();
  };

  const DocumentCard = ({
    doc,
    isSelected,
  }: {
    doc: Document;
    isSelected: boolean;
  }) => (
    <Card
      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${isSelected
          ? "ring-2 ring-blue-500 bg-blue-50 border-blue-200"
          : "hover:bg-gray-50 bg-white"
        }`}
      onClick={() => handleDocumentSelect(doc)}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className={`font-semibold text-base md:text-lg mb-1 line-clamp-2 ${isSelected ? "text-blue-900" : "text-gray-900"
                }`}
            >
              {doc.name}
            </h3>
            <p
              className={`text-sm md:text-base line-clamp-2 mb-2 ${isSelected ? "text-blue-700" : "text-gray-600"
                }`}
            >
              {doc.description || "No description available"}
            </p>
            <div
              className={`flex items-center text-sm md:text-base ${isSelected ? "text-blue-600" : "text-gray-500"
                }`}
            >
              <Calendar className="w-4 h-4 mr-1" />
              {format(new Date(doc.createdAt), "MMM d, yyyy")}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const DocumentDetail = ({ doc }: { doc: Document }) => (
    <Card className="min-h-[600px] bg-white border-0 shadow-lg">
      <CardContent className="p-6 min-h-[600px] flex flex-col">
        {/* Mobile back button */}
        <div className="md:hidden mb-4">
          <Button
            variant="ghost"
            size="lg"
            onClick={() => setShowMobileDetail(false)}
            className="gap-3 h-12 px-6 text-lg bg-[#003366] text-white font-semibold hover:bg-[#002244] hover:text-white transition-all duration-300 rounded-xl shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Documents
          </Button>
        </div>

        <div className="flex-1">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                    {doc.name}
                  </h1>
                  <div className="flex items-center text-base md:text-lg text-gray-500 mt-2">
                    <Calendar className="w-5 h-5 mr-2" />
                    {format(new Date(doc.createdAt), "MMMM d, yyyy")}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
              Author
            </h2>
            <p className="text-lg md:text-xl text-gray-700">
              {doc.author || "Author information not available"}
            </p>
          </div>
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
              Description
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                {doc.description ||
                  "No description available for this document."}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t">
          <Button
            onClick={() => handleDownload(doc)}
            className="flex-1 gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <Download className="w-4 h-4" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-300 rounded w-64 mx-auto"></div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-gray-300 h-24 rounded-lg"></div>
                ))}
              </div>
              <div className="bg-gray-300 h-96 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Document Library
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Access important documents, bylaws, meeting minutes, and resources
            from FAPRNA-NV
          </p>
        </div>

        {/* Search Bar */}
        <Card className="bg-white border-0 shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="items-center justify-between">
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
          </CardContent>
        </Card>

        {/* Main Content */}
        {filteredDocuments.length === 0 ? (
          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                No Documents Found
              </h3>
              <p className="text-lg md:text-xl text-gray-600">
                {searchQuery
                  ? `No documents match "${searchQuery}"`
                  : "No documents available at this time"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Two-Panel Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 min-h-[600px]">
              {/* Document List Panel */}
              <div
                className={`lg:col-span-2 ${showMobileDetail ? "hidden md:block" : "block"
                  }`}
              >
                <div className="max-h-[600px] overflow-y-auto space-y-3">
                  {filteredDocuments.map((doc) => (
                    <DocumentCard
                      key={doc.id}
                      doc={doc}
                      isSelected={selectedDocument?.id === doc.id}
                    />
                  ))}
                </div>
              </div>

              {/* Document Detail Panel */}
              <div
                className={`lg:col-span-3 ${!showMobileDetail ? "hidden md:block" : "block"
                  }`}
              >
                {selectedDocument ? (
                  <DocumentDetail doc={selectedDocument} />
                ) : (
                  <Card className="min-h-[600px] bg-white border-0 shadow-lg">
                    <CardContent className="p-12 text-center min-h-[600px] flex items-center justify-center">
                      <div>
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <FileText className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                          Select a Document
                        </h3>
                        <p className="text-lg md:text-xl text-gray-600">
                          Choose a document from the list to view its details
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
