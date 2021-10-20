import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ListProductComponent } from './list-product/list-product.component';
import { InsertProductComponent } from './insert-product/insert-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';


@NgModule({
  declarations: [
    ListProductComponent,
    InsertProductComponent,
    EditProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  providers: [
    ProductModule
  ]
})
export class ProductModule { }
