import { execSync } from "child_process";

export default async () => {
  console.log("🚀 Iniciando o banco de testes...");
  
  try {
    execSync("docker start db_test", { stdio: "inherit" });
  } catch (error) {
    console.log("🛠️ Criando container de testes...");
    execSync("docker-compose -f ./docker/database/docker-compose.yml up -d db_test", { stdio: "inherit" });
  }
  
  console.log("✅ Banco de testes pronto!");
  
  // Aguarda alguns segundos para garantir que o banco está pronto
  await new Promise((resolve) => setTimeout(resolve, 3000));
  execSync("npx prisma migrate deploy", { stdio: "inherit" });
};