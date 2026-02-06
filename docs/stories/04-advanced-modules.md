# Story 4.1: Integración de Biometría & Análisis de Riesgo

## Descripción
Conectar la interfaz de biometría con lógica real de validación y monitoreo de amenazas (Deepfakes).

## Contexto
Basado en `src/components/dashboard/BiometricsView.tsx`.

## Tareas
- [x] Implementar UI avanzada de monitoreo biométrico
- [x] Crear simulador de "Consola de Decisión" para niveles de riesgo
- [ ] Implementar API para captura de vectores biométricos
- [ ] Integrar lógica de detección de Deepfakes (Simulación LOPDP)
- [ ] Habilitar sistema de alertas ante intercepciones de fraude

## Criterios de Aceitación
- [ ] Los sliders de configuración afectan el "Score de Riesgo" visual
- [ ] Se registran las intercepciones en la tabla de auditoría
- [ ] La UI diferencia claramente entre identidades reales y potenciales riesgos

## Arquivos Criados/Modificados
- `src/components/dashboard/BiometricsView.tsx`

---

# Story 4.2: Gestión de Firmas y Evidencia Digital

## Descripción
Implementar el ciclo de vida de los documentos firmados y su vinculación con la cadena de custodia.

## Contexto
Basado en `src/components/dashboard/SignatureView.tsx`.

## Tareas
- [x] Implementar Dashboard de gestión de documentos (Firmas Cloud)
- [x] Crear visualización de tabla con hashes de integridad
- [ ] Habilitar carga de documentos (Storage)
- [ ] Implementar proceso de firma digital vinculado a DigitalIdentity
- [ ] Generar evidencias automáticas en `audit_chain` al completar una firma

## Criterios de Aceitación
- [ ] Un documento puede transicionar de Pendiente a Firmado
- [ ] Cada firma genera un registro inmutable en el log de auditoría
- [ ] El hash del documento es visible y verificable

## Arquivos Criados/Modificados
- `src/components/dashboard/SignatureView.tsx`
