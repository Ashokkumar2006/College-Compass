import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

const SECRET = process.env.NEXTAUTH_SECRET || "secret";

function getUserFromToken(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  try {
    return jwt.verify(auth.split(" ")[1], SECRET) as { id: string };
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  try {
    const user = getUserFromToken(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const favorites = await prisma.favorite.findMany({
      where: { userId: user.id },
      include: { college: true },
    });

    return NextResponse.json({ favorites });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = getUserFromToken(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { collegeId } = await req.json();

    const existing = await prisma.favorite.findFirst({
      where: { userId: user.id, collegeId },
    });
    if (existing) return NextResponse.json({ error: "Already saved" }, { status: 400 });

    const favorite = await prisma.favorite.create({
      data: { userId: user.id, collegeId },
    });

    return NextResponse.json({ favorite, message: "College saved" }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = getUserFromToken(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { collegeId } = await req.json();

    await prisma.favorite.deleteMany({
      where: { userId: user.id, collegeId },
    });

    return NextResponse.json({ message: "College removed from favorites" });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}