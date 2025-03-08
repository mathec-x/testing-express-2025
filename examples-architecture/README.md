
# Tipos de arquiteturas que posso usar

## Hexagonal Architecture (Ports and Adapters) e DDD (Domain-Driven Design)
👉 Objetivo: Criar uma aplicação modular, separando a lógica do negócio dos frameworks externos.

📌 Principais conceitos:
 - ✅ Core (Domínio + Casos de Uso) → Puro, sem dependência de frameworks
 - ✅ Ports (Interfaces) → Definem como o Core se comunica com o mundo externo
 - ✅ Adapters (Implementações dos Ports) → Adaptam banco de dados, HTTP, APIs externas

📌 Quando usar?
 - ✔️ Quando você quer uma aplicação desacoplada de frameworks
 - ✔️ Projetos que precisam mudar implementações facilmente (ex: trocar Prisma por MongoDB)
 - ✔️ Sistemas que exigem testes unitários fáceis de escrever

### Camadas
- Core/
    - Não depende de banco de dados, HTTP ou bibliotecas externas
    - Só contém regras de negócio
    - Define contratos para comunicação (Ports)
- Core/domain/
    - Entidades → Objetos com identidade única
    ```ts
    export class User {
        constructor(
            public email: string
        ) {}

        changeEmail(newEmail: string) {
            if (!newEmail.includes("@")) throw new Error("Invalid email");
            this.email = newEmail;
        }
    }
    ```
    - Value Objects → Objetos imutáveis sem identidade própria
    ```ts 
    export class Email {
        constructor(private readonly value: string) {
            if (!value.includes("@")) throw new Error("Invalid email");
        }

        getValue() {
            return this.value;
        }
    }
    ```
    - Domain Services → Lógica que não pertence a uma única entidade
    ```ts
    import { User } from "../entities/user";

    export class UserService {
        static updateUserEmail(user: User, newEmail: string) {
            user.changeEmail(newEmail);
        }
    }
    ```
    - Aggregates → Entidades que garantem consistência no domínio
    - Domain Events → Eventos do domínio para comunicação assíncrona
    ```ts
    // domain-event.ts
    export abstract class DomainEvent {
        constructor(
            public readonly occurredOn: Date = new Date()
        ) {}
    }
    // user.created.event.ts
    export class UserCreatedEvent extends DomainEvent { }
    // user.email.changed.event.ts
    export class UserEmailChangedEvent extends DomainEvent { }
    ```

- Core/use-cases/
    - Aqui ficam as regras de aplicação, chamando as regras do domínio
    - exemplo create-user.use-case.ts
    ```ts
    import { UserRepositoryPort } from "@/core/ports/repositories/user-repository.port";
    import { User } from "@/core/domain/entities/user";

    export class CreateUserUseCase {
    constructor(private userRepository: UserRepositoryPort) {}

    async execute(name: string, email: string): Promise<User> {
        const user = new User(crypto.randomUUID(), name, email);
        await this.userRepository.save(user);
        return user;
        }
    }
    ```
- Core/ports/
    - Interfaces para comunicação do Core com o mundo externo
    - exemplo user-repository.port.ts
    ```ts
    import { User } from "@/core/domain/entities/user";

    export interface UserRepositoryPort {
        findById(id: string): Promise<User | null>;
        save(user: User): Promise<void>;
    }
    ```

- Adapters/
    - Implementam os Ports
    - Adaptam frameworks para a aplicação
    - Exemplo: conexão com banco de dados, controllers HTTP 
    - adapters/persistence/prisma-user.repository.ts
    ```ts
    import { PrismaClient } from "@prisma/client";
    import { UserRepositoryPort } from "@/core/ports/repositories/user-repository.port";
    import { User } from "@/core/domain/entities/user";

    export class PrismaUserRepository implements UserRepositoryPort {
        constructor(private prisma: PrismaClient) {}

        async findById(id: string): Promise<User | null> {
            const user = await this.prisma.user.findUnique({ where: { id } });
            return user ? new User(user.id, user.name, user.email) : null;
        }

        async save(user: User): Promise<void> {
            await this.prisma.user.create({ data: { id: user.id, name: user.name, email: user.email } });
        }
    }
    ```
    - adapters/controllers/user.controller.ts
    ```ts
    import { CreateUserUseCase } from "@/core/use-cases/user/create-user.use-case";
    import { Context } from "koa";

    export class UserController {
        constructor(private createUserUseCase: CreateUserUseCase) {}

        async create(ctx: Context) {
            const { name, email } = ctx.request.body;
            const user = await this.createUserUseCase.execute(name, email);
            ctx.body = { id: user.id, name: user.name, email: user.email };
        }
    }
    ```
- Infrastructure/
    - Gerencia configurações de frameworks e bibliotecas externas
    - Onde fica a inicialização de servidores, banco de dados, cache, etc.

