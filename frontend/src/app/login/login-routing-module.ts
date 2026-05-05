import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Connecter } from './connecter/connecter';
import { Inscription } from './inscription/inscription';

const routes: Routes = [
  { path: '', component: Connecter },
  {path:'inscription',component: Inscription}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LOGINRoutingModule { }
