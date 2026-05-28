import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const stream = searchParams.get("stream");

    const where: any = {};
    if (stream) where.stream = { contains: stream, mode: "insensitive" };

    const exams = await prisma.exam.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ exams });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const exam = await prisma.exam.create({
      data: {
        name: body.name,
        conductingBody: body.conductingBody,
        eligibility: body.eligibility,
        syllabus: body.syllabus,
        importantDates: body.importantDates,
        stream: body.stream,
      },
    });
    return NextResponse.json({ exam }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}