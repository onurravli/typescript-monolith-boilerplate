## TypeScript Monolith Boilerplate

A boilerplate for a TypeScript monolithic application.

### Features

- TypeScript
- Node.js
- Express
- PostgreSQL
- Prisma
- ESLint
- Prettier
- Zod
- Concurrently
- Swagger UI Express

### Getting Started

1. Clone the repository

```bash
git clone https://github.com/onurravli/typescript-monolith-boilerplate.git
```

2. Install dependencies

```bash
pnpm install
```

3. Create a `.env` file and set the environment variables

```bash
cp .env.example .env
```

4. Make migrations

```bash
pnpm prisma:migrate:dev # or pnpm prisma:migrate:prod to migrate in production
```

5. Start the development server

```bash
pnpm dev
```

6. Start the production server

```bash
pnpm start
```

### Docs

You can access the docs at `http://localhost:4000/docs` after starting the server.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for details.
