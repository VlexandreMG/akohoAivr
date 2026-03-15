import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardAtomComponent } from '../atoms/card.atom.component';

@Component({
  selector: 'app-bilan-card',
  standalone: true, 
  imports: [CommonModule, CardAtomComponent],
  template: `
    <app-card>
      <div class="text-center">
        <h3 class="text-sm text-gray-500">{{ title }}</h3>
        <p class="text-3xl font-bold mt-2 text-primary">{{ value | number:'1.0-0' }}</p>
        <p class="text-xs text-gray-400 mt-1">{{ unit }}</p>
      </div>
    </app-card>
  `
})
export class BilanCardMoleculeComponent {
  @Input() title = '';
  @Input() value: number = 0;
  @Input() unit = '';
}