import { z } from 'zod'

/**
 * Validation Schemas for Autopiloto LOPDP
 * 
 * This file contains all Zod schemas for validating API inputs and data structures.
 * Schemas ensure data integrity and provide type safety throughout the application.
 */

// ============================================================================
// TENANT SCHEMAS
// ============================================================================

/**
 * RUC (Registro Único de Contribuyentes) validation for Ecuador
 * - Must be exactly 13 digits
 * - Must start with 1 or 2 (natural or juridical person)
 */
export const RUCSchema = z.string()
    .regex(/^\d{13}$/, 'RUC debe tener exactamente 13 dígitos')
    .refine(
        (val) => val.startsWith('1') || val.startsWith('2'),
        'RUC debe iniciar con 1 (persona natural) o 2 (persona jurídica)'
    )

/**
 * Schema for registering a new tenant (organization)
 */
export const RegisterTenantSchema = z.object({
    ruc: RUCSchema,
    razonSocial: z.string()
        .min(3, 'Razón social debe tener al menos 3 caracteres')
        .max(200, 'Razón social no puede exceder 200 caracteres')
        .trim(),
    sector: z.string()
        .min(1, 'Sector es requerido')
        .max(100, 'Sector no puede exceder 100 caracteres'),
    email: z.string()
        .email('Email inválido')
        .toLowerCase()
        .trim(),
    portalName: z.string()
        .min(3, 'Nombre del portal debe tener al menos 3 caracteres')
        .max(100, 'Nombre del portal no puede exceder 100 caracteres')
        .trim(),
    primaryColor: z.string()
        .regex(/^#[0-9A-Fa-f]{6}$/, 'Color debe ser un código hexadecimal válido (#RRGGBB)')
        .optional()
        .default('#1152d4'),
    logoUrl: z.string()
        .url('URL del logo inválida')
        .optional()
        .nullable(),
    biometricsOn: z.boolean().optional().default(false),
    signatureOn: z.boolean().optional().default(false),
    arcoOn: z.boolean().optional().default(false),
})

export type RegisterTenantInput = z.infer<typeof RegisterTenantSchema>

// ============================================================================
// DIGITAL IDENTITY SCHEMAS
// ============================================================================

/**
 * Cédula (ID number) validation for Ecuador
 * - Must be exactly 10 digits
 */
export const CedulaSchema = z.string()
    .regex(/^\d{10}$/, 'Cédula debe tener exactamente 10 dígitos')

/**
 * Schema for creating a new digital identity
 */
export const CreateIdentitySchema = z.object({
    tenantId: z.string().uuid('ID de tenant inválido'),
    fullName: z.string()
        .min(3, 'Nombre completo debe tener al menos 3 caracteres')
        .max(200, 'Nombre completo no puede exceder 200 caracteres')
        .trim(),
    idNumber: CedulaSchema,
    biometricToken: z.string()
        .optional()
        .nullable(),
})

export type CreateIdentityInput = z.infer<typeof CreateIdentitySchema>

// ============================================================================
// ARCO REQUEST SCHEMAS
// ============================================================================

/**
 * Valid ARCO request types according to LOPDP Ecuador
 */
export const ArcoTypeSchema = z.enum([
    'ACCESO',        // Access to personal data
    'RECTIFICACION', // Rectification of incorrect data
    'CANCELACION',   // Cancellation/deletion of data
    'OPOSICION',     // Opposition to data processing
    'PORTABILIDAD',  // Data portability
])

/**
 * Valid ARCO request statuses
 */
export const ArcoStatusSchema = z.enum([
    'PENDING',    // Awaiting review
    'IN_PROGRESS', // Being processed
    'APPROVED',   // Approved and completed
    'REJECTED',   // Rejected with reason
    'EXPIRED',    // Exceeded legal deadline (15 days)
])

/**
 * Schema for creating an ARCO request
 */
export const CreateArcoRequestSchema = z.object({
    identityId: z.string().uuid('ID de identidad inválido'),
    type: ArcoTypeSchema,
    description: z.string()
        .min(10, 'Descripción debe tener al menos 10 caracteres')
        .max(1000, 'Descripción no puede exceder 1000 caracteres')
        .trim(),
    contactEmail: z.string()
        .email('Email de contacto inválido')
        .toLowerCase()
        .trim()
        .optional(),
    contactPhone: z.string()
        .regex(/^\+?[0-9]{10,15}$/, 'Teléfono debe tener entre 10 y 15 dígitos')
        .optional(),
})

export type CreateArcoRequestInput = z.infer<typeof CreateArcoRequestSchema>

/**
 * Schema for updating an ARCO request status
 */
export const UpdateArcoRequestSchema = z.object({
    status: ArcoStatusSchema,
    resolution: z.string()
        .min(10, 'Resolución debe tener al menos 10 caracteres')
        .max(2000, 'Resolución no puede exceder 2000 caracteres')
        .trim()
        .optional(),
    rejectionReason: z.string()
        .min(10, 'Razón de rechazo debe tener al menos 10 caracteres')
        .max(1000, 'Razón de rechazo no puede exceder 1000 caracteres')
        .trim()
        .optional(),
})

export type UpdateArcoRequestInput = z.infer<typeof UpdateArcoRequestSchema>

// ============================================================================
// CONSENT EVENT SCHEMAS
// ============================================================================

/**
 * Valid consent statuses
 */
export const ConsentStatusSchema = z.enum([
    'ACCEPTED',  // User accepted consent
    'REVOKED',   // User revoked consent
    'EXPIRED',   // Consent expired
])

/**
 * Schema for creating a consent event
 */
export const CreateConsentEventSchema = z.object({
    identityId: z.string().uuid('ID de identidad inválido'),
    purpose: z.string()
        .min(10, 'Propósito debe tener al menos 10 caracteres')
        .max(500, 'Propósito no puede exceder 500 caracteres')
        .trim(),
    status: ConsentStatusSchema,
    ipAddress: z.string()
        .regex(
            /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
            'Dirección IP inválida'
        )
        .optional()
        .nullable(),
    userAgent: z.string()
        .max(500, 'User agent no puede exceder 500 caracteres')
        .optional()
        .nullable(),
})

export type CreateConsentEventInput = z.infer<typeof CreateConsentEventSchema>

// ============================================================================
// AUDIT CHAIN SCHEMAS
// ============================================================================

/**
 * Valid audit event types
 */
export const AuditEventTypeSchema = z.enum([
    'CONSENT_GRANTED',
    'CONSENT_REVOKED',
    'ARCO_REQUEST_CREATED',
    'ARCO_REQUEST_RESOLVED',
    'IDENTITY_CREATED',
    'IDENTITY_UPDATED',
    'SIGNATURE_COMPLETED',
    'BIOMETRIC_VERIFICATION',
    'DATA_EXPORT',
    'DATA_DELETION',
    'TENANT_CREATED',
    'TENANT_UPDATED',
])

/**
 * Schema for creating an audit chain event
 */
export const CreateAuditEventSchema = z.object({
    tenantId: z.string().uuid('ID de tenant inválido'),
    eventType: AuditEventTypeSchema,
    payload: z.record(z.any())
        .refine(
            (val) => Object.keys(val).length > 0,
            'Payload no puede estar vacío'
        ),
    metadata: z.record(z.string()).optional(),
})

export type CreateAuditEventInput = z.infer<typeof CreateAuditEventSchema>

// ============================================================================
// SIGNATURE CONTRACT SCHEMAS
// ============================================================================

/**
 * Valid signature contract statuses
 */
export const SignatureStatusSchema = z.enum([
    'PENDING',   // Awaiting signature
    'SIGNED',    // Successfully signed
    'REJECTED',  // Rejected by signer
    'EXPIRED',   // Signature deadline expired
    'CANCELLED', // Cancelled by issuer
])

/**
 * Schema for creating a signature contract
 */
export const CreateSignatureContractSchema = z.object({
    identityId: z.string().uuid('ID de identidad inválido'),
    fileUrl: z.string()
        .url('URL del archivo inválida'),
    fileName: z.string()
        .min(1, 'Nombre del archivo es requerido')
        .max(255, 'Nombre del archivo no puede exceder 255 caracteres'),
    fileHash: z.string()
        .regex(/^[a-f0-9]{64}$/, 'Hash del archivo debe ser SHA-256 válido')
        .optional(),
    expiresAt: z.string()
        .datetime('Fecha de expiración inválida')
        .optional(),
})

export type CreateSignatureContractInput = z.infer<typeof CreateSignatureContractSchema>

// ============================================================================
// QUERY PARAMETER SCHEMAS
// ============================================================================

/**
 * Schema for pagination parameters
 */
export const PaginationSchema = z.object({
    page: z.coerce.number()
        .int('Página debe ser un número entero')
        .positive('Página debe ser mayor a 0')
        .default(1),
    limit: z.coerce.number()
        .int('Límite debe ser un número entero')
        .positive('Límite debe ser mayor a 0')
        .max(100, 'Límite máximo es 100')
        .default(10),
})

export type PaginationParams = z.infer<typeof PaginationSchema>

/**
 * Schema for date range filters
 */
export const DateRangeSchema = z.object({
    startDate: z.string()
        .datetime('Fecha de inicio inválida')
        .optional(),
    endDate: z.string()
        .datetime('Fecha de fin inválida')
        .optional(),
}).refine(
    (data) => {
        if (data.startDate && data.endDate) {
            return new Date(data.startDate) <= new Date(data.endDate)
        }
        return true
    },
    'Fecha de inicio debe ser anterior a fecha de fin'
)

export type DateRangeParams = z.infer<typeof DateRangeSchema>

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Validates data against a schema and returns formatted errors
 * 
 * @param schema - Zod schema to validate against
 * @param data - Data to validate
 * @returns Validation result with success flag and data or errors
 */
export function validateSchema<T>(
    schema: z.ZodSchema<T>,
    data: unknown
): { success: true; data: T } | { success: false; errors: Record<string, string[]> } {
    const result = schema.safeParse(data)

    if (result.success) {
        return { success: true, data: result.data }
    }

    // Format Zod errors into a more user-friendly structure
    const errors: Record<string, string[]> = {}

    if (result.error && result.error.errors) {
        result.error.errors.forEach((err) => {
            const path = err.path.join('.') || 'root'
            if (!errors[path]) {
                errors[path] = []
            }
            errors[path].push(err.message)
        })
    }

    return { success: false, errors }
}
