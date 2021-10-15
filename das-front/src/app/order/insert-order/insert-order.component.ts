import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'src/app/shared/models/order.model';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-insert-order',
  templateUrl: './insert-order.component.html',
  styleUrls: ['./insert-order.component.css']
})
export class InsertOrderComponent implements OnInit {

  images = [1055, 194, 368].map((n) => `https://picsum.photos/id/${n}/900/500`);
  
  @ViewChild('formOrder') formOrder! : NgForm;
  order! : Order;

  constructor(
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.order = new Order();
  }

  insert(): void{
    if (this.formOrder.form.valid) {
      this.orderService.insert(this.order);
      this.router.navigate( ["/orders"] );
    }
  }

}