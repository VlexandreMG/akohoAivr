import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// ← Ajoute cette ligne (ajuste le chemin si ton dossier est différent)
import { BilanDashboardPageComponent } from './features/bilan/pages/bilan-dashboard.page';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    BilanDashboardPageComponent   // ← AJOUTE ÇA ICI (c'est obligatoire !)
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
}