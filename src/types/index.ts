export enum UserRole {
  ADMIN = 'ADMIN',
  AUDITOR = 'AUDITOR',
  USER = 'USER'
}

export enum ViewState {
  LANDING = 'LANDING',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  DASHBOARD_HOME = 'DASHBOARD_HOME',
  DASHBOARD_RAT = 'DASHBOARD_RAT', // Formerly Custody
  DASHBOARD_BIOMETRICS = 'DASHBOARD_BIOMETRICS',
  DASHBOARD_ARCO = 'DASHBOARD_ARCO', // New
  DASHBOARD_SIGNATURE = 'DASHBOARD_SIGNATURE',
  DASHBOARD_REPORTS = 'DASHBOARD_REPORTS', // New
  DASHBOARD_SETTINGS = 'DASHBOARD_SETTINGS',
  INVISIBLE_PORTAL = 'INVISIBLE_PORTAL',
  INVISIBLE_SUCCESS = 'INVISIBLE_SUCCESS'
}

export interface CustodyLog {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  hash: string;
  status: 'valid' | 'warning' | 'error';
}

export interface Document {
  id: string;
  name: string;
  status: 'signed' | 'pending';
  date: string;
  signer: string;
}

export interface ArcoRequest {
  id: string;
  requester: string;
  email: string;
  type: 'Acceso' | 'Rectificación' | 'Cancelación' | 'Oposición';
  date: string;
  deadlineDays: number;
  status: 'Nuevo' | 'En Proceso' | 'Resuelto' | 'Vencido';
}

export interface Certificate {
  id: string;
  name: string;
  date: string;
  hash: string;
  status: 'Verificado' | 'Pendiente';
}