# testing-express-2025

## Como executar o projeto

### Pré-requisitos

- Node.js (versão 22 ou nvm)
- Docker
- Docker Compose

### Passo a passo

1. **Instalar as dependências do projeto:**

```bash
npm install
```

2. **Iniciar o Docker do banco de dados:**
```bash
npm run db:up
```

3. **Executar o projeto em modo de desenvolvimento:**
```bash
npm run dev
```

4. **Executar testes e2e:**
```bash
npm run test
```

### Outros scripts úteis
 - Parar o Docker do banco de dados:
```bash
npm run db:down
```

 - Gerar os arquivos do Prisma:
```bash
npm run db:generate
```

 - Abrir o Prisma Studio:
```bash
npm run db:studio
```

 - Executar as migrações do Prisma em desenvolvimento:
```bash
npm run db:migrate:dev
```

 - Construir o projeto:
```bash
npm run build
```

 - Executar os testes:
```bash
npm test
```

