"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  FileText,
  Download,
  Search,
  Calendar,
  ArrowLeft,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getAllDocuments } from "@/lib/actions/document-actions";
import { cn } from "@/lib/utils";
import { getMemberByEmail } from "@/lib/actions/members-actions";
import { sendVerificationCode, verifyCode } from "@/lib/actions/verification-action"

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
  const [showModal, setShowModal] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [codeInput, setCodeInput] = useState(""); // what the user types
  const [sentCode, setSentCode] = useState("");   // what was sent
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");

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
    } else if (filtered.length === 0) {
      setSelectedDocument(null); // Clear selected document if no results
    }
  }, [documents, searchQuery, selectedDocument]);

  // Handle document selection
  const handleDocumentSelect = (doc: Document) => {
    setSelectedDocument(doc);
    setShowMobileDetail(true);
  };

  // Handle document download
  const handleDownload = (doc: Document) => {
    if (!isVerified) {
      setShowModal(true);
    } else {
      const link = document.createElement("a");
      link.href = doc.fileUrl;
      link.download = doc.name;
      link.click();
    }
  };

  const verifyMember = async () => {
    setError("");
    try {
      setVerifying(true);
      const result = await getMemberByEmail(email.trim());

      if (result.exists) {
        setIsSendingCode(true);
        const { code, error } = await sendVerificationCode(email.trim());
        if (error || !code) {
          setError("Failed to send verification code.");
          return;
        }

        setSentCode(code); // store the actual code sent
        setIsVerificationSent(true); // switch to "Enter code" step
      } else {
        setError("No member found with provided email. Become a member to gain access.");
      }
    } catch {
      setError("Verification failed. Please try again.");
    } finally {
      setVerifying(false);
      setIsSendingCode(false);
    }
  };

  const handleCodeSubmit = async () => {
    setError("");
    try {
      const result = await verifyCode(sentCode, codeInput.trim());
      if (result.success) {
        setIsVerified(true);
        setShowModal(false);
        handleDownload(selectedDocument!)
      } else {
        setError(result.error || "Invalid verification code.");
      }
    } catch {
      setError("Something went wrong. Try again.");
    }
  };

  const DocumentCard = ({
    doc,
    isSelected,
  }: {
    doc: Document;
    isSelected: boolean;
  }) => (
    <Card
      className={`cursor-pointer transition-all duration-200 hover:shadow-md hover:bg-blue-50 bg-white rounded-xl border border-gray-200 ${
        isSelected
          ? "border-l-4 border-[#003366] !border-t !border-r !border-b"
          : ""
      }`}
      onClick={() => handleDocumentSelect(doc)}
    >
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-base sm:text-lg mb-1 line-clamp-2 text-gray-900 text-left">
              {doc.name}
            </h3>
            <div className="flex items-center text-xs sm:text-sm text-gray-500">
              <span className="font-bold text-[#000000] mr-1">Author:</span>{" "}
              {doc.author || "Unknown Author"}
            </div>
            <p className="text-sm text-gray-600 line-clamp-2 mb-2 text-left">
              {doc.description || "No description available"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const DocumentDetail = ({
    doc,
    className,
  }: {
    doc: Document;
    className?: string;
  }) => (
    <Card
      className={cn(
        "min-h-[600px] bg-white border-0 shadow-lg rounded-xl",
        className
      )}
    >
      <CardContent className="p-6 sm:p-8 min-h-[600px] flex flex-col">
        <div className="flex-1 overflow-y-auto pr-2">
          <div className="relative mb-6">
            <div className="flex gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 break-words pr-4 md:pr-32 lg:pr-48 xl:pr-64">
                  {doc.name}
                </h1>
                <p className="text-base sm:text-lg text-gray-700 mt-2">
                  {doc.author || "Author information not available"}
                </p>
                {/* Date position: relative on mobile, absolute on desktop */}
                <div className="flex items-center text-sm sm:text-base text-gray-500 mt-3 md:mt-0 md:absolute md:top-0 md:right-0 md:max-w-[140px] lg:max-w-[180px] xl:max-w-[280px] flex-wrap">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                  <span className="break-words">
                    {format(new Date(doc.createdAt), "MMMM d, yyyy")}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
              Description
            </h2>
            <div className="prose prose-sm sm:prose-lg max-w-none">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                {doc.description ||
                  "No description available for this document."}
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <Button
            onClick={() => handleDownload(doc)}
            className="flex-1 gap-2 h-12 px-6 text-lg bg-[#003366] text-white font-semibold hover:bg-[#002244] hover:text-white transition-all duration-300 rounded-xl shadow-lg"
          >
            <Download className="w-5 h-5" />
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
        <Card className="bg-white border-2 shadow-lg mb-8 rounded-full w-full max-w-5xl mx-auto px-2 sm:px-4 md:px-6">
          <CardContent className="p-2 sm:p-4">
            <div className="flex justify-center">
              <div className="w-full relative">
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-[#003366] w-5 h-5 sm:w-6 sm:h-6" />
                <Input
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 sm:pl-12 pr-4 bg-transparent text-[#003366] placeholder:text-[#003366]/60 border-[#003366] focus:border-[#003366] focus:ring-[#003366] h-10 sm:h-12 text-base sm:text-lg rounded-full w-full"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        {filteredDocuments.length === 0 ? (
          <Card className="bg-white border-0 shadow-lg rounded-xl">
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
                className={`lg:col-span-2 ${
                  showMobileDetail ? "hidden md:block" : "block"
                }`}
              >
                <div className="max-h-[600px] overflow-y-auto space-y-3 pr-1">
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
                className={`lg:col-span-3 ${
                  !showMobileDetail ? "hidden md:block" : "block"
                }`}
              >
                {selectedDocument ? (
                  <>
                    {/* Mobile back button - NEW POSITION */}
                    <div className="md:hidden mb-4">
                      <Button
                        variant="ghost"
                        size="lg"
                        onClick={() => setShowMobileDetail(false)}
                        className="gap-2 h-10 px-4 text-base bg-[#003366] text-white font-semibold hover:bg-[#002244] hover:text-white transition-all duration-300 rounded-lg shadow-md"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Documents
                      </Button>
                    </div>
                    <DocumentDetail
                      doc={selectedDocument}
                      className="md:mt-0 mt-4"
                    />
                  </>
                ) : (
                  <Card className="min-h-[600px] bg-white border-0 shadow-lg rounded-xl">
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

      {/* Modal - moved outside and made conditional */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold mb-4 text-gray-900">Member Verification</h2>

            {!isVerificationSent ? (
              <>
                <p className="text-gray-600 mb-4">Enter your email to receive a verification code.</p>
                <Input
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mb-3"
                  type="email"
                />
                {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
                <Button onClick={verifyMember} disabled={verifying || isSendingCode} className="w-full">
                  {verifying || isSendingCode ? "Sending Code..." : "Send Verification Code"}
                </Button>
              </>
            ) : (
              <>
                <p className="text-gray-600 mb-4">Enter the code sent to <span className="font-medium">{email}</span>.</p>
                <Input
                  placeholder="Verification Code"
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value)}
                  className="mb-3"
                />
                {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
                <Button onClick={handleCodeSubmit} className="w-full">
                  Verify Code
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}