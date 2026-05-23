import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { publicGuard } from './guards/public.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/accueil',
    pathMatch: 'full'
  },
  {
    path: 'accueil',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'suivi',
    loadComponent: () => import('./pages/tracking/tracking.component').then(m => m.TrackingComponent)
  },
  {
    path: 'demande-envoi',
    loadComponent: () => import('./pages/request-shipment/request-shipment.component').then(m => m.RequestShipmentComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: 'admin/login',
    loadComponent: () => import('./pages/admin-login/admin-login.component').then(m => m.AdminLoginComponent),
    canActivate: [publicGuard]
  },
  {
    path: 'admin/dashboard',
    loadComponent: () => import('./pages/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: 'admin/expeditions',
    loadComponent: () => import('./pages/admin-shipments/admin-shipments.component').then(m => m.AdminShipmentsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'admin/demandes',
    loadComponent: () => import('./pages/admin-requests/admin-requests.component').then(m => m.AdminRequestsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'admin/contacts',
    loadComponent: () => import('./pages/admin-contacts/admin-contacts.component').then(m => m.AdminContactsComponent),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '/accueil'
  }
];
