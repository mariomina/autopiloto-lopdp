import crypto from 'crypto';

export interface AuditEvent {
    id: string;
    payload: any;
    payloadHash: string;
    prevHash: string | null; // Renamed from previousHash
    combinedHash?: string;   // New field for stronger integrity
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
 * Recalcula el Combined Hash esperado
 */
export function calculateCombinedHash(payloadHash: string, prevHash: string): string {
    const combinedString = `${payloadHash}|${prevHash}`;
    return `SHA256:${crypto.createHash('sha256').update(combinedString).digest('hex')}`;
}

/**
 * Verifica la integridad de una lista de eventos de auditoría.
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

    // Ordenar cronológicamente (antiguo a nuevo)
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
        const calculatedPayloadHash = calculatePayloadHash(currentEvent.payload);
        if (calculatedPayloadHash !== currentEvent.payloadHash) {
            errors.push(`Event ${currentEvent.id}: Payload hash mismatch. Stored: ${currentEvent.payloadHash}, Calculated: ${calculatedPayloadHash}`);
            isEventValid = false;
        }

        // 2. Verificar Hash Combinado (si existe)
        if (currentEvent.combinedHash && currentEvent.prevHash) {
            const expectedCombined = calculateCombinedHash(currentEvent.payloadHash, currentEvent.prevHash);
            if (expectedCombined !== currentEvent.combinedHash) {
                errors.push(`Event ${currentEvent.id}: Combined hash mismatch. Integrity compromised.`);
                isEventValid = false;
            }
        }

        // 3. Verificar Enlace con Anterior (Integridad de cadena)
        if (i > 0) {
            const previousEvent = sortedEvents[i - 1];

            // Si usamos combinedHash strategy
            if (currentEvent.combinedHash && previousEvent.combinedHash) {
                if (currentEvent.prevHash !== previousEvent.combinedHash) {
                    errors.push(`Event ${currentEvent.id}: Broken link. PrevHash points to ${currentEvent.prevHash}, but previous event CombinedHash is ${previousEvent.combinedHash}`);
                    isEventValid = false;
                    brokenLinks++;
                }
            }
            // Fallback a legacy strategy (prevHash -> payloadHash)
            else if (currentEvent.prevHash !== previousEvent.payloadHash) {
                // Solo marcamos error si TAMPOCO coincide con combinedHash (por si acaso mezclamos)
                if (!previousEvent.combinedHash || currentEvent.prevHash !== previousEvent.combinedHash) {
                    errors.push(`Event ${currentEvent.id}: Chain broken. PrevHash mismatch.`);
                    isEventValid = false;
                    brokenLinks++;
                }
            }
        }

        if (isEventValid) {
            verifiedEvents++;
        }
    }

    return {
        isValid: errors.length === 0,
        totalEvents: events.length,
        verifiedEvents,
        brokenLinks,
        errors
    };
}
