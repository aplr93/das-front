import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListOrderComponent } from './list-order/list-order.component';
import { InsertOrderComponent } from './insert-order/insert-order.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { OrderService } from './services/order.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';


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
    NgbModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    OrderService
  ]
})
export class OrderModule { }
