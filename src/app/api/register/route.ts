import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * API DE REGISTRO CON FALLBACK PARA MVP
 * Si la base de datos no está disponible, el sistema simula un éxito 
 * para permitir que el flujo del MVP continue sin interrupciones.
 */

export async function GET() {
    return NextResponse.json({ status: 'ok', message: 'Register API is ready' });
}

export async function POST(req: Request) {
    console.log("POST /api/register hit");
    try {
        const body = await req.json();
        const { legal, modules, branding } = body;

        // 1. Validaciones básicas
        if (!legal?.ruc || !legal?.companyName || !legal?.adminEmail) {
            return NextResponse.json(
                { error: 'RUC, Nombre de Empresa y Email son obligatorios.' },
                { status: 400 }
            );
        }

        try {
            // INTENTO DE PERSISTENCIA REAL (Prisma)
            const existingTenant = await prisma.tenant.findUnique({
                where: { ruc: legal.ruc },
            });

            if (existingTenant) {
                return NextResponse.json(
                    { error: 'Este RUC ya está registrado.' },
                    { status: 409 }
                );
            }

            const result = await prisma.$transaction(async (tx) => {
                const tenant = await tx.tenant.create({
                    data: {
                        ruc: legal.ruc,
                        razonSocial: legal.companyName,
                        sector: legal.sector || 'Other',
                        portalName: branding.portalName || `${legal.companyName} Portal`,
                        primaryColor: branding.primaryColor || '#1152d4',
                        logoUrl: branding.logoUrl || null,
                        biometricsOn: !!modules.biometrics,
                        signatureOn: !!modules.signature,
                        arcoOn: !!modules.arco,
                    },
                });

                const staffUser = await tx.staffUser.create({
                    data: {
                        tenantId: tenant.id,
                        email: legal.adminEmail,
                        role: 'OWNER',
                    },
                });

                return { tenant, staffUser };
            });

            return NextResponse.json({
                message: 'Registro exitoso (Base de Datos)',
                tenantId: result.tenant.id,
            });

        } catch (dbError) {
            console.warn('DB Connection failed, falling back to Simulation mode:', dbError);

            // SIMULACIÓN DE ÉXITO PARA DEMO (Fallback)
            // Esto asegura que si Supabase está caído, la demo no se detenga.
            return NextResponse.json({
                message: 'Registro exitoso (Modo Simulación MVP)',
                tenantId: "sim_tenant_123",
                isSimulated: true
            });
        }
    } catch (error: any) {
        console.error('Registration Error:', error);
        return NextResponse.json(
            { error: 'Error interno en el servidor' },
            { status: 500 }
        );
    }
}
