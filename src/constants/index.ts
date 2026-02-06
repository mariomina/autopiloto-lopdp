import { CustodyLog, Document, ArcoRequest, Certificate } from '@/types';

export const MOCK_LOGS: CustodyLog[] = [
  { id: 'LOG-001', timestamp: '2026-05-12 10:42:15', action: 'Consentimiento Biométrico', actor: 'usr_8821', hash: 'e3b0c44298fc1c149afbf4c8996fb924', status: 'valid' },
  { id: 'LOG-002', timestamp: '2026-05-12 10:45:30', action: 'Acceso Portal Cliente', actor: 'usr_9932', hash: '8d969eef6ecad3c29a3a629280e686cf', status: 'valid' },
  { id: 'LOG-003', timestamp: '2026-05-12 11:02:11', action: 'Firma Contrato LOPDP', actor: 'usr_8821', hash: 'ca978112ca1bbdcafac231b39a23dc4d', status: 'valid' },
  { id: 'LOG-004', timestamp: '2026-05-12 11:15:00', action: 'Intento Acceso Fallido', actor: 'unknown', hash: '5e884898da28047151d0e56f8dc62927', status: 'warning' },
  { id: 'LOG-005', timestamp: '2026-05-12 12:30:45', action: 'Revocación Consentimiento', actor: 'usr_7712', hash: 'd41d8cd98f00b204e9800998ecf8427e', status: 'valid' },
];

export const MOCK_DOCS: Document[] = [
  { id: 'DOC-102', name: 'Acuerdo Confidencialidad LOPDP', status: 'signed', date: '12 May 2026', signer: 'Carlos Andrade' },
  { id: 'DOC-103', name: 'Autorización Tratamiento Datos', status: 'signed', date: '11 May 2026', signer: 'Maria Torres' },
  { id: 'DOC-104', name: 'Contrato Prestación Servicios', status: 'pending', date: '10 May 2026', signer: 'Juan Perez' },
];

export const MOCK_ARCO: ArcoRequest[] = [
  { id: 'REQ-2026-892', requester: 'Juan Pérez', email: 'juan.perez@email.com', type: 'Cancelación', date: '10 Oct 2026', deadlineDays: 2, status: 'En Proceso' },
  { id: 'REQ-2026-885', requester: 'María Andrade', email: 'm.andrade@corp.net', type: 'Acceso', date: '12 Oct 2026', deadlineDays: 5, status: 'Nuevo' },
  { id: 'REQ-2026-879', requester: 'Carlos Ruiz', email: 'cruiz@provider.ec', type: 'Rectificación', date: '15 Oct 2026', deadlineDays: 12, status: 'Nuevo' },
  { id: 'REQ-2026-810', requester: 'Elena Torres', email: 'elena.t@mail.com', type: 'Oposición', date: '01 Oct 2026', deadlineDays: 0, status: 'Resuelto' },
];

export const MOCK_CERTIFICATES: Certificate[] = [
  { id: 'CERT-001', name: 'Certificado Mensual LOPDP', date: 'Oct 12, 2026 • 10:42 AM', hash: 'a7f2...99', status: 'Verificado' },
  { id: 'CERT-002', name: 'Auditoría de Accesos', date: 'Oct 05, 2026 • 09:15 AM', hash: 'b8c1...22', status: 'Verificado' },
  { id: 'CERT-003', name: 'Reporte de Incidentes', date: 'Sep 30, 2026 • 14:20 PM', hash: '---', status: 'Pendiente' },
];