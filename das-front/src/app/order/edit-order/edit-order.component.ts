import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/shared/models/order.model';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {

  @ViewChild("formOrder") formOrder!: NgForm;
  order!: Order;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    this.order = id ? this.orderService.searchById(id) : new Order(0,"");
  }

  update(): void {
    if (this.formOrder.form.valid) {
      this.orderService.update(this.order);
      this.router.navigate(['/orders']);
    }
  }

}
