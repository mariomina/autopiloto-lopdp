import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyChainIntegrity, AuditEvent } from '@/lib/crypto/hashChain';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const tenantId = searchParams.get('tenantId');
        const startEventId = searchParams.get('startEventId'); // Opcional, para verificar segmento
        const limit = parseInt(searchParams.get('limit') || '50'); // Límite de eventos a verificar

        if (!tenantId) {
            return NextResponse.json(
                { error: 'Tenant ID is required' },
                { status: 400 }
            );
        }

        // Obtener eventos desde la base de datos
        // Orden ascendente por timestamp para verificar la cadena
        const where: any = { tenantId };

        // Si se proporciona startEventId, filtrar para obtener ese y siguientes
        if (startEventId) {
            const startEvent = await prisma.auditChain.findUnique({ where: { id: startEventId } });
            if (startEvent) {
                where.timestamp = { gte: startEvent.timestamp };
            }
        }

        const events = await prisma.auditChain.findMany({
            where,
            orderBy: { timestamp: 'asc' },
            take: limit,
            select: {
                id: true,
                payload: true,
                payloadHash: true,
                prevHash: true,
                combinedHash: true, // Importante para verificación
                timestamp: true
            }
        });

        const verificationResult = verifyChainIntegrity(events as unknown as AuditEvent[]);

        return NextResponse.json({
            success: true,
            data: {
                tenantId,
                verifiedCount: events.length,
                result: verificationResult,
                status: verificationResult.isValid ? 'INTEGRITY_VERIFIED' : 'INTEGRITY_COMPROMISED',
                timestamp: new Date().toISOString()
            }
        });

    } catch (error: any) {
        console.error('Audit Verification Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error verifying audit chain' },
            { status: 500 }
        );
    }
}
