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
  ArrowRight,
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
        return <Users className="h-4 w-4 text-blue-500" />;
      case "NOMINATION_SUBMITTED":
        return <Award className="h-4 w-4 text-purple-500" />;
      case "EVENT_CREATED":
        return <Calendar className="h-4 w-4 text-green-500" />;
      case "NEWS_PUBLISHED":
        return <Newspaper className="h-4 w-4 text-orange-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActivityBadge = (status?: string) => {
    if (!status) return null;
    switch (status) {
      case "PENDING":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 border-yellow-200"
          >
            Pending
          </Badge>
        );
      case "APPROVED":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 border-green-200"
          >
            Approved
          </Badge>
        );
      case "REJECTED":
        return (
          <Badge
            variant="outline"
            className="bg-red-100 text-red-800 border-red-200"
          >
            Rejected
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="w-full py-10" style={{ background: "#003366" }}>
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
      className="w-full py-6 min-h-screen"
      style={{ background: "#003366" }}
    >
      {/* Header */}
      <div className="mb-8 px-4 sm:px-6">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white drop-shadow-lg">
          Admin Dashboard
        </h1>
        <p className="text-lg sm:text-2xl text-white mt-2 sm:mt-4 font-semibold drop-shadow">
          Welcome back! Here&apos;s what&apos;s happening with FAPRNA-NV.
        </p>
      </div>

      {/* Stats Overview */}
      {stats && (
        <div className="mb-8 px-4 sm:px-6 grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Users Stats */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">Total Members</CardTitle>
              <Users className="h-8 w-8 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-extrabold">{stats.users.total}</div>
              <div className="flex items-center gap-4 text-lg text-muted-foreground mt-4">
                <UserCheck className="h-5 w-5 text-green-600" />
                <span>{stats.users.approved} approved</span>
                <UserClock className="h-5 w-5 text-yellow-600" />
                <span>{stats.users.pending} pending</span>
              </div>
            </CardContent>
          </Card>

          {/* Events Stats */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">Events</CardTitle>
              <Calendar className="h-8 w-8 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-extrabold">
                {stats.events.total}
              </div>
              <div className="flex items-center gap-4 text-lg text-muted-foreground mt-4">
                <Clock className="h-5 w-5 text-blue-600" />
                <span>{stats.events.upcoming} upcoming</span>
                <CheckCircle className="h-5 w-5 text-gray-600" />
                <span>{stats.events.finished} finished</span>
              </div>
            </CardContent>
          </Card>

          {/* Nominations Stats */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">Nominations</CardTitle>
              <Award className="h-8 w-8 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-extrabold">
                {stats.nominations.total}
              </div>
              <div className="flex items-center gap-4 text-lg text-muted-foreground mt-4">
                <Clock className="h-5 w-5 text-yellow-600" />
                <span>{stats.nominations.pending} pending</span>
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>{stats.nominations.approved} approved</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid gap-8 sm:gap-10 grid-cols-1 lg:grid-cols-3 px-6">
        <div className="lg:col-span-2 space-y-8 sm:space-y-10 pl-0 sm:pl-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Quick Actions
              </CardTitle>
              <CardDescription className="text-lg">
                Common administrative tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <Link href="/admin/events/create">
                  <Button className="w-full justify-start gap-4 h-auto p-6 bg-[#003366] text-white text-xl font-semibold hover:bg-[#002244] hover:text-white transition-all duration-300 rounded-xl shadow-lg">
                    <Plus className="h-7 w-7" />
                    <div className="text-left">
                      <div className="font-bold text-xl">Create Event</div>
                      <div className="text-base text-white/80">
                        Add new event
                      </div>
                    </div>
                  </Button>
                </Link>
                <Link href="/admin/nominations">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-4 h-auto p-6 border-[#003366] text-[#003366] text-xl font-semibold hover:bg-[#a6e3fa] hover:text-[#003366] transition-all duration-300 rounded-xl shadow-lg"
                  >
                    <Award className="h-7 w-7" />
                    <div className="text-left">
                      <div className="font-bold text-xl">
                        Review Nominations
                      </div>
                      <div className="text-base text-gray-700">
                        {stats?.nominations.pending || 0} pending review
                      </div>
                    </div>
                  </Button>
                </Link>
                <Link href="/admin/members">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-4 h-auto p-6 border-[#003366] text-[#003366] text-xl font-semibold hover:bg-[#a6e3fa] hover:text-[#003366] transition-all duration-300 rounded-xl shadow-lg"
                  >
                    <Users className="h-7 w-7" />
                    <div className="text-left">
                      <div className="font-bold text-xl">Manage Members</div>
                      <div className="text-base text-gray-700">
                        {stats?.users.pending || 0} pending approval
                      </div>
                    </div>
                  </Button>
                </Link>
                <Link href="/admin/events">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-4 h-auto p-6 border-[#003366] text-[#003366] text-xl font-semibold hover:bg-[#a6e3fa] hover:text-[#003366] transition-all duration-300 rounded-xl shadow-lg"
                  >
                    <Calendar className="h-7 w-7" />
                    <div className="text-left">
                      <div className="font-bold text-xl">Event Management</div>
                      <div className="text-base text-gray-700">
                        {stats?.events.upcoming || 0} upcoming events
                      </div>
                    </div>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Recent Activity
              </CardTitle>
              <CardDescription className="text-lg">
                Latest actions and submissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recentActivity.length === 0 ? (
                <div className="text-center py-12 text-gray-300 text-xl">
                  <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No recent activity</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {recentActivity.slice(0, 8).map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-5 p-5 rounded-xl hover:bg-[#60a5fa] transition-colors"
                    >
                      {getActivityIcon(activity.type)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-lg font-semibold text-gray-900 truncate">
                            {activity.title}
                          </p>
                          {getActivityBadge(activity.status)}
                        </div>
                        <p className="text-base text-gray-700 truncate">
                          {activity.description}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
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

        <div className="space-y-8 sm:space-y-10 pr-0 sm:pr-6">
          {/* Pending Items */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Pending Reviews
              </CardTitle>
              <CardDescription className="text-lg">
                Items requiring your attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {(stats?.nominations.pending ?? 0) > 0 && (
                  <Link href="/admin/nominations?tab=pending">
                    <div className="flex items-center justify-between p-5 rounded-xl border hover:bg-gray-100 transition-colors text-lg">
                      <div className="flex items-center gap-4">
                        <Award className="h-6 w-6 text-purple-500" />
                        <div>
                          <p className="font-bold">Nominations</p>
                          <p className="text-base text-gray-700">
                            {stats?.nominations.pending ?? 0} pending
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="h-6 w-6 text-gray-400" />
                    </div>
                  </Link>
                )}
                {(stats?.users.pending ?? 0) > 0 && (
                  <Link href="/admin/members?tab=pending">
                    <div className="flex items-center justify-between p-5 rounded-xl border hover:bg-gray-100 transition-colors text-lg">
                      <div className="flex items-center gap-4">
                        <Users className="h-6 w-6 text-blue-500" />
                        <div>
                          <p className="font-bold">Member Applications</p>
                          <p className="text-base text-gray-700">
                            {stats?.users.pending} pending
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="h-6 w-6 text-gray-400" />
                    </div>
                  </Link>
                )}
                {stats?.nominations.pending === 0 &&
                  stats?.users.pending === 0 && (
                    <div className="text-center py-10 text-gray-300 text-xl">
                      <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="font-bold">All caught up!</p>
                      <p className="text-lg">No pending items to review</p>
                    </div>
                  )}
              </div>
            </CardContent>
          </Card>

          {/* System Status
          <Card>
            <CardHeader>
              <CardTitle>System Overview</CardTitle>
              <CardDescription>Current system status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Database</span>
                  <Badge
                    variant="outline"
                    className="bg-green-100 text-green-800 border-green-200"
                  >
                    Online
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Backup</span>
                  <span className="text-sm text-gray-500">2 hours ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Active Sessions</span>
                  <span className="text-sm text-gray-500">
                    {stats?.users.approved || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Storage Used</span>
                  <span className="text-sm text-gray-500">2.4 GB</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Links */}
          {/* <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
              <CardDescription>Frequently accessed pages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Link href="/admin/events" className="block">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2"
                  >
                    <Newspaper className="h-4 w-4" />
                    Events Management
                  </Button>
                </Link>
                <Link href="/admin/nominations" className="block">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2"
                  >
                    <Award className="h-4 w-4" />
                    Nominations
                  </Button>
                </Link>
                <Link href="/admin/members" className="block">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2"
                  >
                    <Users className="h-4 w-4" />
                    Members
                  </Button>
                </Link>
                <Link href="/admin/settings" className="block">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2"
                  >
                    <BarChart3 className="h-4 w-4" />
                    Analytics
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </div>
  );
}
