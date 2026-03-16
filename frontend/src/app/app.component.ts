// src/app/app.component.ts
import { Component } from '@angular/core';
import { BilanDashboardComponent } from './features/bilan/pages/bilan-dashboard/bilan-dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BilanDashboardComponent],
  template: `<app-bilan-dashboard></app-bilan-dashboard>`
})
export class AppComponent {}