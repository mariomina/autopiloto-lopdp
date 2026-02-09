import { describe, it, expect } from 'vitest';
import { generateAuditCsv } from '../../lib/export/csvGenerator';
import { AuditEvent, calculatePayloadHash } from '../../lib/crypto/hashChain';

describe('CSV Generator', () => {
    const events: AuditEvent[] = [
        {
            id: 'event-1',
            eventType: 'TEST_EVENT',
            payload: { data: 'test' },
            payloadHash: calculatePayloadHash({ data: 'test' }),
            previousHash: null,
            timestamp: new Date('2026-02-09T10:00:00Z'),
        },
        {
            id: 'event-2',
            eventType: 'ANOTHER_EVENT',
            payload: { data: 'test2' },
            payloadHash: calculatePayloadHash({ data: 'test2' }),
            previousHash: calculatePayloadHash({ data: 'test' }),
            timestamp: new Date('2026-02-09T11:00:00Z'),
        }
    ];

    it('should generate valid CSV headers', () => {
        const csv = generateAuditCsv([]);
        expect(csv).toContain('ID,Type,Timestamp,Payload Hash,Previous Hash,Is Verified');
    });

    it('should generate correct CSV rows', () => {
        const csv = generateAuditCsv(events);
        const lines = csv.split('\n');

        // Header + 2 rows
        expect(lines.length).toBe(3);

        // Check first row content
        expect(lines[1]).toContain('"event-1"');
        expect(lines[1]).toContain('"TEST_EVENT"');
        expect(lines[1]).toContain('"SHA256:'); // Payload Hash
        expect(lines[1]).toContain('"Yes"'); // Verified

        // Check second row content
        expect(lines[2]).toContain('"event-2"');
        expect(lines[2]).toContain('"ANOTHER_EVENT"');
    });

    it('should mark unverified events correctly', () => {
        const tamperedEvent: AuditEvent = {
            ...events[0],
            payloadHash: 'INVALID_HASH'
        };

        const csv = generateAuditCsv([tamperedEvent]);
        expect(csv).toContain('"No"'); // Should be not verified
    });
});
