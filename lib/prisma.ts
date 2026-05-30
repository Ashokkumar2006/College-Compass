import pkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const PrismaClient = (pkg as any).PrismaClient;

declare global {
  // use `any` here to avoid type errors during builds when the generated client isn't present
  var prisma: any | undefined;
}

function createClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("Missing DATABASE_URL environment variable. Set it in Vercel and redeploy.");
  }
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter } as any);
}

export const prisma = global.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default prisma;