import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = process.env.NEXTAUTH_SECRET || "secret";

export async function POST(req: NextRequest) {
  try {
    const { action, name, email, password } = await req.json();

    if (action === "register") {
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        return NextResponse.json({ error: "Email already registered" }, { status: 400 });
      }
      const hashed = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: { name, email, password: hashed, role: "STUDENT" },
      });
      return NextResponse.json({ message: "Account created", user: { id: user.id, name: user.name, email: user.email, role: user.role } }, { status: 201 });
    }

    if (action === "login") {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

      const accessToken = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET, { expiresIn: "15m" });
      const refreshToken = jwt.sign({ id: user.id }, SECRET, { expiresIn: "7d" });

      const response = NextResponse.json({
        message: "Login successful",
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
        accessToken,
      });

      response.cookies.set("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      return response;
    }

    if (action === "logout") {
      const response = NextResponse.json({ message: "Logged out" });
      response.cookies.delete("refreshToken");
      return response;
    }

    if (action === "refresh") {
      const refreshToken = req.cookies.get("refreshToken")?.value;
      if (!refreshToken) return NextResponse.json({ error: "No refresh token" }, { status: 401 });

      const decoded = jwt.verify(refreshToken, SECRET) as { id: string };
      const user = await prisma.user.findUnique({ where: { id: decoded.id } });
      if (!user) return NextResponse.json({ error: "User not found" }, { status: 401 });

      const accessToken = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET, { expiresIn: "15m" });
      return NextResponse.json({ accessToken });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}