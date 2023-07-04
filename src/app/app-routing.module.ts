import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListFlowerComponent } from './flower/list-flower/list-flower.component';
import { NewFlowerComponent } from './flower/new-flower/new-flower.component';
import { ApiComponent } from './api/api.component';

const routes: Routes = [
  {path: '', redirectTo: 'catalogo', pathMatch: 'full'},
  {path: 'catalogo', component: ListFlowerComponent},
  {path: 'nueva-flor', component: NewFlowerComponent},
  { path: '/api/:id', component: ApiComponent },
  {path: '**', redirectTo: 'catalogo', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
