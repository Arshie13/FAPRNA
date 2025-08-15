"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns";
import {
  Users,
  Calendar,
  Award,
  Newspaper,
  Clock,
  CheckCircle,
  Plus,
  // ArrowRight,
  UserCheck,
  ClockIcon as UserClock,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  getDashboardStats,
  getRecentActivity,
} from "@/lib/actions/dashboard-actions";

interface DashboardStats {
  users: {
    total: number;
    approved: number;
    pending: number;
    denied: number;
  };
  events: {
    total: number;
    upcoming: number;
    finished: number;
    latest: number;
  };
  nominations: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
  };
}

interface RecentActivity {
  id: string;
  type:
    | "USER_REGISTRATION"
    | "NOMINATION_SUBMITTED"
    | "EVENT_CREATED"
    | "NEWS_PUBLISHED";
  title: string;
  description: string;
  timestamp: Date;
  status?: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const [statsData, activityData] = await Promise.all([
          getDashboardStats(),
          getRecentActivity(),
        ]);
        setStats(statsData);
        setRecentActivity(activityData);
      } catch (error) {
        console.log("Error: ", error);
        toast("Failed to load dashboard data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "USER_REGISTRATION":
        return <Users className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />;
      case "NOMINATION_SUBMITTED":
        return <Award className="h-5 w-5 sm:h-6 sm:w-6 text-purple-500" />;
      case "EVENT_CREATED":
        return <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />;
      case "NEWS_PUBLISHED":
        return <Newspaper className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500" />;
      default:
        return <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500" />;
    }
  };

  const getActivityBadge = (status?: string) => {
    if (!status) return null;
    switch (status) {
      case "PENDING":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 border-yellow-200 text-xs sm:text-sm"
          >
            Pending
          </Badge>
        );
      case "APPROVED":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 border-green-200 text-xs sm:text-sm"
          >
            Approved
          </Badge>
        );
      case "REJECTED":
        return (
          <Badge
            variant="outline"
            className="bg-red-100 text-red-800 border-red-200 text-xs sm:text-sm"
          >
            Rejected
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="text-xs sm:text-sm">
            {status}
          </Badge>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full py-4 sm:py-6 md:py-8 lg:py-12 min-h-screen px-4 sm:px-6 md:px-8"
      style={{ background: "#003366" }}
    >
      {/* Header */}
      <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white drop-shadow-lg">
          Admin Dashboard
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white mt-2 sm:mt-3 md:mt-4 font-semibold drop-shadow">
          Welcome back! Here&apos;s what&apos;s happening with FAPRNA-NV.
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6 md:gap-8 lg:gap-10 grid-cols-1 xl:grid-cols-3">
        <div className="xl:col-span-2 space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10">
          {/* Stats Overview */}
          <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2">
            {/* Users Stats */}
            <Card className="p-3 sm:p-4 md:p-5 lg:p-6">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 sm:pb-4 md:pb-5 lg:pb-6">
                <CardTitle className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
                  Total Members
                </CardTitle>
                <Users className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold">
                  {stats!.users.total}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm sm:text-base md:text-lg text-muted-foreground mt-3 sm:mt-4 md:mt-5 lg:mt-6">
                  <div className="flex items-center gap-2">
                    <UserCheck className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                    <span className="text-sm sm:text-base">
                      {stats!.users.approved} approved
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserClock className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />
                    <span className="text-sm sm:text-base">
                      {stats!.users.pending} pending
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Events Stats */}
            <Card className="p-3 sm:p-4 md:p-5 lg:p-6">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 sm:pb-4 md:pb-5 lg:pb-6">
                <CardTitle className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
                  Events
                </CardTitle>
                <Calendar className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold">
                  {stats!.events.total}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm sm:text-base md:text-lg text-muted-foreground mt-3 sm:mt-4 md:mt-5 lg:mt-6">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                    <span className="text-sm sm:text-base">
                      {stats!.events.upcoming} upcoming
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                    <span className="text-sm sm:text-base">
                      {stats!.events.finished} finished
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pending Reviews and Nominations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {/* Pending Reviews Card */}
            <Card className="p-3 sm:p-4 md:p-5 lg:p-6">
              <CardHeader className="pb-4 sm:pb-5 md:pb-6 lg:pb-8">
                <CardTitle className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
                  Pending Reviews
                </CardTitle>
                <CardDescription className="text-sm sm:text-base md:text-lg lg:text-xl">
                  Items requiring your attention
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 pb-4 sm:pb-5 md:pb-6 lg:pb-8">
                <div className="space-y-3 sm:space-y-4 md:space-y-5">
                  {(stats?.nominations.pending ?? 0) > 0 && (
                    <Link href="/admin/nominations?tab=pending">
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-3 sm:gap-4 h-auto p-4 sm:p-5 md:p-6 border-[#003366] text-[#003366] text-sm sm:text-base md:text-lg lg:text-xl font-semibold hover:bg-[#a6e3fa] hover:text-[#003366] transition-all duration-300 rounded-xl shadow-lg"
                      >
                        <Award className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                        <div className="text-left">
                          <div className="font-bold text-sm sm:text-base md:text-lg lg:text-xl">
                            Nominations
                          </div>
                          <div className="text-xs sm:text-sm md:text-base text-gray-700">
                            {stats?.nominations.pending ?? 0} pending
                          </div>
                        </div>
                      </Button>
                    </Link>
                  )}
                  
                  {/* Spacer div */}
                  {(stats?.nominations.pending ?? 0) > 0 && (stats?.users.pending ?? 0) > 0 && (
                    <div className="h-3 sm:h-2 md:h-2"></div>
                  )}
                  
                  {(stats?.users.pending ?? 0) > 0 && (
                    <Link href="/admin/members?tab=pending">
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-3 sm:gap-4 h-auto p-4 sm:p-5 md:p-6 border-[#003366] text-[#003366] text-sm sm:text-base md:text-lg lg:text-xl font-semibold hover:bg-[#a6e3fa] hover:text-[#003366] transition-all duration-300 rounded-xl shadow-lg"
                      >
                        <Users className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                        <div className="text-left">
                          <div className="font-bold text-sm sm:text-base md:text-lg lg:text-xl">
                            Member Applications
                          </div>
                          <div className="text-xs sm:text-sm md:text-base text-gray-700">
                            {stats?.users.pending} pending
                          </div>
                        </div>
                      </Button>
                    </Link>
                  )}
                  {stats?.nominations.pending === 0 &&
                    stats?.users.pending === 0 && (
                      <div className="text-center py-8 sm:py-10 md:py-12 text-gray-300">
                        <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 mx-auto mb-3 sm:mb-4 md:mb-6 opacity-50" />
                        <p className="font-bold text-base sm:text-lg md:text-xl">
                          All caught up!
                        </p>
                        <p className="text-sm sm:text-base md:text-lg">
                          No pending items to review
                        </p>
                      </div>
                    )}
                </div>
              </CardContent>
            </Card>

            {/* Nominations Stats Card */}
            <Card className="p-3 sm:p-4 md:p-5 lg:p-6">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 sm:pb-4 md:pb-5 lg:pb-6">
                <CardTitle className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
                  Nominations
                </CardTitle>
                <Award className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold">
                  {stats?.nominations.total || 0}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm sm:text-base md:text-lg text-muted-foreground mt-3 sm:mt-4 md:mt-5 lg:mt-6">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />
                    <span className="text-sm sm:text-base">
                      {stats?.nominations.pending || 0} pending
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                    <span className="text-sm sm:text-base">
                      {stats?.nominations.approved || 0} approved
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="p-3 sm:p-4 md:p-5 lg:p-6">
            <CardHeader className="pb-4 sm:pb-5 md:pb-6 lg:pb-8">
              <CardTitle className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
                Quick Actions
              </CardTitle>
              <CardDescription className="text-sm sm:text-base md:text-lg lg:text-xl">
                Common administrative tasks
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0 pb-4 sm:pb-5 md:pb-6 lg:pb-8">
              <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2">
                <Link href="/admin/events/create">
                  <Button className="w-full justify-start gap-3 sm:gap-4 h-auto p-4 sm:p-5 md:p-6 bg-[#003366] text-white text-sm sm:text-base md:text-lg lg:text-xl font-semibold hover:bg-[#002244] hover:text-white transition-all duration-300 rounded-xl shadow-lg">
                    <Plus className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                    <div className="text-left">
                      <div className="font-bold text-sm sm:text-base md:text-lg lg:text-xl">
                        Create Event
                      </div>
                      <div className="text-xs sm:text-sm md:text-base text-white/80">
                        Add new event
                      </div>
                    </div>
                  </Button>
                </Link>
                <Link href="/admin/nominations">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3 sm:gap-4 h-auto p-4 sm:p-5 md:p-6 border-[#003366] text-[#003366] text-sm sm:text-base md:text-lg lg:text-xl font-semibold hover:bg-[#a6e3fa] hover:text-[#003366] transition-all duration-300 rounded-xl shadow-lg"
                  >
                    <Award className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                    <div className="text-left">
                      <div className="font-bold text-sm sm:text-base md:text-lg lg:text-xl">
                        Review Nominations
                      </div>
                      <div className="text-xs sm:text-sm md:text-base text-gray-700">
                        {stats?.nominations.pending || 0} pending review
                      </div>
                    </div>
                  </Button>
                </Link>
                <Link href="/admin/members">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3 sm:gap-4 h-auto p-4 sm:p-5 md:p-6 border-[#003366] text-[#003366] text-sm sm:text-base md:text-lg lg:text-xl font-semibold hover:bg-[#a6e3fa] hover:text-[#003366] transition-all duration-300 rounded-xl shadow-lg"
                  >
                    <Users className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                    <div className="text-left">
                      <div className="font-bold text-sm sm:text-base md:text-lg lg:text-xl">
                        Manage Members
                      </div>
                      <div className="text-xs sm:text-sm md:text-base text-gray-700">
                        {stats?.users.pending || 0} pending approval
                      </div>
                    </div>
                  </Button>
                </Link>
                <Link href="/admin/events">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3 sm:gap-4 h-auto p-4 sm:p-5 md:p-6 border-[#003366] text-[#003366] text-sm sm:text-base md:text-lg lg:text-xl font-semibold hover:bg-[#a6e3fa] hover:text-[#003366] transition-all duration-300 rounded-xl shadow-lg"
                  >
                    <Calendar className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                    <div className="text-left">
                      <div className="font-bold text-sm sm:text-base md:text-lg lg:text-xl">
                        Event Management
                      </div>
                      <div className="text-xs sm:text-sm md:text-base text-gray-700">
                        {stats?.events.upcoming || 0} upcoming events
                      </div>
                    </div>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10">
          {/* Recent Activity */}
          <Card className="p-3 sm:p-4 md:p-5 lg:p-6">
            <CardHeader className="pb-4 sm:pb-5 md:pb-6 lg:pb-8">
              <CardTitle className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
                Recent Activity
              </CardTitle>
              <CardDescription className="text-sm sm:text-base md:text-lg lg:text-xl">
                Latest actions and submissions
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0 pb-4 sm:pb-5 md:pb-6 lg:pb-8">
              {recentActivity.length === 0 ? (
                <div className="text-center py-8 sm:py-10 md:py-12 lg:py-16 text-gray-300">
                  <Clock className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 mx-auto mb-3 sm:mb-4 md:mb-6 opacity-50" />
                  <p className="text-base sm:text-lg md:text-xl">
                    No recent activity
                  </p>
                </div>
              ) : (
                <div className="space-y-4 sm:space-y-6 md:space-y-8">
                  {recentActivity.slice(0, 8).map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-3 sm:gap-4 md:gap-5 p-3 sm:p-4 md:p-5 rounded-xl hover:bg-[#a6e3fa] transition-colors"
                    >
                      <div className="flex-shrink-0 mt-1">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                          <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 truncate">
                            {activity.title}
                          </p>
                          {getActivityBadge(activity.status)}
                        </div>
                        <p className="text-xs sm:text-sm md:text-base text-gray-700 truncate mt-1">
                          {activity.description}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
                          {format(
                            new Date(activity.timestamp),
                            "MMM d, yyyy 'at' h:mm a"
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
