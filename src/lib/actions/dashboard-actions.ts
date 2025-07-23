"use server"

import { prisma } from "../utils"

// Get dashboard statistics
export async function getDashboardStats() {
  try {
    const [
      totalMembers,
      approvedMembers,
      pendingMembers,
      deniedMembers,
      totalEvents,
      upcomingEvents,
      finishedEvents,
      latestEvents,
      totalNominations,
      pendingNominations,
      approvedNominations,
      rejectedNominations,
      totalNews,
      publishedNews,
      latestNews,
    ] = await Promise.all([
      // Member stats (updated from User to Member)
      prisma.member.count(),
      prisma.member.count({ where: { membershipStatus: "APPROVED" } }),
      prisma.member.count({ where: { membershipStatus: "PENDING" } }),
      prisma.member.count({ where: { membershipStatus: "DENIED" } }),

      // Event stats
      prisma.event.count(),
      prisma.event.count({ where: { date: { gte: new Date() }, isFinished: false } }),
      prisma.event.count({ where: { isFinished: true } }),
      prisma.event.count({ where: { isLatest: true } }),

      // Nomination stats
      prisma.nomination.count(),
      prisma.nomination.count({ where: { status: "PENDING" } }),
      prisma.nomination.count({ where: { status: "APPROVED" } }),
      prisma.nomination.count({ where: { status: "REJECTED" } }),

      // News stats (using Event model)
      prisma.event.count(),
      prisma.event.count(),
      prisma.event.count({ where: { isLatest: true } }),
    ])

    return {
      users: {
        total: totalMembers,
        approved: approvedMembers,
        pending: pendingMembers,
        denied: deniedMembers,
      },
      events: {
        total: totalEvents,
        upcoming: upcomingEvents,
        finished: finishedEvents,
        latest: latestEvents,
      },
      nominations: {
        total: totalNominations,
        pending: pendingNominations,
        approved: approvedNominations,
        rejected: rejectedNominations,
      },
      news: {
        total: totalNews,
        published: publishedNews,
        latest: latestNews,
      },
    }
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error)
    throw new Error("Failed to fetch dashboard stats")
  }
}

// Get recent activity
export async function getRecentActivity() {
  try {
    const [recentMembers, recentNominations, recentEvents] = await Promise.all([
      // Recent member registrations (updated from user to member)
      prisma.member.findMany({
        take: 5,
        orderBy: { id: "desc" },
        select: {
          id: true,
          fullName: true,
          email: true,
          membershipStatus: true,
        },
      }),

      // Recent nominations
      prisma.nomination.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          category: true,
          status: true,
          createdAt: true,
          nominator: {
            select: {
              fullName: true,
            },
          },
        },
      }),

      // Recent events
      prisma.event.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          date: true,
          createdAt: true,
        },
      }),
    ])

    const activity = [
      ...recentMembers.map((member) => ({
        id: `member-${member.id}`,
        type: "USER_REGISTRATION" as const,
        title: "New Member Registration",
        description: `${member.fullName} (${member.email}) registered`,
        timestamp: new Date(), // You might want to add a createdAt field to Member model
        status: member.membershipStatus,
      })),
      ...recentNominations.map((nomination) => ({
        id: `nomination-${nomination.id}`,
        type: "NOMINATION_SUBMITTED" as const,
        title: "New Nomination",
        description: `${nomination.nominator?.fullName} submitted a nomination for ${nomination.category}`,
        timestamp: nomination.createdAt,
        status: nomination.status,
      })),
      ...recentEvents.map((event) => ({
        id: `event-${event.id}`,
        type: "EVENT_CREATED" as const,
        title: "Event Created",
        description: `${event.title} scheduled for ${event.date.toLocaleDateString()}`,
        timestamp: event.createdAt,
      })),
    ]

    // Sort by timestamp and return latest 10
    return activity.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 10)
  } catch (error) {
    console.error("Failed to fetch recent activity:", error)
    throw new Error("Failed to fetch recent activity")
  }
}
