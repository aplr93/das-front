import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListClientComponent } from './client/list-client/';
import { InsertClientComponent } from './client/insert-client/'
import { EditClientComponent } from './client/edit-client/'

const routes: Routes = [
  { path: '', redirectTo: 'clients/list', pathMatch: 'full' },
  { path: 'clients', redirectTo: 'clients/list' },
  { path: 'clients/list', component: ListClientComponent },
  { path: 'clients/new', component: InsertClientComponent },
  { path: 'clients/edit/:id', component: EditClientComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
