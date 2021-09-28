import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientService } from './services';
import { ListClientComponent } from './list-client/list-client.component';


@NgModule({
  declarations: [
    ListClientComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ClientModule { }
