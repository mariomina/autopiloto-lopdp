# 🎯 Plan de Acción - Autopiloto LOPDP
**Basado en:** Auditoría QA del 2026-02-09  
**Objetivo:** Llevar el proyecto a estado production-ready  
**Timeframe:** 3 semanas

---

## 📅 Semana 1: Corrección de Bloqueadores (Feb 9-15)

### Día 1-2: Resolver Errores Críticos de Lint
**Responsable:** @dev  
**Story:** Fix/ESLint-Errors

#### Tareas
- [ ] Extraer componente `NavItem` fuera del render de `Layout.tsx`
- [ ] Crear archivo `src/components/layout/NavItem.tsx`
- [ ] Actualizar imports y props en `Layout.tsx`
- [ ] Ejecutar `npm run lint` y verificar 0 errores
- [ ] Commit: `fix: move NavItem component outside render to prevent re-creation`

**Criterios de Éxito:**
```bash
npm run lint  # ✅ 0 errors, 0 warnings
```

---

### Día 3-4: Configurar Infraestructura de Testing
**Responsable:** @dev  
**Story:** Story 5.0 - Testing Infrastructure

#### Tareas
- [ ] Instalar dependencias de testing
  ```bash
  npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @vitejs/plugin-react
  ```
- [ ] Crear `vitest.config.ts`
- [ ] Crear estructura de carpetas:
  ```
  src/__tests__/
  ├── unit/
  ├── integration/
  └── setup.ts
  ```
- [ ] Escribir primer test: `src/__tests__/unit/Layout.test.tsx`
- [ ] Actualizar `package.json` con scripts de testing
- [ ] Commit: `chore: setup vitest testing infrastructure`

**Criterios de Éxito:**
```bash
npm test  # ✅ Al menos 1 test passing
```

---

### Día 5: Implementar Validación de Datos
**Responsable:** @dev  
**Story:** Story 5.1 - Data Validation Layer

#### Tareas
- [ ] Instalar Zod: `npm install zod`
- [ ] Crear `src/lib/validations/schemas.ts`
- [ ] Definir schemas para:
  - `RegisterTenantSchema` (RUC, email, razón social)
  - `CreateIdentitySchema`
  - `ArcoRequestSchema`
- [ ] Actualizar `src/app/api/register/route.ts` con validación
- [ ] Agregar tests para validaciones
- [ ] Commit: `feat: add zod validation schemas for API endpoints`

**Criterios de Éxito:**
```typescript
// ✅ Rechaza RUC inválido
registerSchema.parse({ ruc: "123" }) // throws ZodError
```

---

## 📅 Semana 2: Completar Funcionalidad Core (Feb 16-22)

### Día 6-7: Implementar APIs Faltantes
**Responsable:** @dev  
**Story:** Story 3.1 - Dashboard API Integration

#### Tareas
- [ ] Crear `src/app/api/dashboard/stats/route.ts`
  - Endpoint: `GET /api/dashboard/stats`
  - Retorna: compliance score, ARCO count, identities count
- [ ] Crear `src/app/api/audit/route.ts`
  - Endpoint: `GET /api/audit` (con paginación)
  - Endpoint: `POST /api/audit` (crear evento)
- [ ] Actualizar `DashboardOverview.tsx` para consumir API real
- [ ] Reemplazar datos mock con llamadas a API
- [ ] Agregar loading states y error handling
- [ ] Tests de integración para endpoints
- [ ] Commit: `feat: implement dashboard and audit API endpoints`

**Criterios de Éxito:**
```bash
curl http://localhost:3000/api/dashboard/stats
# ✅ Retorna datos reales de la DB
```

---

### Día 8-9: Verificación de Hashing Chain
**Responsable:** @dev  
**Story:** Story 3.2 - Blockchain Verification

#### Tareas
- [ ] Crear `src/lib/crypto/hashChain.ts`
  ```typescript
  export function verifyChainIntegrity(events: AuditEvent[]): boolean
  export function calculateCombinedHash(payload: string, prevHash: string): string
  ```
