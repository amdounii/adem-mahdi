import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LOGINRoutingModule } from './login-routing-module';
import { Connecter } from './connecter/connecter';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Inscription } from './inscription/inscription';



@NgModule({
  declarations: [
    Connecter,
    Inscription
  ],


  imports: [
    CommonModule,
    LOGINRoutingModule,
    ReactiveFormsModule,
    FormsModule

  ]
})
export class LOGINModule { }
