"use client";

import { useState, useEffect } from "react";
import {
  Check,
  X,
  Clock,
  Search,
  RefreshCw,
  Award,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  // TableHead,
  // TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
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
} from "@/components/ui/alert-dialog";
import { getEventRegistrationStats, getAllEventRegistrations, approveEventRegistration, rejectEventRegistration } from "@/lib/actions/event-member-actions";
import { EventRegistrationStats, EventRegistration } from "@/lib/interfaces";

export default function RegistrationDashboard() {
  const [registrations, setRegistrations] = useState<EventRegistration[] | undefined>([]);
  const [stats, setStats] = useState<EventRegistrationStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const fetchRegistrations = async () => {
    setIsLoading(true);
    try {
      const [registrationsData, statsData] = await Promise.all([
        getAllEventRegistrations(),
        getEventRegistrationStats(),
      ]);
      if (registrationsData && registrationsData.length === 0) {
        toast("No registrations found");
        setRegistrations([]);
        setStats(null);
        setIsLoading(false);
        return;
      } else {
        console.log("Fetched registrations:", registrationsData);
        toast("Registrations fetched successfully");
        setRegistrations(registrationsData);
        setIsLoading(false);
        return;
      }
      setStats(statsData.data!);
    } catch {
      console.error("Error fetching registrations");
      toast("Failed to fetch registrations");
    }
  }

  useEffect(() => {
    fetchRegistrations();
  }, []);

  // Handle status update
  const handleStatusUpdate = async (id: string, status: string) => {
    try {

      if (status === "APPROVED") {
        const response = await approveEventRegistration(id);
        console.log("Response from approveEventRegistration:", response);
        if (response.success === false) {
          toast(response.message);
          return;
        }

        toast(`Nomination ${status.toLowerCase()} successfully`);
        fetchRegistrations();
      } else {
        const response = await rejectEventRegistration(id);
        if (!response.success === false) {
          toast(response.message);
          return;
        }

        toast(`Nomination ${status.toLowerCase()} successfully`);
        fetchRegistrations();
      }

    } catch (error) {
      console.error("Error: ", error);
      toast("Failed to update nomination status");
    }
  };

  // Filter nominations based on search query and active tab
  const filteredRegistrations = registrations!.filter((registration) => {
    const matchesSearch =
      registration.member?.fullName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      registration.nonMember?.fullName
        .toLowerCase()
        .includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "pending")
      return matchesSearch && registration.isPending && !registration.rejected;
    if (activeTab === "approved")
      return matchesSearch && !registration.isPending && !registration.rejected;
    if (activeTab === "rejected")
      return matchesSearch && !registration.isPending && registration.rejected;

    return matchesSearch;
  });

  // Get badge variant based on status
  const getStatusBadge = (isPending: boolean, rejected: boolean) => {
    switch (isPending) {
      case true:
        return (
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 border-yellow-200 text-xs sm:text-sm md:text-base px-2 sm:px-3 py-1"
          >
            Pending
          </Badge>
        );
      case false:
        switch (!rejected) {
          case true:
            return (
              <Badge
                variant="outline"
                className="bg-green-100 text-green-800 border-green-200 text-xs sm:text-sm md:text-base px-2 sm:px-3 py-1"
              >
                Approved
              </Badge>
            );
          case true:
            return (
              <Badge
                variant="outline"
                className="bg-red-100 text-red-800 border-red-200 text-xs sm:text-sm md:text-base px-2 sm:px-3 py-1"
              >
                Rejected
              </Badge>
            );
        }
      default:
        return (
          <Badge
            variant="outline"
            className="text-xs sm:text-sm md:text-base px-2 sm:px-3 py-1"
          >
            Unknown
          </Badge>
        );
    }
  };

  return (
    <div
      className="w-full py-4 sm:py-6 md:py-8 lg:py-12 min-h-screen px-4 sm:px-6 md:px-8"
      style={{ background: "#003366" }}
    >
      <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white drop-shadow-lg">
            Event Registrations
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white mt-2 sm:mt-3 font-semibold drop-shadow">
            Review and manage Event Registrations
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 grid gap-4 sm:gap-6 md:gap-8 grid-cols-2 lg:grid-cols-4">
          <Card className="p-2 sm:p-3 md:p-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 sm:pb-3 md:pb-4">
              <CardTitle className="text-xs sm:text-sm md:text-base lg:text-xl font-bold">
                Total Registrations
              </CardTitle>
              <Award className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold">
                {stats.total}
              </div>
            </CardContent>
          </Card>
          <Card className="p-2 sm:p-3 md:p-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 sm:pb-3 md:pb-4">
              <CardTitle className="text-xs sm:text-sm md:text-base lg:text-xl font-bold">
                Pending Registrations
              </CardTitle>
              <Clock className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-yellow-600">
                {stats.pending}
              </div>
            </CardContent>
          </Card>
          <Card className="p-2 sm:p-3 md:p-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 sm:pb-3 md:pb-4">
              <CardTitle className="text-xs sm:text-sm md:text-base lg:text-xl font-bold">
                Approved
              </CardTitle>
              <Check className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-green-600">
                {stats.approved}
              </div>
            </CardContent>
          </Card>
          <Card className="p-2 sm:p-3 md:p-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 sm:pb-3 md:pb-4">
              <CardTitle className="text-xs sm:text-sm md:text-base lg:text-xl font-bold">
                Rejected
              </CardTitle>
              <X className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-red-600">
                {stats.rejected}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card className="p-2 sm:p-3 md:p-4 m">
        <CardHeader className="pb-4 sm:pb-5 md:pb-6">
          <CardTitle className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
            Registrations Dashboard
          </CardTitle>
          <CardDescription className="text-sm sm:text-base md:text-lg lg:text-xl">
            Review, approve, or reject event registration requests. Click on an item
            to see details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 sm:mb-8 flex flex-col gap-4 sm:gap-6">
            <div className="relative w-full">
              <Search className="absolute left-3 sm:left-4 top-3 sm:top-4 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-gray-500" />
              <Input
                placeholder="Search registrations..."
                className="pl-10 sm:pl-12 md:pl-14 h-10 sm:h-11 md:h-12 text-sm sm:text-base md:text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Button
                variant="outline"
                onClick={fetchRegistrations}
                className="gap-2 sm:gap-3 h-10 sm:h-11 md:h-12 px-4 sm:px-5 md:px-6 text-sm sm:text-base md:text-lg order-2 sm:order-1"
              >
                <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                Refresh
              </Button>
            </div>
          </div>

          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="mb-6 sm:mb-8 grid w-full grid-cols-2 sm:grid-cols-4 h-10 sm:h-12 md:h-14">
              <TabsTrigger
                value="all"
                className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="pending"
                className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold"
              >
                Pending
              </TabsTrigger>
              <TabsTrigger
                value="approved"
                className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold"
              >
                Approved
              </TabsTrigger>
              <TabsTrigger
                value="rejected"
                className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold"
              >
                Rejected
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              <div className="rounded-lg sm:rounded-xl border shadow-sm overflow-hidden">
                {/* Desktop Table View */}
                <div className="hidden lg:block">
                  <Table>
                    <TableBody>
                      {isLoading ? (
                        <TableRow>
                          <TableCell
                            colSpan={6}
                            className="h-24 sm:h-32 text-center text-base sm:text-lg md:text-xl"
                          >
                            Loading registration list...
                          </TableCell>
                        </TableRow>
                      ) : filteredRegistrations.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={6}
                            className="h-24 sm:h-32 text-center text-base sm:text-lg md:text-xl"
                          >
                            No registrations found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredRegistrations.map((registration) => (
                          <TableRow
                            key={registration.id}
                            className="hover:bg-gray-50/50"
                          >
                            <TableCell className="py-3 sm:py-4 md:py-5">
                              <div className="flex items-center gap-2 sm:gap-3">
                                <User className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-gray-500" />
                                <div>
                                  <div className="font-semibold text-sm sm:text-base md:text-lg">
                                    {registration.member == null ? registration.nonMember!.fullName : registration.member!.fullName}
                                  </div>
                                  <div className="text-xs sm:text-sm md:text-base text-gray-500">
                                    {registration.member == null ? registration.nonMember!.email : registration.member!.email}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="py-3 sm:py-4 md:py-5">
                              {getStatusBadge(registration.isPending, registration.rejected)}
                            </TableCell>
                            <TableCell className="text-right py-3 sm:py-4 md:py-5">
                              <div className="flex justify-end gap-1 sm:gap-2 md:gap-3">
                                {registration.isPending && (
                                  <>
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12"
                                        >
                                          <Check className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-green-600" />
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent className="max-w-sm sm:max-w-md md:max-w-lg">
                                        <AlertDialogHeader>
                                          <AlertDialogTitle className="text-lg sm:text-xl md:text-2xl">
                                            Approve Registration
                                          </AlertDialogTitle>
                                          <AlertDialogDescription className="text-sm sm:text-base md:text-lg">
                                            Are you sure you want to approve
                                            this registration of {registration.member === null ? registration.nonMember?.fullName : registration.member.fullName}?
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter className="gap-2 sm:gap-3">
                                          <AlertDialogCancel className="text-sm sm:text-base md:text-lg px-4 sm:px-5 md:px-6 py-2 sm:py-3">
                                            Cancel
                                          </AlertDialogCancel>
                                          <AlertDialogAction
                                            className="bg-green-600 text-white hover:bg-green-700 text-sm sm:text-base md:text-lg px-4 sm:px-5 md:px-6 py-2 sm:py-3"
                                            onClick={() =>
                                              handleStatusUpdate(
                                                registration.id,
                                                "APPROVED"
                                              )
                                            }
                                          >
                                            Approve
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12"
                                        >
                                          <X className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-red-600" />
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent className="max-w-sm sm:max-w-md md:max-w-lg">
                                        <AlertDialogHeader>
                                          <AlertDialogTitle className="text-lg sm:text-xl md:text-2xl">
                                            Reject Nomination
                                          </AlertDialogTitle>
                                          <AlertDialogDescription className="text-sm sm:text-base md:text-lg">
                                            Are you sure you want to reject this
                                            registration of {registration.member === null ? registration.nonMember?.fullName : registration.member.fullName}
                                            ?
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter className="gap-2 sm:gap-3">
                                          <AlertDialogCancel className="text-sm sm:text-base md:text-lg px-4 sm:px-5 md:px-6 py-2 sm:py-3">
                                            Cancel
                                          </AlertDialogCancel>
                                          <AlertDialogAction
                                            className="bg-red-600 text-white hover:bg-red-700 text-sm sm:text-base md:text-lg px-4 sm:px-5 md:px-6 py-2 sm:py-3"
                                            onClick={() =>
                                              handleStatusUpdate(
                                                registration.id,
                                                "REJECTED"
                                              )
                                            }
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
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
