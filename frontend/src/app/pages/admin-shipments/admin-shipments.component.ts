import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ShipmentService } from '../../services/shipment.service';
import { Shipment, ShipmentRequestDto, StatusUpdateRequest, SHIPMENT_STATUS_LABELS } from '../../models/shipment.model';

type ViewMode = 'list' | 'create' | 'edit' | 'status';

@Component({
  selector: 'app-admin-shipments',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FormsModule],
  template: `
    <div class="admin-layout">
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
          <h1>{{ getPageTitle() }}</h1>
          <button *ngIf="viewMode === 'list'" class="btn btn-primary" (click)="setView('create')">
            <i class="fas fa-plus"></i> Nouvelle expédition
          </button>
          <button *ngIf="viewMode !== 'list'" class="btn btn-outline" (click)="setView('list')">
            <i class="fas fa-arrow-left"></i> Retour
          </button>
        </header>

        <div class="dashboard-content">

          <!-- ===================== -->
          <!-- LIST VIEW             -->
          <!-- ===================== -->
          <div *ngIf="viewMode === 'list'" class="animate-fadeIn">
            <div class="filters">
              <div class="search-box">
                <i class="fas fa-search"></i>
                <input type="text" [(ngModel)]="searchTerm" (input)="filterShipments()" placeholder="Rechercher..." />
              </div>
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
                    <th>Expédition</th>
                    <th>Livraison</th>
                    <th>Statut</th>
                    <th>Localisation</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let s of filteredShipments">
                    <td><span class="tracking-badge">{{ s.trackingNumber }}</span></td>
                    <td>{{ s.senderFirstName }} {{ s.senderLastName }}</td>
                    <td>{{ s.recipientFullName }}</td>
                    <td>{{ s.phone || '—' }}</td>
                    <td>{{ s.packageType }} / {{ s.weight }} kg</td>
                    <td>{{ s.shippingCity }}</td>
                    <td>{{ s.deliveryCity }}</td>
                    <td><span [class]="getStatusClass(s.status)">{{ getStatusLabel(s.status) }}</span></td>
                    <td>{{ s.currentLocation }}</td>
                    <td class="actions">
                      <button class="btn-icon btn-info" (click)="editShipment(s)" title="Modifier">
                        <i class="fas fa-edit"></i>
                      </button>
                      <button class="btn-icon btn-warning" (click)="updateStatus(s)" title="Mettre à jour le statut">
                        <i class="fas fa-sync-alt"></i>
                      </button>
                      <button class="btn-icon btn-danger" (click)="deleteShipment(s.id)" title="Supprimer">
                        <i class="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                  <tr *ngIf="filteredShipments.length === 0">
                    <td colspan="10" class="empty-state">Aucune expédition trouvée</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- ===================== -->
          <!-- CREATE / EDIT FORM    -->
          <!-- ===================== -->
          <div *ngIf="viewMode === 'create' || viewMode === 'edit'" class="form-container animate-fadeIn">
            <form [formGroup]="shipmentForm" (ngSubmit)="saveShipment()">

              <!-- N° Colis -->
<div class="form-row">
  <div class="form-group">
    <label class="form-label">N° Colis <span class="optional">(auto-généré si vide)</span></label>
    <input
      type="text"
      class="form-control"
      formControlName="trackingNumber"
      placeholder="Laisser vide pour auto-générer"
    />
  </div>
</div>

              <!-- Expéditeur -->
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Prénom Expéditeur *</label>
                  <input type="text" class="form-control" formControlName="senderFirstName" placeholder="Prénom" />
                </div>
                <div class="form-group">
                  <label class="form-label">Nom Expéditeur *</label>
                  <input type="text" class="form-control" formControlName="senderLastName" placeholder="Nom" />
                </div>
              </div>

              <!-- Destinataire -->
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Prénom Destinataire *</label>
                  <input type="text" class="form-control" formControlName="recipientFirstName" placeholder="Prénom" />
                </div>
                <div class="form-group">
                  <label class="form-label">Nom Destinataire *</label>
                  <input type="text" class="form-control" formControlName="recipientLastName" placeholder="Nom" />
                </div>
              </div>
              
              <div class="form-row">
              <div class="form-group">
                  <label class="form-label">Téléphone Destinataire</label>
                  <input type="tel" class="form-control" formControlName="phone" placeholder="Ex: 0612345678" />
              </div>
              </div>

              <!-- Type + Poids -->
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Type de Colis *</label>
                  <select class="form-control" formControlName="packageType">
                    <option value="">-- Choisir --</option>
                    <option value="Documents">Documents</option>
                    <option value="Fragile">Fragile</option>
                    <option value="Electroménager">Electroménager</option>
                    <option value="Vêtements">Vêtements</option>
                    <option value="Alimentaire">Alimentaire</option>
                    <option value="Colis Standard">Colis Standard</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Poids (Kg) *</label>
                  <input type="number" class="form-control" formControlName="weight" placeholder="Ex: 12" min="1" />
                </div>
              </div>

              <!-- Villes -->
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Ville d'expédition *</label>
                  <input type="text" class="form-control" formControlName="shippingCity" placeholder="Casablanca" />
                </div>
                <div class="form-group">
                  <label class="form-label">Ville de livraison *</label>
                  <input type="text" class="form-control" formControlName="deliveryCity" placeholder="Oujda" />
                </div>
              </div>

              <!-- Pays + Date -->
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Pays *</label>
                  <input type="text" class="form-control" formControlName="country" placeholder="Maroc" />
                </div>
                <div class="form-group">
                  <label class="form-label">Date d'expédition *</label>
                  <input type="date" class="form-control" formControlName="shippingDate" />
                </div>
              </div>
              
              <div class="form-actions">
                <button type="button" class="btn btn-outline" (click)="setView('list')">Annuler</button>
                <button type="submit" class="btn btn-primary" [disabled]="saving">
                  <span *ngIf="!saving">{{ viewMode === 'create' ? 'Créer' : 'Enregistrer' }}</span>
                  <span *ngIf="saving" class="spinner-small"></span>
                </button>
              </div>

            </form>
          </div>
          
          <!-- ===================== -->
          <!-- STATUS FORM           -->
          <!-- ===================== -->
          <div *ngIf="viewMode === 'status'" class="form-container animate-fadeIn">

            <div class="status-header" *ngIf="selectedShipment">
              <p><strong>Colis :</strong> {{ selectedShipment.trackingNumber }}</p>
              <p><strong>Destinataire :</strong> {{ selectedShipment.recipientFullName }}</p>
              <p><strong>Statut actuel :</strong> {{ getStatusLabel(selectedShipment.status) }}</p>
            </div>

            <form [formGroup]="statusForm" (ngSubmit)="saveStatus()">

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Nouveau Statut *</label>
                  <select class="form-control" formControlName="status">
                    <option value="">-- Choisir --</option>
                    <option *ngFor="let opt of statusOptions" [value]="opt.value">{{ opt.label }}</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Localisation actuelle *</label>
                  <input type="text" class="form-control" formControlName="location" placeholder="Ex: Casablanca" />
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Description</label>
                <input type="text" class="form-control" formControlName="description" placeholder="Ex: Colis en cours de transit..." />
              </div>

              <div class="form-actions">
                <button type="button" class="btn btn-outline" (click)="setView('list')">Annuler</button>
                <button type="submit" class="btn btn-primary" [disabled]="saving">
                  <span *ngIf="!saving">Mettre à jour</span>
                  <span *ngIf="saving" class="spinner-small"></span>
                </button>
              </div>

            </form>
          </div>

        </div>
      </main>
    </div>
  `,
  styles: [`
    .admin-layout { display: flex; min-height: 100vh; }

    .sidebar {
      width: 260px; background: var(--primary-dark); color: white;
      display: flex; flex-direction: column; position: fixed; height: 100vh; left: 0; top: 0;
    }
    .sidebar-brand {
      display: flex; align-items: center; gap: 0.75rem; padding: 1.5rem;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    .sidebar-brand .logo-icon {
      width: 40px; height: 40px; background: var(--secondary); border-radius: 10px;
      display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1rem;
    }
    .sidebar-brand span { font-family: var(--font-heading); font-weight: 700; font-size: 1.125rem; }
    .sidebar-nav { flex: 1; padding: 1rem 0.75rem; display: flex; flex-direction: column; gap: 0.25rem; }
    .nav-item {
      display: flex; align-items: center; gap: 0.75rem; padding: 0.875rem 1rem;
      border-radius: var(--radius-lg); color: rgba(255,255,255,0.7); font-size: 0.9375rem;
      font-weight: 500; transition: all 0.2s ease; text-decoration: none;
    }
    .nav-item:hover { background: rgba(255,255,255,0.1); color: white; }
    .nav-item.active { background: var(--secondary); color: white; }
    .nav-item i { width: 20px; text-align: center; }
    .sidebar-footer { padding: 0.75rem; border-top: 1px solid rgba(255,255,255,0.1); }

    .admin-main { flex: 1; margin-left: 260px; background: var(--gray-100); min-height: 100vh; }
    .admin-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 1.25rem 2rem; background: white; border-bottom: 1px solid var(--gray-200);
    }
    .admin-header h1 { font-size: 1.5rem; margin: 0; }
    .dashboard-content { padding: 2rem; }

    .filters { margin-bottom: 1.5rem; }
    .search-box {
      display: flex; align-items: center; gap: 0.75rem; max-width: 400px;
      background: white; border: 2px solid var(--gray-200); border-radius: var(--radius-lg); padding: 0.5rem 1rem;
    }
    .search-box input { flex: 1; border: none; outline: none; font-size: 0.9375rem; color: var(--gray-700); }
    .search-box i { color: var(--gray-400); }

    .data-table { width: 100%; border-collapse: collapse; background: white; border-radius: var(--radius-xl); overflow: hidden; }
    .data-table th {
      text-align: left; padding: 0.875rem 1rem; font-size: 0.8125rem;
      font-weight: 600; color: var(--gray-500); background: var(--gray-100);
    }
    .data-table td { padding: 0.875rem 1rem; font-size: 0.9375rem; color: var(--gray-700); border-bottom: 1px solid var(--gray-100); }

    .tracking-badge {
      display: inline-block; padding: 0.375rem 0.75rem; background: var(--gray-100);
      border-radius: var(--radius-md); font-size: 0.8125rem; font-weight: 600; color: var(--primary); font-family: monospace;
    }
    
    .optional {
  font-weight: 400;
  color: var(--gray-400);
  font-size: 0.8rem;
}
  
    .actions { display: flex; gap: 0.5rem; }
    .btn-icon { width: 34px; height: 34px; border-radius: var(--radius-md); border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 0.875rem; transition: all 0.2s ease; }
    .btn-info { background: #dbeafe; color: #2563eb; }
    .btn-info:hover { background: #2563eb; color: white; }
    .btn-warning { background: #fef3c7; color: #d97706; }
    .btn-warning:hover { background: #d97706; color: white; }
    .btn-danger { background: #fee2e2; color: #dc2626; }
    .btn-danger:hover { background: #dc2626; color: white; }

    .form-container { max-width: 700px; background: white; border-radius: var(--radius-xl); padding: 2rem; box-shadow: var(--shadow-sm); }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .form-group { margin-bottom: 1.25rem; }
    .form-label { display: block; font-size: 0.875rem; font-weight: 600; color: var(--gray-700); margin-bottom: 0.5rem; }
    .form-control { width: 100%; padding: 0.75rem 1rem; font-size: 0.9375rem; border: 2px solid var(--gray-200); border-radius: var(--radius-lg); transition: all 0.2s ease; outline: none; box-sizing: border-box; }
    .form-control:focus { border-color: var(--primary-light); box-shadow: 0 0 0 3px rgba(42,82,152,0.1); }

    .status-header { background: var(--gray-100); padding: 1rem 1.25rem; border-radius: var(--radius-lg); margin-bottom: 1.5rem; }
    .status-header p { margin: 0 0 0.25rem; font-size: 0.9375rem; color: var(--gray-600); }

    .form-actions { display: flex; gap: 1rem; margin-top: 1.5rem; }
    .spinner-small { display: inline-block; width: 16px; height: 16px; border: 2px solid white; border-top-color: transparent; border-radius: 50%; animation: spin 0.8s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }

    .empty-state { text-align: center; color: var(--gray-400); padding: 3rem; }

    @media (max-width: 768px) {
      .form-row { grid-template-columns: 1fr; }
      .sidebar { display: none; }
      .admin-main { margin-left: 0; }
    }
  `]
})
export class AdminShipmentsComponent implements OnInit {
  viewMode: ViewMode = 'list';
  shipments: Shipment[] = [];
  filteredShipments: Shipment[] = [];
  searchTerm = '';
  shipmentForm: FormGroup;
  statusForm: FormGroup;
  selectedShipment: Shipment | null = null;
  saving = false;

