import { Injectable } from '@angular/core';
import { Order } from 'src/app/shared/models/order.model';

const LS_KEY: string = "orders";


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  
  listAll(): Order[]{
    const orders = localStorage.getItem(LS_KEY);
    return orders ? JSON.parse(orders) : [];
  }


  insert(order: Order): void {
    const orders = this.listAll();
    order.id = new Date().getTime();
    orders.push(order);
    localStorage.setItem(LS_KEY, JSON.stringify(orders) );
  }


  searchById(id: number): Order{
    const orders: Order[] = this.listAll();
    return orders.find(order => order.id === id)!;
  }


  update(order: Order): void{
    const orders: Order[] = this.listAll();

    orders.forEach( (obj, index, objs) => {
      if (order.id === obj.id){
        objs[index] = order;
      }
    });
    localStorage.setItem(LS_KEY, JSON.stringify(orders) );
  }


  remove(id: number): void{
    let orders: Order[] = this.listAll();
    orders = orders.filter(order => order.id !== id);
    localStorage.setItem(LS_KEY, JSON.stringify(orders) );
  }

}
