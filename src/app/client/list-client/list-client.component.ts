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
    this.listAllClients();
  }

  listAllClients(): void{
    this.clientService.listAll().subscribe(
      clientList => this.clients = clientList
    );
  }

  remove($event: any, client: Client): void {
    $event.preventDefault();
    if (this.userConfirmsRemoval(client)) {
      this.removeClient(client);
    }
  }

  userConfirmsRemoval(client: Client): boolean {
    return confirm('Deseja realmente remover a pessoa "' + client.firstName + '"?');
  }

  removeClient(client: Client): void{
    this.clientService.remove(client.id!)
      .subscribe(
        () => this.listAllClients()
      );
  }

}
