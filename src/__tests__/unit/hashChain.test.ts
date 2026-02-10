import { describe, it, expect } from 'vitest';
import { calculatePayloadHash, verifyChainIntegrity, AuditEvent, calculateCombinedHash } from '../../lib/crypto/hashChain';

describe('Hash Chain Verification', () => {
    // Helper to create a proper event with combined hash
    const createEvent = (id: string, payload: any, prevCombinedHash: string | null = null): AuditEvent => {
        const payloadHash = calculatePayloadHash(payload);
        const event: AuditEvent = {
            id,
            payload,
            payloadHash,
            prevHash: prevCombinedHash,
            timestamp: new Date(),
        };

        if (prevCombinedHash) {
            event.combinedHash = calculateCombinedHash(payloadHash, prevCombinedHash);
        } else {
            event.combinedHash = payloadHash; // Root event
        }

        return event;
    };

    const event1 = createEvent('event-1', { identityId: 'identity-1' });
    const event2 = createEvent('event-2', { identityId: 'identity-2' }, event1.combinedHash);
    const event3 = createEvent('event-3', { identityId: 'identity-3' }, event2.combinedHash);

    const events: AuditEvent[] = [event1, event2, event3];

    it('should verify a valid chain of events', () => {
        const result = verifyChainIntegrity(events);
        expect(result.isValid).toBe(true);
        expect(result.brokenLinks).toBe(0);
    });

    it('should detect when payload has been tampered with', () => {
        const tamperedPayloadEvents = [...events];
        // Modificar evento 2, pero sin actualizar el hash
        tamperedPayloadEvents[1] = {
            ...events[1],
            payload: { identityId: 'identity-2-MODIFIED' }, // Payload cambia, stored hash se mantiene
        };

        const result = verifyChainIntegrity(tamperedPayloadEvents);
        expect(result.isValid).toBe(false);
        // Payload mismatch doesn't necessarily break the link if links are based on combined hashes
        // but it makes the event invalid.
        expect(result.verifiedEvents).toBeLessThan(events.length);
        // Debe fallar porque el stored payloadHash no coincide con el calculated hash del payload actual
    });

    it('should detect when chain link is broken (missing previousHash)', () => {
        const tamperedLinkEvents = [...events];
        // Modificar evento 2 para romper el enlace con el 1
        tamperedLinkEvents[1] = {
            ...events[1],
            prevHash: 'INVALID-HASH', // Previous hash no coincide con el payload hash del evento 1
        };

        const result = verifyChainIntegrity(tamperedLinkEvents);
        expect(result.isValid).toBe(false);
        expect(result.brokenLinks).toBeGreaterThan(0);
    });

    it('should detect chain reordering/missing events', () => {
        const missingEventEvents = [events[0], events[2]]; // Falta el evento 2 que conecta 1 y 3

        const result = verifyChainIntegrity(missingEventEvents);
        // Evento 3 espera hash de Evento 2, pero recibirá hash de Evento 1 como "anterior" en la lista?
        // verifyChainIntegrity verifica [i].previousHash === [i-1].payloadHash
        // Evento 3.previousHash (que es hash de evento 2) != Evento 1.payloadHash
        expect(result.isValid).toBe(false);
    });
});
