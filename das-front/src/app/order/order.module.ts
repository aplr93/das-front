import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from './services/order.service';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { ListOrderComponent } from './list-order/list-order.component';
import { InsertOrderComponent } from './insert-order/insert-order.component';
import { EditOrderComponent } from './edit-order/edit-order.component';



@NgModule({
  declarations: [
    ListOrderComponent,
    InsertOrderComponent,
    EditOrderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  providers: [
    OrderService,
  ]
})
export class OrderModule { }
