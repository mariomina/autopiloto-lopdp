import { NextResponse } from 'next/server';

/**
 * MODOS DE SIMULACIÓN PARA MVP
 * Este endpoint maneja datos mockeados para asegurar que el Dashboard 
 * siempre cargue incluso si la DB de Supabase está caída/pausada.
 */

export async function GET() {
    try {
        // DATOS SIMULADOS (HYBRID MOCK)
        // Solo intentamos conectar si DATABASE_URL existe, pero si falla, entregamos el Mock.

        const mockData = {
            tenantName: "Enext Demo Corp",
            stats: {
                complianceScore: 92,
                identities: 1250,
                contractsSigned: 843,
                arcoPending: 2,
                consentEvents: 5420,
            },
            recentActivity: [
                {
                    id: "evt_1",
                    action: "Firma de Contrato",
                    actor: "Juan Pérez",
                    timestamp: new Date().toISOString(),
                    payloadHash: "SHA256:7f83b165...",
                    status: "VERIFIED"
                },
                {
                    id: "evt_2",
                    action: "Validación Biométrica",
                    actor: "Maria García",
                    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
                    payloadHash: "SHA256:a92b3c4d...",
                    status: "VERIFIED"
                },
                {
                    id: "evt_3",
                    action: "Consentimiento LOPDP",
                    actor: "Carlos Ruiz",
                    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
                    payloadHash: "SHA256:e3b0c442...",
                    status: "VERIFIED"
                }
            ]
        };

        return NextResponse.json(mockData);

    } catch (error) {
        console.error('Dashboard Stats Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
