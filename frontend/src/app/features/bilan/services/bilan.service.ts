import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BilanLot } from '../../../shared/models/bilan-lot.models';

@Injectable({
  providedIn: 'root'
})
export class BilanService {
  private mockBilans: BilanLot[] = [
    { id: 1, id_lot: 101, nom_lot: 'Lot A - Race Locale', nombre_poulets: 245, prix_achat_total: 850000, cout_nourriture_total: 320000, nombre_morts: 12, poids_moyen: 2.35, prix_vente_lot: 1420000, nombre_oeufs: 1240, valeur_oeufs_total: 248000, benefice: 502000 },
    { id: 2, id_lot: 102, nom_lot: 'Lot B - Race Améliorée', nombre_poulets: 178, prix_achat_total: 620000, cout_nourriture_total: 280000, nombre_morts: 8, poids_moyen: 2.68, prix_vente_lot: 1180000, nombre_oeufs: 890, valeur_oeufs_total: 178000, benefice: 310000 },
  ];

  getBilans(date?: string): Observable<BilanLot[]> {
    return of(this.mockBilans); // plus tard → HttpClient vers ton backend
  }
}