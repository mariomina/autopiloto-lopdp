import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const search = searchParams.get('search') || '';

        // Get the latest tenant (simulated session)
        const tenant = await prisma.tenant.findFirst({
            orderBy: { createdAt: 'desc' },
        });

        if (!tenant) {
            return NextResponse.json({ error: 'Tenant not found' }, { status: 404 });
        }

        // Fetch identities matching search query
        const identities = await prisma.digitalIdentity.findMany({
            where: {
                tenantId: tenant.id,
                OR: [
                    { fullName: { contains: search, mode: 'insensitive' } },
                    { idNumber: { contains: search, mode: 'insensitive' } }
                ]
            },
            orderBy: { createdAt: 'desc' },
            take: 20 // Limit to 20 for performance in this view
        });

        return NextResponse.json({ identities });
    } catch (error) {
        console.error('API Identities Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
