import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const college = await prisma.college.findUnique({
      where: { slug },
      include: {
        courses: true,
        reviews: {
          where: { status: "APPROVED" },
          include: { user: { select: { name: true } } },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!college) return NextResponse.json({ error: "College not found" }, { status: 404 });
    return NextResponse.json({ college });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await req.json();
    const college = await prisma.college.update({
      where: { slug },
      data: {
        name: body.name,
        location: body.location,
        rank: body.rank,
        fees: body.fees,
        placement: body.placement,
        rating: body.rating,
        images: body.images,
      },
    });
    return NextResponse.json({ college });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await prisma.college.delete({ where: { slug } });
    return NextResponse.json({ message: "College deleted" });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}