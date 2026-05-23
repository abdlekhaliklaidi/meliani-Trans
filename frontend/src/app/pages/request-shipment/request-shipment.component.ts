import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ShipmentRequestService } from '../../services/shipment-request.service';

@Component({
  selector: 'app-request-shipment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="request-page">
      <div class="request-hero">
        <div class="container">
          <h1>Demander un envoi</h1>
          <p>Remplissez le formulaire ci-dessous et recevez une estimation personnalisée pour votre envoi</p>
        </div>
      </div>

      <div class="container">
        <div class="form-container">
          <!-- Steps -->
          <div class="steps-indicator">
            <div class="step" [class.active]="currentStep >= 1" [class.complete]="currentStep > 1">
              <div class="step-circle">1</div>
              <span>Informations</span>
            </div>
            <div class="step-line"></div>
            <div class="step" [class.active]="currentStep >= 2" [class.complete]="currentStep > 2">
              <div class="step-circle">2</div>
              <span>Détails</span>
            </div>
            <div class="step-line"></div>
            <div class="step" [class.active]="currentStep >= 3" [class.complete]="currentStep > 3">
              <div class="step-circle">3</div>
              <span>Confirmation</span>
            </div>
          </div>

          <form [formGroup]="requestForm" (ngSubmit)="onSubmit()">
            <!-- Step 1: Personal Information -->
            <div *ngIf="currentStep === 1" class="form-step animate-fadeIn">
              <div class="step-header">
                <div class="step-icon"><i class="fas fa-user"></i></div>
                <div>
                  <h3>Informations du client</h3>
                  <p>Vos coordonnées pour vous recontacter</p>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Prénom *</label>
                  <input type="text" class="form-control" formControlName="firstName" placeholder="Jean" />
                  <div *ngIf="requestForm.get('firstName')?.invalid && requestForm.get('firstName')?.touched" class="error">
                    Le prénom est obligatoire
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label">Nom *</label>
                  <input type="text" class="form-control" formControlName="lastName" placeholder="Dupont" />
                  <div *ngIf="requestForm.get('lastName')?.invalid && requestForm.get('lastName')?.touched" class="error">
                    Le nom est obligatoire
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Téléphone</label>
                <input type="tel" class="form-control" formControlName="phone" placeholder="06 12 34 56 78" />
              </div>

              <div class="form-group">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" formControlName="email" placeholder="jean.dupont@email.com" />
              </div>

              <div class="form-actions">
                <button type="button" class="btn btn-primary" (click)="nextStep()" [disabled]="!isStep1Valid()">
                  Continuer <i class="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>

            <!-- Step 2: Shipment Details -->
            <div *ngIf="currentStep === 2" class="form-step animate-fadeIn">
              <div class="step-header">
                <div class="step-icon"><i class="fas fa-map-marker-alt"></i></div>
                <div>
                  <h3>Détails de l'envoi</h3>
                  <p>Informations sur votre trajet</p>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Ville d'expédition *</label>
                  <div class="input-with-icon">
                    <i class="fas fa-circle text-success" style="font-size:8px"></i>
                    <input type="text" class="form-control" formControlName="shippingCity" placeholder="Casablanca" />
                  </div>
                  <div *ngIf="requestForm.get('shippingCity')?.invalid && requestForm.get('shippingCity')?.touched" class="error">
                    La ville d'expédition est obligatoire
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label">Ville de livraison *</label>
                  <div class="input-with-icon">
                    <i class="fas fa-circle text-danger" style="font-size:8px"></i>
                    <input type="text" class="form-control" formControlName="deliveryCity" placeholder="Paris" />
                  </div>
                  <div *ngIf="requestForm.get('deliveryCity')?.invalid && requestForm.get('deliveryCity')?.touched" class="error">
                    La ville de livraison est obligatoire
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Pays *</label>
                <input type="text" class="form-control" formControlName="country" placeholder="France" />
                <div *ngIf="requestForm.get('country')?.invalid && requestForm.get('country')?.touched" class="error">
                  Le pays est obligatoire
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Date d'expédition souhaitée *</label>
                <input type="date" class="form-control" formControlName="shippingDate" />
                <div *ngIf="requestForm.get('shippingDate')?.invalid && requestForm.get('shippingDate')?.touched" class="error">
                  La date est obligatoire
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Informations complémentaires</label>
                <textarea class="form-control" formControlName="additionalInfo" rows="3" 
                  placeholder="Décrivez vos besoins spécifiques..."></textarea>
              </div>

              <div class="form-actions">
                <button type="button" class="btn btn-outline" (click)="prevStep()">
                  <i class="fas fa-arrow-left"></i> Retour
                </button>
                <button type="submit" class="btn btn-primary" [disabled]="submitting || requestForm.invalid">
                  <span *ngIf="!submitting">Soumettre la demande</span>
                  <span *ngIf="submitting" class="spinner-small"></span>
                </button>
              </div>
            </div>

            <!-- Step 3: Success -->
            <div *ngIf="currentStep === 3" class="form-step success-step animate-fadeIn">
              <div class="success-icon">
                <i class="fas fa-check-circle"></i>
              </div>
              <h3>Demande envoyée avec succès !</h3>
              <p>{{ successMessage }}</p>
              <div class="success-actions">
                <a routerLink="/accueil" class="btn btn-primary">Retour à l'accueil</a>
                <a routerLink="/suivi" class="btn btn-outline">Suivre un colis</a>
              </div>
            </div>
          </form>

          <p *ngIf="currentStep < 3" class="form-privacy">
            <i class="fas fa-shield-alt"></i> Vos informations sont confidentielles et ne seront jamais partagées.
          </p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .request-page {
      min-height: 100vh;
      padding-top: 80px;
      background: var(--gray-100);
    }

    .request-hero {
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
      padding: 4rem 0 6rem;
      text-align: center;
      color: white;
      margin-bottom: -3rem;
    }

    .request-hero h1 {
      font-size: 2.5rem;
      color: white;
      margin-bottom: 0.75rem;
    }

    .request-hero p {
      font-size: 1.125rem;
      color: rgba(255, 255, 255, 0.85);
    }

    .form-container {
      max-width: 700px;
      margin: 0 auto 4rem;
      background: white;
      border-radius: var(--radius-2xl);
      box-shadow: var(--shadow-lg);
      padding: 2.5rem;
    }

    .steps-indicator {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 2.5rem;
      gap: 0;
    }

    .step {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }

    .step-circle {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--gray-200);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      color: var(--gray-500);
      transition: all 0.3s ease;
    }

    .step.active .step-circle,
    .step.complete .step-circle {
      background: var(--primary);
      color: white;
    }

    .step.complete .step-circle {
      background: var(--success);
    }

    .step span {
      font-size: 0.8125rem;
      color: var(--gray-500);
      font-weight: 500;
    }

    .step.active span,
    .step.complete span {
      color: var(--gray-800);
      font-weight: 600;
    }

    .step-line {
      width: 60px;
      height: 2px;
      background: var(--gray-200);
      margin: 0 0.5rem;
      margin-bottom: 1.5rem;
    }

    .form-step {
      padding: 0 0.5rem;
    }

    .step-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .step-icon {
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

    .step-header h3 {
      font-size: 1.25rem;
      margin-bottom: 0.25rem;
    }

    .step-header p {
      color: var(--gray-500);
      font-size: 0.9375rem;
      margin: 0;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .form-group {
      margin-bottom: 1.25rem;
    }

    .form-label {
      display: block;
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--gray-700);
      margin-bottom: 0.5rem;
    }

    .form-control {
      width: 100%;
      padding: 0.875rem 1rem;
      font-size: 1rem;
      border: 2px solid var(--gray-200);
      border-radius: var(--radius-lg);
      transition: all 0.2s ease;
      outline: none;
    }

    .form-control:focus {
      border-color: var(--primary-light);
      box-shadow: 0 0 0 3px rgba(42, 82, 152, 0.1);
    }

    .input-with-icon {
      position: relative;
    }

    .input-with-icon i {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
    }

    .input-with-icon .form-control {
      padding-left: 2rem;
    }

    .error {
      color: var(--danger);
      font-size: 0.8125rem;
      margin-top: 0.375rem;
    }

    .form-actions {
      display: flex;
      justify-content: space-between;
      margin-top: 2rem;
      gap: 1rem;
    }

    .spinner-small {
      display: inline-block;
      width: 18px;
      height: 18px;
      border: 2px solid white;
      border-top-color: transparent;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .success-step {
      text-align: center;
      padding: 2rem 0;
    }

    .success-icon {
      width: 80px;
      height: 80px;
      background: #d1fae5;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem;
    }

    .success-icon i {
      font-size: 2.5rem;
      color: var(--success);
    }

    .success-step h3 {
      font-size: 1.5rem;
      margin-bottom: 0.75rem;
    }

    .success-step p {
      color: var(--gray-500);
      margin-bottom: 2rem;
      max-width: 400px;
      margin-left: auto;
      margin-right: auto;
    }

    .success-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }

    .form-privacy {
      text-align: center;
      margin-top: 1.5rem;
      font-size: 0.8125rem;
      color: var(--gray-500);
    }

    .form-privacy i {
      color: var(--gray-400);
      margin-right: 0.25rem;
    }

    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }

      .form-container {
        padding: 1.5rem;
        margin: 0 1rem 3rem;
      }

      .step-line {
        width: 30px;
      }
    }
  `]
})
export class RequestShipmentComponent {
  currentStep = 1;
  requestForm: FormGroup;
  submitting = false;
  successMessage = '';

  constructor(private fb: FormBuilder, private shipmentRequestService: ShipmentRequestService) {
    this.requestForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: [''],
      email: [''],
      shippingCity: ['', Validators.required],
      deliveryCity: ['', Validators.required],
      country: ['', Validators.required],
      shippingDate: ['', Validators.required],
      additionalInfo: ['']
    });
  }

  isStep1Valid(): boolean {
    return !!(this.requestForm.get('firstName')?.value && this.requestForm.get('lastName')?.value);
  }

  nextStep() {
    if (this.currentStep === 1 && this.isStep1Valid()) {
      this.currentStep = 2;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onSubmit() {
    if (this.requestForm.invalid) {
      return;
    }

    this.submitting = true;
    this.shipmentRequestService.createRequest(this.requestForm.value).subscribe({
      next: (response) => {
        this.submitting = false;
        this.successMessage = response.message;
        this.currentStep = 3;
      },
      error: (err) => {
        this.submitting = false;
        console.error(err);
      }
    });
  }
}
