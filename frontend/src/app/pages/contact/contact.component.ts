import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="contact-page">
      <div class="contact-hero">
        <div class="container">
          <h1>Contactez-nous</h1>
          <p>Une question ? Besoin d'informations ? Notre équipe est là pour vous aider.</p>
        </div>
      </div>

      <div class="container">
        <div class="contact-grid">
          <!-- Contact Info -->
          <div class="contact-info">
            <h2>Informations de contact</h2>
            <p>N'hésitez pas à nous contacter par téléphone, email ou en remplissant le formulaire.</p>
            
            <div class="info-list">
              <div class="info-item">
                <div class="info-icon">
                  <i class="fas fa-phone"></i>
                </div>
                <div>
                  <span class="label">Téléphone</span>
                  <span class="value">+212 6 68 18 95 58</span>
                </div>
              </div>
              
              <div class="info-item">
                <div class="info-icon">
                  <i class="fas fa-envelope"></i>
                </div>
                <div>
                  <span class="label">Email</span>
                  <span class="value">contact&#64;melianitrans.com</span>
                </div>
              </div>
              
              <div class="info-item">
                <div class="info-icon">
                  <i class="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <span class="label">Adresse</span>
                  <span class="value">Route de Tiret, n°/21, Oujda Maroc</span>
                </div>
              </div>
              
              <div class="info-item">
                <div class="info-icon">
                  <i class="fas fa-clock"></i>
                </div>
                <div>
                  <span class="label">Horaires</span>
                  <span class="value">Lun - Sam: 9h - 18h</span>
                </div>
              </div>
            </div>

            <div class="social-section">
              <span class="label">Réseaux sociaux</span>
              <div class="social-links">
                <a href="#" class="social-link"><i class="fab fa-facebook-f"></i></a>
                <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
                <a href="#" class="social-link"><i class="fab fa-linkedin-in"></i></a>
                <a href="#" class="social-link"><i class="fab fa-whatsapp"></i></a>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="contact-form-wrapper">
            <div *ngIf="!submitted; else successTemplate">
              <h3>Envoyez-nous un message</h3>
              <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
                <div class="form-group">
                  <label class="form-label">Nom complet *</label>
                  <input type="text" class="form-control" formControlName="fullName" placeholder="Jean Dupont" />
                  <div *ngIf="contactForm.get('fullName')?.invalid && contactForm.get('fullName')?.touched" class="error">
                    Le nom complet est obligatoire
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label">Email *</label>
                  <input type="email" class="form-control" formControlName="email" placeholder="jean.dupont@email.com" />
                  <div *ngIf="contactForm.get('email')?.invalid && contactForm.get('email')?.touched" class="error">
                    Un email valide est obligatoire
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label">Téléphone *</label>
                  <input type="tel" class="form-control" formControlName="phone" placeholder="06 12 34 56 78" />
                  <div *ngIf="contactForm.get('phone')?.invalid && contactForm.get('phone')?.touched" class="error">
                    Le téléphone est obligatoire
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label">Sujet *</label>
                  <input type="text" class="form-control" formControlName="subject" placeholder="Demande d'information" />
                  <div *ngIf="contactForm.get('subject')?.invalid && contactForm.get('subject')?.touched" class="error">
                    Le sujet est obligatoire
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label">Message *</label>
                  <textarea class="form-control" formControlName="message" rows="5" 
                    placeholder="Décrivez votre demande..."></textarea>
                  <div *ngIf="contactForm.get('message')?.invalid && contactForm.get('message')?.touched" class="error">
                    Le message est obligatoire
                  </div>
                </div>

                <button type="submit" class="btn btn-primary w-100" [disabled]="submitting || contactForm.invalid">
                  <span *ngIf="!submitting">Envoyer le message</span>
                  <span *ngIf="submitting" class="spinner-small"></span>
                </button>
              </form>
            </div>

            <ng-template #successTemplate>
              <div class="success-message animate-fadeIn">
                <div class="success-icon">
                  <i class="fas fa-check-circle"></i>
                </div>
                <h3>Message envoyé !</h3>
                <p>{{ successMessage }}</p>
                <button class="btn btn-outline" (click)="resetForm()">Envoyer un autre message</button>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact-page {
      min-height: 100vh;
      padding-top: 80px;
      background: var(--gray-100);
    }

    .contact-hero {
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
      padding: 4rem 0 5rem;
      text-align: center;
      color: white;
      margin-bottom: -2rem;
    }

    .contact-hero h1 {
      font-size: 2.5rem;
      color: white;
      margin-bottom: 0.75rem;
    }

    .contact-hero p {
      font-size: 1.125rem;
      color: rgba(255, 255, 255, 0.85);
    }

    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1.5fr;
      gap: 2rem;
      margin-bottom: 4rem;
    }

    .contact-info {
      background: white;
      border-radius: var(--radius-xl);
      padding: 2rem;
      box-shadow: var(--shadow-md);
      height: fit-content;
    }

    .contact-info h2 {
      font-size: 1.5rem;
      margin-bottom: 0.75rem;
    }

    .contact-info > p {
      color: var(--gray-500);
      margin-bottom: 1.5rem;
    }

    .info-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .info-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: var(--gray-100);
      border-radius: var(--radius-lg);
    }

    .info-icon {
      width: 44px;
      height: 44px;
      background: white;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--primary);
      font-size: 1rem;
      flex-shrink: 0;
    }

    .info-item .label {
      display: block;
      font-size: 0.75rem;
      color: var(--gray-500);
    }

    .info-item .value {
      display: block;
      font-weight: 600;
      color: var(--gray-800);
      font-size: 0.9375rem;
    }

    .social-section {
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--gray-200);
    }

    .social-section .label {
      display: block;
      font-size: 0.8125rem;
      color: var(--gray-500);
      margin-bottom: 0.75rem;
    }

    .social-links {
      display: flex;
      gap: 0.75rem;
    }

    .social-link {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--gray-100);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--gray-600);
      transition: all 0.2s ease;
    }

    .social-link:hover {
      background: var(--primary);
      color: white;
      transform: translateY(-2px);
    }

    .contact-form-wrapper {
      background: white;
      border-radius: var(--radius-xl);
      padding: 2rem;
      box-shadow: var(--shadow-md);
    }

    .contact-form-wrapper h3 {
      font-size: 1.25rem;
      margin-bottom: 1.5rem;
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

    .error {
      color: var(--danger);
      font-size: 0.8125rem;
      margin-top: 0.375rem;
    }

    .w-100 {
      width: 100%;
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

    .success-message {
      text-align: center;
      padding: 2rem 0;
    }

    .success-icon {
      width: 64px;
      height: 64px;
      background: #d1fae5;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
    }

    .success-icon i {
      font-size: 2rem;
      color: var(--success);
    }

    .success-message h3 {
      margin-bottom: 0.5rem;
    }

    .success-message p {
      color: var(--gray-500);
      margin-bottom: 1.5rem;
    }

    @media (max-width: 768px) {
      .contact-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ContactComponent {
  contactForm: FormGroup;
  submitting = false;
  submitted = false;
  successMessage = '';

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.contactForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      return;
    }

    this.submitting = true;
    this.contactService.sendContactRequest(this.contactForm.value).subscribe({
      next: (response) => {
        this.submitting = false;
        this.submitted = true;
        this.successMessage = response.message;
      },
      error: (err) => {
        this.submitting = false;
        console.error(err);
      }
    });
  }

  resetForm() {
    this.submitted = false;
    this.contactForm.reset();
  }
}
