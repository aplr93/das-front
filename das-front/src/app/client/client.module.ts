import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientService } from './services/';
import { ListClientComponent } from './list-client/';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { InsertClientComponent } from './insert-client/insert-client.component';


@NgModule({
  declarations: [
    ListClientComponent,
    InsertClientComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  providers: [
    ClientService,
  ]
})
export class ClientModule { }
