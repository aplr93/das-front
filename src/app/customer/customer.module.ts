import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from './services';
import { ListCustomerComponent } from './list-customer';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { InsertCustomerComponent } from './insert-customer';
import { EditCustomerComponent } from './edit-customer';
import { NgxMaskModule } from 'ngx-mask';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ListCustomerComponent,
    InsertCustomerComponent,
    EditCustomerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    CustomerService,
  ]
})
export class CustomerModule { }
