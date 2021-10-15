import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditProductComponent } from './product/edit-product/edit-product.component';
import { InsertProductComponent } from './product/insert-product/insert-product.component';
import { ListProductComponent } from './product/list-product/list-product.component';

import { ListClientComponent } from './client/list-client/';
import { InsertClientComponent } from './client/insert-client/'
import { EditClientComponent } from './client/edit-client/'
import { ListOrderComponent } from './order/list-order/list-order.component';
import { InsertOrderComponent } from './order/insert-order/insert-order.component';
import { EditOrderComponent } from './order/edit-order/edit-order.component';

const routes: Routes = [
  { path: '', redirectTo: 'clients/list', pathMatch: 'full' },
  { path: 'clients', redirectTo: 'clients/list' },
  { path: 'clients/list', component: ListClientComponent },
  { path: 'clients/new', component: InsertClientComponent },
  { path: 'clients/edit/:id', component: EditClientComponent },
  
  { path: 'products', redirectTo: 'products/list' },
  { path: 'products/list', component: ListProductComponent },
  { path: 'products/new', component: InsertProductComponent},
  { path: 'products/edit/:id', component: EditProductComponent},

  { path: 'orders', redirectTo: 'orders/list' },
  { path: 'orders/list', component: ListOrderComponent },
  { path: 'orders/new', component: InsertOrderComponent},
  { path: 'orders/edit/:id', component: EditOrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
