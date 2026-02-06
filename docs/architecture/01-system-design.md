# System Design & Architecture

## 1. Philosophy: API-First & Multi-Tenancy
B2B orchestrator where each client (Tenant) operates in a logically isolated environment. "Zero Trust" model for both the Admin Dashboard and User Portal.

## 2. Core Technical Stack
- **Cloud Infrastructure:** Supabase (PostgreSQL + Auth + Storage).
- **Backend:** Next.js (App Router API Routes & Edge Functions).
- **Frontend:** Next.js with Dynamic Tenant Theming.
- **Integrity Layer:** SHA-256 Hashing Chain in `audit_chain` (Ledger simulation).

## 3. Database Layer (Relational Structure)

### Corporate Layer (Tenants)
* **`tenants`:** Client configuration, branding (portal_name, primary_color), and enabled modules.
* **`staff_users`:** Admin access (OWNER, ADMIN, AUDITOR).

### Identity Layer
* **`digital_identities`:** Final users/data subjects.
* **`consent_events`:** LOPDP consent records (purpose, status, ip_address).

### Operational Layer
* **`signature_contracts`:** Cloud-signed documents and integrity hashes.
* **`arco_requests`:** ARCO Rights management (Access, Rectification, etc.).

### Integrity Layer
* **`audit_chain`:** Immutable legal heart (`payload_hash`, `prev_hash`, `combined_hash`).

## 4. Compliance Score Logic
`Score = (Successful Consents / Total Attempts) * 0.6 + (Neutralized Fraud / Fraud Attempts) * 0.4`
- Threshold < 85 triggers audit alerts.
