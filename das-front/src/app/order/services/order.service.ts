import { Injectable } from '@angular/core';
import { Order } from 'src/app/shared/models/order.model';
import { OrderItem } from 'src/app/shared/models/order_item.model';


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

    var data = new Date(),
    dia  = data.getDate().toString(),
    diaF = (dia.length == 1) ? '0'+dia : dia,
    mes  = (data.getMonth()+1).toString(), 
    mesF = (mes.length == 1) ? '0'+mes : mes,
    anoF = data.getFullYear();
    const data_atual = diaF+"/"+mesF+"/"+anoF;
    
    order.id = new Date().getTime();
    order.date = data_atual

    orders.forEach( (obj, index, objs) => {
      if (order.id_cliente === obj.id_cliente){
        
      }
      else{
         order.id_cliente = order.id_cliente
      }
    });
    
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
