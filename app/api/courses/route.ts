import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const collegeId = searchParams.get("collegeId");

    const where: any = {};
    if (collegeId) where.collegeId = collegeId;

    const courses = await prisma.course.findMany({
      where,
      include: { college: { select: { name: true, slug: true } } },
    });

    return NextResponse.json({ courses });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const course = await prisma.course.create({
      data: {
        collegeId: body.collegeId,
        courseName: body.courseName,
        duration: body.duration,
        eligibility: body.eligibility,
      },
    });
    return NextResponse.json({ course }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}