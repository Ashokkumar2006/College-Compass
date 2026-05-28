import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

const SECRET = process.env.NEXTAUTH_SECRET || "secret";

function getAdminFromToken(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  try {
    const decoded = jwt.verify(auth.split(" ")[1], SECRET) as { id: string; role: string };
    if (decoded.role !== "ADMIN") return null;
    return decoded;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  try {
    const admin = getAdminFromToken(req);
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const colleges = await prisma.college.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: { select: { courses: true, reviews: true } },
      },
    });

    return NextResponse.json({ colleges });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const admin = getAdminFromToken(req);
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { collegeId } = await req.json();
    await prisma.college.delete({ where: { id: collegeId } });

    return NextResponse.json({ message: "College deleted" });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}