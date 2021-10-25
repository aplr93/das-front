import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCalendar, NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/product/services/product.service';
import { Client } from 'src/app/shared/models';
import { OrderItem } from 'src/app/shared/models/order-item.model';
import { Order } from 'src/app/shared/models/order.model';
import { Product } from 'src/app/shared/models/product.model';
import { OrderService } from '../services/order.service';


@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {

  @ViewChild("formOrder") formOrder!: NgForm;
  order!: Order;

  allProducts!: Product[];
  products!: Product[];
  
  page = 1;
  pageSize = 4;
  collectionSize!: number;

  today = this.calendar.getToday();
  datePicker: NgbDateStruct = this.today;
  timePicker!: NgbTimeStruct;
  spinners: boolean = false;

 
  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private calendar: NgbCalendar
  ) { }


  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    this.order = id ? this.orderService.searchById(id) : new Order(0, new Date(), new Client, []);
    this.dateToDatetimePicker();
    this.allProducts = this.listAllProducts();
    this.refreshProducts();
  }


  update(): void {
    if ( this.orderIsValid() ) {
      this.datetimePickerToDate();
      this.orderService.update(this.order);
      this.router.navigate(['/orders']);
    }
  }


  refreshProducts(): void {
    this.products = this.allProducts
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }


  listAllProducts(): Product[]{
    let products = this.productService.listAll();
    this.collectionSize = products.length;
    return products;
  }


  removeOne($event: any, orderItem: OrderItem): void {
    $event.preventDefault();
    this.order.items!.forEach( (item) => {
      if ( orderItem.product?.id === item.product?.id && item.quantity != null && item.quantity > 0){
        item.quantity = item.quantity-1; 
      }
    })
  }


  addOne($event: any, orderItem: OrderItem): void {
    $event.preventDefault();
    this.order.items!.forEach( (obj) => {
      if (obj.quantity != null && orderItem.product?.id === obj.product?.id ){
        obj.quantity = obj.quantity+1;
      }
    })
  }


  removeItem($event: any, orderItem: OrderItem): void {
    $event.preventDefault();
    this.order.items!.forEach( (obj, index, objs) => {
      if (orderItem.product?.id === obj.product?.id){
        objs.splice(index,1);
      }
    })
  }

  
  addProduct($event: any, product: Product, qtd: string): void{
    $event.preventDefault();
    let found =  false;
    this.order.items!.forEach( (obj) => {
      if (obj.product?.id == product.id){
        obj.quantity! += parseInt(qtd);
        found = true;
      }
    });
    if (!found){
      this.order.items!.push( new OrderItem(product, parseInt(qtd)) );
    }
  }


  toggleTimeSpinners(): void {
    this.spinners = !this.spinners;
  } 


  orderIsValid(): boolean{
    let hasProducts = this.order.items!
      .filter(item => item.quantity! > 0).length > 0 ? true : false;

    if (this.order.client && hasProducts )
      return true;
    else
      return false;
  }


  dateToDatetimePicker(): void {
    if (this.order.date){
      this.order.date = new Date(this.order.date!);
      this.dateToTimePicker();
      this.dateToDatePicker();
    }
  }


  private dateToDatePicker() {
    this.datePicker = {
      day: this.order.date!.getUTCDate(),
      month: this.order.date!.getUTCMonth() + 1,
      year: this.order.date!.getUTCFullYear()
    };
  }


  private dateToTimePicker() {
    this.timePicker = {
      hour: this.order.date!.getHours(),
      minute: this.order.date!.getMinutes(),
      second: this.order.date!.getSeconds()
    };
  }


  private datetimePickerToDate(): void {
    this.order.date?.setUTCFullYear(this.datePicker.year, this.datePicker.month - 1, this.datePicker.day);
    this.order.date?.setUTCHours(this.timePicker.hour, this.timePicker.minute, this.timePicker.second);
  }


}
