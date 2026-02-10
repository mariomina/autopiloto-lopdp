import { describe, it, expect } from 'vitest'
import {
    RegisterTenantSchema,
    CreateArcoRequestSchema,
    CreateIdentitySchema,
    RUCSchema,
    CedulaSchema,
    ArcoTypeSchema,
    PaginationSchema,
    DateRangeSchema,
    validateSchema,
} from '@/lib/validations/schemas'

describe('Validation Schemas', () => {
    describe('RUCSchema', () => {
        it('should accept valid RUC starting with 1', () => {
            const result = RUCSchema.safeParse('1234567890001')
            expect(result.success).toBe(true)
        })

        it('should accept valid RUC starting with 2', () => {
            const result = RUCSchema.safeParse('2234567890001')
            expect(result.success).toBe(true)
        })

        it('should reject RUC with less than 13 digits', () => {
            const result = RUCSchema.safeParse('123456789000')
            expect(result.success).toBe(false)
        })

        it('should reject RUC with more than 13 digits', () => {
            const result = RUCSchema.safeParse('12345678900011')
            expect(result.success).toBe(false)
        })

        it('should reject RUC starting with invalid digit', () => {
            const result = RUCSchema.safeParse('3234567890001')
            expect(result.success).toBe(false)
        })

        it('should reject RUC with non-numeric characters', () => {
            const result = RUCSchema.safeParse('123456789000A')
            expect(result.success).toBe(false)
        })
    })

    describe('CedulaSchema', () => {
        it('should accept valid cédula with 10 digits', () => {
            const result = CedulaSchema.safeParse('1234567890')
            expect(result.success).toBe(true)
        })

        it('should reject cédula with less than 10 digits', () => {
            const result = CedulaSchema.safeParse('123456789')
            expect(result.success).toBe(false)
        })

        it('should reject cédula with more than 10 digits', () => {
            const result = CedulaSchema.safeParse('12345678901')
            expect(result.success).toBe(false)
        })

        it('should reject cédula with non-numeric characters', () => {
            const result = CedulaSchema.safeParse('123456789A')
            expect(result.success).toBe(false)
        })
    })

    describe('RegisterTenantSchema', () => {
        const validData = {
            ruc: '1234567890001',
            razonSocial: 'Empresa de Prueba S.A.',
            sector: 'Tecnología',
            email: 'admin@empresa.com',
            portalName: 'Portal Empresa',
            primaryColor: '#1152d4',
            password: 'password123',
        }

        it('should accept valid tenant registration data', () => {
            const result = RegisterTenantSchema.safeParse(validData)
            expect(result.success).toBe(true)
        })

        it('should apply default values for optional fields', () => {
            const result = RegisterTenantSchema.safeParse(validData)
            if (result.success) {
                expect(result.data.primaryColor).toBe('#1152d4')
                expect(result.data.biometricsOn).toBe(false)
                expect(result.data.signatureOn).toBe(false)
                expect(result.data.arcoOn).toBe(false)
            }
        })

        it('should reject invalid email', () => {
            const result = RegisterTenantSchema.safeParse({
                ...validData,
                email: 'invalid-email',
            })
            expect(result.success).toBe(false)
        })

        it('should reject invalid RUC', () => {
            const result = RegisterTenantSchema.safeParse({
                ...validData,
                ruc: '123',
            })
            expect(result.success).toBe(false)
        })

        it('should reject razonSocial that is too short', () => {
            const result = RegisterTenantSchema.safeParse({
                ...validData,
                razonSocial: 'AB',
            })
            expect(result.success).toBe(false)
        })

        it('should reject invalid primaryColor', () => {
            const result = RegisterTenantSchema.safeParse({
                ...validData,
                primaryColor: 'not-a-color',
            })
            expect(result.success).toBe(false)
        })

        it('should trim whitespace from text fields', () => {
            const result = RegisterTenantSchema.safeParse({
                ...validData,
                razonSocial: '  Empresa de Prueba S.A.  ',
                email: '  ADMIN@EMPRESA.COM  ',
            })
            if (result.success) {
                expect(result.data.razonSocial).toBe('Empresa de Prueba S.A.')
                expect(result.data.email).toBe('admin@empresa.com')
            }
        })

        it('should convert email to lowercase', () => {
            const result = RegisterTenantSchema.safeParse({
                ...validData,
                email: 'ADMIN@EMPRESA.COM',
            })
            if (result.success) {
                expect(result.data.email).toBe('admin@empresa.com')
            }
        })
    })

    describe('CreateIdentitySchema', () => {
        const validData = {
            tenantId: '123e4567-e89b-12d3-a456-426614174000',
            fullName: 'Juan Pérez García',
            idNumber: '1234567890',
        }

        it('should accept valid identity data', () => {
            const result = CreateIdentitySchema.safeParse(validData)
            expect(result.success).toBe(true)
        })

        it('should reject invalid tenant UUID', () => {
            const result = CreateIdentitySchema.safeParse({
                ...validData,
                tenantId: 'not-a-uuid',
            })
            expect(result.success).toBe(false)
        })

        it('should reject invalid cédula', () => {
            const result = CreateIdentitySchema.safeParse({
                ...validData,
                idNumber: '123',
            })
            expect(result.success).toBe(false)
        })

        it('should accept optional biometricToken', () => {
            const result = CreateIdentitySchema.safeParse({
                ...validData,
                biometricToken: 'token-abc-123',
            })
            expect(result.success).toBe(true)
        })
    })

    describe('CreateArcoRequestSchema', () => {
        const validData = {
            identityId: '123e4567-e89b-12d3-a456-426614174000',
            type: 'ACCESO' as const,
            description: 'Solicito acceso a mis datos personales almacenados en el sistema.',
            contactEmail: 'usuario@example.com',
        }

        it('should accept valid ARCO request data', () => {
            const result = CreateArcoRequestSchema.safeParse(validData)
            expect(result.success).toBe(true)
        })

        it('should accept all valid ARCO types', () => {
            const types = ['ACCESO', 'RECTIFICACION', 'CANCELACION', 'OPOSICION', 'PORTABILIDAD']

            types.forEach(type => {
                const result = CreateArcoRequestSchema.safeParse({
                    ...validData,
                    type,
                })
                expect(result.success).toBe(true)
            })
        })

        it('should reject invalid ARCO type', () => {
            const result = CreateArcoRequestSchema.safeParse({
                ...validData,
                type: 'INVALID_TYPE',
            })
            expect(result.success).toBe(false)
        })

        it('should reject description that is too short', () => {
            const result = CreateArcoRequestSchema.safeParse({
                ...validData,
                description: 'Corto',
            })
            expect(result.success).toBe(false)
        })

        it('should reject description that is too long', () => {
            const result = CreateArcoRequestSchema.safeParse({
                ...validData,
                description: 'a'.repeat(1001),
            })
            expect(result.success).toBe(false)
        })

        it('should accept valid phone number', () => {
            const result = CreateArcoRequestSchema.safeParse({
                ...validData,
                contactPhone: '+593987654321',
            })
            expect(result.success).toBe(true)
        })

        it('should reject invalid phone number', () => {
            const result = CreateArcoRequestSchema.safeParse({
                ...validData,
                contactPhone: '123',
            })
            expect(result.success).toBe(false)
        })
    })

    describe('PaginationSchema', () => {
        it('should apply default values', () => {
            const result = PaginationSchema.safeParse({})
            if (result.success) {
                expect(result.data.page).toBe(1)
                expect(result.data.limit).toBe(10)
            }
        })

        it('should coerce string numbers to integers', () => {
            const result = PaginationSchema.safeParse({
                page: '5',
                limit: '20',
            })
            if (result.success) {
                expect(result.data.page).toBe(5)
                expect(result.data.limit).toBe(20)
            }
        })

        it('should reject negative page number', () => {
            const result = PaginationSchema.safeParse({
                page: -1,
            })
            expect(result.success).toBe(false)
        })

        it('should reject limit exceeding maximum', () => {
            const result = PaginationSchema.safeParse({
                limit: 101,
            })
            expect(result.success).toBe(false)
        })
    })

    describe('DateRangeSchema', () => {
        it('should accept valid date range', () => {
            const result = DateRangeSchema.safeParse({
                startDate: '2024-01-01T00:00:00Z',
                endDate: '2024-12-31T23:59:59Z',
            })
            expect(result.success).toBe(true)
        })

        it('should reject end date before start date', () => {
            const result = DateRangeSchema.safeParse({
                startDate: '2024-12-31T23:59:59Z',
                endDate: '2024-01-01T00:00:00Z',
            })
            expect(result.success).toBe(false)
        })

        it('should accept only start date', () => {
            const result = DateRangeSchema.safeParse({
                startDate: '2024-01-01T00:00:00Z',
            })
            expect(result.success).toBe(true)
        })

        it('should accept only end date', () => {
            const result = DateRangeSchema.safeParse({
                endDate: '2024-12-31T23:59:59Z',
            })
            expect(result.success).toBe(true)
        })
    })

    describe('validateSchema helper', () => {
        it('should return success with valid data', () => {
            const result = validateSchema(RUCSchema, '1234567890001')

            expect(result.success).toBe(true)
            if (result.success) {
                expect(result.data).toBe('1234567890001')
            }
        })

        it('should return errors with invalid RUC', () => {
            const result = validateSchema(RUCSchema, '123')

            expect(result.success).toBe(false)
        })

        it('should format errors as record of string arrays', () => {
            const result = validateSchema(RUCSchema, 'invalid')

            expect(result.success).toBe(false)
            if (!result.success) {
                expect(typeof result.errors).toBe('object')
            }
        })
    })
})
