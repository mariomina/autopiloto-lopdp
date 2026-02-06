# Coding Standards: Autopiloto LOPDP

- **Architecture:** Feature-based folder structure inside `app/`.
- **Components:** Functional components using Arrow Functions.
- **Safety:** Absolute imports using `@/`.
- **Database:** All DDL must go through Prisma Migrations.
- **Naming:** 
  - Components: `PascalCase.tsx`
  - Routes: `lowercase-kebab-back.ts`
  - Constants: `UPPER_SNAKE_CASE`
- **Security:** Never expose `tenantId` in client-side queries without server-side validation.
- **Testing:** Minimum 80% coverage for Auth and Audit logic.
