import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { InsertProductComponent } from './product/insert-product/insert-product.component';
import { ListProductComponent } from './product/list-product/list-product.component';

const routes: Routes = [
  { path: '', redirectTo: 'products/list', pathMatch: 'full' },
  { path: 'products', redirectTo: 'products/list' },
  { path: 'products/list', component: ListProductComponent },
  { path: 'products/new', component: InsertProductComponent},
  { path: 'products/edit/:id', component: EditProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
