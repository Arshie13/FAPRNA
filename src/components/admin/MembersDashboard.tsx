"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Eye,
  Check,
  X,
  Search,
  Filter,
  RefreshCw,
  User,
  Mail,
  UserCheck,
  UserX,
  Clock,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  getAllMembers,
  updateMemberStatus,
  getMemberStats,
} from "@/lib/actions/members-actions";

type MembershipStatus = "APPROVED" | "DENIED" | "PENDING";

interface Member {
  id: string;
  fullName: string;
  email: string;
  membershipStatus: MembershipStatus;
  _count: {
    nominationsMade: number;
    EventUser: number;
  };
}

interface MemberStats {
  total: number;
  approved: number;
  pending: number;
  denied: number;
}

export default function MembersAdminDashboard() {
  const [members, setMembers] = useState<Member[]>([]);
  const [stats, setStats] = useState<MemberStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const router = useRouter();

  // Fetch members data
  const fetchMembers = async () => {
    setIsLoading(true);
    try {
      const [membersData, statsData] = await Promise.all([
        getAllMembers(),
        getMemberStats(),
      ]);
      setMembers(membersData);
      setStats(statsData);
    } catch (error) {
      console.error("Failed to fetch members:", error);
      toast("Failed to fetch members");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // Handle status update
  const handleStatusUpdate = async (id: string, status: MembershipStatus) => {
    try {
      await updateMemberStatus(id, status);
      toast(`Member ${status.toLowerCase()} successfully`);
      fetchMembers();
    } catch (error) {
      console.error(`Failed to update member status for ID ${id}:`, error);
      toast("Failed to update member status");
    }
  };

  // Filter members based on search query and active tab
  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "approved")
      return matchesSearch && member.membershipStatus === "APPROVED";
    if (activeTab === "pending")
      return matchesSearch && member.membershipStatus === "PENDING";
    if (activeTab === "denied")
      return matchesSearch && member.membershipStatus === "DENIED";

    return matchesSearch;
  });

  // Get badge variant based on status
  const getStatusBadge = (status: MembershipStatus) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 border-yellow-200 text-xs sm:text-sm md:text-base px-2 sm:px-3 py-1"
          >
            <Clock className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
            Pending
          </Badge>
        );
      case "APPROVED":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 border-green-200 text-xs sm:text-sm md:text-base px-2 sm:px-3 py-1"
          >
            <UserCheck className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
            Approved
          </Badge>
        );
      case "DENIED":
        return (
          <Badge
            variant="outline"
            className="bg-red-100 text-red-800 border-red-200 text-xs sm:text-sm md:text-base px-2 sm:px-3 py-1"
          >
            <UserX className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
            Denied
          </Badge>
        );
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

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div
      className="w-full py-4 sm:py-6 md:py-8 lg:py-12 min-h-screen px-4 sm:px-6 md:px-8"
      style={{ background: "#003366" }}
    >
      <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white drop-shadow-lg">
            Members Management
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white mt-2 sm:mt-3 font-semibold drop-shadow">
            Manage member registrations and membership status
          </p>
        </div>
        <Link href="/admin/members/create">
          <Button className="gap-2 sm:gap-3 md:gap-4 h-auto p-3 sm:p-4 md:p-5 lg:p-6 text-sm sm:text-base md:text-lg lg:text-xl font-semibold bg-white text-[#003366] hover:bg-gray-100 hover:text-[#003366] w-full sm:w-auto">
            <Plus className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" />
            Create Member
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 grid gap-4 sm:gap-6 md:gap-8 grid-cols-2 lg:grid-cols-4">
          <Card className="p-2 sm:p-3 md:p-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 sm:pb-3 md:pb-4">
              <CardTitle className="text-xs sm:text-sm md:text-base lg:text-xl font-bold">
                Total Members
              </CardTitle>
              <User className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-muted-foreground" />
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
                Approved
              </CardTitle>
              <UserCheck className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-green-600" />
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
                Pending Review
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
                Denied
              </CardTitle>
              <UserX className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-red-600">
                {stats.denied}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card className="p-2 sm:p-3 md:p-4">
        <CardHeader className="pb-4 sm:pb-5 md:pb-6">
          <CardTitle className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
            Members Dashboard
          </CardTitle>
          <CardDescription className="text-sm sm:text-base md:text-lg lg:text-xl">
            Review, approve, or deny member applications. Click on a member to
            see more details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 sm:mb-8 flex flex-col gap-4 sm:gap-6">
            <div className="relative w-full">
              <Search className="absolute left-3 sm:left-4 top-3 sm:top-4 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-gray-500" />
              <Input
                placeholder="Search members..."
                className="pl-10 sm:pl-12 md:pl-14 h-10 sm:h-11 md:h-12 text-sm sm:text-base md:text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Button
                variant="outline"
                onClick={fetchMembers}
                className="gap-2 sm:gap-3 h-10 sm:h-11 md:h-12 px-4 sm:px-5 md:px-6 text-sm sm:text-base md:text-lg order-2 sm:order-1"
              >
                <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                Refresh
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="gap-2 sm:gap-3 h-10 sm:h-11 md:h-12 px-4 sm:px-5 md:px-6 text-sm sm:text-base md:text-lg order-1 sm:order-2"
                  >
                    <Filter className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 sm:w-56 md:w-64"
                >
                  <DropdownMenuLabel className="text-sm sm:text-base md:text-lg">
                    Filter by Status
                  </DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => setActiveTab("all")}
                    className="text-xs sm:text-sm md:text-base py-2 sm:py-3"
                  >
                    All Members
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setActiveTab("approved")}
                    className="text-xs sm:text-sm md:text-base py-2 sm:py-3"
                  >
                    Approved
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setActiveTab("pending")}
                    className="text-xs sm:text-sm md:text-base py-2 sm:py-3"
                  >
                    Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setActiveTab("denied")}
                    className="text-xs sm:text-sm md:text-base py-2 sm:py-3"
                  >
                    Denied
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
                value="approved"
                className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold"
              >
                Approved
              </TabsTrigger>
              <TabsTrigger
                value="pending"
                className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold"
              >
                Pending
              </TabsTrigger>
              <TabsTrigger
                value="denied"
                className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold"
              >
                Denied
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              <div className="rounded-lg sm:rounded-xl border shadow-sm overflow-hidden">
                {/* Mobile Cards View */}
                <div className="block md:hidden">
                  {isLoading ? (
                    <div className="p-8 text-center">
                      <div className="text-base sm:text-lg">
                        Loading members...
                      </div>
                    </div>
                  ) : filteredMembers.length === 0 ? (
                    <div className="p-8 text-center">
                      <div className="text-base sm:text-lg">
                        No members found.
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4 p-4">
                      {filteredMembers.map((member) => (
                        <Card key={member.id} className="p-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3 flex-1">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback className="text-sm font-semibold">
                                  {getInitials(member.fullName)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <h3 className="font-semibold text-sm">
                                  {member.fullName}
                                </h3>
                                <div className="space-y-1 text-xs text-gray-600">
                                  <div>{member.email}</div>
                                  <div>
                                    {getStatusBadge(member.membershipStatus)}
                                  </div>
                                  <div>
                                    {member._count.nominationsMade} nominations,{" "}
                                    {member._count.EventUser} events
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  router.push(`/admin/members/${member.id}`)
                                }
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              {member.membershipStatus === "PENDING" && (
                                <>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      handleStatusUpdate(member.id, "APPROVED")
                                    }
                                  >
                                    <Check className="h-4 w-4 text-green-600" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      handleStatusUpdate(member.id, "DENIED")
                                    }
                                  >
                                    <X className="h-4 w-4 text-red-600" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50/50">
                        <TableHead className="text-sm md:text-base lg:text-lg font-bold py-3 md:py-4">
                          Member
                        </TableHead>
                        <TableHead className="text-sm md:text-base lg:text-lg font-bold py-3 md:py-4">
                          Email
                        </TableHead>
                        <TableHead className="text-sm md:text-base lg:text-lg font-bold py-3 md:py-4">
                          Status
                        </TableHead>
                        <TableHead className="text-sm md:text-base lg:text-lg font-bold py-3 md:py-4">
                          Activity
                        </TableHead>
                        <TableHead className="text-sm md:text-base lg:text-lg font-bold py-3 md:py-4 text-right">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoading ? (
                        <TableRow>
                          <TableCell
                            colSpan={5}
                            className="h-24 sm:h-32 text-center text-base sm:text-lg md:text-xl"
                          >
                            Loading members...
                          </TableCell>
                        </TableRow>
                      ) : filteredMembers.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={5}
                            className="h-24 sm:h-32 text-center text-base sm:text-lg md:text-xl"
                          >
                            No members found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredMembers.map((member) => (
                          <TableRow
                            key={member.id}
                            className="hover:bg-gray-50/50"
                          >
                            <TableCell className="py-3 sm:py-4 md:py-5">
                              <div className="flex items-center gap-3 sm:gap-4">
                                <Avatar className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12">
                                  <AvatarFallback className="text-sm sm:text-base md:text-lg font-semibold">
                                    {getInitials(member.fullName)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-semibold text-sm sm:text-base md:text-lg">
                                    {member.fullName}
                                  </div>
                                  <div className="text-xs sm:text-sm md:text-base text-gray-500">
                                    Member ID: {member.id.slice(-8)}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="py-3 sm:py-4 md:py-5">
                              <div className="flex items-center gap-2 sm:gap-3">
                                <Mail className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-gray-500" />
                                <span className="text-sm sm:text-base md:text-lg">
                                  {member.email}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="py-3 sm:py-4 md:py-5">
                              {getStatusBadge(member.membershipStatus)}
                            </TableCell>
                            <TableCell className="py-3 sm:py-4 md:py-5">
                              <div className="text-sm sm:text-base md:text-lg text-gray-600">
                                <div>
                                  {member._count.nominationsMade} nominations
                                  made
                                </div>
                                <div>
                                  {member._count.EventUser} events attended
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-right py-3 sm:py-4 md:py-5">
                              <div className="flex justify-end gap-1 sm:gap-2 md:gap-3">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12"
                                  onClick={() =>
                                    router.push(`/admin/members/${member.id}`)
                                  }
                                >
                                  <Eye className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                                </Button>
                                {member.membershipStatus === "PENDING" && (
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
                                            Approve Member
                                          </AlertDialogTitle>
                                          <AlertDialogDescription className="text-sm sm:text-base md:text-lg">
                                            Are you sure you want to approve{" "}
                                            {member.fullName}&apos;s membership
                                            application?
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
                                                member.id,
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
                                            Deny Member
                                          </AlertDialogTitle>
                                          <AlertDialogDescription className="text-sm sm:text-base md:text-lg">
                                            Are you sure you want to deny{" "}
                                            {member.fullName}&apos;s membership
                                            application?
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
                                                member.id,
                                                "DENIED"
                                              )
                                            }
                                          >
                                            Deny
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
