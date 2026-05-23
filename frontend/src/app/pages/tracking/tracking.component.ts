import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShipmentService } from '../../services/shipment.service';
import { TrackingResponse, SHIPMENT_STATUS_LABELS } from '../../models/shipment.model';

@Component({
  selector: 'app-tracking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="tracking-page">
      <div class="tracking-hero">
        <div class="container">
          <h1>Suivi de votre colis</h1>
          <p>Entrez votre numéro de suivi pour connaître l'état de votre envoi en temps réel</p>
        </div>
      </div>

      <div class="container">
        <div class="tracking-form">
          <div class="search-box">
            <i class="fas fa-search search-icon"></i>
            <input 
              type="text" 
              [(ngModel)]="trackingNumber" 
              placeholder="Entrez votre numéro de suivi (ex: MT1234567890)"
              (keyup.enter)="track()"
            />
            <button class="btn btn-primary" (click)="track()" [disabled]="loading">
              <span *ngIf="!loading">Suivre</span>
              <span *ngIf="loading" class="spinner"></span>
            </button>
          </div>
        </div>

        <!-- Error Message -->
        <div *ngIf="error" class="error-message animate-fadeIn">
          <i class="fas fa-exclamation-circle"></i>
          <span>{{ error }}</span>
        </div>

        <!-- Tracking Result -->
        <div *ngIf="result as r" class="tracking-result animate-fadeIn">
  <ng-container *ngIf="r.found">
          <div class="result-header">
            <div class="tracking-badge">
              <i class="fas fa-box"></i>
              <div>
                <span class="label">Numéro de suivi</span>
                <span class="value">{{ r.trackingNumber }}</span>
              </div>
            </div>
            <div class="status-badge" [class]="getStatusClass(r.status)">
              {{ getStatusLabel(r.status) }}
            </div>
          </div>

          <div class="result-body">
            <div class="info-grid">
              <div class="info-card">
                <i class="fas fa-user"></i>
                <div>
                  <span class="label">Destinataire</span>
                  <span class="value">{{ r.recipientFullName }}</span>
                </div>
              </div>
              <div class="info-card">
                <i class="fas fa-map-marker-alt origin"></i>
                <div>
                  <span class="label">Ville d'expédition</span>
                  <span class="value">{{ r.shippingCity }}</span>
                </div>
              </div>
              <div class="info-card">
                <i class="fas fa-map-marker-alt destination"></i>
                <div>
                  <span class="label">Ville de livraison</span>
                  <span class="value">{{ r.deliveryCity }}</span>
                </div>
              </div>
              <div class="info-card">
                <i class="fas fa-calendar"></i>
                <div>
                  <span class="label">Date d'expédition</span>
                  <span class="value">{{ r.shippingDate | date:'dd/MM/yyyy' }}</span>
                </div>
              </div>
            </div>

            <!-- Progress Timeline -->
            <div class="timeline" *ngIf="r.statusHistory?.length">
              <h3>Historique du colis</h3>
              <div class="timeline-list">
                <div class="timeline-item" 
                     *ngFor="let history of result.statusHistory; let i = index"
                     [class.active]="i === 0">
                  <div class="timeline-dot"></div>
                  <div class="timeline-content">
                    <div class="timeline-header">
                      <span class="timeline-status">{{ history.status }}</span>
                      <span class="timeline-date">{{ history.timestamp | date:'dd/MM/yyyy HH:mm' }}</span>
                    </div>
                    <span class="timeline-location">
                      <i class="fas fa-map-marker-alt"></i> {{ history.location }}
                    </span>
                    <p class="timeline-desc">{{ history.description }}</p>
                 </div>

              </div>

            </div>

          </div>

        </div>

      </ng-container>

    </div>

  </div>

</section>
  `,
  styles: [`
    .tracking-page {
      min-height: 100vh;
      padding-top: 80px;
      background: var(--gray-100);
    }

    .tracking-hero {
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
      padding: 4rem 0 6rem;
      text-align: center;
      color: white;
      margin-bottom: -3rem;
    }

    .tracking-hero h1 {
      font-size: 2.5rem;
      color: white;
      margin-bottom: 0.75rem;
    }

    .tracking-hero p {
      font-size: 1.125rem;
      color: rgba(255, 255, 255, 0.85);
    }

    .tracking-form {
      max-width: 700px;
      margin: 0 auto;
      position: relative;
      z-index: 10;
    }

    .search-box {
      display: flex;
      background: white;
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow-lg);
      overflow: hidden;
      padding: 0.5rem;
      gap: 0.5rem;
    }

    .search-icon {
      display: flex;
      align-items: center;
      padding: 0 1rem;
      color: var(--gray-400);
      font-size: 1.25rem;
    }

    .search-box input {
      flex: 1;
      border: none;
      padding: 0.875rem 0;
      font-size: 1rem;
      font-family: var(--font-primary);
      outline: none;
      color: var(--gray-800);
    }

    .search-box input::placeholder {
      color: var(--gray-400);
    }

    .search-box button {
      padding: 0.875rem 2rem;
      border-radius: var(--radius-lg);
      white-space: nowrap;
    }

    .spinner {
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 2px solid white;
      border-top-color: transparent;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .error-message {
      max-width: 700px;
      margin: 1.5rem auto 0;
      padding: 1rem 1.5rem;
      background: #fee2e2;
      border: 1px solid #fecaca;
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: #dc2626;
    }

    .tracking-result {
      max-width: 900px;
      margin: 2rem auto 4rem;
      background: white;
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow-lg);
      overflow: hidden;
    }

    .result-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.5rem 2rem;
      border-bottom: 1px solid var(--gray-200);
      flex-wrap: wrap;
      gap: 1rem;
    }

    .tracking-badge {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .tracking-badge > i {
      width: 48px;
      height: 48px;
      background: var(--gray-100);
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--primary);
      font-size: 1.25rem;
    }

    .tracking-badge .label {
      display: block;
      font-size: 0.8125rem;
      color: var(--gray-500);
    }

    .tracking-badge .value {
      display: block;
      font-weight: 700;
      color: var(--gray-900);
      font-size: 1.125rem;
    }

    .status-badge {
      padding: 0.5rem 1.25rem;
      border-radius: 9999px;
      font-size: 0.875rem;
      font-weight: 600;
    }

    .status-en_preparation { background: #fef3c7; color: #92400e; }
    .status-en_agence_depart { background: #dbeafe; color: #1e40af; }
    .status-en_transit { background: #dbeafe; color: #1e40af; }
    .status-arrivee_intermediaire { background: #ede9fe; color: #5b21b6; }
    .status-en_agence_arrivee { background: #d1fae5; color: #065f46; }
    .status-en_livraison { background: #d1fae5; color: #065f46; }
    .status-livre { background: #d1fae5; color: #065f46; }
    .status-annule { background: #fee2e2; color: #991b1b; }

    .result-body {
      padding: 2rem;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .info-card {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem;
      background: var(--gray-100);
      border-radius: var(--radius-lg);
    }

    .info-card > i {
      width: 40px;
      height: 40px;
      background: white;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--primary);
      font-size: 1rem;
      flex-shrink: 0;
    }

    .info-card .origin { color: #2563eb; }
    .info-card .destination { color: #059669; }

    .info-card .label {
      display: block;
      font-size: 0.75rem;
      color: var(--gray-500);
    }

    .info-card .value {
      display: block;
      font-weight: 600;
      color: var(--gray-800);
      font-size: 0.9375rem;
    }

    .timeline h3 {
      font-size: 1.25rem;
      margin-bottom: 1.5rem;
    }

    .timeline-list {
      position: relative;
      padding-left: 1.5rem;
    }

    .timeline-list::before {
      content: '';
      position: absolute;
      left: 6px;
      top: 0;
      bottom: 0;
      width: 2px;
      background: var(--gray-200);
    }

    .timeline-item {
      position: relative;
      padding-bottom: 1.5rem;
    }

    .timeline-dot {
      position: absolute;
      left: -1.5rem;
      top: 0.25rem;
      width: 14px;
      height: 14px;
      background: var(--gray-300);
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 0 0 2px var(--gray-300);
    }

    .timeline-item.active .timeline-dot {
      background: var(--secondary);
      box-shadow: 0 0 0 2px var(--secondary);
    }

    .timeline-content {
      background: var(--gray-100);
      padding: 1rem 1.25rem;
      border-radius: var(--radius-lg);
    }

    .timeline-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .timeline-status {
      font-weight: 600;
      color: var(--gray-800);
    }

    .timeline-date {
      font-size: 0.8125rem;
      color: var(--gray-500);
    }

    .timeline-location {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: var(--primary);
      margin-bottom: 0.25rem;
    }

    .timeline-desc {
      font-size: 0.875rem;
      color: var(--gray-500);
      margin: 0;
    }

    @media (max-width: 768px) {
      .info-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .result-header {
        flex-direction: column;
        align-items: flex-start;
      }

      .search-box {
        flex-direction: column;
      }

      .search-box button {
        width: 100%;
      }
    }
  `]
})
export class TrackingComponent {
  trackingNumber = '';
  loading = false;
  error: string | null = null;
  result: TrackingResponse | null = null;

  constructor(private shipmentService: ShipmentService) {}

  track() {
    if (!this.trackingNumber.trim()) {
      this.error = 'Veuillez entrer un numéro de suivi';
      return;
    }

    this.loading = true;
    this.error = null;
    this.result = null;

    this.shipmentService.trackShipment(this.trackingNumber.trim()).subscribe({
      next: (response) => {
        this.loading = false;
        this.result = response;
        if (!response.found) {
          this.error = response.message;
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Une erreur est survenue. Veuillez réessayer.';
        console.error(err);
      }
    });
  }

  getStatusLabel(status: string): string {
    return SHIPMENT_STATUS_LABELS[status as keyof typeof SHIPMENT_STATUS_LABELS] || status;
  }

  getStatusClass(status: string): string {
    return 'status-badge status-' + status.toLowerCase();
  }
}
