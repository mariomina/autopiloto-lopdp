import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
// Importamos correctamente la función
import { generateAuditCsv, generateAuditJson } from '@/lib/export/csvGenerator';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const tenantId = searchParams.get('tenantId');
        const format = searchParams.get('format') || 'csv';

        if (!tenantId) {
            return NextResponse.json(
                { error: 'Tenant ID is required' },
                { status: 400 }
            );
        }

        // Obtener eventos con filtros
        const where: any = { tenantId };

        // Filtros adicionales si se necesitan (omitidos por simplicidad, agregando todos)

        const events = await prisma.auditChain.findMany({
            where,
            orderBy: { timestamp: 'asc' },
            take: 1000 // Limitar a 1000 eventos por solicitud de exportación
        });

        if (format === 'json') {
            // Necesitamos asegurar que el tipo que pasamos sea compatible con AuditEvent
            // Prisma devuelve objetos con propiedades adicionales como `eventType`, que AuditEvent no tiene explicito.
            // Pero TypeScript estructuralmente lo acepta si AuditEvent tiene `id, payload, ...` y el objeto tiene esos + otros.
            // Sin embargo, `eventType` es requerido por nuestra lógica interna de CSV, así que asumimos que `events` lo tiene.

            const jsonContent = JSON.stringify(events, null, 2);
            const filename = `audit_export_${new Date().toISOString().slice(0, 10)}.json`;

            return new NextResponse(jsonContent, {
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Disposition': `attachment; filename="${filename}"`
                }
            });
        } else {
            // Formato CSV por defecto
            // Pasamos los eventos casteados a `any` para evitar conflictos de tipos estrictos con AuditEvent
            // O mejor, actualizamos AuditEvent en `hashChain.ts` para incluir `eventType optional?`

            const csvContent = generateAuditCsv(events as any[]);

            const filename = `audit_export_${new Date().toISOString().slice(0, 10)}.csv`;

            return new NextResponse(csvContent, {
                headers: {
                    'Content-Type': 'text/csv',
                    'Content-Disposition': `attachment; filename="${filename}"`
                }
            });
        }

    } catch (error: any) {
        console.error('Audit Export Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error exporting audit data' },
            { status: 500 }
        );
    }
}
