import { Routes } from '@angular/router';
import { LotSituationComponent } from './component/situation.component/situation.component';

export const routes: Routes = [
  { path: '', component: LotSituationComponent, pathMatch: 'full' }
];
