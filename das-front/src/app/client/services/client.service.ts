import { Injectable } from '@angular/core';

import { Client } from '../../shared/models';

const LS_KEY: string = "clients";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor() { }

  listAll(): Client[]{
    const clients = localStorage[LS_KEY];
    return clients ? JSON.parse(clients) : [];
  }

  insert(client: Client): void {
    const clients = this.listAll();

    client.id = new Date().getTime(); // segundos desde epoch

    clients.push(client);

    localStorage[LS_KEY] = JSON.stringify(clients);
  }

  findById(id: number): Client{
    const clients: Client[] = this.listAll();

    let client = clients.find(client => client.id === id);
    if(!client) 
      client = new Client();

    return client;
  }

  update(client: Client): void{
    const clients: Client[] = this.listAll();

    clients.forEach( (obj, index, objs) => {
      if (client.id === obj.id) {
        objs[index] = client;
      }
    });

    localStorage[LS_KEY] = JSON.stringify(clients);
  }

  remove(id: number): void{
    let clients: Client[] = this.listAll();

    clients = clients.filter(client => client.id !== id);

    localStorage[LS_KEY] = JSON.stringify(clients);
  }
}
