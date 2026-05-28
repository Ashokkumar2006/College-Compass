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

    const [totalColleges, totalUsers, totalReviews, pendingReviews] = await Promise.all([
      prisma.college.count(),
      prisma.user.count(),
      prisma.review.count(),
      prisma.review.count({ where: { status: "PENDING" } }),
    ]);

    return NextResponse.json({
      analytics: {
        totalColleges,
        totalUsers,
        totalReviews,
        pendingReviews,
      },
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}