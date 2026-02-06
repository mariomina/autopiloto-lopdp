# Tech Stack: ENEXT COMPLIANCE ORQUESTRATOR

- **Runtime:** Node.js v20+ (LTS)
- **Framework:** Next.js 16 (App Router)
- **Database & Backend as a Service:** Supabase (PostgreSQL)
- **Encryption & Security:**
  - **AES-256:** Para cifrado de datos personales en base de datos.
  - **SHA-256:** Para la Cadena de Custodia Digital (Audit Chain).
  - **JWT:** Autenticación multi-tenant segura.
- **Biometría (MVP Simulation):** Modelos de IA heurísticos para detección de anomalías en video.
- **Firma Electrónica:** APIs de firma en la nube (PKCS#12 simulado).
- **UI/UX:** Tailwind CSS + Radix UI + Lucide Icons + Framer Motion (para transiciones suaves).
- **Testing:** Jest + Playwright (para flujos críticos de cumplimiento).
