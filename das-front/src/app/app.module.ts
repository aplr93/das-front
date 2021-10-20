import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { ClientModule } from './client';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductModule,
    OrderModule,
    ClientModule,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
