# Autopiloto LOPDP - Compliance Orchestrator

Plataforma de orquestación para el cumplimiento de la Ley Orgánica de Protección de Datos Personales (LOPDP) en Ecuador. Permite la gestión centralizada de consentimientos, derechos ARCO, auditorías de seguridad y certificación automática.

## Características Principales

### 1. Panel de Control (Dashboard)
- Visualización en tiempo real del puntaje de cumplimiento (Compliance Score).
- KPIs de solicitudes ARCO, contratos firmados y niveles de riesgo.
- Gráficos interactivos de actividad de identidad.

### 2. Gestión de Evidencias y Auditoría (Custodia / RAT)
- Registro inmutable de actividades de tratamiento (RAT).
- **Exportación de Reportes:** Generación de archivos CSV compatibles con Excel/PDF para auditorías externas.
- Filtrado avanzado por fecha, usuario y nivel de riesgo.

### 3. Derechos ARCO
- Bandeja de entrada centralizada para solicitudes de Acceso, Rectificación, Cancelación y Oposición.
- Alertas automáticas de vencimiento de plazos legales.
- **Exportación de Datos:** Descarga de reportes detallados en formato CSV.

### 4. Seguridad Biométrica e IA
- Monitoreo de amenazas de identidad (Deepfakes, inyección de video).
- Configuración de umbrales de tolerancia y precisión biométrica.
- **Reportes de Seguridad:** Generación de evidencias técnicas en formato TXT seguro.

### 5. Certificación Automática
- Emisión instantánea de Certificados de Transparencia LOPDP.
- **Formato HTML Visual:** Los certificados se generan como archivos HTML autocontenidos, visualmente idénticos a la vista previa, listos para presentar o imprimir.
- Hash de integridad y sellado de tiempo para validez legal.

## Tecnologías

- **Frontend:** Next.js 14 (App Router), React, Tailwind CSS.
- **Backend:** Next.js API Routes.
- **Base de Datos:** (Integración preparada para Prisma/PostgreSQL).
- **Seguridad:** Hashing SHA-256 para integridad de documentos.

## Instalación y Despliegue

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/autopiloto-lopdp.git
```

2. Instalar dependencias:
```bash
npm install
```

3. Ejecutar servidor de desarrollo:
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) para ver la aplicación.
