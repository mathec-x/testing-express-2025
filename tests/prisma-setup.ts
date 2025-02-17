import { execSync } from "child_process";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

beforeAll(async () => {
  execSync("npx prisma migrate deploy --preview-feature", { stdio: "inherit" });
});

afterAll(async () => {
  await prisma.$disconnect();
});