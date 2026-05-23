import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="logo">
              <div class="logo-icon">
                <span>MT</span>
              </div>
              <span class="logo-label">Transport Meliani</span>
            </div>
            <p class="footer-desc">
              Votre partenaire de confiance pour le transport international de bagages 
              et marchandises non accompagnées. Service fiable, ponctuel et sécurisé.
            </p>
            <div class="social-links">
              <a href="#" class="social-link"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
              <a href="#" class="social-link"><i class="fab fa-linkedin-in"></i></a>
              <a href="#" class="social-link"><i class="fab fa-whatsapp"></i></a>
            </div>
          </div>

          <div class="footer-links">
            <h4>Navigation</h4>
            <ul>
              <li><a routerLink="/accueil">Accueil</a></li>
              <li><a routerLink="/suivi">Suivi de colis</a></li>
              <li><a routerLink="/demande-envoi">Demander un envoi</a></li>
              <li><a routerLink="/contact">Contact</a></li>
            </ul>
          </div>

          <div class="footer-links">
            <h4>Nos Services</h4>
            <ul>
              <li><a>Transport de bagages</a></li>
              <li><a>Marchandises non accompagnées</a></li>
              <li><a>Envoi international</a></li>
              <li><a>Express delivery</a></li>
            </ul>
          </div>

          <div class="footer-contact">
            <h4>Contact</h4>
            <ul>
              <li><i class="fas fa-phone"></i> +212 6 68 18 95 58</li>
              <li><i class="fas fa-envelope"></i> contact&#64;melianitrans.com</li>
              <li><i class="fas fa-map-marker-alt"></i> Route de Tiret, n°/21, Oujda Maroc</li>
              <li><i class="fas fa-clock"></i> Lun - Sam: 9h - 18h</li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; 2025 Transport Meliani. Tous droits réservés.</p>
          <div class="footer-legal">
            <a>Conditions générales</a>
            <a>Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: var(--primary-dark);
      color: white;
      padding: 4rem 0 0;
    }

    .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1.5fr;
      gap: 3rem;
      margin-bottom: 3rem;
    }

    .footer-brand .logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1.25rem;
    }

    .footer-brand .logo-icon {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, var(--secondary) 0%, var(--secondary-dark) 100%);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .footer-brand .logo-icon span {
      font-family: var(--font-heading);
      font-weight: 800;
      font-size: 1rem;
      color: white;
    }

    .footer-brand .logo-label {
      font-family: var(--font-heading);
      font-weight: 700;
      font-size: 1.25rem;
      color: white;
    }

    .footer-desc {
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.9375rem;
      line-height: 1.7;
      margin-bottom: 1.5rem;
    }

    .social-links {
      display: flex;
      gap: 0.75rem;
    }

    .social-link {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      transition: all 0.2s ease;
    }

    .social-link:hover {
      background: var(--secondary);
      transform: translateY(-2px);
    }

    .footer-links h4,
    .footer-contact h4 {
      font-size: 1.125rem;
      font-weight: 700;
      margin-bottom: 1.25rem;
      color: white;
    }

    .footer-links ul,
    .footer-contact ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .footer-links li,
    .footer-contact li {
      margin-bottom: 0.75rem;
    }

    .footer-links a {
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.9375rem;
      transition: all 0.2s ease;
      cursor: pointer;
    }

    .footer-links a:hover {
      color: var(--secondary);
      padding-left: 4px;
    }

    .footer-contact li {
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.9375rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .footer-contact i {
      color: var(--secondary);
      width: 20px;
    }

    .footer-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding: 1.5rem 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .footer-bottom p {
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.875rem;
      margin: 0;
    }

    .footer-legal {
      display: flex;
      gap: 1.5rem;
    }

    .footer-legal a {
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.875rem;
      transition: color 0.2s ease;
      cursor: pointer;
    }

    .footer-legal a:hover {
      color: var(--secondary);
    }

    @media (max-width: 768px) {
      .footer-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .footer-bottom {
        flex-direction: column;
        text-align: center;
      }
    }
  `]
})
export class FooterComponent {}
