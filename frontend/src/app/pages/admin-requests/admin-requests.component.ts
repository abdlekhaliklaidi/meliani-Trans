import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ShipmentRequestService } from '../../services/shipment-request.service';
import { ShipmentClientRequest, REQUEST_STATUS_LABELS, REQUEST_STATUS_CLASSES } from '../../models/shipment-request.model';

@Component({
  selector: 'app-admin-requests',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="admin-layout">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-brand">
          <div class="logo-icon">MT</div>
          <span>Transport Meliani</span>
        </div>
        <nav class="sidebar-nav">
          <a routerLink="/admin/dashboard" routerLinkActive="active" class="nav-item">
            <i class="fas fa-chart-line"></i> Tableau de bord
          </a>
          <a routerLink="/admin/expeditions" routerLinkActive="active" class="nav-item">
            <i class="fas fa-box"></i> Expéditions
          </a>
          <a routerLink="/admin/demandes" routerLinkActive="active" class="nav-item">
            <i class="fas fa-clipboard-list"></i> Demandes d'envoi
          </a>
          <a routerLink="/admin/contacts" routerLinkActive="active" class="nav-item">
            <i class="fas fa-envelope"></i> Messages
          </a>
        </nav>
        <div class="sidebar-footer">
          <a routerLink="/accueil" class="nav-item">
            <i class="fas fa-arrow-left"></i> Retour au site
          </a>
        </div>
      </aside>

      <main class="admin-main">
        <header class="admin-header">
          <h1>Demandes d'envoi</h1>
        </header>

        <div class="dashboard-content">
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Contact</th>
                  <th>Trajet</th>
                  <th>Date</th>
                  <th>Pays</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let r of requests">
                  <td>{{ r.firstName }} {{ r.lastName }}</td>
                  <td>
                    <span *ngIf="r.phone"><i class="fas fa-phone text-muted"></i> {{ r.phone }}</span>
                    <span *ngIf="r.email"><br><i class="fas fa-envelope text-muted"></i> {{ r.email }}</span>
                  </td>
                  <td>{{ r.shippingCity }} → {{ r.deliveryCity }}</td>
                  <td>{{ r.shippingDate | date:'dd/MM/yyyy' }}</td>
                  <td>{{ r.country }}</td>
                  <td>
                    <span [class]="getStatusClass(r.requestStatus)">
                      {{ getStatusLabel(r.requestStatus) }}
                    </span>
                  </td>
                  <td class="actions">
                    <select class="status-select" (change)="updateStatus(r.id, $event)">
                      <option value="" disabled selected>Changer statut</option>
                      <option value="EN_ATTENTE">En attente</option>
                      <option value="EN_TRAITEMENT">En traitement</option>
                      <option value="CONFIRME">Confirmé</option>
                      <option value="REFUSE">Refusé</option>
                    </select>
                    <button class="btn-icon btn-danger" (click)="deleteRequest(r.id)" title="Supprimer">
                      <i class="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
                <tr *ngIf="requests.length === 0">
                  <td colspan="7" class="empty-state">Aucune demande trouvée</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .admin-layout {
      display: flex;
      min-height: 100vh;
    }

    .sidebar {
      width: 260px;
      background: var(--primary-dark);
      color: white;
      display: flex;
      flex-direction: column;
      position: fixed;
      height: 100vh;
      left: 0;
      top: 0;
    }

    .sidebar-brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .sidebar-brand .logo-icon {
      width: 40px;
      height: 40px;
      background: var(--secondary);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 1rem;
    }

    .sidebar-brand span {
      font-family: var(--font-heading);
      font-weight: 700;
      font-size: 1.125rem;
    }

    .sidebar-nav {
      flex: 1;
      padding: 1rem 0.75rem;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.875rem 1rem;
      border-radius: var(--radius-lg);
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.9375rem;
      font-weight: 500;
      transition: all 0.2s ease;
      text-decoration: none;
    }

    .nav-item:hover {
      background: rgba(255, 255, 255, 0.1);
      color: white;
    }

    .nav-item.active {
      background: var(--secondary);
      color: white;
    }

    .nav-item i {
      width: 20px;
      text-align: center;
    }

    .sidebar-footer {
      padding: 0.75rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .admin-main {
      flex: 1;
      margin-left: 260px;
      background: var(--gray-100);
      min-height: 100vh;
    }

    .admin-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.25rem 2rem;
      background: white;
      border-bottom: 1px solid var(--gray-200);
    }

    .admin-header h1 {
      font-size: 1.5rem;
      margin: 0;
    }

    .dashboard-content {
      padding: 2rem;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
      background: white;
      border-radius: var(--radius-xl);
      overflow: hidden;
    }

    .data-table th {
      text-align: left;
      padding: 0.875rem 1rem;
      font-size: 0.8125rem;
      font-weight: 600;
      color: var(--gray-500);
      background: var(--gray-100);
    }

    .data-table td {
      padding: 0.875rem 1rem;
      font-size: 0.9375rem;
      color: var(--gray-700);
      border-bottom: 1px solid var(--gray-100);
    }

    .actions {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }

    .status-select {
      padding: 0.375rem 0.5rem;
      border: 1px solid var(--gray-300);
      border-radius: var(--radius-md);
      font-size: 0.8125rem;
      color: var(--gray-700);
      outline: none;
    }

    .btn-icon {
      width: 34px;
      height: 34px;
      border-radius: var(--radius-md);
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 0.875rem;
      transition: all 0.2s ease;
    }

    .btn-danger { background: #fee2e2; color: #dc2626; }
    .btn-danger:hover { background: #dc2626; color: white; }

    .empty-state {
      text-align: center;
      color: var(--gray-400);
      padding: 3rem;
    }

    @media (max-width: 768px) {
      .sidebar { display: none; }
      .admin-main { margin-left: 0; }
    }
  `]
})
export class AdminRequestsComponent implements OnInit {
  requests: ShipmentClientRequest[] = [];

  constructor(private shipmentRequestService: ShipmentRequestService) {}

  ngOnInit() {
    this.loadRequests();
  }

  loadRequests() {
    this.shipmentRequestService.getAllRequests().subscribe({
      next: (data) => {
        this.requests = data;
      },
      error: (err) => console.error(err)
    });
  }

  updateStatus(id: number, event: Event) {
    const select = event.target as HTMLSelectElement;
    const status = select.value;
    if (!status) return;

    this.shipmentRequestService.updateRequestStatus(id, status).subscribe({
      next: () => {
        this.loadRequests();
        select.value = '';
      },
      error: (err) => console.error(err)
    });
  }

  deleteRequest(id: number) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) return;

    this.shipmentRequestService.deleteRequest(id).subscribe({
      next: () => this.loadRequests(),
      error: (err) => console.error(err)
    });
  }

  getStatusLabel(status: string): string {
    return REQUEST_STATUS_LABELS[status as keyof typeof REQUEST_STATUS_LABELS] || status;
  }

  getStatusClass(status: string): string {
    return REQUEST_STATUS_CLASSES[status as keyof typeof REQUEST_STATUS_CLASSES] || 'badge bg-secondary';
  }
}
