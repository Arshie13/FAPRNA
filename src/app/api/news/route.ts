import { NextResponse } from "next/server";
import { prisma } from "@/lib/utils";

export async function GET() {
  try {
    const news = await prisma.news.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (news.length === 0) {
      return NextResponse.json({ message: "No news found. Please contact your administrator" }, { status: 404 });
    }
    return NextResponse.json(news);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received request body:", body);

    const {
      type,
      title,
      time,
      date,
      location,
      address,
      description,
      ceus,
      image,
      expected_attendees,
      isFinished = false,
      isLatest = false
    } = body;

    // Validate required enum type
    if (!["EVENT", "RECOGNITION", "TEAM"].includes(type)) {
      console.error("Invalid news type:", type);
      return NextResponse.json({ error: "Invalid news type" }, { status: 400 });
    }

    // Validate and parse date
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      console.error("Invalid date:", date);
      return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
    }

    // Create the news item
    try {
      const newNews = await prisma.news.create({
        data: {
          type,
          title,
          time,
          date: parsedDate,
          location,
          address,
          description,
          ceus: Number(ceus),
          image,
          expected_attendees: Number(expected_attendees),
          isFinished,
          isLatest
        }
      });
      console.log("Successfully created news:", newNews);
      return NextResponse.json(newNews);
    } catch (prismaError) {
      throw prismaError;
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}