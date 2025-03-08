# testing-express-2025

## Como executar o projeto
### Pré-requisitos
- Node.js (versão 22 ou nvm)
- Docker
- Docker Compose

### Passo a passo
1. **Instalar as dependências do projeto:** `npm install`
2. **Iniciar o Docker do banco de dados:** `npm run db:up`
3. **Executar o projeto em modo de desenvolvimento:** `npm run dev`
4. **Executar testes e2e:** `npm run test`

### Outros scripts úteis
 - Parar o Docker do banco de dados: `npm run db:down`
 - Gerar os arquivos do Prisma: `npm run db:generate`
 - Abrir o Prisma Studio: `npm run db:studio`
 - Executar as migrações do Prisma em desenvolvimento: `npm run db:migrate:dev`
 - Construir o projeto:`npm run build`
 - Executar os testes:`npm test`