  statusOptions = Object.entries(SHIPMENT_STATUS_LABELS).map(([value, label]) => ({ value, label }));

  constructor(private fb: FormBuilder, private shipmentService: ShipmentService) {
    this.shipmentForm = this.fb.group({
      // trackingNumber:     ['', Validators.required],
      trackingNumber:     [''],
      senderFirstName:    ['', Validators.required],
      senderLastName:     ['', Validators.required],
      recipientFirstName: ['', Validators.required],
      recipientLastName:  ['', Validators.required],
      packageType:        ['', Validators.required],
      weight:             ['', Validators.required],
      shippingCity:       ['', Validators.required],
      deliveryCity:       ['', Validators.required],
      country:            ['', Validators.required],
      phone:              [''],
      shippingDate:       ['', Validators.required]
    });

    this.statusForm = this.fb.group({
      status:      ['', Validators.required],
      location:    ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit() {
    this.loadShipments();
  }

  loadShipments() {
    this.shipmentService.getAllShipments().subscribe({
      next: (data) => { this.shipments = data; this.filteredShipments = data; },
      error: (err) => console.error(err)
    });
  }

  filterShipments() {
    if (!this.searchTerm) { this.filteredShipments = this.shipments; return; }
    const term = this.searchTerm.toLowerCase();
    this.filteredShipments = this.shipments.filter(s =>
      s.trackingNumber.toLowerCase().includes(term) ||
      s.recipientFullName.toLowerCase().includes(term) ||
      s.shippingCity.toLowerCase().includes(term) ||
      s.deliveryCity.toLowerCase().includes(term)
    );
  }

  setView(mode: ViewMode) {
    this.viewMode = mode;
    if (mode === 'create') this.shipmentForm.reset();
  }

  getPageTitle(): string {
    switch (this.viewMode) {
      case 'create': return 'Nouvelle expédition';
      case 'edit':   return 'Modifier l\'expédition';
      case 'status': return 'Mise à jour du statut';
      default:       return 'Gestion des expéditions';
    }
  }

  editShipment(shipment: Shipment) {
    this.selectedShipment = shipment;
    this.shipmentForm.patchValue({
      trackingNumber:     shipment.trackingNumber,
      senderFirstName:    shipment.senderFirstName,
      senderLastName:     shipment.senderLastName,
      recipientFirstName: shipment.recipientFirstName,
      recipientLastName:  shipment.recipientLastName,
      packageType:        shipment.packageType,
      weight:             shipment.weight,
      shippingCity:       shipment.shippingCity,
      deliveryCity:       shipment.deliveryCity,
      country:            shipment.country,
      phone: shipment.phone,
      shippingDate:       shipment.shippingDate
    });
    this.setView('edit');
  }

  updateStatus(shipment: Shipment) {
    this.selectedShipment = shipment;
    this.statusForm.reset();
    this.setView('status');
  }

  saveShipment() {
    if (this.shipmentForm.invalid) return;
    this.saving = true;
    const data: ShipmentRequestDto = this.shipmentForm.value;

    if (this.viewMode === 'edit' && this.selectedShipment) {
      this.shipmentService.updateShipment(this.selectedShipment.id, data).subscribe({
        next: () => { this.saving = false; this.loadShipments(); this.setView('list'); },
        error: (err) => { this.saving = false; console.error(err); }
      });
    } else {
      this.shipmentService.createShipment(data).subscribe({
        next: () => { this.saving = false; this.loadShipments(); this.setView('list'); },
        error: (err) => { this.saving = false; console.error(err); }
      });
    }
  }

  saveStatus() {
    if (this.statusForm.invalid || !this.selectedShipment) return;
    this.saving = true;
    const data: StatusUpdateRequest = this.statusForm.value;

    this.shipmentService.updateStatus(this.selectedShipment.id, data).subscribe({
      next: () => { this.saving = false; this.loadShipments(); this.setView('list'); },
      error: (err) => { this.saving = false; console.error(err); }
    });
  }

  deleteShipment(id: number) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette expédition ?')) return;
    this.shipmentService.deleteShipment(id).subscribe({
      next: () => this.loadShipments(),
      error: (err) => console.error(err)
    });
  }

  getStatusLabel(status: string): string {
    return SHIPMENT_STATUS_LABELS[status as keyof typeof SHIPMENT_STATUS_LABELS] || status;
  }

  getStatusClass(status: string): string {
    const classes: Record<string, string> = {
      EN_PREPARATION:        'badge bg-warning text-dark',
      EN_AGENCE_DEPART:      'badge bg-info text-dark',
      EN_TRANSIT:            'badge bg-primary',
      ARRIVEE_INTERMEDIAIRE: 'badge bg-info text-dark',
      EN_AGENCE_ARRIVEE:     'badge bg-info text-dark',
      EN_LIVRAISON:          'badge bg-primary',
      LIVRE:                 'badge bg-success',
      ANNULE:                'badge bg-danger'
    };
    return classes[status] || 'badge bg-secondary';
  }
}