# Story 4.1: Integración de Biometría & Análisis de Riesgo

**Estado:** ✅ COMPLETADO (Ver Story 07 para detalles de API)

## Descripción
Conectar la interfaz de biometría con lógica real de validación y monitoreo de amenazas (Deepfakes).

## Contexto
Basado en `src/components/dashboard/BiometricsView.tsx` y `src/app/api/biometrics/route.ts`.

## Tareas
- [x] Implementar UI avanzada de monitoreo biométrico
- [x] Crear simulador de "Consola de Decisión" para niveles de riesgo
- [x] Implementar API para captura de vectores biométricos
- [x] Integrar lógica de detección de Deepfakes (Simulación LOPDP)
- [x] Habilitar sistema de alertas ante intercepciones de fraude

## Criterios de Aceitación
- [x] Los sliders de configuración afectan el "Score de Riesgo" visual
- [x] Se registran las intercepciones en la tabla de auditoría (evento BIOMETRIC_VERIFICATION)
- [x] La UI diferencia claramente entre identidades reales y potenciales riesgos

## Arquivos Criados/Modificados
- `src/components/dashboard/BiometricsView.tsx`
- `src/app/api/biometrics/route.ts`

---

# Story 4.2: Gestión de Firmas y Evidencia Digital

**Estado:** ✅ COMPLETADO (Ver Story 08 para detalles de API)

## Descripción
Implementar el ciclo de vida de los documentos firmados y su vinculación con la cadena de custodia.

## Contexto
Basado en `src/components/dashboard/SignatureView.tsx`.

## Tareas
- [x] Implementar Dashboard de gestión de documentos (Firmas Cloud)
- [x] Crear visualización de tabla con hashes de integridad
- [x] Habilitar carga de documentos (Storage simulado)
- [x] Implementar proceso de firma digital vinculado a DigitalIdentity
- [x] Generar evidencias automáticas en `audit_chain` al completar una firma

## Criterios de Aceitación
- [x] Un documento puede transicionar de Pendiente a Firmado
- [x] Cada firma genera un registro inmutable en el log de auditoría
- [x] El hash del documento es visible y verificable

## Arquivos Criados/Modificados
- `src/components/dashboard/SignatureView.tsx`
- `src/app/api/signatures/route.ts`