- [ ] Implementar verificación en `CustodyView.tsx`
- [ ] Agregar indicador visual de "Cadena Íntegra" / "Cadena Rota"
- [ ] Implementar endpoint `GET /api/audit/verify`
- [ ] Tests unitarios para funciones de hashing
- [ ] Commit: `feat: implement cryptographic hash chain verification`

**Criterios de Éxito:**
```typescript
verifyChainIntegrity(auditEvents) // ✅ true si cadena válida
```

---

### Día 10: Exportación de Reportes
**Responsable:** @dev  
**Story:** Story 3.2 - Evidence Export

#### Tareas
- [ ] Crear `src/lib/export/csvGenerator.ts`
- [ ] Implementar endpoint `GET /api/audit/export?format=csv`
- [ ] Agregar botón "Exportar Evidencias" en `CustodyView.tsx`
- [ ] Implementar descarga de archivo CSV
- [ ] Incluir hash de integridad en reporte
- [ ] Tests para generación de CSV
- [ ] Commit: `feat: add CSV export for audit evidence`

**Criterios de Éxito:**
```bash
# ✅ Descarga archivo custody-report-2026-02-09.csv
```

---

## 📅 Semana 3: Módulos Avanzados y Seguridad (Feb 23 - Mar 1)

### Día 11-12: Módulo ARCO Completo
**Responsable:** @dev  
**Story:** Story 3.3 - ARCO Request Management

#### Tareas
- [ ] Crear `src/app/api/arco/route.ts`
  - `GET /api/arco` - Listar solicitudes
  - `POST /api/arco` - Crear solicitud
  - `PATCH /api/arco/[id]` - Actualizar estado
- [ ] Implementar lógica de alertas de vencimiento (15 días LOPDP)
- [ ] Actualizar `ArcoView.tsx` con funcionalidad real
- [ ] Agregar notificaciones de deadline
- [ ] Tests de integración
- [ ] Commit: `feat: implement ARCO request management system`

**Criterios de Éxito:**
```typescript
// ✅ Solicitud ARCO creada y visible en dashboard
```

---

### Día 13-14: Autenticación y Seguridad
**Responsable:** @dev  
**Story:** Story 5.2 - Authentication Layer

#### Tareas
- [ ] Instalar NextAuth: `npm install next-auth`
- [ ] Crear `src/app/api/auth/[...nextauth]/route.ts`
- [ ] Configurar provider de credenciales
- [ ] Implementar middleware de protección de rutas
- [ ] Agregar validación de tenant en sesión
- [ ] Actualizar `LoginView.tsx` con NextAuth
- [ ] Tests de autenticación
- [ ] Commit: `feat: implement NextAuth authentication system`

**Criterios de Éxito:**
```bash
# ✅ Solo usuarios autenticados acceden a /dashboard
```

---

### Día 15: Optimización y Preparación para Deploy
**Responsable:** @dev  
**Story:** Story 5.3 - Production Readiness

#### Tareas
- [ ] Agregar `React.memo` a componentes pesados
- [ ] Implementar lazy loading de vistas:
  ```typescript
  const BiometricsView = lazy(() => import('./BiometricsView'))
  ```
- [ ] Optimizar bundle con análisis:
  ```bash
  npm install --save-dev @next/bundle-analyzer
  ```
- [ ] Configurar variables de entorno para producción
- [ ] Agregar headers de seguridad en `next.config.ts`
- [ ] Ejecutar Lighthouse audit
- [ ] Commit: `perf: optimize bundle and add security headers`

**Criterios de Éxito:**
```bash
# ✅ Lighthouse Performance > 90
# ✅ Bundle size < 500KB
```

---

## 🎯 Checklist Final (Día 16-17)

