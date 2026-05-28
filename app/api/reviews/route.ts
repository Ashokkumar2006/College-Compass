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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const collegeId = searchParams.get("collegeId");
    const status = searchParams.get("status");

    const where: any = {};
    if (collegeId) where.collegeId = collegeId;
    if (status) where.status = status;

    const reviews = await prisma.review.findMany({
      where,
      include: { user: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ reviews });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = getUserFromToken(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { collegeId, rating, comment } = await req.json();

    const existing = await prisma.review.findFirst({
      where: { userId: user.id, collegeId },
    });
    if (existing) return NextResponse.json({ error: "You have already reviewed this college" }, { status: 400 });

    const review = await prisma.review.create({
      data: { userId: user.id, collegeId, rating, comment, status: "PENDING" },
    });

    return NextResponse.json({ review, message: "Review submitted for approval" }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}