import { NextResponse } from "next/server";
import { prisma } from "@/lib/utils";

export async function GET({ params }: { params: { title: string } }) {
  const { title } = params;

  try {
    const news = await prisma.news.findUnique({
      where: { title },
    });

    if (!news) {
      return NextResponse.json({ message: "News not found" }, { status: 404 });
    }

    return NextResponse.json(news);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}