import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="container hero-container">
        <div class="hero-content">
          <span class="hero-badge">
            <i class="fas fa-crown"></i> #1 du transport au Maroc
          </span>
          <h1 class="hero-title">
            Votre transport<br>
            <span class="highlight">simplifié</span><br>
            de A à Z
          </h1>
          <p class="hero-desc">
            Transport rapide et sécurisé de vos bagages et marchandises non accompagnées 
            avec des professionnels expérimentés. Disponible aujourd'hui — Intervention immédiate.
          </p>
          <div class="hero-features">
            <span><i class="fas fa-check-circle"></i> Devis gratuit en 24h</span>
            <span><i class="fas fa-check-circle"></i> Équipe professionnelle</span>
            <span><i class="fas fa-check-circle"></i> Assurance incluse</span>
          </div>
          <div class="hero-ctas">
            <a routerLink="/demande-envoi" class="btn btn-primary">
              Demander un envoi <i class="fas fa-arrow-right"></i>
            </a>
            <a routerLink="/suivi" class="btn btn-primary-dark">
              <i class="fas fa-search"></i> Suivre un colis
            </a>
          </div>
        </div>
        <div class="hero-visual">
          <div class="hero-card">
            <div class="card-icon">
              <i class="fas fa-truck-moving"></i>
            </div>
            <div class="card-info">
              <span class="card-label">Votre colis est en route</span>
              <span class="card-status">Livraison estimée: 2-3 jours</span>
            </div>
          </div>
          <div class="floating-icons">
            <div class="float-icon icon-1"><i class="fas fa-box"></i></div>
            <div class="float-icon icon-2"><i class="fas fa-globe"></i></div>
            <div class="float-icon icon-3"><i class="fas fa-shield-alt"></i></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-card" *ngFor="let stat of stats; let i = index" 
               [style.animation-delay]="i * 0.1 + 's'" class="animate-fadeInUp">
            <div class="stat-icon" [style.background]="stat.bg">
              <i [class]="stat.icon" [style.color]="stat.color"></i>
            </div>
            <h3 class="stat-number">{{ stat.value }}</h3>
            <p class="stat-label">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services section-padding">
      <div class="container">
        <div class="section-badge">Nos Services</div>
        <h2 class="section-title">Des solutions complètes<br>pour votre transport</h2>
        <p class="section-subtitle">
          Nous proposons une gamme complète de services pour rendre votre transport 
          aussi simple et sans stress que possible.
        </p>
        <div class="services-grid">
          <div class="service-card" *ngFor="let service of services; let i = index" 
               [style.animation-delay]="i * 0.1 + 's'" class="animate-fadeInUp">
            <div class="service-icon" [style.background]="service.bg">
              <i [class]="service.icon" [style.color]="service.color"></i>
            </div>
            <h3>{{ service.title }}</h3>
            <p>{{ service.description }}</p>
            <ul class="service-features">
              <li *ngFor="let feat of service.features">
                <i class="fas fa-check" [style.color]="service.color"></i> {{ feat }}
              </li>
            </ul>
            <a class="service-link" [style.color]="service.color">
              En savoir plus <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
        <div class="services-cta">
          <a routerLink="/demande-envoi" class="btn btn-outline">
            Demander un envoi personnalisé <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="how-it-works section-padding">
      <div class="container">
        <div class="section-badge light">Comment ça marche</div>
        <h2 class="section-title light">Un transport en 4 étapes simples</h2>
        <p class="section-subtitle light">
          Nous avons simplifié le processus pour vous offrir une expérience de transport sans stress.
        </p>
        <div class="steps-grid">
          <div class="step-card" *ngFor="let step of steps; let i = index" 
               [style.animation-delay]="i * 0.15 + 's'" class="animate-fadeInUp">
            <div class="step-icon" [style.background]="step.bg">
              <i [class]="step.icon" [style.color]="step.color"></i>
            </div>
            <div class="step-number">{{ i + 1 }}</div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.description }}</p>
          </div>
          <div class="step-connector"></div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="testimonials section-padding">
      <div class="container">
        <div class="testimonial-header">
          <div class="google-badge">
            <i class="fab fa-google"></i> Avis Google vérifiés
          </div>
          <h2 class="section-title">Ce que disent nos clients</h2>
          <div class="rating">
            <span class="rating-score">4.9</span>
            <div class="stars">
              <i class="fas fa-star" *ngFor="let s of [1,2,3,4,5]"></i>
            </div>
            <span class="rating-count">Basé sur 235 avis Google</span>
          </div>
        </div>
        <div class="testimonials-grid">
          <div class="testimonial-card" *ngFor="let t of testimonials; let i = index"
               [style.animation-delay]="i * 0.1 + 's'" class="animate-fadeInUp">
            <div class="testimonial-quote">"</div>
            <p class="testimonial-text">{{ t.text }}</p>
            <div class="testimonial-author">
              <div class="author-avatar">{{ t.initials }}</div>
              <div class="author-info">
                <span class="author-name">{{ t.name }}</span>
                <span class="author-date">{{ t.date }}</span>
              </div>
              <i class="fab fa-google google-icon"></i>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq section-padding">
      <div class="container">
        <div class="section-badge">FAQ</div>
        <h2 class="section-title">Questions fréquentes</h2>
        <p class="section-subtitle">
          Trouvez rapidement les réponses à vos questions sur nos services de transport.
        </p>
        <div class="faq-list">
          <div class="faq-item" *ngFor="let faq of faqs; let i = index" 
               [class.active]="faq.open" (click)="toggleFaq(i)">
            <div class="faq-question">
              <span>{{ faq.question }}</span>
              <i class="fas fa-plus"></i>
            </div>
            <div class="faq-answer" [class.open]="faq.open">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Prêt à expédier vos bagages ?</h2>
          <p>Obtenez un devis gratuit en quelques clics. Notre équipe est à votre disposition.</p>
          <div class="cta-buttons">
            <a routerLink="/demande-envoi" class="btn btn-primary">
              Demander un envoi <i class="fas fa-arrow-right"></i>
            </a>
            <a routerLink="/contact" class="btn btn-outline-light">
              Nous contacter
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    /* Hero */
    .hero {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      padding: 8rem 0 5rem;
      overflow: hidden;
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%);
    }

    .hero-bg {
      position: absolute;
      inset: 0;
      background: 
        radial-gradient(ellipse at 20% 50%, rgba(30, 58, 95, 0.05) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 20%, rgba(249, 115, 22, 0.05) 0%, transparent 50%);
    }

    .hero-container {
      position: relative;
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 4rem;
      // align-items: center;
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: var(--primary);
      color: white;
      padding: 0.5rem 1.25rem;
      border-radius: 9999px;
      font-size: 0.875rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      width: fit-content;
    }

    .hero-title {
      font-size: 3.5rem;
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 1.5rem;
      color: var(--gray-900);
    }

    .hero-title .highlight {
      color: var(--secondary);
    }

    .hero-desc {
      font-size: 1.125rem;
      color: var(--gray-600);
      margin-bottom: 1.5rem;
      line-height: 1.7;
      max-width: 540px;
    }

    .hero-features {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .hero-features span {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9375rem;
      color: var(--gray-700);
      font-weight: 500;
    }

    .hero-features i {
      color: var(--secondary);
    }

    .hero-ctas {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .hero-visual {
      background-image: url(https://media.discordapp.net/attachments/1211311091553144922/1507829033004699859/IMG-20260523-WA0000.jpg?ex=6a169e77&is=6a154cf7&hm=512270933a74d61725fe1ea9e620ae1dfa3cd4cdc54334222089a9871696dbad&=&format=webp&width=782&height=782);
      position: relative;
      // background-size: cover;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .hero-card {
      background: white;
      border-radius: var(--radius-2xl);
      padding: 1.5rem 2rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      box-shadow: var(--shadow-xl);
      animation: float 3s ease-in-out infinite;
    }

    .card-icon {
      width: 56px;
      height: 56px;
      background: linear-gradient(135deg, var(--success), #059669);
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.5rem;
    }

    .card-info {
      display: flex;
      flex-direction: column;
    }

    .card-label {
      font-weight: 600;
      color: var(--gray-800);
      font-size: 0.9375rem;
    }

    .card-status {
      font-size: 0.8125rem;
      color: var(--gray-500);
    }

    .floating-icons {
      position: absolute;
      inset: 0;
    }

    .float-icon {
      position: absolute;
      width: 48px;
      height: 48px;
      background: white;
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--shadow-md);
      font-size: 1.25rem;
    }

    .float-icon.icon-1 {
      top: 20%;
      left: 0;
      animation: float 4s ease-in-out infinite;
    }

    .float-icon.icon-2 {
      top: 10%;
      right: 10%;
      animation: float 3.5s ease-in-out infinite 0.5s;
    }

    .float-icon.icon-3 {
      bottom: 25%;
      right: 0;
      animation: float 4.5s ease-in-out infinite 1s;
    }

    /* Stats */
    .stats {
      padding: 3rem 0;
      background: white;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
    }

    .stat-card {
      text-align: center;
      padding: 2rem 1rem;
      border-radius: var(--radius-xl);
      transition: all 0.3s ease;
    }

    .stat-card:hover {
      transform: translateY(-4px);
    }

    .stat-icon {
      width: 64px;
      height: 64px;
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
      font-size: 1.5rem;
    }

    .stat-number {
      font-size: 2rem;
      font-weight: 800;
      color: var(--gray-900);
      margin-bottom: 0.25rem;
      text-align: center;
    }

    .stat-label {
      font-size: 0.9375rem;
      color: var(--gray-500);
      text-align: center;
    }

    /* Services */
    .services {
      background: var(--gray-100);
    }

    .section-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem 1.5rem;
      background: white;
      border: 1px solid var(--gray-200);
      border-radius: 9999px;
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--gray-700);
      margin: 0 auto 1rem;
      display: table;
    }

    .section-badge.light {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.2);
      color: rgba(255, 255, 255, 0.9);
    }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
      margin-bottom: 2.5rem;
    }

    .service-card {
      background: white;
      border-radius: var(--radius-xl);
      padding: 2rem;
      box-shadow: var(--shadow-sm);
      transition: all 0.3s ease;
    }

    .service-card:hover {
      box-shadow: var(--shadow-lg);
      transform: translateY(-4px);
    }

    .service-icon {
      width: 56px;
      height: 56px;
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.25rem;
      font-size: 1.5rem;
    }

    .service-card h3 {
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
    }

    .service-card > p {
      color: var(--gray-500);
      font-size: 0.9375rem;
      margin-bottom: 1rem;
      line-height: 1.6;
    }

    .service-features {
      list-style: none;
      padding: 0;
      margin: 0 0 1.25rem;
    }

    .service-features li {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9375rem;
      color: var(--gray-600);
      margin-bottom: 0.5rem;
    }

    .service-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9375rem;
      font-weight: 600;
      cursor: pointer;
      transition: gap 0.2s ease;
    }

    .service-link:hover {
      gap: 0.75rem;
    }

    .services-cta {
      text-align: center;
    }

    /* How It Works */
    .how-it-works {
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
      color: white;
    }

    .how-it-works .section-title,
    .how-it-works .section-subtitle {
      color: white;
    }

    .steps-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 2rem;
      position: relative;
    }

    .step-card {
      text-align: center;
      position: relative;
      z-index: 2;
    }

    .step-icon {
      width: 80px;
      height: 80px;
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
      font-size: 2rem;
    }

    .step-number {
      width: 32px;
      height: 32px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.875rem;
      font-weight: 700;
      margin: 0 auto 0.75rem;
    }

    .step-card h3 {
      font-size: 1.125rem;
      color: white;
      margin-bottom: 0.5rem;
    }

    .step-card p {
      font-size: 0.9375rem;
      color: rgba(255, 255, 255, 0.8);
      line-height: 1.6;
    }

    /* Testimonials */
    .testimonials {
      background: var(--gray-100);
    }

    .testimonial-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .google-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: white;
      padding: 0.5rem 1.25rem;
      border-radius: 9999px;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--gray-600);
      margin-bottom: 1rem;
      box-shadow: var(--shadow-sm);
    }

    .rating {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      margin-top: 1rem;
    }

    .rating-score {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--gray-900);
    }

    .stars {
      display: flex;
      gap: 0.25rem;
    }

    .stars i {
      color: #fbbf24;
      font-size: 1.25rem;
    }

    .rating-count {
      font-size: 0.9375rem;
      color: var(--gray-500);
    }

    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 1.5rem;
    }

    .testimonial-card {
      background: white;
      border-radius: var(--radius-xl);
      padding: 2rem;
      box-shadow: var(--shadow-md);
      position: relative;
    }

    .testimonial-quote {
      position: absolute;
      top: 1rem;
      right: 1.5rem;
      font-size: 4rem;
      color: var(--gray-200);
      font-family: Georgia, serif;
      line-height: 1;
    }

    .testimonial-text {
      font-size: 0.9375rem;
      color: var(--gray-600);
      line-height: 1.7;
      margin-bottom: 1.5rem;
    }

    .testimonial-author {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .author-avatar {
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, var(--primary), var(--primary-light));
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 600;
      font-size: 0.875rem;
    }

    .author-info {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .author-name {
      font-weight: 600;
      color: var(--gray-800);
    }

    .author-date {
      font-size: 0.8125rem;
      color: var(--gray-400);
    }

    .google-icon {
      color: #4285f4;
      font-size: 1.25rem;
    }

    /* FAQ */
    .faq {
      background: white;
    }

    .faq-list {
      max-width: 800px;
      margin: 0 auto;
    }

    .faq-item {
      border: 1px solid var(--gray-200);
      border-radius: var(--radius-lg);
      margin-bottom: 0.75rem;
      overflow: hidden;
      transition: all 0.2s ease;
    }

    .faq-item.active {
      border-color: var(--primary-light);
      box-shadow: 0 0 0 3px rgba(42, 82, 152, 0.1);
    }

    .faq-question {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.25rem 1.5rem;
      cursor: pointer;
      font-weight: 600;
      color: var(--gray-800);
      transition: color 0.2s ease;
    }

    .faq-question:hover {
      color: var(--primary);
    }

    .faq-question i {
      transition: transform 0.2s ease;
      color: var(--gray-400);
    }

    .faq-item.active .faq-question i {
      transform: rotate(45deg);
      color: var(--primary);
    }

    .faq-answer {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease, padding 0.3s ease;
    }

    .faq-answer.open {
      max-height: 300px;
      padding: 0 1.5rem 1.25rem;
    }

    .faq-answer p {
      color: var(--gray-500);
      line-height: 1.7;
    }

    /* CTA Section */
    .cta-section {
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
      padding: 5rem 0;
      text-align: center;
      color: white;
    }

    .cta-content h2 {
      font-size: 2.5rem;
      color: white;
      margin-bottom: 1rem;
    }

    .cta-content p {
      font-size: 1.125rem;
      color: rgba(255, 255, 255, 0.85);
      margin-bottom: 2rem;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .cta-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .btn-outline-light {
      background: transparent;
      color: white;
      border: 2px solid rgba(255, 255, 255, 0.5);
      padding: 0.875rem 2rem;
      border-radius: var(--radius-xl);
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .btn-outline-light:hover {
      background: white;
      color: var(--primary);
      border-color: white;
    }

    @media (max-width: 768px) {
      .hero-container {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .hero-title {
        font-size: 2.5rem;
      }

      .hero-visual {
        display: none;
      }

      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .services-grid {
        grid-template-columns: 1fr;
      }

      .steps-grid {
        grid-template-columns: 1fr;
      }

      .testimonials-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomeComponent {
  stats = [
    { value: '350+', label: 'Transports réalisés', icon: 'fas fa-truck', bg: '#dbeafe', color: '#2563eb' },
    { value: '223+', label: 'Clients satisfaits', icon: 'fas fa-users', bg: '#d1fae5', color: '#059669' },
    { value: '4/5', label: 'Note moyenne', icon: 'fas fa-star', bg: '#fef3c7', color: '#d97706' },
    { value: '256+', label: 'Villes couvertes', icon: 'fas fa-map-marker-alt', bg: '#ede9fe', color: '#7c3aed' }
  ];

  services = [
    {
      title: 'Transport de bagages',
      description: 'Transport sécurisé de vos bagages avec notre flotte de véhicules modernes et équipés.',
      icon: 'fas fa-suitcase',
      bg: '#dbeafe',
      color: '#2563eb',
      features: ['Local & national', 'Équipe expérimentée', 'Véhicules adaptés']
    },
    {
      title: 'Marchandises',
      description: 'Service d\'emballage professionnel pour protéger vos objets les plus précieux.',
      icon: 'fas fa-boxes',
      bg: '#d1fae5',
      color: '#059669',
      features: ['Matériaux de qualité', 'Objets fragiles', 'Déballage inclus']
    },
    {
      title: 'Envoi international',
      description: 'Démontage et remontage de vos meubles par des techniciens qualifiés.',
      icon: 'fas fa-globe-europe',
      bg: '#fef3c7',
      color: '#d97706',
      features: ['Documentation', 'Douane gérée', 'Suivi en temps réel']
    },
    {
      title: 'Express delivery',
      description: 'Solutions de stockage temporaire sécurisées pour vos affaires.',
      icon: 'fas fa-shipping-fast',
      bg: '#ede9fe',
      color: '#7c3aed',
      features: ['Livraison 24-48h', 'Suivi GPS', 'Notification SMS']
    }
  ];

  steps = [
    {
      title: 'Demandez un devis',
      description: 'Remplissez notre formulaire en ligne avec les détails de votre envoi.',
      icon: 'fas fa-file-alt',
      bg: '#dbeafe',
      color: '#2563eb'
    },
    {
      title: 'Planifiez la date',
      description: 'Choisissez la date qui vous convient et nous confirmons la disponibilité.',
      icon: 'fas fa-calendar-check',
      bg: '#d1fae5',
      color: '#059669'
    },
    {
      title: 'On s\'occupe de tout',
      description: 'Notre équipe arrive, emballe, charge et transporte vos affaires en sécurité.',
      icon: 'fas fa-truck-loading',
      bg: '#fef3c7',
      color: '#d97706'
    },
    {
      title: 'Livraison',
      description: 'Nous livrons vos colis à destination en toute sécurité.',
      icon: 'fas fa-home',
      bg: '#ede9fe',
      color: '#7c3aed'
    }
  ];

  testimonials = [
    {
      text: 'Tellement ravi d\'avoir choisi Transport Meliani ! Ils ont été ponctuels, rapides et super sympathiques. Un grand merci à l\'équipe pour leur professionnalisme.',
      name: 'Maryem Bakri',
      initials: 'MB',
      date: 'il y a 5 mois'
    },
    {
      text: 'Service impeccable ! Mes bagages sont arrivés en parfait état et dans les délais. Je recommande vivement Transport Meliani pour tous vos envois.',
      name: 'Ahmed El Amrani',
      initials: 'AE',
      date: 'il y a 3 mois'
    },
    {
      text: 'Excellente expérience avec Transport Meliani. Le suivi en temps réel est super pratique et l\'équipe est très réactive. Merci encore !',
      name: 'Fatima Zahra',
      initials: 'FZ',
      date: 'il y a 1 mois'
    }
  ];

  faqs = [
    {
      question: 'Quels services propose votre entreprise ?',
      answer: 'Nous proposons le transport de bagages, de marchandises non accompagnées, des envois internationaux et un service express delivery.',
      open: false
    },
    {
      question: 'Dans quelles villes intervenez-vous ?',
      answer: 'Nous couvrons plus de 256 villes au Maroc et proposons également des envois internationaux vers l\'Europe et autres destinations.',
      open: false
    },
    {
      question: 'Comment puis-je suivre mon colis ?',
      answer: 'Vous pouvez suivre votre colis en temps réel en utilisant votre numéro de suivi sur notre page "Suivi de colis".',
      open: false
    },
    {
      question: 'Quels sont les délais de livraison ?',
      answer: 'Nos délais varient selon la destination : 24-48h pour les envois locaux, 2-5 jours pour le national, et 5-10 jours pour l\'international.',
      open: false
    },
    {
      question: 'Proposez-vous une assurance ?',
      answer: 'Oui, tous nos transports incluent une assurance de base. Vous pouvez également souscrire à une assurance premium pour une couverture maximale.',
      open: false
    }
  ];

  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }
}
