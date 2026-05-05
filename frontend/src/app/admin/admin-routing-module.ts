import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Menu } from './menu/menu';
import { Listevoiture } from './listevoiture/listevoiture';
import { Listeutilisateur } from './listeutilisateur/listeutilisateur';
import { Detaillevoiture } from './detaillevoiture/detaillevoiture';
import { Detailleutilisateur } from './detailleutilisateur/detailleutilisateur';



const routes: Routes = [
   { path: '', component: Menu },
   { path: 'listevoiture', component: Listevoiture },
   { path: 'listeutilisateur', component: Listeutilisateur },
  { path: 'detaillevoiture/:id', component: Detaillevoiture },
  { path: 'detailleutilisateur/:id', component: Detailleutilisateur },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
