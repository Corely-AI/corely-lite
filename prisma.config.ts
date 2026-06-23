import { config } from "dotenv";
import { resolve } from "path";
import { existsSync } from "fs";

// Load local .env if it exists
const envPath = resolve(".env");
if (existsSync(envPath)) {
  config({ path: envPath });
}

export default {
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL,
  },
};
