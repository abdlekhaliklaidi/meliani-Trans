import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ContactRequest } from '../models/contact-request.model';
import { ShipmentClientRequest } from '../models/shipment-request.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {}

  getDashboardStats(): Observable<{
    totalShipments: number;
    deliveredShipments: number;
    inTransitShipments: number;
    newContactRequests: number;
    pendingShipmentRequests: number;
  }> {
    return this.http.get<any>(`${this.apiUrl}/dashboard`);
  }

  getAllShipmentRequests(): Observable<ShipmentClientRequest[]> {
    return this.http.get<ShipmentClientRequest[]>(`${this.apiUrl}/shipment-requests`);
  }

  getAllContactRequests(): Observable<ContactRequest[]> {
    return this.http.get<ContactRequest[]>(`${this.apiUrl}/contact-requests`);
  }
}
