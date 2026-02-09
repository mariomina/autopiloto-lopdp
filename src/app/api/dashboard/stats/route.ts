import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * API de Estadísticas del Dashboard
 * 
 * Endpoint para obtener métricas y estadísticas del dashboard principal.
 * Incluye compliance score, actividad reciente, solicitudes ARCO, y más.
 * Implementa fallback a datos mock si la base de datos no está disponible.
 */

export async function GET(req: Request) {
    try {
        // TODO: Obtener tenantId del usuario autenticado
        // Por ahora, usamos un tenant de ejemplo o el primero disponible
        const { searchParams } = new URL(req.url);
        const tenantId = searchParams.get('tenantId');

        if (!tenantId) {
            return NextResponse.json(
                { error: 'Tenant ID es requerido' },
                { status: 400 }
            );
        }

        try {
            // Obtener estadísticas reales de la base de datos
            const [
                totalIdentities,
                totalArcoRequests,
                pendingArcoRequests,
                totalConsentEvents,
                totalAuditEvents,
                totalSignatureContracts,
                recentAuditEvents,
                recentArcoRequests,
            ] = await Promise.all([
                // Total de identidades digitales
                prisma.digitalIdentity.count({
                    where: { tenantId }
                }),

                // Total de solicitudes ARCO
                prisma.arcoRequest.count({
                    where: { identity: { tenantId } }
                }),

                // Solicitudes ARCO pendientes
                prisma.arcoRequest.count({
                    where: {
                        identity: { tenantId },
                        status: 'PENDING'
                    }
                }),

                // Total de eventos de consentimiento
                prisma.consentEvent.count({
                    where: { identity: { tenantId } }
                }),

                // Total de eventos de auditoría
                prisma.auditChain.count({
                    where: { tenantId }
                }),

                // Total de contratos de firma
                prisma.signatureContract.count({
                    where: { identity: { tenantId } }
                }),

                // Últimos 10 eventos de auditoría
                prisma.auditChain.findMany({
                    where: { tenantId },
                    orderBy: { timestamp: 'desc' },
                    take: 10,
                    select: {
                        id: true,
                        eventType: true,
                        timestamp: true,
                        payload: true,
                    }
                }),

                // Últimas 5 solicitudes ARCO
                prisma.arcoRequest.findMany({
                    where: { identity: { tenantId } },
                    orderBy: { createdAt: 'desc' },
                    take: 5,
                    include: {
                        identity: {
                            select: {
                                fullName: true,
                                idNumber: true,
                            }
                        }
                    }
                }),
            ]);

            // Calcular compliance score basado en métricas reales
            const complianceScore = calculateComplianceScore({
                totalIdentities,
                totalArcoRequests,
                pendingArcoRequests,
                totalConsentEvents,
                totalAuditEvents,
            });

            // Calcular tendencia (comparar con mes anterior)
            const lastMonthStart = new Date();
            lastMonthStart.setMonth(lastMonthStart.getMonth() - 1);
            lastMonthStart.setDate(1);
            lastMonthStart.setHours(0, 0, 0, 0);

            const lastMonthIdentities = await prisma.digitalIdentity.count({
                where: {
                    tenantId,
                    createdAt: { gte: lastMonthStart }
                }
            });

            const identityTrend = totalIdentities > 0
                ? ((lastMonthIdentities / totalIdentities) * 100).toFixed(1)
                : '0';

            return NextResponse.json({
                success: true,
                data: {
                    complianceScore,
                    identityTrend: `+${identityTrend}%`,
                    metrics: {
                        totalIdentities,
                        totalArcoRequests,
                        pendingArcoRequests,
                        totalConsentEvents,
                        totalAuditEvents,
                        totalSignatureContracts,
                    },
                    recentActivity: {
                        auditEvents: recentAuditEvents,
                        arcoRequests: recentArcoRequests,
                    },
                    timestamp: new Date().toISOString(),
                }
            });

        } catch (dbError: any) {
            console.warn('DB Connection failed, falling back to mock data:', dbError);

            // FALLBACK: Datos simulados para demo
            return NextResponse.json({
                success: true,
                data: {
                    tenantName: "Enext Demo Corp",
                    complianceScore: 92,
                    identityTrend: '+12.5%',
                    stats: {
                        identities: 1250,
                        contractsSigned: 843,
                        arcoPending: 2,
                        consentEvents: 5420,
                    },
                    metrics: {
                        totalIdentities: 1250,
                        totalArcoRequests: 89,
                        pendingArcoRequests: 2,
                        totalConsentEvents: 5420,
                        totalAuditEvents: 8923,
                        totalSignatureContracts: 843,
                    },
                    recentActivity: {
                        auditEvents: [
                            {
                                id: "evt_1",
                                eventType: "SIGNATURE_COMPLETED",
                                action: "Firma de Contrato",
                                actor: "Juan Pérez",
                                timestamp: new Date().toISOString(),
                                payload: { contractId: "contract-123" },
                                payloadHash: "SHA256:7f83b165...",
                                status: "VERIFIED"
                            },
                            {
                                id: "evt_2",
                                eventType: "BIOMETRIC_VERIFICATION",
                                action: "Validación Biométrica",
                                actor: "Maria García",
                                timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
                                payload: { identityId: "identity-456" },
                                payloadHash: "SHA256:a92b3c4d...",
                                status: "VERIFIED"
                            },
                            {
                                id: "evt_3",
                                eventType: "CONSENT_GRANTED",
                                action: "Consentimiento LOPDP",
                                actor: "Carlos Ruiz",
                                timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
                                payload: { purpose: "Marketing" },
                                payloadHash: "SHA256:e3b0c442...",
                                status: "VERIFIED"
                            }
                        ],
                        arcoRequests: []
                    },
                    timestamp: new Date().toISOString(),
                    isSimulated: true
                }
            });
        }

    } catch (error: any) {
        console.error('Dashboard Stats Error:', error);
        return NextResponse.json(
            { error: 'Error interno al obtener estadísticas del dashboard' },
            { status: 500 }
        );
    }
}

/**
 * Calcula el compliance score basado en métricas del sistema
 * 
 * @param metrics - Métricas del sistema
 * @returns Score de 0-100
 */
function calculateComplianceScore(metrics: {
    totalIdentities: number;
    totalArcoRequests: number;
    pendingArcoRequests: number;
    totalConsentEvents: number;
    totalAuditEvents: number;
}): number {
    let score = 0;

    // Base score: Tener identidades registradas (20 puntos)
    if (metrics.totalIdentities > 0) {
        score += 20;
    }

    // Gestión de consentimientos (30 puntos)
    const consentRatio = metrics.totalIdentities > 0
        ? metrics.totalConsentEvents / metrics.totalIdentities
        : 0;

    if (consentRatio >= 1) score += 30;  // Al menos 1 consentimiento por identidad
    else if (consentRatio >= 0.5) score += 20;
    else if (consentRatio > 0) score += 10;

    // Auditoría activa (25 puntos)
    if (metrics.totalAuditEvents > 100) score += 25;
    else if (metrics.totalAuditEvents > 50) score += 15;
    else if (metrics.totalAuditEvents > 0) score += 5;

    // Gestión de solicitudes ARCO (25 puntos)
    if (metrics.totalArcoRequests > 0) {
        const pendingRatio = metrics.pendingArcoRequests / metrics.totalArcoRequests;

        if (pendingRatio < 0.2) score += 25;  // Menos del 20% pendientes
        else if (pendingRatio < 0.4) score += 15;
        else if (pendingRatio < 0.6) score += 10;
        else score += 5;
    }

    return Math.min(100, Math.max(0, score));
}
