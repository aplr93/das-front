import { Injectable } from '@angular/core';
import { Order } from 'src/app/shared/models/order.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderData } from 'src/app/shared/models/orderdata.model';


@Injectable({
  providedIn: 'root'
})

export class OrderService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  URL = env.BASE_URL + "orders/";

  constructor(
    private httpClient: HttpClient,
  ) { }


  listAll(): Observable<Order[]> {
    return this.httpClient.get<OrderData[]>(this.URL, this.httpOptions)
      .pipe(
        map(receivedData => this.fromOrderDataList(receivedData))
      );
  }


  searchById(id: number): Observable<Order> {
    return this.httpClient.get<OrderData>(this.URL + id, this.httpOptions)
      .pipe(
        map(receivedData => this.fromOrderData(receivedData))
      );
  }


  insert(order: Order): Observable<Order> {
    return this.httpClient.post<OrderData>(this.URL, this.toOrderData(order), this.httpOptions)
      .pipe(
        map(receivedData => this.fromOrderData(receivedData))
      );
  }


  update(order: Order): Observable<Order> {
    return this.httpClient.put<OrderData>(this.URL + order.id, this.toOrderData(order), this.httpOptions)
      .pipe(
        map(receivedData => this.fromOrderData(receivedData))
      );
  }


  remove(id: number): Observable<OrderData> {
    return this.httpClient.delete<OrderData>(this.URL + id, this.httpOptions);
  }


  toOrderData(order: Order): String {
    return JSON.stringify(new OrderData(order.id, order.date, order.client, order.items));
  }


  fromOrderData(orderData: OrderData): Order {
    return new Order(orderData.id, orderData.date, orderData.customer, orderData.items);
  }


  fromOrderDataList(orderDataList: OrderData[]): Order[] {
    let OrderList: Order[] = [];
    orderDataList.forEach((order) => {
      OrderList.push(new Order(order.id, order.date, order.customer, order.items))
    });
    return OrderList;
  }

}