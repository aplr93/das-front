import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductComponent } from './list-product/list-product.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InsertProductComponent } from './insert-product/insert-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductService } from './services/product.service';


@NgModule({
  declarations: [
    ListProductComponent,
    InsertProductComponent,
    EditProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  providers: [
    ProductService
  ]
})
export class ProductModule { }
