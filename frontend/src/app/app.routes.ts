import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/bilan/pages/bilan-dashboard.page')
      .then(m => m.BilanDashboardPageComponent)
  }
];