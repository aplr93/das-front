import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'src/app/shared/models/order.model';
import { OrderItem} from 'src/app/shared/models/order_item.model';
import { OrderService } from '../services/order.service';



@Component({
  selector: 'app-insert-order',
  templateUrl: './insert-order.component.html',
  styleUrls: ['./insert-order.component.css']
})
export class InsertOrderComponent implements OnInit {
  

  @ViewChild('formOrder') formOrder! : NgForm;
  order! : Order;
  order_item! : OrderItem;

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

  // listenToCpfChange(){
  //   this.formOrder.controls.id_client.valueChanges.subscribe(id_client=>{
  //     if(id_client > 24){
  //       this.formOrder.controls.id_client.setErrors()  
  //     }else{
  //       this.formOrder.controls.id_client.setErrors(null)
  //     }
  //   })
  // }

}
