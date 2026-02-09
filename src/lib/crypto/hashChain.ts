import crypto from 'crypto';

export interface AuditEvent {
    id: string;
    payload: any;
    payloadHash: string;
    previousHash: string | null;
    timestamp: Date | string;
    eventType?: string;
    tenantId?: string;
}

export interface VerificationResult {
    isValid: boolean;
    totalEvents: number;
    verifiedEvents: number;
    brokenLinks: number;
    errors: string[];
}

/**
 * Calcula el hash SHA-256 de cualquier payload (objeto JSON).
 * Asegura determinismo ordenando las llaves del objeto.
 */
export function calculatePayloadHash(payload: any): string {
    if (!payload) return '';
    // Ordenar llaves para asegurar mismo hash para mismo contenido
    const jsonString = JSON.stringify(payload, Object.keys(payload).sort());
    return `SHA256:${crypto.createHash('sha256').update(jsonString).digest('hex')}`;
}

/**
 * Verifica la integridad de una lista de eventos de auditoría.
 * Comprueba:
 * 1. Que el hash del payload sea correcto (integridad de datos).
 * 2. Que el previousHash coincida con el payloadHash del evento anterior (integridad de cadena).
 */
export function verifyChainIntegrity(events: AuditEvent[]): VerificationResult {
    if (!events || events.length === 0) {
        return {
            isValid: true,
            totalEvents: 0,
            verifiedEvents: 0,
            brokenLinks: 0,
            errors: []
        };
    }

    // Ordenar cronológicamente (antiguo a nuevo) para verificar la cadena
    const sortedEvents = [...events].sort((a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    let verifiedEvents = 0;
    let brokenLinks = 0;
    const errors: string[] = [];

    for (let i = 0; i < sortedEvents.length; i++) {
        const currentEvent = sortedEvents[i];
        let isEventValid = true;

        // 1. Verificar Hash del Payload (Integridad de contenido)
        const calculatedHash = calculatePayloadHash(currentEvent.payload);
        if (calculatedHash !== currentEvent.payloadHash) {
            errors.push(`Event ${currentEvent.id}: Payload hash mismatch. Stored: ${currentEvent.payloadHash}, Calculated: ${calculatedHash}`);
            isEventValid = false;
            brokenLinks++;
        }

        // 2. Verificar Enlace con Anterior (Integridad de cadena)
        // Solo si no es el primer evento de la lista (o de la historia)
        if (i > 0) {
            const previousEvent = sortedEvents[i - 1];
            if (currentEvent.previousHash !== previousEvent.payloadHash) {
                errors.push(`Event ${currentEvent.id}: Chain broken. PreviousHash (${currentEvent.previousHash}) does not match previous event PayloadHash (${previousEvent.payloadHash})`);
                isEventValid = false;
                brokenLinks++;
            }
        }

        if (isEventValid) {
            verifiedEvents++;
        }
    }

    return {
        isValid: brokenLinks === 0,
        totalEvents: events.length,
        verifiedEvents,
        brokenLinks,
        errors
    };
}
