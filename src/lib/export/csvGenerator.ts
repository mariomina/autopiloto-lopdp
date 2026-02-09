import { AuditEvent, calculatePayloadHash } from '@/lib/crypto/hashChain';

/**
 * Genera un CSV con filas verificadas
 */
export function generateAuditCsv(events: AuditEvent[]): string {
    const header = 'ID,Type,Timestamp,Payload Hash,Previous Hash,Is Verified\n';

    if (!events || events.length === 0) {
        return header;
    }

    const rows = events.map(event => {
        // Verificar integridad de payload en la marcha
        const calculatedHash = calculatePayloadHash(event.payload);
        const isVerified = calculatedHash === event.payloadHash;

        // Escapar comillas dobles si están presentes
        const id = event.id.replace(/"/g, '""');
        const type = event.eventType || 'UNKNOWN';

        // Asegurar que timestamp sea un objeto Date válido o string parseable
        const timestampObj = event.timestamp instanceof Date ? event.timestamp : new Date(event.timestamp);
        const timestampStr = isNaN(timestampObj.getTime()) ? 'INVALID DATE' : timestampObj.toISOString();

        const payloadHash = event.payloadHash;
        const prevHash = event.previousHash || '';

        return `"${id}","${type}","${timestampStr}","${payloadHash}","${prevHash}","${isVerified ? 'Yes' : 'No'}"`;
    });

    return header + rows.join('\n');
}

/**
 * Genera un JSON formateado
 */
export function generateAuditJson(events: AuditEvent[]): string {
    return JSON.stringify(events, null, 2);
}
