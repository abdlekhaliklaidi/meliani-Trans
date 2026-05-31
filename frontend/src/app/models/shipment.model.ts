export interface Shipment {
  id: number;
  trackingNumber: string;

  // ✅ Expéditeur
  senderFirstName: string;
  senderLastName: string;

  // Destinataire
  recipientFirstName: string;
  recipientLastName: string;
  recipientFullName: string;

  // ✅ Informations colis
  packageType: string;
  weight: number;

  shippingCity: string;
  deliveryCity: string;
  country: string;
  shippingDate: string;
  currentStatus: string;
  currentLocation: string;
  phone?: string;
  status: ShipmentStatus;
  statusHistory: ShipmentStatusHistory[];
  createdAt: string;
  updatedAt: string;
}

export interface ShipmentRequestDto {
  trackingNumber?: string;

  // ✅ Expéditeur
  senderFirstName: string;
  senderLastName: string;

  // Destinataire
  recipientFirstName: string;
  recipientLastName: string;

  // ✅ Informations colis
  packageType: string;
  weight: number;

  shippingCity: string;
  deliveryCity: string;
  country: string;
  shippingDate: string;
}

export interface ShipmentStatusHistory {
  id: number;
  status: string;
  location: string;
  description: string;
  timestamp: string;
}

export interface ShipmentRequestDto {
  recipientFirstName: string;
  recipientLastName: string;
  shippingCity: string;
  deliveryCity: string;
  country: string;
  shippingDate: string;
}

export interface StatusUpdateRequest {
  status: string;
  location: string;
  description?: string;
}

export type ShipmentStatus = 
  | 'EN_PREPARATION' 
  | 'EN_AGENCE_DEPART' 
  | 'EN_TRANSIT' 
  | 'ARRIVEE_INTERMEDIAIRE' 
  | 'EN_AGENCE_ARRIVEE' 
  | 'EN_LIVRAISON' 
  | 'LIVRE' 
  | 'ANNULE';

export const SHIPMENT_STATUS_LABELS: Record<ShipmentStatus, string> = {
  EN_PREPARATION: 'En préparation',
  EN_AGENCE_DEPART: 'En agence de départ',
  EN_TRANSIT: 'En transit',
  ARRIVEE_INTERMEDIAIRE: 'Arrivée intermédiaire',
  EN_AGENCE_ARRIVEE: 'En agence d\'arrivée',
  EN_LIVRAISON: 'En livraison',
  LIVRE: 'Livré',
  ANNULE: 'Annulé'
};

export interface TrackingResponse {
  found: boolean;
  trackingNumber: string;
  recipientFullName: string;
  shippingCity: string;
  deliveryCity: string;
  country: string;
  shippingDate: string;
  currentStatus: string;
  currentLocation: string;
  status: ShipmentStatus;
  statusHistory: ShipmentStatusHistory[];
  lastUpdated: string;
  message: string;
}
