import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, CommonModule],
  template: `
    <app-navbar *ngIf="!isAdminRoute"></app-navbar>
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer *ngIf="!isAdminRoute"></app-footer>
  `,
  styles: [`
    main {
      min-height: calc(100vh - 300px);
    }
  `]
})
export class AppComponent {
  title = 'Transport Meliani';
  isAdminRoute = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.isAdminRoute = this.router.url.startsWith('/admin');
    });
  }
}
