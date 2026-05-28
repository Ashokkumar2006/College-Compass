import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = process.env.NEXTAUTH_SECRET || "secret";

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ error: "Token and password are required" }, { status: 400 });
    }

    const decoded = jwt.verify(token, SECRET) as { id: string; email: string };
    const hashed = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: decoded.id },
      data: { password: hashed },
    });

    return NextResponse.json({ message: "Password reset successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Invalid or expired reset link" }, { status: 400 });
  }
}