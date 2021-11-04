import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, single } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import { Client } from '../../shared/models';

const LS_KEY: string = "clients";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  readonly BASE_URL: string = 'http://localhost:8080/customers/';

  readonly HTTP_OPTIONS = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  constructor(private httpClient: HttpClient) { }



  insert(newClient: Client): Observable<Client> {
    newClient.id = this.createUserId();

    return this.httpClient.post<Client>(this.BASE_URL, JSON.stringify(newClient), this.HTTP_OPTIONS);
  }

  findById(clientId: number): Observable<Client> {
    let findByIdUrl = this.BASE_URL + clientId + '/';
    return this.httpClient.get<Client>(findByIdUrl, this.HTTP_OPTIONS);
  }

  listAll(): Observable<Client[]>{
    return this.httpClient.get<Client[]>(this.BASE_URL, this.HTTP_OPTIONS);
  }
  findByCPF(cpf: string): Observable<Client | undefined>{
    let clientListObservable = this.listAll();
    return clientListObservable.pipe(
      map(clientList => clientList.find(client => client.cpf === cpf))
    );
  }

  update(client: Client): Observable<Client>{
    return this.httpClient.put<Client>(this.BASE_URL + client.id,
      JSON.stringify(client),
      this.HTTP_OPTIONS);
  }

  remove(id: number): Observable<Client>{
    return this.httpClient.delete<Client>(this.BASE_URL + id, this.HTTP_OPTIONS);
  }

  // private iterateAndUpdateClientList(updatedClient: Client, currentClientList: Client[]): Client[]{
  //   currentClientList.forEach( (object, index, objectList) => {
  //     if (updatedClient.id === object.id) {
  //       objectList[index] = updatedClient;
  //     }
  //   });
  //   return currentClientList;
  // }

  // private searchOrCreateClient(id: number, clientList: Client[]): Client{
  //   let client = clientList.find(client => client.id === id);
  //   if(!client){
  //     client = new Client();
  //   }
  //   return client;
  // }

  private createUserId(): number {
    return new Date().getTime(); // seconds since epoch
  }
}
