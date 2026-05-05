import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Listevoiture } from './listevoiture/listevoiture';


import { AdminRoutingModule } from './admin-routing-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Detaillevoiture } from './detaillevoiture/detaillevoiture';
import { Detailleutilisateur } from './detailleutilisateur/detailleutilisateur';
import { Listeutilisateur } from './listeutilisateur/listeutilisateur';


@NgModule({
  declarations: [
    Listevoiture,
    Listeutilisateur,
    Detaillevoiture,
    Detailleutilisateur

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,ReactiveFormsModule
  ]
})
export class AdminModule { }
