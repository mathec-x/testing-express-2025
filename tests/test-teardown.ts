import { PrismaClient } from "@prisma/client";
import { execSync } from "child_process";

const prisma = new PrismaClient();
export default async () => {
  await prisma.$disconnect();
  execSync("docker stop db_test", { stdio: "inherit" });
  console.log("🛑 Banco de testes desligado!");
};