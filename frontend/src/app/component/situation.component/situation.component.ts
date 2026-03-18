import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { firstValueFrom, of } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { Lot, LotStats } from '../../model/situation';
import { LotService } from '../../service/situation.service';

@Component({
  selector: 'app-lot-situation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './situation.component.html',
  styleUrls: ['./situation.component.css']
})
export class LotSituationComponent implements OnInit {

  private lotService = inject(LotService);

  lots = signal<Lot[]>([]);
  stats = signal<LotStats>({
    totalLots: 0,
    totalVolailles: 0,
    poidsTotal: 0,
    sakafaMoyenne: 0,
    achatTotal: 0,
    beneficeTotal: 0,
    totalMortalite: 0
  });

  loading = signal(true);
  errorMessage = signal<string | null>(null);

  selectedDate = signal(this.toDateString(new Date()));

  today = computed(() =>
    new Date().toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  );

  readonly cardColors = ['c1','c2','c3','c4','c5','c6','c7','c8','c9','c10'];

  private readonly numberFormatter = new Intl.NumberFormat('fr-FR');
  private readonly dateFormatter = new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  constructor() {}

  ngOnInit(): void {
    this.loadLots();
  }

  async loadLots(): Promise<void> {
    this.loading.set(true);
    this.errorMessage.set(null);

    try {
      const res = await firstValueFrom(
        this.lotService.getLots(this.selectedDate())
          .pipe(
            timeout(15000),
            catchError((err) => {
              console.error('[LotSituationComponent] API error (timeout/cors)', err);
              this.errorMessage.set('Impossible de charger les données (vérifiez le backend / CORS).');
              return of({ situations: [] });
            })
          )
      );

      console.log('[LotSituationComponent] API response', res);

      const situations = (res as any).situations ?? res;
      this.lots.set(Array.isArray(situations) ? situations : [situations]);

      this.stats.set(this.lotService.computeStats(this.lots()));
      console.log('[LotSituationComponent] parsed lots', this.lots());
    } catch (err) {
      console.error('[LotSituationComponent] API error (await)', err);
      this.errorMessage.set('Erreur inattendue lors du chargement des données.');
    } finally {
      this.loading.set(false);
    }
  }



  onFilter(): void {
    this.loadLots();
  }

  getCardColor(index: number): string {
    return this.cardColors[index % this.cardColors.length];
  }

  getBadge(lot: Lot): { label: string; css: string } {
    const map: Record<string, { label: string; css: string }> = {
      'sous-lot':  { label: 'Sous-lot',      css: 'b2' },
      'ponte':     { label: 'Ponte',          css: 'b4' },
      'mixte':     { label: 'Mixte',          css: 'b5' },
      'principal': { label: 'Principal',      css: 'b1' }
    };
    return map[this.lotService.getBadgeType(lot)] ?? { label: 'Principal', css: 'b1' };
  }

  formatNumber(value: number): string {
    return this.numberFormatter.format(value);
  }

  formatDate(dateStr: string): string {
    return this.dateFormatter.format(new Date(dateStr));
  }

  trackByLotId(_: number, lot: Lot): number {
    return lot.id;
  }

  private toDateString(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}
