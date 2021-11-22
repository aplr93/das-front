import { Injectable } from '@angular/core';
import { Order } from 'src/app/shared/models/order.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class OrderService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  readonly URL = env.BASE_URL + "orders/";

  constructor(
    private httpClient: HttpClient,
  ) { }


  listAll(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.URL, this.httpOptions);
  }


  searchById(id: number): Observable<Order> {
    return this.httpClient.get<Order>(this.URL + id, this.httpOptions);
  }


  insert(order: Order): Observable<Order> {
    return this.httpClient.post<Order>(this.URL, order, this.httpOptions);
  }


  update(order: Order): Observable<Order> {
    return this.httpClient.put<Order>(this.URL + order.id, order, this.httpOptions)
  }


  remove(id: number): Observable<Order> {
    return this.httpClient.delete<Order>(this.URL + id, this.httpOptions);
  }

}