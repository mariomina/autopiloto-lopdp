# ✅ Checklist Rápido - Autopiloto LOPDP
**Auditoría QA - 2026-02-09**

---

## 🚨 ACCIÓN INMEDIATA (HOY)

### 1. Resolver Errores de ESLint (2 horas)
```bash
# Crear rama
git checkout -b fix/eslint-navitem-component

# Editar archivo
# Abrir: src/components/layout/Layout.tsx
# Extraer NavItem fuera del componente Layout
# Ver ejemplo en: docs/audits/qa-audit-2026-02-09.md

# Verificar
npm run lint  # Debe mostrar 0 errores

# Commit
git add .
git commit -m "fix: move NavItem component outside render to prevent re-creation"
git push origin fix/eslint-navitem-component
```

**Criterio de Éxito:** ✅ `npm run lint` muestra 0 errores

---

## 📋 ESTA SEMANA (Prioridad Alta)

### 2. Configurar Testing (6 horas)
```bash
# Instalar dependencias
npm install --save-dev vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom

# Crear archivos
# - vitest.config.ts (ver ejemplo en Story 5.0)
# - src/__tests__/setup.ts
# - src/__tests__/unit/Layout.test.tsx

# Actualizar package.json
# Agregar script: "test": "vitest"

# Verificar
npm test  # Debe ejecutar al menos 1 test
```

**Criterio de Éxito:** ✅ `npm test` ejecuta exitosamente

---

### 3. Implementar Validación de Datos (4 horas)
```bash
# Instalar Zod
npm install zod

# Crear archivo
# src/lib/validations/schemas.ts (ver ejemplo en Story 5.0)

# Actualizar API
# src/app/api/register/route.ts
# Agregar validación con RegisterTenantSchema

# Test
# Crear src/__tests__/unit/schemas.test.ts
```

**Criterio de Éxito:** ✅ API rechaza RUC inválido

---

### 4. Implementar APIs Faltantes (16 horas)

#### Dashboard Stats API
```bash
# Crear archivo
# src/app/api/dashboard/stats/route.ts

# Implementar
# - GET /api/dashboard/stats
# - Retornar: complianceScore, arcoCount, identitiesCount, etc.

# Actualizar componente
# src/components/dashboard/DashboardOverview.tsx
# Reemplazar datos mock con fetch a API
```

#### Audit API Completa
```bash
# Completar archivo
# src/app/api/audit/route.ts

# Implementar
# - GET /api/audit (con paginación)
# - POST /api/audit (crear evento)

# Test
# src/__tests__/integration/api/audit.test.ts
```

#### ARCO API
```bash
# Crear archivo
# src/app/api/arco/route.ts

# Implementar
# - GET /api/arco (listar solicitudes)
# - POST /api/arco (crear solicitud)
# - PATCH /api/arco/[id] (actualizar estado)

# Actualizar componente
# src/components/dashboard/ArcoView.tsx
```

**Criterio de Éxito:** ✅ Dashboard muestra datos reales de DB

---

## 🔐 PRÓXIMA SEMANA (Prioridad Media)

### 5. Verificación de Cadena de Hashing (8 horas)
```bash
# Crear archivo
# src/lib/crypto/hashChain.ts

# Implementar funciones
# - verifyChainIntegrity(events: AuditEvent[]): boolean
# - calculateCombinedHash(payload: string, prevHash: string): string

# Actualizar componente
# src/components/dashboard/CustodyView.tsx
# Agregar indicador visual de integridad

# Test
# src/__tests__/unit/hashChain.test.ts
```

**Criterio de Éxito:** ✅ UI muestra "Cadena Íntegra" correctamente

---

### 6. Exportación de Reportes (4 horas)
```bash
# Crear archivo
# src/lib/export/csvGenerator.ts

# Implementar endpoint
# src/app/api/audit/export/route.ts
# GET /api/audit/export?format=csv

# Actualizar UI
# Agregar botón "Exportar Evidencias" en CustodyView.tsx
```

**Criterio de Éxito:** ✅ Descarga archivo CSV con evidencias

---

## 🎯 VERIFICACIÓN FINAL (Antes de Deploy)

### Checklist de Calidad
- [ ] `npm run lint` - 0 errores
- [ ] `npm run typecheck` - 0 errores
- [ ] `npm test` - Todos los tests pasan
- [ ] `npm run build` - Build exitoso
- [ ] Cobertura de tests > 60%

### Checklist de Funcionalidad
- [ ] Dashboard muestra datos reales
- [ ] Módulo de auditoría persiste eventos
- [ ] Módulo ARCO funcional
- [ ] Verificación de hashing operativa
- [ ] Exportación de reportes funcional

### Checklist de Seguridad
- [ ] Validación de inputs implementada
- [ ] Variables de entorno configuradas
- [ ] `.env` en `.gitignore`
- [ ] Autenticación implementada (opcional para MVP)

---

## 📊 Progreso Tracking

### Semana 1 (Feb 9-15)
- [ ] Día 1-2: ESLint Errors ✅
- [ ] Día 3-4: Testing Infrastructure
- [ ] Día 5: Data Validation

### Semana 2 (Feb 16-22)
- [ ] Día 6-7: Dashboard APIs
- [ ] Día 8-9: Hash Chain Verification
- [ ] Día 10: Report Export

### Semana 3 (Feb 23 - Mar 1)
- [ ] Día 11-12: ARCO Module
- [ ] Día 13-14: Authentication (opcional)
- [ ] Día 15: Optimization
- [ ] Día 16-17: Final Verification

---

## 🚀 Comandos Rápidos

### Desarrollo Diario
```bash
# Iniciar servidor
npm run dev

# Tests en watch mode
npm test -- --watch

# Lint y typecheck
npm run lint && npm run typecheck

# Build
npm run build
```

### Verificación Pre-Commit
```bash
# Todo en uno
npm run lint && npm run typecheck && npm test && npm run build
```

---

## 📞 Ayuda y Recursos

### Documentos de Referencia
- `docs/audits/qa-audit-2026-02-09.md` - Auditoría completa
- `docs/audits/action-plan-2026-02-09.md` - Plan detallado
- `docs/audits/resumen-ejecutivo-2026-02-09.md` - Resumen en español
- `docs/stories/05-qa-infrastructure.md` - Historia de QA

### Agentes AIOS
```bash
*help qa      # Comandos del agente QA
*help dev     # Comandos del agente Dev
*task qa-audit  # Ejecutar nueva auditoría
```

### Contacto
- **Problemas técnicos:** @dev
- **Decisiones de arquitectura:** @architect
- **Testing y calidad:** @qa
- **Compliance LOPDP:** @analyst

---

## 🎯 Objetivo Final

**Estado Actual:** 65% completado  
**Estado Objetivo:** 100% production-ready  
**Tiempo Estimado:** 17 días (3 semanas)  
**Confianza:** 85% ✅

---

**Última Actualización:** 2026-02-09  
**Próxima Revisión:** 2026-02-16  
**Agente Responsable:** @qa

---

## 💡 Tip del Día

> "La calidad no es un acto, es un hábito." - Aristóteles

**Empieza HOY con el fix de ESLint. Es el bloqueador más crítico y el más rápido de resolver (2 horas). Una vez resuelto, el proyecto estará en mucho mejor estado para continuar.**

¡Éxito! 🚀
