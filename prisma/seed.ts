import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter } as any);

async function main() {
  console.log("Seeding database...");

  const colleges = [
    { name: "Indian Institute of Technology Bombay", location: "Mumbai, Maharashtra", rank: 1, fees: 900000, placement: "₹21 LPA", rating: 4.8, images: [], slug: "iit-bombay", stream: "Engineering" },
    { name: "Indian Institute of Technology Delhi", location: "New Delhi", rank: 2, fees: 850000, placement: "₹19 LPA", rating: 4.7, images: [], slug: "iit-delhi", stream: "Engineering" },
    { name: "Indian Institute of Technology Madras", location: "Chennai, Tamil Nadu", rank: 3, fees: 875000, placement: "₹18 LPA", rating: 4.7, images: [], slug: "iit-madras", stream: "Engineering" },
    { name: "All India Institute of Medical Sciences Delhi", location: "New Delhi", rank: 1, fees: 1500, placement: "₹18 LPA", rating: 4.9, images: [], slug: "aiims-delhi", stream: "Medical" },
    { name: "National Institute of Technology Trichy", location: "Tiruchirappalli, Tamil Nadu", rank: 8, fees: 600000, placement: "₹12 LPA", rating: 4.5, images: [], slug: "nit-trichy", stream: "Engineering" },
    { name: "BITS Pilani", location: "Pilani, Rajasthan", rank: 5, fees: 1800000, placement: "₹16 LPA", rating: 4.6, images: [], slug: "bits-pilani", stream: "Engineering" },
    { name: "JIPMER Puducherry", location: "Puducherry", rank: 3, fees: 5000, placement: "₹15 LPA", rating: 4.6, images: [], slug: "jipmer-puducherry", stream: "Medical" },
    { name: "VIT Vellore", location: "Vellore, Tamil Nadu", rank: 15, fees: 750000, placement: "₹8 LPA", rating: 4.2, images: [], slug: "vit-vellore", stream: "Engineering" },
    { name: "Delhi Technological University", location: "New Delhi", rank: 12, fees: 250000, placement: "₹10 LPA", rating: 4.3, images: [], slug: "dtu-delhi", stream: "Engineering" },
    { name: "Manipal Institute of Technology", location: "Manipal, Karnataka", rank: 20, fees: 1200000, placement: "₹9 LPA", rating: 4.1, images: [], slug: "mit-manipal", stream: "Engineering" },
  ];

  for (const college of colleges) {
    await prisma.college.upsert({
      where: { slug: college.slug },
      update: college,
      create: college,
    });
  }
  console.log("✅ Colleges seeded");

  const exams = [
    { name: "JEE Main", conductingBody: "NTA", eligibility: "Class 12 with PCM", stream: "Engineering", syllabus: "Physics, Chemistry, Mathematics" },
    { name: "JEE Advanced", conductingBody: "IIT", eligibility: "JEE Main qualified", stream: "Engineering", syllabus: "Physics, Chemistry, Mathematics (Advanced)" },
    { name: "NEET UG", conductingBody: "NTA", eligibility: "Class 12 with PCB", stream: "Medical", syllabus: "Physics, Chemistry, Biology" },
    { name: "MHT-CET", conductingBody: "Maharashtra State", eligibility: "Class 12 with PCM", stream: "Engineering", syllabus: "Physics, Chemistry, Mathematics" },
    { name: "KCET", conductingBody: "KEA Karnataka", eligibility: "Class 12 with PCM", stream: "Engineering", syllabus: "Physics, Chemistry, Mathematics" },
  ];

  for (const exam of exams) {
    await prisma.exam.create({ data: exam }).catch(() => {});
  }
  console.log("✅ Exams seeded");

  const scholarships = [
    { name: "AICTE Pragati Scholarship", provider: "AICTE", eligibility: "Female students in technical education", amount: 50000, stream: "Engineering" },
    { name: "Central Sector Scholarship", provider: "Ministry of Education", eligibility: "Class 12 above 80% marks", amount: 12000, stream: "All Streams" },
    { name: "INSPIRE Scholarship", provider: "DST", eligibility: "Top 1% in Class 12 boards", amount: 80000, stream: "Engineering" },
    { name: "National Merit Scholarship", provider: "State Government", eligibility: "NEET qualified students", amount: 25000, stream: "Medical" },
  ];

  for (const scholarship of scholarships) {
    await prisma.scholarship.create({ data: scholarship }).catch(() => {});
  }
  console.log("✅ Scholarships seeded");

  const collegeList = await prisma.college.findMany();

  const engineeringCourses = [
    { courseName: "B.Tech Computer Science", duration: "4 Years", eligibility: "JEE Main/Advanced" },
    { courseName: "B.Tech Electrical Engineering", duration: "4 Years", eligibility: "JEE Main/Advanced" },
    { courseName: "B.Tech Mechanical Engineering", duration: "4 Years", eligibility: "JEE Main/Advanced" },
    { courseName: "B.Tech Civil Engineering", duration: "4 Years", eligibility: "JEE Main/Advanced" },
  ];

  const medicalCourses = [
    { courseName: "MBBS", duration: "5.5 Years", eligibility: "NEET UG" },
    { courseName: "BDS", duration: "5 Years", eligibility: "NEET UG" },
    { courseName: "B.Sc Nursing", duration: "4 Years", eligibility: "NEET UG" },
  ];

  for (const college of collegeList) {
    const isMedical = college.stream === "Medical";
    const templates = isMedical ? medicalCourses : engineeringCourses;
    for (const template of templates) {
      await prisma.course.create({
        data: { collegeId: college.id, ...template },
      }).catch(() => {});
    }
  }
  console.log("✅ Courses seeded");
  console.log("🎉 Database seeded successfully!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());