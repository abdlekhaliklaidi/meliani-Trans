import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shipment, ShipmentRequestDto, StatusUpdateRequest, TrackingResponse } from '../models/shipment.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {
  private apiUrl = `${environment.apiUrl}/shipments`;

  constructor(private http: HttpClient) {}

  getAllShipments(): Observable<Shipment[]> {
    return this.http.get<Shipment[]>(this.apiUrl);
  }

  getShipmentById(id: number): Observable<Shipment> {
    return this.http.get<Shipment>(`${this.apiUrl}/${id}`);
  }

  createShipment(shipment: ShipmentRequestDto): Observable<Shipment> {
    return this.http.post<Shipment>(this.apiUrl, shipment);
  }

  updateShipment(id: number, shipment: ShipmentRequestDto): Observable<Shipment> {
    return this.http.put<Shipment>(`${this.apiUrl}/${id}`, shipment);
  }

  deleteShipment(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateStatus(id: number, statusUpdate: StatusUpdateRequest): Observable<Shipment> {
    return this.http.patch<Shipment>(`${this.apiUrl}/${id}/status`, statusUpdate);
  }

  getShipmentStats(): Observable<{ total: number; delivered: number; inTransit: number }> {
    return this.http.get<{ total: number; delivered: number; inTransit: number }>(`${this.apiUrl}/stats`);
  }

  trackShipment(trackingNumber: string): Observable<TrackingResponse> {
    return this.http.get<TrackingResponse>(`${environment.apiUrl}/tracking/${trackingNumber}`);
  }
}
