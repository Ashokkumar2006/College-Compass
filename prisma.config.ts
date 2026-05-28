import path from "node:path";
import * as dotenv from "dotenv";

dotenv.config();

export default {
  schema: path.join("prisma", "schema.prisma"),
  datasource: {
    url: process.env.DATABASE_URL,
  },
};