```bash
├── src/
│   ├── core/              # 💡 Coração do sistema, sem dependências externas
│   │   ├── domain/        # 📌 Modelagem do Domínio (DDD)
│   │   │   ├── entities/
│   │   │   │   ├── user.ts
│   │   │   ├── value-objects/
│   │   │   │   ├── email.ts
│   │   │   ├── aggregates/
│   │   │   │   ├── user.aggregate.ts
│   │   │   ├── repositories/
│   │   │   │   ├── user-repository.ts
│   │   │   ├── domain-events/
│   │   │   │   ├── domain-event.ts
│   │   │   │   ├── user-created.event.ts
│   │   │   │   ├── user-email-changed.event.ts
│   │   ├── use-cases/   # 🎯 Casos de Uso
│   │   │   ├── create-user.use-case.ts
│   │   │   ├── update-user.use-case.ts
│   │   ├── ports/       # 🔌 Interfaces de comunicação (Ports)
│   │   │   ├── repositories/
│   │   │   │   ├── user-repository.port.ts
│   │   │   ├── services/
│   ├── adapters/        # 🔌 Implementação dos Ports (Infraestrutura)
│   │   ├── persistence/ # 🔍 Implementação dos Repositórios
│   │   │   ├── prisma-user.repository.ts
│   │   ├── controllers/ # 🌎 HTTP (Controllers adaptam para o Core)
│   │   │   ├── user.controller.ts
│   │   ├── gateways/    # 📡 Comunicação com APIs externas
│   │   │   ├── email.gateway.ts
│   ├── infrastructure/  # 🔧 Configuração e frameworks externos
│   │   ├── http/       # Framework HTTP (Koa, Express, etc.)
│   │   ├── database/   # Configuração do Prisma / Banco de Dados
│   │   ├── config/     # Configuração geral (Logger, env, etc.)
│   ├── main.ts         # 🚀 Ponto de entrada da aplicação
└── package.json
```

## Clean Architecture e DDD (Domain-Driven Design)
👉 Objetivo: Criar um código organizado e modular, com regras de negócio no centro e camadas externas dependentes dele.

📌 Principais conceitos:
 - ✅ Entidades → Modelos puros do domínio
 - ✅ Casos de Uso (Application Layer) → Define regras de negócio específicas
 - ✅ Interface Adapters → Adapta entradas e saídas (ex: HTTP, CLI, GraphQL)
 - ✅ Frameworks & Infraestrutura → Banco de dados, bibliotecas externas, etc.

📌 Quando usar?
 - ✔️ Projetos de médio a grande porte que precisam ser organizados
 - ✔️ Quando quer um código que facilite a manutenção a longo prazo
 - ✔️ Equipes que trabalham com testes automatizados


### Camadas
- domain/ → Contém apenas a lógica de negócio pura (sem dependências externas).
- application/ → Contém os casos de uso que orquestram a lógica do sistema.
- infrastructure/ → Implementação de banco de dados, API, repositórios, cache, fila, etc.
- shared/ → Código reutilizável (middlewares, utils, erros, configurações).
- main.ts → Ponto de entrada do app.

```bash
src/
  domain/            # Apenas lógica de negócio (Entidades, Services, Interfaces de Domain)
    ├── entities/    # Entidades do domínio (User, Product, etc.)
    │   ├── user.ts
    │   ├── product.ts
    ├── value-objects/ # Objetos de valor (Email, CPF, etc.)
    │   ├── email.ts
    │   ├── price.ts
    ├── services/    # Serviços de domínio (regras de negócio que afetam várias entidades)
    │   ├── auth-service.ts
    │   ├── payment-service.ts
    ├── interfaces/  # Apenas contratos (não implementações) de serviços externos
    │   ├── user-repository.ts
    │   ├── email-service.ts

  application/       # Casos de uso e lógica da aplicação
    ├── use-cases/   # Casos de uso (Application Services)
    │   ├── user/
    │   │   ├── create-user.use-case.ts
    │   │   ├── update-user.use-case.ts
    │   │   ├── delete-user.use-case.ts
    ├── dto/         # Data Transfer Objects (Entrada e saída de dados)
    │   ├── user-dto.ts
    │   ├── product-dto.ts
    ├── services/    # Serviços da aplicação (que orquestram casos de uso)
    │   ├── notification.service.ts
    │   ├── cache.service.ts

  infrastructure/    # Integração com frameworks, banco de dados e bibliotecas externas
    ├── http/       # Tudo relacionado à API (Koa, Express, NestJS, etc.)
    │   ├── interfaces.ts  # Aqui entram as interfaces relacionadas ao contexto HTTP
    │   ├── routes.ts
    │   ├── controllers.ts
    ├── database/    # Configuração e repositórios do banco de dados (Prisma, TypeORM, etc.)
    │   ├── prisma/
    │   │   ├── client.ts   # Instância do PrismaClient
    │   │   ├── migrations/
    │   │   ├── user.repository.ts  # Implementação do UserRepository
    ├── repositories/  # Implementação dos repositórios baseados nos contratos do Domain
    │   ├── user-repository.ts
    ├── services/    # Implementação dos serviços externos (Email, Cache, etc.)
    │   ├── email.service.ts
    │   ├── logger.service.ts
    ├── cache/       # Implementação de cache (Redis, etc.)
    │   ├── redis.ts
    ├── queue/       # Filas de mensagens (RabbitMQ, Kafka, Bull)
    │   ├── bull.config.ts
    │   ├── process-job.ts

  shared/            # Código compartilhado entre camadas (Utils, Helpers, Exceptions)
    ├── utils/       # Funções auxiliares e utilitárias
    │   ├── date.util.ts
    │   ├── string.util.ts
    ├── errors/      # Tratamento de erros e exceções personalizadas
    │   ├── app-error.ts
    │   ├── not-found-error.ts
    ├── middlewares/ # Middlewares genéricos para aplicação
    │   ├── error-handler.middleware.ts
    │   ├── auth.middleware.ts
    ├── config/      # Configurações da aplicação
    │   ├── env.ts
    │   ├── app-config.ts

  main.ts            # Arquivo de inicialização do servidor
```

