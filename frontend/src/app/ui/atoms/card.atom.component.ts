import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <div class="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class CardAtomComponent {}