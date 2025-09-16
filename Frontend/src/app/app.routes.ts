import { Routes } from '@angular/router';
import { Facturas } from './Views/facturas/facturas';

export const routes: Routes = [
    {
    path: '',
    component: Facturas,
    pathMatch: 'full'
  }
];
