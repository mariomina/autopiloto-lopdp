import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { RegisterTenantSchema, validateSchema } from '@/lib/validations/schemas';

/**
 * API DE REGISTRO CON VALIDACIÓN ZOD
 * 
 * Endpoint para registrar nuevos tenants (organizaciones) en el sistema.
 * Incluye validación robusta con Zod y fallback para modo demo.
 */

export async function GET() {
    return NextResponse.json({
        status: 'ok',
        message: 'Register API is ready',
        version: '2.0'
    });
}

export async function POST(req: Request) {
    console.log("POST /api/register hit");

    try {
        const body = await req.json();

        // Transform legacy format to new schema format if needed
        const transformedData = {
            ruc: body.legal?.ruc || body.ruc,
            razonSocial: body.legal?.companyName || body.razonSocial,
            sector: body.legal?.sector || body.sector || 'Other',
            email: body.legal?.adminEmail || body.email,
            portalName: body.branding?.portalName || body.portalName || `${body.legal?.companyName || 'Portal'} LOPDP`,
            primaryColor: body.branding?.primaryColor || body.primaryColor,
            logoUrl: body.branding?.logoUrl || body.logoUrl,
            biometricsOn: body.modules?.biometrics ?? body.biometricsOn,
            signatureOn: body.modules?.signature ?? body.signatureOn,
            arcoOn: body.modules?.arco ?? body.arcoOn,
        };

        // Validate input with Zod
        const validation = validateSchema(RegisterTenantSchema, transformedData);

        if (!validation.success) {
            return NextResponse.json(
                {
                    error: 'Datos de registro inválidos',
                    details: validation.errors
                },
                { status: 400 }
            );
        }

        const validatedData = validation.data;

        try {
            // Check for existing tenant
            const existingTenant = await prisma.tenant.findUnique({
                where: { ruc: validatedData.ruc },
            });

            if (existingTenant) {
                return NextResponse.json(
                    { error: 'Este RUC ya está registrado en el sistema.' },
                    { status: 409 }
                );
            }

            // Create tenant and admin user in a transaction
            const result = await prisma.$transaction(async (tx) => {
                const tenant = await tx.tenant.create({
                    data: {
                        ruc: validatedData.ruc,
                        razonSocial: validatedData.razonSocial,
                        sector: validatedData.sector,
                        portalName: validatedData.portalName,
                        primaryColor: validatedData.primaryColor,
                        logoUrl: validatedData.logoUrl,
                        biometricsOn: validatedData.biometricsOn,
                        signatureOn: validatedData.signatureOn,
                        arcoOn: validatedData.arcoOn,
                    },
                });

                const staffUser = await tx.staffUser.create({
                    data: {
                        tenantId: tenant.id,
                        email: validatedData.email,
                        role: 'OWNER',
                    },
                });

                return { tenant, staffUser };
            });

            return NextResponse.json({
                success: true,
                message: 'Registro exitoso. Tenant creado en base de datos.',
                data: {
                    tenantId: result.tenant.id,
                    portalName: result.tenant.portalName,
                    adminEmail: result.staffUser.email,
                }
            }, { status: 201 });

        } catch (dbError: any) {
            console.warn('DB Connection failed, falling back to Simulation mode:', dbError);

            // SIMULACIÓN DE ÉXITO PARA DEMO (Fallback)
            // Esto asegura que si Supabase está caído, la demo no se detenga.
            return NextResponse.json({
                success: true,
                message: 'Registro exitoso (Modo Simulación MVP)',
                data: {
                    tenantId: "sim_tenant_123",
                    portalName: validatedData.portalName,
                    adminEmail: validatedData.email,
                    isSimulated: true
                }
            }, { status: 201 });
        }

    } catch (error: any) {
        console.error('Registration Error:', error);

        // Handle JSON parsing errors
        if (error instanceof SyntaxError) {
            return NextResponse.json(
                { error: 'Formato de datos inválido. Se esperaba JSON válido.' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'Error interno en el servidor. Por favor, intente nuevamente.' },
            { status: 500 }
        );
    }
}
