import { describe, it, expect } from 'vitest';
import { calculatePayloadHash, verifyChainIntegrity, AuditEvent } from '../../lib/crypto/hashChain';

describe('Hash Chain Verification', () => {
    const events: AuditEvent[] = [
        {
            id: 'event-1',
            payload: { identityId: 'identity-1' },
            payloadHash: calculatePayloadHash({ identityId: 'identity-1' }),
            previousHash: null,
            timestamp: new Date('2026-02-09T00:00:01Z'),
        },
        {
            id: 'event-2',
            payload: { identityId: 'identity-2' },
            payloadHash: calculatePayloadHash({ identityId: 'identity-2' }),
            previousHash: calculatePayloadHash({ identityId: 'identity-1' }), // Link to previous payload hash
            timestamp: new Date('2026-02-09T00:00:02Z'),
        },
        {
            id: 'event-3',
            payload: { identityId: 'identity-3' },
            payloadHash: calculatePayloadHash({ identityId: 'identity-3' }),
            previousHash: calculatePayloadHash({ identityId: 'identity-2' }), // Link to previous payload hash
            timestamp: new Date('2026-02-09T00:00:03Z'),
        }
    ];

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
        expect(result.brokenLinks).toBeGreaterThan(0);
        // Debe fallar porque el stored payloadHash no coincide con el calculated hash del payload actual
    });

    it('should detect when chain link is broken (missing previousHash)', () => {
        const tamperedLinkEvents = [...events];
        // Modificar evento 2 para romper el enlace con el 1
        tamperedLinkEvents[1] = {
            ...events[1],
            previousHash: 'INVALID-HASH', // Previous hash no coincide con el payload hash del evento 1
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
