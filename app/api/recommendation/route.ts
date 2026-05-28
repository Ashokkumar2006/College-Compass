import { NextRequest, NextResponse } from "next/server";
import openai from "@/lib/openai";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { rank, stream } = await req.json();

    if (!rank || !stream) {
      return NextResponse.json({ error: "Rank and stream are required" }, { status: 400 });
    }

    const colleges = await prisma.college.findMany({
      take: 20,
      orderBy: { rank: "asc" },
      include: { courses: true },
    });

    const collegeData = colleges.map((c) => ({
      name: c.name,
      location: c.location,
      rank: c.rank,
      fees: c.fees,
      placement: c.placement,
      rating: c.rating,
      slug: c.slug,
    }));

    const prompt = `
You are an expert Indian college counselor. A student has the following profile:
- Stream: ${stream}
- Rank/Score: ${rank}

Here are available colleges in our database:
${JSON.stringify(collegeData, null, 2)}

Based on the student's rank and stream, recommend the top 5 most suitable colleges.
For each college provide:
1. College name
2. Admission chance (High/Medium/Low) based on rank
3. A brief 1-2 sentence reason why this college is recommended

Respond ONLY with a valid JSON array like this:
[
  {
    "name": "College Name",
    "slug": "college-slug",
    "chance": "High",
    "reason": "Brief reason here"
  }
]
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = completion.choices[0].message.content || "[]";
    const clean = content.replace(/```json|```/g, "").trim();
    const recommendations = JSON.parse(clean);

    return NextResponse.json({ recommendations, rank, stream });
  } catch (error) {
    return NextResponse.json({ error: "Failed to get recommendations" }, { status: 500 });
  }
}