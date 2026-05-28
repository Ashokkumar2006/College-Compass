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

    const [
      totalColleges,
      totalUsers,
      totalReviews,
      pendingReviews,
      approvedReviews,
      totalFavorites,
      topColleges,
    ] = await Promise.all([
      prisma.college.count(),
      prisma.user.count(),
      prisma.review.count(),
      prisma.review.count({ where: { status: "PENDING" } }),
      prisma.review.count({ where: { status: "APPROVED" } }),
      prisma.favorite.count(),
      prisma.college.findMany({
        take: 5,
        orderBy: { favorites: { _count: "desc" } },
        include: { _count: { select: { favorites: true, reviews: true } } },
      }),
    ]);

    return NextResponse.json({
      reports: {
        totalColleges,
        totalUsers,
        totalReviews,
        pendingReviews,
        approvedReviews,
        totalFavorites,
        topColleges,
      },
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}