export interface ShipmentClientRequest {
  id: number;
  firstName: string;
  lastName: string;
  shippingCity: string;
  deliveryCity: string;
  country: string;
  shippingDate: string;
  phone?: string;
  email?: string;
  additionalInfo?: string;
  requestStatus: RequestStatus;
  createdAt: string;
}

export interface ShipmentClientRequestDto {
  firstName: string;
  lastName: string;
  shippingCity: string;
  deliveryCity: string;
  country: string;
  shippingDate: string;
  phone?: string;
  email?: string;
  additionalInfo?: string;
}

export type RequestStatus = 'EN_ATTENTE' | 'EN_TRAITEMENT' | 'CONFIRME' | 'REFUSE';

export const REQUEST_STATUS_LABELS: Record<RequestStatus, string> = {
  EN_ATTENTE: 'En attente',
  EN_TRAITEMENT: 'En traitement',
  CONFIRME: 'Confirmé',
  REFUSE: 'Refusé'
};

export const REQUEST_STATUS_CLASSES: Record<RequestStatus, string> = {
  EN_ATTENTE: 'badge bg-warning text-dark',
  EN_TRAITEMENT: 'badge bg-info text-dark',
  CONFIRME: 'badge bg-success',
  REFUSE: 'badge bg-danger'
};
