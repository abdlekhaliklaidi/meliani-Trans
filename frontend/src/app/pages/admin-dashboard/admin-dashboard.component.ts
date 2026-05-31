import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { ShipmentService } from '../../services/shipment.service';
import { Shipment } from '../../models/shipment.model';

@Component({
  selector: 'app-admin-dashboard',
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

      <!-- Main Content -->
      <main class="admin-main">
        <header class="admin-header">
          <h1>Tableau de bord</h1>
          <div class="header-actions">
            <span class="user-badge">
              <i class="fas fa-shield-alt"></i> Admin
            </span>
          </div>
        </header>

        <div class="dashboard-content">
          <!-- Stats Cards -->
          <div class="stats-row">
            <div class="stat-card primary">
              <div class="stat-icon"><i class="fas fa-box"></i></div>
              <div class="stat-info">
                <span class="stat-value">{{ stats.totalShipments }}</span>
                <span class="stat-label">Total Expéditions</span>
              </div>
            </div>
            <div class="stat-card success">
              <div class="stat-icon"><i class="fas fa-check-circle"></i></div>
              <div class="stat-info">
                <span class="stat-value">{{ stats.deliveredShipments }}</span>
                <span class="stat-label">Livraisons</span>
              </div>
            </div>
            <div class="stat-card warning">
              <div class="stat-icon"><i class="fas fa-truck"></i></div>
              <div class="stat-info">
                <span class="stat-value">{{ stats.inTransitShipments }}</span>
                <span class="stat-label">En transit</span>
              </div>
            </div>
            <div class="stat-card info">
              <div class="stat-icon"><i class="fas fa-envelope"></i></div>
              <div class="stat-info">
                <span class="stat-value">{{ stats.newContactRequests }}</span>
                <span class="stat-label">Nouveaux messages</span>
              </div>
            </div>
            <div class="stat-card secondary">
              <div class="stat-icon"><i class="fas fa-clipboard-list"></i></div>
              <div class="stat-info">
                <span class="stat-value">{{ stats.pendingShipmentRequests }}</span>
                <span class="stat-label">Demandes en attente</span>
              </div>
            </div>
          </div>

          <!-- Recent Shipments -->
<div class="dashboard-section">
  <div class="section-header">
    <h2>Expéditions récentes</h2>
    <a routerLink="/admin/expeditions" class="btn-link">Voir tout <i class="fas fa-arrow-right"></i></a>
  </div>
  <div class="table-responsive">
    <table class="data-table">
      <thead>
        <tr>
          <th>N° Suivi</th>
          <th>Expéditeur</th>
          <th>Destinataire</th>
          <th>Téléphone</th>
          <th>Type / Poids</th>
          <th>Trajet</th>
          <th>Statut</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let s of recentShipments">
          <td><span class="tracking-badge">{{ s.trackingNumber }}</span></td>
          <td>{{ s.senderFirstName }} {{ s.senderLastName }}</td>
          <td>{{ s.recipientFullName }}</td>
          <td>{{ s.phone || '—' }}</td>
          <td>{{ s.packageType }} / {{ s.weight }} kg</td>
          <td>{{ s.shippingCity }} → {{ s.deliveryCity }}</td>
          <td><span [class]="getStatusClass(s.status)">{{ getStatusLabel(s.status) }}</span></td>
          <td>{{ s.createdAt | date:'dd/MM/yyyy' }}</td>
        </tr>
        <tr *ngIf="recentShipments.length === 0">
          <td colspan="8" class="empty-state">Aucune expédition trouvée</td>
        </tr>
      </tbody>
    </table>
  </div>
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

    .user-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: var(--gray-100);
      border-radius: var(--radius-lg);
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--gray-700);
    }

    .dashboard-content {
      padding: 2rem;
    }

    .stats-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.5rem;
      background: white;
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow-sm);
    }

    .stat-icon {
      width: 48px;
      height: 48px;
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
    }

    .stat-card.primary .stat-icon { background: #dbeafe; color: #2563eb; }
    .stat-card.success .stat-icon { background: #d1fae5; color: #059669; }
    .stat-card.warning .stat-icon { background: #fef3c7; color: #d97706; }
    .stat-card.info .stat-icon { background: #ede9fe; color: #7c3aed; }
    .stat-card.secondary .stat-icon { background: #fce7f3; color: #db2777; }

    .stat-info {
      display: flex;
      flex-direction: column;
    }

    .stat-value {
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--gray-900);
    }

    .stat-label {
      font-size: 0.875rem;
      color: var(--gray-500);
    }

    .dashboard-section {
      background: white;
      border-radius: var(--radius-xl);
      padding: 1.5rem;
      box-shadow: var(--shadow-sm);
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.25rem;
    }

    .section-header h2 {
      font-size: 1.25rem;
      margin: 0;
    }

    .btn-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--primary);
      font-size: 0.9375rem;
      font-weight: 600;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
    }

    .data-table th {
      text-align: left;
      padding: 0.75rem 1rem;
      font-size: 0.8125rem;
      font-weight: 600;
      color: var(--gray-500);
      border-bottom: 1px solid var(--gray-200);
    }

    .data-table td {
      padding: 0.875rem 1rem;
      font-size: 0.9375rem;
      color: var(--gray-700);
      border-bottom: 1px solid var(--gray-100);
    }

    .tracking-badge {
      display: inline-block;
      padding: 0.375rem 0.75rem;
      background: var(--gray-100);
      border-radius: var(--radius-md);
      font-size: 0.8125rem;
      font-weight: 600;
      color: var(--primary);
      font-family: monospace;
    }

    .status-badge {
      display: inline-block;
      padding: 0.375rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .empty-state {
      text-align: center;
      color: var(--gray-400);
      padding: 2rem;
    }

    @media (max-width: 768px) {
      .sidebar {
        width: 100%;
        position: relative;
        height: auto;
      }

      .admin-main {
        margin-left: 0;
      }

      .admin-layout {
        flex-direction: column;
      }
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  stats = {
    totalShipments: 0,
    deliveredShipments: 0,
    inTransitShipments: 0,
    newContactRequests: 0,
    pendingShipmentRequests: 0
  };
  recentShipments: Shipment[] = [];

  constructor(private adminService: AdminService, private shipmentService: ShipmentService) {}

  ngOnInit() {
    this.loadStats();
    this.loadRecentShipments();
  }

  loadStats() {
    this.adminService.getDashboardStats().subscribe({
      next: (data) => {
        this.stats = data;
      },
      error: (err) => console.error(err)
    });
  }

  loadRecentShipments() {
    this.shipmentService.getAllShipments().subscribe({
      next: (data) => {
        this.recentShipments = data.slice(0, 5);
      },
      error: (err) => console.error(err)
    });
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      EN_PREPARATION: 'En préparation',
      EN_AGENCE_DEPART: 'En agence',
      EN_TRANSIT: 'En transit',
      ARRIVEE_INTERMEDIAIRE: 'Intermédiaire',
      EN_AGENCE_ARRIVEE: 'Agence arrivée',
      EN_LIVRAISON: 'En livraison',
      LIVRE: 'Livré',
      ANNULE: 'Annulé'
    };
    return labels[status] || status;
  }

  getStatusClass(status: string): string {
    const classes: Record<string, string> = {
      EN_PREPARATION: 'status-badge bg-warning text-dark',
      EN_AGENCE_DEPART: 'status-badge bg-info text-dark',
      EN_TRANSIT: 'status-badge bg-primary',
      ARRIVEE_INTERMEDIAIRE: 'status-badge bg-info text-dark',
      EN_AGENCE_ARRIVEE: 'status-badge bg-info text-dark',
      EN_LIVRAISON: 'status-badge bg-primary',
      LIVRE: 'status-badge bg-success',
      ANNULE: 'status-badge bg-danger'
    };
    return classes[status] || 'status-badge bg-secondary';
  }
}
