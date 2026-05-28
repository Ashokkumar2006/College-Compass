import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import resend from "@/lib/resend";
import jwt from "jsonwebtoken";

const SECRET = process.env.NEXTAUTH_SECRET || "secret";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({
        message: "If this email exists, a reset link has been sent"
      });
    }

    const resetToken = jwt.sign(
      { id: user.id, email: user.email },
      SECRET,
      { expiresIn: "1h" }
    );

    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;

    await resend.emails.send({
      from: "CollegeCompass <onboarding@resend.dev>",
      to: email,
      subject: "Reset your CollegeCompass password",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">Reset Your Password</h2>
          <p>Hi ${user.name},</p>
          <p>You requested a password reset for your CollegeCompass account.</p>
          <p>Click the button below to reset your password. This link expires in 1 hour.</p>
          <a href="${resetUrl}" style="display:inline-block; background:#4F46E5; color:white; padding:12px 24px; border-radius:9999px; text-decoration:none; font-weight:bold; margin:16px 0;">
            Reset Password
          </a>
          <p style="color:#64748B; font-size:14px;">If you didn't request this, ignore this email.</p>
          <hr style="border:none; border-top:1px solid #E2E8F0; margin:24px 0;">
          <p style="color:#94A3B8; font-size:12px;">CollegeCompass — India's #1 College Discovery Platform</p>
        </div>
      `,
    });

    return NextResponse.json({ message: "Reset link sent to your email" });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: "Failed to send reset email" }, { status: 500 });
  }
}