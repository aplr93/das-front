import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientService } from './services/';
import { ListClientComponent } from './list-client/';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { InsertClientComponent } from './insert-client/';
import { EditClientComponent } from './edit-client/';
import { NgxMaskModule, IConfig } from 'ngx-mask'


@NgModule({
  declarations: [
    ListClientComponent,
    InsertClientComponent,
    EditClientComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    ClientService,
  ]
})
export class ClientModule { }
