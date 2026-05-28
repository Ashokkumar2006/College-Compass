import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const stream = searchParams.get("stream");

    const where: any = {};
    if (stream) where.stream = { contains: stream, mode: "insensitive" };

    const scholarships = await prisma.scholarship.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ scholarships });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const scholarship = await prisma.scholarship.create({
      data: {
        name: body.name,
        eligibility: body.eligibility,
        amount: body.amount,
        deadline: body.deadline ? new Date(body.deadline) : null,
        provider: body.provider,
        stream: body.stream,
      },
    });
    return NextResponse.json({ scholarship }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}