import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactRequest, ContactRequestDto } from '../models/contact-request.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = `${environment.apiUrl}/contact`;

  constructor(private http: HttpClient) {}

  sendContactRequest(contact: ContactRequestDto): Observable<{ message: string; success: boolean }> {
    return this.http.post<{ message: string; success: boolean }>(`${this.apiUrl}/request`, contact);
  }

  getAllContactRequests(): Observable<ContactRequest[]> {
    return this.http.get<ContactRequest[]>(`${this.apiUrl}/requests`);
  }

  getNewContactRequests(): Observable<ContactRequest[]> {
    return this.http.get<ContactRequest[]>(`${this.apiUrl}/requests/new`);
  }

  updateContactStatus(id: number, status: string): Observable<ContactRequest> {
    return this.http.patch<ContactRequest>(`${this.apiUrl}/requests/${id}/status?status=${status}`, {});
  }

  deleteContactRequest(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/requests/${id}`);
  }

  countNewRequests(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/requests/count/new`);
  }
}
