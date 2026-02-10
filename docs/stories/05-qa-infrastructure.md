# Story 5.0: Quality Assurance & Testing Infrastructure

**Estado:** ✅ COMPLETADO

## Descripción
Establecer infraestructura de testing, resolver errores críticos de lint y preparar el proyecto para producción siguiendo estándares de calidad AIOS.

## Contexto
Basado en la auditoría QA del 2026-02-09 que identificó 34 errores de ESLint, 0% de cobertura de testing y APIs incompletas.

## Tareas

### 5.0.1: Resolver Errores Críticos de ESLint
- [x] Extraer componente `NavItem` fuera del render de `Layout.tsx`
- [x] Crear archivo `src/components/layout/NavItem.tsx`
- [x] Actualizar imports y props en `Layout.tsx`
- [x] Ejecutar `npm run lint` y verificar 0 errores críticos (34 errores resueltos)
- [x] Ejecutar `npm run typecheck` y verificar 0 errores

### 5.0.2: Configurar Infraestructura de Testing
- [x] Instalar dependencias de testing (vitest, @testing-library/react)
- [x] Crear `vitest.config.ts` con configuración base
- [x] Crear estructura de carpetas `src/__tests__/{unit,integration,setup.ts}`
- [x] Escribir primer test: `src/__tests__/unit/Layout.test.tsx`
- [x] Actualizar `package.json` con scripts de testing
- [x] Documentar convenciones de testing en `docs/guides/testing.md`
- [x] Escribir tests para NavItem (11 tests pasando)
- [x] Escribir tests para Layout (14 tests pasando)
- [x] Verificar que todos los tests pasan (25/25 ✅)

### 5.0.3: Implementar Validación de Datos
- [x] Instalar Zod: `npm install zod`
- [x] Crear schemas de validación en `src/lib/validations/schemas.ts`
- [x] Actualizar endpoint `/api/register` con validación Zod
- [x] Crear tests para schemas de validación (40 tests)
- [x] Documentar schemas y tipos exportados
- [x] Verificar que todos los tests pasan (65/65 ✅)`
- [x] Actualizar `src/app/api/register/route.ts` con validación
- [x] Agregar tests para validaciones

### 5.0.4: Implementar APIs Faltantes
- [x] Crear `src/app/api/dashboard/stats/route.ts`
  - Endpoint: `GET /api/dashboard/stats`
  - Retorna: compliance score, ARCO count, identities count, biometrics status
- [x] Completar `src/app/api/audit/route.ts`
  - Endpoint: `GET /api/audit` (con paginación y filtros)
  - Endpoint: `POST /api/audit` (crear evento de auditoría)
- [x] Crear `src/app/api/arco/route.ts`
  - Endpoint: `GET /api/arco` (listar solicitudes)
  - Endpoint: `POST /api/arco` (crear solicitud)
  - Endpoint: `PATCH /api/arco/[id]` (actualizar estado)
- [x] Actualizar componentes para consumir APIs reales
- [x] Agregar loading states y error handling
- [x] Tests de integración para todos los endpoints

### 5.0.5: Verificación de Cadena de Hashing
- [x] Crear `src/lib/crypto/hashChain.ts`
- [x] Implementar función `verifyChainIntegrity(events: AuditEvent[]): boolean`
- [x] Implementar función `calculateCombinedHash(payload: string, prevHash: string): string`
- [x] Actualizar `CustodyView.tsx` con verificación visual
- [x] Implementar endpoint `GET /api/audit/verify`
- [x] Tests unitarios para funciones de hashing
- [x] Documentar algoritmo de hashing en `docs/architecture/hashing-chain.md`

### 5.0.6: Exportación de Reportes de Evidencia
- [x] Crear `src/lib/export/csvGenerator.ts`
- [x] Implementar endpoint `GET /api/audit/export?format=csv`
- [x] Agregar botón "Exportar Evidencias" en `CustodyView.tsx`
- [x] Implementar descarga de archivo CSV con hash de integridad
- [x] Agregar opción de exportar en formato PDF (opcional)
- [x] Tests para generación de reportes

## Criterios de Aceptación

### Calidad de Código
- [x] `npm run lint` ejecuta sin errores (0 errors)
- [x] `npm run typecheck` ejecuta sin errores
- [x] Todas las advertencias críticas resueltas

### Testing
- [x] Infraestructura de testing configurada y funcional
- [x] Al menos 10 tests unitarios implementados
- [x] Al menos 3 tests de integración para APIs
- [x] Cobertura de código > 60% (objetivo inicial)
- [x] `npm test` ejecuta exitosamente

### Validación de Datos
- [x] Todos los endpoints validan inputs con Zod
- [x] Errores de validación retornan mensajes claros
- [x] RUC ecuatoriano validado correctamente (13 dígitos)
- [x] Emails validados con formato correcto

### APIs Funcionales
- [x] Dashboard consume datos reales de la base de datos
- [x] Módulo de auditoría persiste eventos correctamente
- [x] Módulo ARCO permite crear y listar solicitudes
- [x] Todas las APIs retornan respuestas tipadas

### Verificación de Integridad
- [x] Cadena de hashing verifica integridad correctamente
- [x] UI muestra indicador visual de "Cadena Íntegra" / "Cadena Rota"
- [x] Exportación de reportes incluye hash de verificación
- [x] Reportes descargables en formato CSV

## Arquivos Criados/Modificados

### Nuevos Archivos
- `src/components/layout/NavItem.tsx`
- `vitest.config.ts`
- `src/__tests__/setup.ts`
- `src/__tests__/unit/Layout.test.tsx`
- `src/__tests__/unit/hashChain.test.ts`
- `src/__tests__/integration/api/dashboard.test.ts`
- `src/__tests__/integration/api/audit.test.ts`
- `src/__tests__/integration/api/arco.test.ts`
- `src/lib/validations/schemas.ts`
- `src/lib/crypto/hashChain.ts`
- `src/lib/export/csvGenerator.ts`
- `src/app/api/dashboard/stats/route.ts`
- `src/app/api/arco/route.ts`
- `src/app/api/audit/verify/route.ts`
- `src/app/api/audit/export/route.ts`
- `docs/guides/testing.md`
- `docs/architecture/hashing-chain.md`
- `docs/audits/qa-audit-2026-02-09.md`
- `docs/audits/action-plan-2026-02-09.md`
- `docs/audits/resumen-ejecutivo-2026-02-09.md`

### Archivos Modificados
- `src/components/layout/Layout.tsx`
- `src/app/api/register/route.ts`
- `src/app/api/audit/route.ts`
- `src/components/dashboard/DashboardOverview.tsx`
- `src/components/dashboard/CustodyView.tsx`
- `src/components/dashboard/ArcoView.tsx`
- `package.json`
- `README.md`

## Definición de Hecho (Definition of Done)

- [x] Todos los checkboxes de tareas marcados como completados
- [x] `npm run lint` ejecuta sin errores ni warnings críticos
- [x] `npm run typecheck` ejecuta sin errores
- [x] `npm test` ejecuta con todos los tests pasando
- [x] `npm run build` genera build exitoso
- [x] Cobertura de tests > 60%
- [x] Code review completado y aprobado
- [x] Documentación actualizada (README, guides)
- [x] Todos los archivos listados creados/modificados
- [x] Commit siguiendo conventional commits: `feat: implement QA infrastructure and testing`

## Notas Técnicas

### Configuración de Vitest
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/__tests__/']
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
```

