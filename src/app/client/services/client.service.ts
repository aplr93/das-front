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

  readonly BASE_URL: string = 'http://localhost:8111/customers/';

  constructor(private httpClient: HttpClient) { }

  insert(newClient: Client): Observable<Client> {
    newClient.id = this.createUserId();
    return this.httpClient.post<Client>(this.BASE_URL, newClient);
  }

  findById(clientId: number): Observable<Client> {
    let findByIdUrl = this.BASE_URL + clientId + '/';
    return this.httpClient.get<Client>(findByIdUrl);
  }

  listAll(): Observable<Client[]>{
    return this.httpClient.get<Client[]>(this.BASE_URL);
  }
  findByCPF(cpf: string): Observable<Client | undefined>{
    let clientListObservable = this.listAll();
    return clientListObservable.pipe(
      map(clientList => clientList.find(client => client.cpf === cpf))
    );
  }

  update(client: Client): Observable<Client>{
    return this.httpClient.put<Client>(this.BASE_URL + client.id, client);
  }

  remove(id: number): Observable<Client>{
    return this.httpClient.delete<Client>(this.BASE_URL + id);
  }

  private createUserId(): number {
    return new Date().getTime(); // seconds since epoch
  }
}
