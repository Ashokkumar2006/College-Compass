import { NextRequest, NextResponse } from "next/server";
import groq from "@/lib/groq";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { rank, stream } = await req.json();

    if (!rank || !stream) {
      return NextResponse.json(
        { error: "Rank and stream are required" },
        { status: 400 }
      );
    }

    const colleges = await prisma.college.findMany({
      take: 20,
      orderBy: { rank: "asc" },
      select: {
        name: true,
        location: true,
        rank: true,
        fees: true,
        placement: true,
        rating: true,
        slug: true,
        stream: true,
      },
    });

    const prompt = `
You are an expert Indian college counselor helping Class 12 students.

Student Profile:
- Stream: ${stream}
- Rank/Score: ${rank} ${stream === "engineering" ? "(JEE rank)" : "(NEET score)"}

Available colleges:
${JSON.stringify(colleges, null, 2)}

Based on the student's rank and stream, recommend the top 5 most suitable colleges.
Only recommend colleges that match the student's stream.
For JEE rank: lower rank number = better (rank 1 is best).
For NEET score: higher score = better (720 is max).

Respond ONLY with a valid JSON array. No extra text, no markdown, no backticks:
[
  {
    "name": "College Name",
    "slug": "college-slug",
    "chance": "High",
    "reason": "Brief 1-2 sentence reason"
  }
]

chance must be exactly "High", "Medium", or "Low".
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 1000,
    });

    const content = completion.choices[0].message.content || "[]";
    const clean = content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const recommendations = JSON.parse(clean);

    return NextResponse.json({ recommendations, rank, stream });
  } catch (error) {
    console.error("Recommendation error:", error);
    return NextResponse.json(
      { error: "Failed to get recommendations. Please try again." },
      { status: 500 }
    );
  }
}