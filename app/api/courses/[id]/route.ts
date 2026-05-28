import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        college: {
          select: {
            id: true,
            name: true,
            location: true,
            slug: true,
            fees: true,
            placement: true,
            rating: true,
            rank: true,
          },
        },
      },
    });

    if (!course) return NextResponse.json({ error: "Course not found" }, { status: 404 });
    return NextResponse.json({ course });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const course = await prisma.course.update({
      where: { id },
      data: {
        courseName: body.courseName,
        duration: body.duration,
        eligibility: body.eligibility,
      },
    });
    return NextResponse.json({ course });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.course.delete({ where: { id } });
    return NextResponse.json({ message: "Course deleted" });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}