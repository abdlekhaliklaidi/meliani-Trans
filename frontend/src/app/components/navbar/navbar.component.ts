import { Component, HostListener } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <nav class="navbar" [class.scrolled]="isScrolled" [class.admin-nav]="isAdminRoute">
      <div class="container navbar-container">
        <a routerLink="/accueil" class="logo">
          <div class="logo-icon">
            <span class="logo-text">MT</span>
          </div>
          <span class="logo-label">Transport Meliani</span>
        </a>

        <div class="nav-links" [class.active]="mobileMenuOpen">
          <a routerLink="/accueil" routerLinkActive="active" (click)="closeMobile()">Accueil</a>
          <a routerLink="/suivi" routerLinkActive="active" (click)="closeMobile()">Suivi</a>
          <a routerLink="/demande-envoi" routerLinkActive="active" (click)="closeMobile()" class="highlight">Demander l'envoi</a>
          <a routerLink="/contact" routerLinkActive="active" (click)="closeMobile()">Contact</a>
          <ng-container *ngIf="authService.isLoggedIn(); else loginLink">
            <a routerLink="/admin/dashboard" routerLinkActive="active" (click)="closeMobile()" class="admin-link">
              <i class="fas fa-shield-alt"></i> Admin
            </a>
            <a (click)="logout(); closeMobile()" class="logout-link">
              <i class="fas fa-sign-out-alt"></i> Déconnexion
            </a>
          </ng-container>
          <ng-template #loginLink>
            <a routerLink="/admin/login" routerLinkActive="active" (click)="closeMobile()" class="login-link">
              <i class="fas fa-lock"></i> Connexion
            </a>
          </ng-template>
        </div>

        <button class="mobile-toggle" (click)="toggleMobile()" [class.active]="mobileMenuOpen">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div class="mobile-overlay" [class.active]="mobileMenuOpen" (click)="closeMobile()"></div>
    </nav>
  `,
  styles: [`
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background: transparent;
      transition: all 0.3s ease;
      padding: 1rem 0;
    }

    .navbar.scrolled {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      box-shadow: var(--shadow-md);
      padding: 0.5rem 0;
    }

    .navbar.admin-nav {
      background: var(--primary);
      position: relative;
    }

    .navbar-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
    }

    .logo-icon {
      width: 44px;
      height: 44px;
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(30, 58, 95, 0.3);
    }

    .logo-text {
      font-family: var(--font-heading);
      font-weight: 800;
      font-size: 1.1rem;
      color: white;
    }

    .logo-label {
      font-family: var(--font-heading);
      font-weight: 700;
      font-size: 1.25rem;
      color: var(--gray-900);
      transition: color 0.3s ease;
    }

    .scrolled .logo-label {
      color: var(--gray-900);
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .nav-links a {
      padding: 0.5rem 1rem;
      font-size: 0.9375rem;
      font-weight: 500;
      color: var(--gray-700);
      border-radius: var(--radius-lg);
      transition: all 0.2s ease;
      white-space: nowrap;
    }

    .nav-links a:hover {
      color: var(--primary);
      background: rgba(30, 58, 95, 0.05);
    }

    .nav-links a.active {
      color: var(--primary);
      background: rgba(30, 58, 95, 0.08);
      font-weight: 600;
    }

    .nav-links a.highlight {
      background: var(--secondary);
      color: white;
      font-weight: 600;
      margin-left: 0.5rem;
    }

    .nav-links a.highlight:hover {
      background: var(--secondary-dark);
      transform: translateY(-1px);
    }

    .admin-link {
      color: var(--success) !important;
    }

    .login-link {
      color: var(--primary) !important;
      font-weight: 600 !important;
    }

    .logout-link {
      cursor: pointer;
      color: var(--danger) !important;
    }

    .mobile-toggle {
      display: none;
      flex-direction: column;
      gap: 5px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 5px;
      z-index: 1001;
    }

    .mobile-toggle span {
      width: 25px;
      height: 2px;
      background: var(--gray-800);
      transition: all 0.3s ease;
      border-radius: 2px;
    }

    .mobile-toggle.active span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }

    .mobile-toggle.active span:nth-child(2) {
      opacity: 0;
    }

    .mobile-toggle.active span:nth-child(3) {
      transform: rotate(-45deg) translate(5px, -5px);
    }

    .mobile-overlay {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 998;
    }

    @media (max-width: 768px) {
      .mobile-toggle {
        display: flex;
      }

      .nav-links {
        position: fixed;
        top: 0;
        right: -280px;
        width: 280px;
        height: 100vh;
        background: white;
        flex-direction: column;
        padding: 5rem 1.5rem 2rem;
        gap: 0.5rem;
        box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
        transition: right 0.3s ease;
        z-index: 999;
      }

      .nav-links.active {
        right: 0;
      }

      .nav-links a {
        padding: 0.875rem 1rem;
        width: 100%;
        border-radius: var(--radius-md);
      }

      .mobile-overlay.active {
        display: block;
      }
    }
  `]
})
export class NavbarComponent {
  isScrolled = false;
  mobileMenuOpen = false;
  isAdminRoute = false;

  constructor(public authService: AuthService, private router: Router) {
    this.router.events.subscribe(() => {
      this.isAdminRoute = this.router.url.startsWith('/admin');
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMobile() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobile() {
    this.mobileMenuOpen = false;
  }

  logout() {
    this.authService.logout();
  }
}
