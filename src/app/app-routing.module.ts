import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditProductComponent } from './product/edit-product/edit-product.component';
import { InsertProductComponent } from './product/insert-product/insert-product.component';
import { ListProductComponent } from './product/list-product/list-product.component';

import { ListCustomerComponent } from './customer/list-customer/';
import { InsertCustomerComponent } from './customer/insert-customer/';
import { EditCustomerComponent } from './customer/edit-customer/';
import { ListOrderComponent } from './order/list-order/list-order.component';
import { InsertOrderComponent } from './order/insert-order/insert-order.component';
import { EditOrderComponent } from './order/edit-order/edit-order.component';

const routes: Routes = [
  { path: '', redirectTo: 'customers/list', pathMatch: 'full' },
  { path: 'customers', redirectTo: 'customers/list' },
  { path: 'customers/list', component: ListCustomerComponent },
  { path: 'customers/new', component: InsertCustomerComponent },
  { path: 'customers/edit/:id', component: EditCustomerComponent },

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