### Pre-Deploy Verification
- [ ] ✅ `npm run lint` - 0 errors
- [ ] ✅ `npm run typecheck` - 0 errors
- [ ] ✅ `npm test` - All tests passing
- [ ] ✅ `npm run build` - Build successful
- [ ] ✅ Todas las historias marcadas como completadas
- [ ] ✅ README.md actualizado con instrucciones de deploy
- [ ] ✅ Variables de entorno documentadas en `.env.example`

### Security Checklist
- [ ] ✅ Secrets en variables de entorno (no hardcoded)
- [ ] ✅ `.env` en `.gitignore`
- [ ] ✅ Rate limiting implementado
- [ ] ✅ Inputs sanitizados
- [ ] ✅ CORS configurado correctamente

### Compliance LOPDP
- [ ] ✅ Hashing chain funcional y verificado
- [ ] ✅ Exportación de evidencias operativa
- [ ] ✅ Certificados de transparencia generados
- [ ] ✅ Registro de actividades de tratamiento completo

---

## 📊 Métricas de Éxito

### Cobertura de Testing
```
Target: > 80%
Actual: [TBD]

Unit Tests:        ████████░░ 80%
Integration Tests: ██████░░░░ 60%
E2E Tests:         ████░░░░░░ 40%
```

### Code Quality
```
ESLint Errors:     0 ✅
TypeScript Errors: 0 ✅
Warnings:          < 5 ✅
Complexity Score:  < 15 ✅
```

### Performance
```
Lighthouse Performance: > 90 ✅
Time to Interactive:    < 3s ✅
Bundle Size:            < 500KB ✅
```

---

## 🚀 Comandos Rápidos

### Desarrollo Diario
```bash
# Iniciar servidor
npm run dev

# Ejecutar tests en watch mode
npm test -- --watch

# Lint y typecheck
npm run lint && npm run typecheck

# Build de producción
npm run build
```

### Verificación Pre-Commit
```bash
# Script completo de verificación
npm run lint && npm run typecheck && npm test && npm run build
```

### Deploy
```bash
# Vercel (recomendado)
vercel --prod

# O manual
npm run build
npm start
```

---

## 📞 Escalación y Soporte

### Bloqueadores
Si encuentras un bloqueador:
1. Documentar en `docs/issues/blocker-[fecha].md`
2. Notificar al @pm
3. Activar @architect si es decisión de arquitectura

### Cambios de Scope
Si una tarea requiere más tiempo:
1. Actualizar estimación en la historia
2. Notificar al @sm
3. Re-priorizar con @po

### Dudas Técnicas
- @dev - Implementación
- @architect - Decisiones de arquitectura
- @qa - Testing y calidad
- @analyst - Compliance LOPDP

---

## 🎓 Recursos de Referencia

### Documentación Técnica
- [Next.js 15 Docs](https://nextjs.org/docs)
- [Prisma Best Practices](https://www.prisma.io/docs/guides)
- [Vitest Guide](https://vitest.dev/guide/)
- [Zod Documentation](https://zod.dev/)

### AIOS Framework
- `aios-core/workflows/` - Workflows ejecutables
- `aios-core/checklists/` - Checklists de validación
- `.aios/config.yaml` - Configuración del proyecto

### LOPDP Ecuador
- Ley Orgánica de Protección de Datos Personales
- Reglamento de aplicación
- Guía de implementación técnica

---

## ✅ Tracking de Progreso

### Semana 1
- [x] Día 1-2: ESLint Errors
- [x] Día 3-4: Testing Infrastructure
- [x] Día 5: Data Validation

### Semana 2
- [x] Día 6-7: Dashboard APIs
- [x] Día 8-9: Hash Chain Verification
- [x] Día 10: Report Export

### Semana 3
- [x] Día 11-12: ARCO Module (Adelantado)
- [ ] Día 13-14: Authentication
- [ ] Día 15: Optimization
- [ ] Día 16-17: Final Verification

---

**Última Actualización:** 2026-02-09  
**Próxima Revisión:** 2026-02-16  
**Agente Responsable:** @pm (Project Manager)
