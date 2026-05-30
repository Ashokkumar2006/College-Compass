import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

const SECRET = process.env.NEXTAUTH_SECRET || "secret";

function getUserFromToken(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  try {
    return jwt.verify(auth.split(" ")[1], SECRET) as { id: string; role: string };
  } catch {
    return null;
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = getUserFromToken(req);
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const { status } = await req.json();

    const review = await prisma.review.update({
      where: { id },
      data: { status },
    });

    if (status === "APPROVED") {
      const reviews = await prisma.review.findMany({
        where: { collegeId: review.collegeId, status: "APPROVED" },
      });
      const avgRating = reviews.reduce((sum: number, r) => sum + r.rating, 0) / reviews.length;
      await prisma.college.update({
        where: { id: review.collegeId },
        data: { rating: Math.round(avgRating * 10) / 10 },
      });
    }

    return NextResponse.json({ review, message: `Review ${status.toLowerCase()}` });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = getUserFromToken(req);
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.review.delete({ where: { id } });
    return NextResponse.json({ message: "Review deleted" });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}