import { Routes } from '@angular/router';
import { RoleGuard } from './service/role-guards';

export const routes: Routes = [
  // ✅ page login claire
  {
    path: '',
    loadChildren: () => import('./login/login-module').then(m => m.LOGINModule),
  },

  // ✅ modules protégés
  {
    path: 'admin',
    canMatch: [RoleGuard('ADMIN')],
    loadChildren: () => import('./admin/admin-module').then(m => m.AdminModule),
  },
  {
    path: 'vendeur',
    canMatch: [RoleGuard('VENDEUR')],
    loadChildren: () => import('./vendeur/vendeur-module').then(m => m.VendeurModule),
  },
  {
    path: 'acheteur',
    canMatch: [RoleGuard('ACHETEUR')],
    loadChildren: () => import('./acheteur/acheteur-module').then(m => m.AcheteurModule),
  },

];