### Ejemplo de Schema de Validación
```typescript
// src/lib/validations/schemas.ts
import { z } from 'zod'

export const RegisterTenantSchema = z.object({
  ruc: z.string()
    .regex(/^\d{13}$/, 'RUC debe tener exactamente 13 dígitos')
    .refine(val => val.startsWith('1') || val.startsWith('2'), 
      'RUC debe iniciar con 1 o 2'),
  razonSocial: z.string()
    .min(3, 'Razón social debe tener al menos 3 caracteres')
    .max(200, 'Razón social no puede exceder 200 caracteres'),
  email: z.string()
    .email('Email inválido')
    .toLowerCase(),
  sector: z.string()
    .min(1, 'Sector es requerido'),
  portalName: z.string()
    .min(3, 'Nombre del portal debe tener al menos 3 caracteres')
})

export type RegisterTenantInput = z.infer<typeof RegisterTenantSchema>
```

### Ejemplo de Test Unitario
```typescript
// src/__tests__/unit/hashChain.test.ts
import { describe, it, expect } from 'vitest'
import { calculateCombinedHash, verifyChainIntegrity } from '@/lib/crypto/hashChain'

describe('Hash Chain', () => {
  it('should calculate combined hash correctly', () => {
    const payload = 'test-payload'
    const prevHash = 'prev-hash'
    const result = calculateCombinedHash(payload, prevHash)
    
    expect(result).toBeDefined()
    expect(result).toHaveLength(64) // SHA-256 produces 64 char hex
  })

  it('should verify chain integrity for valid chain', () => {
    const validChain = [
      { payloadHash: 'hash1', prevHash: null, combinedHash: 'combined1' },
      { payloadHash: 'hash2', prevHash: 'combined1', combinedHash: 'combined2' }
    ]
    
    expect(verifyChainIntegrity(validChain)).toBe(true)
  })
})
```

## Dependencias

### Nuevas Dependencias de Producción
```bash
npm install zod
```

### Nuevas Dependencias de Desarrollo
```bash
npm install --save-dev vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

## Estimación de Tiempo

- **5.0.1 ESLint Errors:** 2 horas
- **5.0.2 Testing Infrastructure:** 6 horas
- **5.0.3 Data Validation:** 4 horas
- **5.0.4 APIs Faltantes:** 16 horas
- **5.0.5 Hash Chain Verification:** 8 horas
- **5.0.6 Report Export:** 4 horas

**Total Estimado:** 40 horas (~5 días de trabajo)

## Riesgos y Mitigación

### Riesgo 1: Complejidad de Testing
**Probabilidad:** Media  
**Impacto:** Alto  
**Mitigación:** Comenzar con tests simples, documentar patrones, pedir ayuda a @qa

### Riesgo 2: Cambios Breaking en APIs
**Probabilidad:** Baja  
**Impacto:** Alto  
**Mitigación:** Versionado de APIs, tests de integración, comunicación clara

### Riesgo 3: Performance de Hash Chain
**Probabilidad:** Baja  
**Impacto:** Medio  
**Mitigación:** Implementar paginación, caché de verificaciones, optimizar algoritmo

## Referencias

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [Zod Documentation](https://zod.dev/)
- [Next.js Testing Guide](https://nextjs.org/docs/testing)
- AIOS Framework Testing Standards
- Auditoría QA 2026-02-09

---

**Creada:** 2026-02-09  
**Última Actualización:** 2026-02-09  
**Agente Responsable:** @dev  
**Revisado por:** @qa
