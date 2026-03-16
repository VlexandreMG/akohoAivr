// features/bilan/pages/bilan-dashboard/bilan-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BilanService } from '../../services/bilan.service';
import { BilanLot } from '../../../../shared/models/bilan-lot.model';
import { BilanCardComponent } from '../../../../ui/molecules/bilan-card/bilan-card.component';
import { CardComponent } from '../../../../ui/atoms/card/card.component';

@Component({
  selector: 'app-bilan-dashboard',
  standalone: true,
  imports: [CommonModule, BilanCardComponent, CardComponent],
  template: `
    <div class="container my-5">
      <h1 class="text-center mb-5">Bilan des Lots - {{ today | date:'dd/MM/yyyy' }}</h1>

      <div class="row g-4 mb-5">
        <div class="col-12 col-md-6 col-lg-3">
          <app-bilan-card title="Poulets Vivants" [value]="totalPoulets" unit="têtes" valueClass="text-primary" />
        </div>
        <div class="col-12 col-md-6 col-lg-3">
          <app-bilan-card 
            title="Bénéfice Global" 
            [value]="totalBenefice" 
            unit="Ar" 
            [valueClass]="totalBenefice >= 0 ? 'text-success' : 'text-danger'" />
        </div>
        <div class="col-12 col-md-6 col-lg-3">
          <app-bilan-card title="Œufs Total" [value]="totalOeufs" unit="œufs" valueClass="text-purple" />
        </div>
        <div class="col-12 col-md-6 col-lg-3">
          <app-bilan-card title="Mortalité" [value]="totalMorts" unit="têtes" valueClass="text-warning" />
        </div>
      </div>

      <app-card>
        <div class="table-responsive">
          <table class="table table-hover table-striped align-middle">
            <thead class="table-light">
              <tr>
                <th>Lot</th>
                <th class="text-center">Poulets</th>
                <th class="text-center">Morts</th>
                <th class="text-center">Poids moyen</th>
                <th class="text-center">Valeur vente</th>
                <th class="text-center">Bénéfice</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let b of bilans">
                <td class="fw-medium">{{ b.nom_lot }}</td>
                <td class="text-center">{{ b.nombre_poulets }}</td>
                <td class="text-center text-danger fw-bold">{{ b.nombre_morts }}</td>
                <td class="text-center">{{ b.poids_moyen | number:'1.2-2' }} kg</td>
                <td class="text-center">{{ b.prix_vente_lot | number:'1.0-0' }} Ar</td>
                <td class="text-center fw-bold" [ngClass]="b.benefice >= 0 ? 'text-success' : 'text-danger'">
                  {{ b.benefice | number:'1.0-0' }} Ar
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </app-card>
    </div>
  `
})
export class BilanDashboardComponent implements OnInit {
  bilans: BilanLot[] = [];
  today = new Date();

  totalPoulets = 0;
  totalBenefice = 0;
  totalOeufs = 0;
  totalMorts = 0;

  constructor(private bilanService: BilanService) {}

  ngOnInit() {
    this.bilanService.getBilans().subscribe(data => {
      this.bilans = data;
      this.totalPoulets = data.reduce((s, b) => s + b.nombre_poulets, 0);
      this.totalBenefice = data.reduce((s, b) => s + b.benefice, 0);
      this.totalOeufs   = data.reduce((s, b) => s + b.nombre_oeufs, 0);
      this.totalMorts   = data.reduce((s, b) => s + b.nombre_morts, 0);
    });
  }
}