import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShipmentClientRequest, ShipmentClientRequestDto } from '../models/shipment-request.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShipmentRequestService {
  private apiUrl = `${environment.apiUrl}/shipments`;

  constructor(private http: HttpClient) {}

  createRequest(request: ShipmentClientRequestDto): Observable<{ message: string; success: boolean }> {
    return this.http.post<{ message: string; success: boolean }>(`${this.apiUrl}/request`, request);
  }

  getAllRequests(): Observable<ShipmentClientRequest[]> {
    return this.http.get<ShipmentClientRequest[]>(`${this.apiUrl}/requests`);
  }

  getPendingRequests(): Observable<ShipmentClientRequest[]> {
    return this.http.get<ShipmentClientRequest[]>(`${this.apiUrl}/requests/pending`);
  }

  getRequestById(id: number): Observable<ShipmentClientRequest> {
    return this.http.get<ShipmentClientRequest>(`${this.apiUrl}/requests/${id}`);
  }

  updateRequestStatus(id: number, status: string): Observable<ShipmentClientRequest> {
    return this.http.patch<ShipmentClientRequest>(`${this.apiUrl}/requests/${id}/status?status=${status}`, {});
  }

  deleteRequest(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/requests/${id}`);
  }
}
