import { Injectable } from '@angular/core';

import { Client } from '../../shared/models';

const LS_KEY: string = "clients";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor() { }

  listAll(): Client[]{
    const clients = localStorage.getItem(LS_KEY);
    return clients ? JSON.parse(clients) : [];
  }

  insert(newClient: Client): void {
    newClient.id = this.createUserId();

    const existingClients = this.listAll();
    existingClients.push(newClient);
    localStorage.setItem(LS_KEY, JSON.stringify(existingClients));
  }

  findById(clientId: number): Client{
    const clients: Client[] = this.listAll();
    let client = this.searchOrCreateClient(clientId, clients);
    return client;
  }

  findByCPF(cpf: string): Client | undefined{
    let clientList: Client[] = this.listAll();
    let client = clientList.find( client => client.cpf === cpf);
    return client;
  }

  update(client: Client): void{
    let clientList: Client[] = this.listAll();
    clientList = this.iterateAndUpdateClientList(client, clientList);

    localStorage.setItem(LS_KEY, JSON.stringify(clientList));
  }

  remove(id: number): void{
    let clients: Client[] = this.listAll();
    clients = clients.filter(client => client.id !== id);

    localStorage.setItem(LS_KEY, JSON.stringify(clients) );
  }

  private iterateAndUpdateClientList(updatedClient: Client, currentClientList: Client[]): Client[]{
    currentClientList.forEach( (object, index, objectList) => {
      if (updatedClient.id === object.id) {
        objectList[index] = updatedClient;
      }
    });
    return currentClientList;
  }

  private searchOrCreateClient(id: number, clientList: Client[]): Client{
    let client = clientList.find(client => client.id === id);
    if(!client){
      client = new Client();
    }
    return client;
  }

  private createUserId(): number {
    return new Date().getTime(); // seconds since epoch
  }
}
