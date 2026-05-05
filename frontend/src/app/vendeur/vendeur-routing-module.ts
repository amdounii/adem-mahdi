import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Acceuil } from './acceuil/acceuil';
import { Consultevoiture } from './consultevoiture/consultevoiture';
import { Moncompte } from './moncompte/moncompte';
import { Publier } from './publier/publier';
import { Edit } from './edit/edit';
import { Commentaire } from './commentaire/commentaire';

const routes: Routes = [
  { path: '', component: Acceuil },
  { path: 'consulte/:id', component: Consultevoiture },
  { path: 'publier', component: Publier },
  { path: 'moncompte', component: Moncompte },
  { path: 'edit/:id', component: Edit },
  { path: 'commentaire/:id', component: Commentaire }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendeurRoutingModule { }
