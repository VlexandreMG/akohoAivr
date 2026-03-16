// ui/molecules/bilan-card/bilan-card.component.ts
import { Component, Input } from '@angular/core';
import { CardComponent } from '../../atoms/card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bilan-card',
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <app-card>
      <div class="text-center py-3">
        <h6 class="text-muted mb-1">{{ title }}</h6>
        <div class="display-5 fw-bold" [ngClass]="valueClass">{{ value | number:'1.0-0' }}</div>
        <small class="text-muted">{{ unit }}</small>
      </div>
    </app-card>
  `
})
export class BilanCardComponent {
  @Input() title = '';
  @Input() value: number = 0;
  @Input() unit = '';
  @Input() valueClass = 'text-dark';
}