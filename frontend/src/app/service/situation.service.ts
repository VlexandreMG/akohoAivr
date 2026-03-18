import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Lot, LotStats } from '../model/situation';

@Injectable({ providedIn: 'root' })
export class LotService {

  private apiUrl = 'http://localhost:3000/api/lots/situation-globale';

  // (Optionnel) données de mock pour développement local sans backend.
  private mockData: { situations: Lot[] } = {
    situations: [
      {
        id: 1,
        nom: 'lot1',
        race: 'barbonezy',
        nombre: 500,
        dateEntree: '2026-01-01',
        poids: 0,
        sakafo: 4592500,
        vivant: { totalVelona: 500, totalVelonaLahy: 0, totalVelonaVavy: 500 },
        mort: { totalMaty: 0, totalMatyLahy: 0, totalMatyVavy: 0 },
        atodyRestant: 0,
        estimationAtody: 0,
        estimationAkoho: 0,
        achat: 250000,
        benefice: -23212500
      },
      {
        id: 5,
        nom: 'zanaka_lot1',
        race: 'barbonezy',
        nombre: 98,
        dateEntree: '2026-03-04',
        poids: 0,
        sakafo: 900130,
        vivant: { totalVelona: 98, totalVelonaLahy: 10, totalVelonaVavy: 88 },
        mort: { totalMaty: 0, totalMatyLahy: 0, totalMatyVavy: 0 },
        atodyRestant: 0,
        estimationAtody: 0,
        estimationAkoho: 0,
        achat: 0,
        benefice: -4500650
      },
    ]
  };

  constructor(private http: HttpClient) {}

  /**
   * Récupère les lots par date.
   * Pour activer l'API réelle, remplacer le corps par :
   *   const params = date ? new HttpParams().set('date', date) : {};
   *   return this.http.get<{ situations: Lot[] }>(this.apiUrl, { params });
   */
  getLots(date?: string): Observable<{ situations: Lot[] }> {
    const params = date ? new HttpParams().set('date', date) : undefined;
    // Pour tester sans backend, décommentez la ligne ci-dessous et commentez la requête HTTP.
    // return of(this.mockData);

    return this.http.get<{ situations: Lot[] }>(this.apiUrl, { params });
  }

  computeStats(lots: Lot[]): LotStats {
    const totalVolailles  = lots.reduce((s, l) => s + l.vivant.totalVelona, 0);
    const poidsTotal      = lots.reduce((s, l) => s + l.poids, 0);
    const sakafaTotal     = lots.reduce((s, l) => s + l.sakafo, 0);
    const achatTotal      = lots.reduce((s, l) => s + l.achat, 0);
    const beneficeTotal   = lots.reduce((s, l) => s + l.benefice, 0);
    const totalMortalite  = lots.reduce((s, l) => s + l.mort.totalMaty, 0);

    return {
      totalLots: lots.length,
      totalVolailles,
      poidsTotal,
      sakafaMoyenne: lots.length > 0 ? Math.round(sakafaTotal / lots.length) : 0,
      achatTotal,
      beneficeTotal,
      totalMortalite
    };
  }

  getBadgeType(lot: Lot): string {
    if (lot.nom.toLowerCase().startsWith('zanaka')) return 'sous-lot';
    if (lot.vivant.totalVelonaLahy === 0 && lot.vivant.totalVelonaVavy > 0) return 'ponte';
    if (lot.vivant.totalVelonaLahy > 0 && lot.vivant.totalVelonaVavy > 0) return 'mixte';
    return 'principal';
  }
}
