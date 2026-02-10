# Story 9: Authentication & Security Building Block

**Fecha de Creación:** 2026-02-09  
**Última Actualización:** 2026-02-09  
**Agente:** @dev  
**Prioridad:** 🔴 CRÍTICA  
**Épica:** Security & Compliance  
**Estado:** ✅ COMPLETADO

---

## 📋 Descripción

Implementación de una capa de autenticación robusta y segura utilizando **NextAuth.js v5 (Beta)**. Esta historia cubre la gestión de sesiones mediante JWT, hashing de contraseñas con `bcrypt`, protección de rutas mediante Middleware y la separación de la arquitectura de la aplicación en Rutas Públicas (Landing) y Rutas Protegidas (Dashboard).

## 🎯 Objetivos Cumplidos

1.  **Autenticación Segura:** Login funcional mediante credenciales (Email/Password) con validación contra base de datos.
2.  **Gestión de Sesiones:** JWT seguro implementado con roles y `tenantId` en la sesión.
3.  **Protección de Rutas:** Middleware activo que protege `/dashboard/*` y redirige a `/login` si no hay sesión.
4.  **Separación de Ambientes:** Refactorización exitosa de la SPA:
    -   `/` -> Landing Page Pública.
    -   `/dashboard` -> Aplicación SPA Protegida.

---

## 🏗️ Especificación Técnica Implementada

### Stack Tecnológico
-   **Framework:** NextAuth.js v5 (`next-auth@5.0.0-beta.25`)
-   **Seguridad:** `bcryptjs` para hashing de contraseñas.
-   **Base de Datos:** Prisma ORM con modelo `StaffUser` actualizado.
-   **UI:** React Server Components + Server Actions (`useActionState`).

### Arquitectura de Archivos
-   `src/auth.ts`: Configuración principal con conexión a BD (Node.js runtime).
-   `src/auth.config.ts`: Configuración agnóstica para Edge Middleware.
-   `src/middleware.ts`: Lógica de protección de rutas y redirección.
-   `src/lib/actions.ts`: Server Actions para `authenticate` y `logOut`.

---

## ✅ Lista de Tareas (Progress)

### 1. Sistema de Login
- [x] Configurar NextAuth v5 con Credentials Provider.
- [x] Crear formulario de login (`src/components/auth/LoginForm.tsx`) usando `useActionState`.
- [x] Implementar página `/login`.
- [x] Validar credenciales contra base de datos usando `bcrypt`.

### 2. Base de Datos & Modelos
- [x] Actualizar modelo `StaffUser` en `prisma/schema.prisma` (agregar `passwordHash`, `image`, `name`).
- [x] Ejecutar migración de base de datos (`prisma db push`).
- [x] Crear Script de Seed para usuario Admin (`prisma/seed.ts`).

### 3. Seguridad & Middleware
- [x] Implementar `Middleware` para proteger rutas `/dashboard`.
- [x] Configurar redirección: Login -> Dashboard, Logout -> Login/Landing.
- [x] Añadir botón "Cerrar Sesión" en el Sidebar del Dashboard (`Layout.tsx`).

### 4. Navegación & Rutas
- [x] Refactorizar `src/app/page.tsx` para ser solo Landing Page.
- [x] Mover lógica de Dashboard SPA a `src/app/dashboard/page.tsx`.
- [x] Actualizar componentes de navegación para usar `Link` de Next.js.

---

## 🧪 Pruebas y Uso

### Credenciales de Prueba (Default Admin)
El sistema se ha inicializado con un usuario administrador por defecto:
-   **Email:** `admin@lopdp.ec`
-   **Contraseña:** `admin123`

### Flujos Probados
1.  **Ingreso Exitoso:** Usuario ingresa credenciales correctas -> Redirigido a `/dashboard`.
2.  **Ingreso Fallido:** Usuario ingresa contraseña incorrecta -> Mensaje de error en formulario.
3.  **Acceso No Autorizado:** Intento de ir a `/dashboard` sin sesión -> Redirección automática a `/login`.
4.  **Cierre de Sesión:** Clic en "Cerrar Sesión" -> Sesión destruida y redirección.

---

## 📝 Notas de Implementación

-   **NextAuth v5 Beta:** Se utilizó la versión beta para garantizar compatibilidad futura con Next.js App Router.
-   **Edge Compatibility:** Se separó la configuración en `auth.config.ts` para que el Middleware (que corre en Edge Runtime) no dependa de Prisma (que requiere Node.js).
-   **Refactor de SPA:** Se movió la aplicación principal a `/dashboard` para permitir que la raíz `/` funcione como landing page pública, mejorando la estructura SEO y lógica del proyecto.

---

## 📂 Archivos Entregables

```text
src/
├── auth.ts                  # Core Auth Logic
├── auth.config.ts           # Edge Compatible Config
├── middleware.ts            # Route Protection
├── lib/
│   └── actions.ts           # Server Actions (Login/Logout)
├── app/
│   ├── login/
│   │   └── page.tsx         # Login Page
│   ├── dashboard/
│   │   └── page.tsx         # Protected Dashboard Home
│   └── api/
│       └── auth/
│           └── [...nextauth]/route.ts  # Auth API Handlers
└── components/
    └── auth/
        └── LoginForm.tsx    # Client Form Component
```
