import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientService } from './services';
import { ListClientComponent } from './list-client/list-client.component';

import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ListClientComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class ClientModule { }
