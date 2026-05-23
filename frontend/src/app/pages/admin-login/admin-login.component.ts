import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="login-page">
      <div class="login-container">
        <div class="login-brand">
          <div class="logo-icon">
            <span>MT</span>
          </div>
          <h1>Transport Meliani</h1>
          <p>Espace Administrateur</p>
        </div>

        <div class="login-card">
          <h2>Connexion</h2>
          <p class="login-subtitle">Connectez-vous pour accéder au tableau de bord</p>

          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label class="form-label">
                <i class="fas fa-envelope"></i> Email
              </label>
              <input 
                type="email" 
                class="form-control" 
                formControlName="email" 
                placeholder="admin@melianitrans.com"
              />
              <div *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched" class="error">
                Un email valide est requis
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">
                <i class="fas fa-lock"></i> Mot de passe
              </label>
              <div class="password-input">
                <input 
                  [type]="showPassword ? 'text' : 'password'" 
                  class="form-control" 
                  formControlName="password" 
                  placeholder="Votre mot de passe"
                />
                <button type="button" class="toggle-password" (click)="showPassword = !showPassword">
                  <i [class]="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
              <div *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched" class="error">
                Le mot de passe est requis
              </div>
            </div>

            <div *ngIf="error" class="alert alert-error">
              <i class="fas fa-exclamation-circle"></i>
              {{ error }}
            </div>

            <button type="submit" class="btn btn-primary w-100" [disabled]="loading">
              <span *ngIf="!loading">Se connecter</span>
              <span *ngIf="loading" class="spinner-small"></span>
            </button>
          </form>

          <div class="login-help">
            
          </div>
        </div>

        <a routerLink="/accueil" class="back-link">
          <i class="fas fa-arrow-left"></i> Retour au site
        </a>
      </div>
    </div>
  `,
  styles: [`
    .login-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
      padding: 2rem;
    }

    .login-container {
      width: 100%;
      max-width: 420px;
    }

    .login-brand {
      text-align: center;
      margin-bottom: 2rem;
      color: white;
    }

    .logo-icon {
      width: 64px;
      height: 64px;
      background: linear-gradient(135deg, var(--secondary) 0%, var(--secondary-dark) 100%);
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
      box-shadow: 0 8px 20px rgba(249, 115, 22, 0.3);
    }

    .logo-icon span {
      font-family: var(--font-heading);
      font-weight: 800;
      font-size: 1.5rem;
      color: white;
    }

    .login-brand h1 {
      font-size: 1.75rem;
      color: white;
      margin-bottom: 0.25rem;
    }

    .login-brand p {
      color: rgba(255, 255, 255, 0.7);
      font-size: 1rem;
    }

    .login-card {
      background: white;
      border-radius: var(--radius-2xl);
      padding: 2.5rem;
      box-shadow: var(--shadow-xl);
    }

    .login-card h2 {
      font-size: 1.5rem;
      margin-bottom: 0.25rem;
    }

    .login-subtitle {
      color: var(--gray-500);
      font-size: 0.9375rem;
      margin-bottom: 1.5rem;
    }

    .form-group {
      margin-bottom: 1.25rem;
    }

    .form-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--gray-700);
      margin-bottom: 0.5rem;
    }

    .form-label i {
      color: var(--gray-400);
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

    .password-input {
      position: relative;
    }

    .password-input .form-control {
      padding-right: 3rem;
    }

    .toggle-password {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: var(--gray-400);
      cursor: pointer;
      padding: 0;
    }

    .toggle-password:hover {
      color: var(--gray-600);
    }

    .error {
      color: var(--danger);
      font-size: 0.8125rem;
      margin-top: 0.375rem;
    }

    .alert {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.875rem 1rem;
      border-radius: var(--radius-lg);
      margin-bottom: 1rem;
      font-size: 0.9375rem;
    }

    .alert-error {
      background: #fee2e2;
      color: #dc2626;
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

    .login-help {
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--gray-200);
      text-align: center;
    }

    .login-help p {
      font-size: 0.8125rem;
      color: var(--gray-500);
      margin-bottom: 0.25rem;
    }

    .back-link {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 1.5rem;
      color: rgba(255, 255, 255, 0.8);
      font-size: 0.9375rem;
      transition: color 0.2s ease;
    }

    .back-link:hover {
      color: white;
    }
  `]
})
export class AdminLoginComponent {
  loginForm: FormGroup;
  loading = false;
  error: string | null = null;
  showPassword = false;
  returnUrl: string = '/admin/dashboard';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.route.queryParams.subscribe(params => {
      if (params['returnUrl']) {
        this.returnUrl = params['returnUrl'];
      }
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = null;

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate([this.returnUrl]);
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Email ou mot de passe incorrect';
        console.error(err);
      }
    });
  }
}
