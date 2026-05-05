import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendeurRoutingModule } from './vendeur-routing-module';
import { Consultevoiture } from './consultevoiture/consultevoiture';
import { Moncompte } from './moncompte/moncompte';
import { Publier } from './publier/publier';
import { Acceuil } from './acceuil/acceuil';  
import { FormsModule } from '@angular/forms';
import { Edit } from './edit/edit';
import { Commentaire } from './commentaire/commentaire';


@NgModule({
  declarations: [
    Consultevoiture,
    Moncompte,
    Publier,
    Acceuil,
    Edit,
    Commentaire
  ],
  imports: [
    CommonModule,
    VendeurRoutingModule,
    FormsModule
  ]
})
export class VendeurModule { }
