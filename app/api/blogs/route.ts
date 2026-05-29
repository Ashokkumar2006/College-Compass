import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { publishedAt: "desc" },
    });
    return NextResponse.json({ blogs });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const slug = body.title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        slug,
        content: body.content,
        authorId: body.authorId,
      },
    });
    return NextResponse.json({ blog }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}