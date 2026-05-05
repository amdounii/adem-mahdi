import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcheteurRoutingModule } from './acheteur-routing-module';
import { Acceuil } from './acceuil/acceuil';
import { Commentaire } from './commentaire/commentaire';
import { Consultevoiture } from './consultevoiture/consultevoiture';
import { Profil } from './profil/profil';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    Acceuil,
    Commentaire,
    Consultevoiture,
    Profil
  ],
  imports: [
    CommonModule,
    AcheteurRoutingModule,
    FormsModule
  ]
})
export class AcheteurModule { }
