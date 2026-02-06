# PRD: Product Requirements Document

## 1. Product Objectives
Transform LOPDP compliance into a competitive advantage through automated evidence, passive biometrics, and cloud-based electronic signatures.

## 2. User Stories (Strategic Backlog)

### Epic 1: Multi-Tenant Orchestration & Corporate Onboarding
- **Story 1.1:** As an Enext Administrator, I want to create tenants for banks/fintechs so they can configure their compliance policies.
- **Story 1.2:** As a Corporate Client, I want to define specific "Consent Flows" for credit cards or loans.

### Epic 2: Evidence Engine (Digital Chain of Custody)
- **Story 2.1:** As a System, I want to generate an automatic Treatment Activity Record (RAT) for every consent event.
- **Story 2.2:** As a Company, I want each RAT to include a SHA-256 cryptographic hash to guarantee immutability.

### Epic 3: Biometric Validation & Invisible Security
- **Story 3.1:** As a Company, I want to integrate "Passive Liveness Detection" to detect Deepfakes without user friction.
- **Story 3.2:** As a System, I want to calculate a biometric "Confidence Score" based on AI analysis of injected media.

### Epic 4: Cloud Electronic Signature & Compliance Score
- **Story 4.1:** As a Final User, I want to sign legally binding documents in the cloud without physical USB tokens.
- **Story 4.2:** As a Data Protection Officer (DPO), I want a Dashboard with a global "Compliance Score" based on evidence and active risks.

## 3. Critical Functional Requirements
- **RF-01:** Automatic generation of auditable PDF reports (LOPDP standards).
- **RF-02:** API-First RESTful API for event capture.
- **RF-03:** Synthetic identity and AI fraud detection.

## 4. Non-Functional Requirements
- **RNF-01:** Biometric validation response time < 2 seconds.
- **RNF-02:** Immutable persistence in PostgreSQL (Supabase).
- **RNF-03:** Mobile-First UI for final user portal.
