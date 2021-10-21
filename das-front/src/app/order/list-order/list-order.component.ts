import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/order.model';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {

  orders!: Order[];
  AllOrders!: Order[];

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.AllOrders = this.listAll();
    this.orders = this.AllOrders;
  }

  listAll(): Order[]{
    return this.orderService.listAll();
  }

  remove($event: any, order: Order): void {
    $event.preventDefault();
    if (confirm('Deseja realmente remover o pedido "' + order.id + '"?')) {
      this.orderService.remove(order.id!);
      this.orders = this.listAll();
    }
  }

  filterByCPF(cpf: string): void{
    this.orders = this.AllOrders.filter( (order) => order.client?.cpf == cpf);
  }

  removeFilter(): void{
    this.orders = this.AllOrders;
  }
}
