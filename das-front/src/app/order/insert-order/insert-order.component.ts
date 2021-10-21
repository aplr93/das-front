import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbCalendar, NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from 'src/app/client/services';
import { ProductService } from 'src/app/product/services/product.service';
import { Client } from 'src/app/shared/models';
import { OrderItem } from 'src/app/shared/models/order-item.model';
import { Order } from 'src/app/shared/models/order.model';
import { Product } from 'src/app/shared/models/product.model';
import { OrderService } from '../services/order.service';


let carlos: Client = new Client(1, "07516336904", "Carlos", "Severino");


@Component({
  selector: 'app-insert-order',
  templateUrl: './insert-order.component.html',
  styleUrls: ['./insert-order.component.css']
})
export class InsertOrderComponent implements OnInit {

  @ViewChild('formOrder') formOrder! : NgForm;
  order! : Order;
  allProducts!: Product[];
  products!: Product[];
  customer!: Client;
  orderItems: OrderItem[] = [];
  
  page = 1;
  pageSize = 4;
  collectionSize!: number;

  datePicker!: NgbDateStruct;
  date!: Date;
  today = this.calendar.getToday();
  
  timePicker!: NgbTimeStruct;
  spinners = false;

  cpfNotFound = false;

  
  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private clientService: ClientService,
    private router: Router,
    private calendar: NgbCalendar
  ) { }


  ngOnInit(): void {
    this.order = new Order();
    this.allProducts = this.listAllProducts();
    this.collectionSize = this.allProducts.length;
    this.refreshProducts();
    this.date = new Date();
    this.datePicker = {day: this.date.getUTCDay(), month: this.date.getUTCMonth(), year: this.date.getUTCFullYear()};
    this.timePicker = {hour: this.date.getHours() , minute: this.date.getMinutes(), second: this.date.getSeconds()};
  }

  insert(): void{
    if (this.formOrder.form.valid) {
      this.order.items = this.orderItems;
      this.order.client = this.customer;
      this.date.setUTCFullYear(this.datePicker.year, this.datePicker.month, this.datePicker.day);
      this.date.setUTCHours(this.timePicker.hour, this.timePicker.minute, this.timePicker.second);

      this.order.date = this.date;
      this.orderService.insert(this.order);
      this.router.navigate( ["/orders"] );
    }
  }
  
  refreshProducts(): void {
    this.products = this.allProducts
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  buscar(cpf: string) {
    let cus = this.clientService.findByCPF(cpf)
    console.log("CPF: "+cus)
    if (cus){
      this.customer = cus;
    }
    else{
      this.cpfNotFound = true;
    }
  }

  listAllProducts(): Product[]{
    return this.productService.listAll();
  }

  removeOne($event: any, orderItem: OrderItem): void {
    $event.preventDefault();
    this.orderItems.forEach( (obj) => {
      if ( orderItem.product?.id === obj.product?.id ){
        if (obj.quantity != null && obj.quantity > 0){
          obj.quantity = obj.quantity-1;
        }
      }
    })
  }

  addOne($event: any, orderItem: OrderItem): void {
    $event.preventDefault();
    this.orderItems.forEach( (obj) => {
      if (obj.quantity != null && orderItem.product?.id === obj.product?.id ){
        obj.quantity = obj.quantity+1;
      }
    })
  }


  removeItem($event: any, orderItem: OrderItem): void {
    $event.preventDefault();
    this.orderItems.forEach( (obj, index, objs) => {
      if (orderItem.product?.id === obj.product?.id && obj.quantity != null){
        objs.splice(index,1);
      }
    })
  }

  
  addProduct($event: any, product: Product, qtd: string): void{
    $event.preventDefault();
    let found =  false;
    this.orderItems.forEach( (obj) => {
      if (obj.product?.id == product.id){
        obj.quantity! += parseInt(qtd);
        found = true;
      }
    });
    if (!found){
      this.orderItems.push( new OrderItem(product, parseInt(qtd)) );
    }
  }


  toggleSpinners() {
    this.spinners = !this.spinners;
  } 

  closeAlert() {
    this.cpfNotFound = false;
  }

}