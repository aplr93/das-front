import { Component, OnInit } from '@angular/core';

import { ClientService } from '../services/client.service';
import { Client } from '../../shared/models';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {

  clients: Client[] = [];

  constructor(
    private clientService: ClientService,
  ) { }

  ngOnInit(): void {
    this.clients = this.listAll();
  }

  listAll(): Client[] {
    return this.clientService.listAll();
  }

  remove($event: any, client: Client): void {
    $event.preventDefault();
    if (this.userConfirmsRemoval(client)) {
      this.removeClientIfRegistered(client);
      this.clients = this.listAll();
    }
  }

  userConfirmsRemoval(client: Client): boolean {
    return confirm('Deseja realmente remover a pessoa "' + client.firstName + '"?');
  }

  removeClientIfRegistered(client: Client): void{
    if (client.id)
    {
      this.clientService.remove(client.id);
    }
  }

}
