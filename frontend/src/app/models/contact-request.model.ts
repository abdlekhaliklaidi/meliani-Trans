export interface ContactRequest {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: ContactStatus;
  createdAt: string;
}

export interface ContactRequestDto {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export type ContactStatus = 'NOUVEAU' | 'EN_TRAITEMENT' | 'RESOLU' | 'ARCHIVE';

export const CONTACT_STATUS_LABELS: Record<ContactStatus, string> = {
  NOUVEAU: 'Nouveau',
  EN_TRAITEMENT: 'En traitement',
  RESOLU: 'Résolu',
  ARCHIVE: 'Archivé'
};

export const CONTACT_STATUS_CLASSES: Record<ContactStatus, string> = {
  NOUVEAU: 'badge bg-primary',
  EN_TRAITEMENT: 'badge bg-warning text-dark',
  RESOLU: 'badge bg-success',
  ARCHIVE: 'badge bg-secondary'
};
