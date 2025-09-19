
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./features/home/home.routes').then(m => m.HOME_ROUTES) },
  { path: 'pricing', loadChildren: () => import('./features/pricing/pricing.routes').then(m => m.PRICING_ROUTES) },
  { path: 'schedule', loadChildren: () => import('./features/schedule/schedule.routes').then(m => m.SCHEDULE_ROUTES) },
  { path: 'trainers', loadChildren: () => import('./features/trainers/trainers.routes').then(m => m.TRAINERS_ROUTES) },
  { path: 'contact', loadChildren: () => import('./features/contact/contact.routes').then(m => m.CONTACT_ROUTES) },
  { path: '**', loadComponent: () => import('./shared/ui/not-found/not-found.component').then(m => m.NotFoundComponent) }
];
