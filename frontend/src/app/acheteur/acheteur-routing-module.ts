import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Acceuil } from './acceuil/acceuil';
import { Commentaire } from './commentaire/commentaire';
import { Profil } from './profil/profil';
import { Consultevoiture } from './consultevoiture/consultevoiture';

const routes: Routes = [
  { path: '', component: Acceuil },
  { path: 'commentaire/:id', component: Commentaire },
  { path: 'profil', component: Profil },
  { path: 'consulte/:id', component: Consultevoiture },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcheteurRoutingModule { }
