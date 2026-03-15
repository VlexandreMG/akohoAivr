import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BilanService } from '../services/bilan.service';
import { BilanLot } from '../../../shared/models/bilan-lot.models';
import { BilanCardMoleculeComponent } from '../../../ui/molecules/bilan-card.molecule';
import { CardAtomComponent } from '../../../ui/atoms/card.atom.component';

@Component({
  selector: 'app-bilan-dashboard',
  standalone: true,
  imports: [CommonModule, BilanCardMoleculeComponent, CardAtomComponent],
  template: `
    <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-900 mb-8 text-center">
          Bilan des Lots - {{ today | date:'dd/MM/yyyy' }}
        </h1>

        <!-- Cartes de synthèse -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <app-bilan-card 
            title="Poulets Vivants" 
            [value]="totalPoulets" 
            unit="têtes"
            class="bg-white border-l-4 border-blue-500">
          </app-bilan-card>

          <app-bilan-card 
            title="Bénéfice Global" 
            [value]="totalBenefice" 
            unit="Ar"
            [class]="totalBenefice >= 0 ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'">
          </app-bilan-card>

          <app-bilan-card 
            title="Œufs Produits" 
            [value]="totalOeufs" 
            unit="œufs"
            class="bg-white border-l-4 border-purple-500">
          </app-bilan-card>

          <app-bilan-card 
            title="Mortalité" 
            [value]="totalMorts" 
            unit="têtes"
            class="bg-white border-l-4 border-orange-500">
          </app-bilan-card>
        </div>

        <!-- Tableau -->
        <app-card>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-100">
                <tr>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Lot</th>
                  <th class="px-6 py-4 text-center text-sm font-semibold text-gray-700">Poulets</th>
                  <th class="px-6 py-4 text-center text-sm font-semibold text-gray-700">Morts</th>
                  <th class="px-6 py-4 text-center text-sm font-semibold text-gray-700">Poids moyen</th>
                  <th class="px-6 py-4 text-center text-sm font-semibold text-gray-700">Valeur vente</th>
                  <th class="px-6 py-4 text-center text-sm font-semibold text-gray-700">Bénéfice</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr *ngFor="let b of bilans" class="hover:bg-gray-50 transition">
                  <td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{{ b.nom_lot }}</td>
                  <td class="px-6 py-4 text-center">{{ b.nombre_poulets }}</td>
                  <td class="px-6 py-4 text-center text-red-600 font-medium">{{ b.nombre_morts }}</td>
                  <td class="px-6 py-4 text-center">{{ b.poids_moyen | number:'1.2-2' }} kg</td>
                  <td class="px-6 py-4 text-center font-medium">{{ b.prix_vente_lot | number:'1.0-0' }} Ar</td>
                  <td class="px-6 py-4 text-center font-bold" 
                      [ngClass]="b.benefice >= 0 ? 'text-green-600' : 'text-red-600'">
                    {{ b.benefice | number:'1.0-0' }} Ar
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </app-card>
      </div>
    </div>
  `
})
export class BilanDashboardPageComponent implements OnInit {
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
      this.totalPoulets = data.reduce((sum, b) => sum + b.nombre_poulets, 0);
      this.totalBenefice = data.reduce((sum, b) => sum + b.benefice, 0);
      this.totalOeufs   = data.reduce((sum, b) => sum + b.nombre_oeufs, 0);
      this.totalMorts   = data.reduce((sum, b) => sum + b.nombre_morts, 0);
    });
  }
}