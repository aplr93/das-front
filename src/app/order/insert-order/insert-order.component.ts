import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbCalendar, NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from 'src/app/customer/services';
import { ProductService } from 'src/app/product/services/product.service';
import { OrderItem } from 'src/app/shared/models/order-item.model';
import { Order } from 'src/app/shared/models/order.model';
import { Product } from 'src/app/shared/models/product.model';
import { OrderService } from '../services/order.service';


@Component({
  selector: 'app-insert-order',
  templateUrl: './insert-order.component.html',
  styleUrls: ['./insert-order.component.css']
})
export class InsertOrderComponent implements OnInit {
  @ViewChild('formOrder') formOrder! : NgForm;
  order! : Order;
  allProducts: Product[] = [];
  products!: Product[];

  page = 1;
  pageSize = 4;
  collectionSize!: number;

  today = this.calendar.getToday();
  datePicker: NgbDateStruct = this.today;

  timePicker!: NgbTimeStruct;
  spinners: boolean = false;

  cpfNotFound: boolean = false;


  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private customerService: CustomerService,
    private router: Router,
    private calendar: NgbCalendar,
  ) { }


  ngOnInit(): void {
    this.order = new Order();
    this.order.items = [];
    this.order.date = new Date();
    this.dateToTimePicker();
    this.listAllProducts();
  }


  insert(): void{
    if ( this.orderIsValid() ) {
      this.datetimePickerToDate();
      this.order.items = this.order.items!.filter(item => item.quantity! > 0);
      this.orderService.insert(this.order).subscribe({
        next: () =>  this.router.navigate( ["/orders"] ),
        error: (err: Error) => console.error('Failed to create order: ' + err)
      })
      
    }
  }


  refreshProducts(): void {
    this.products = this.allProducts
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }


  searchCPF(Cpf: string) {
    this.customerService.findByCPF(Cpf.replace(/\D/g,'')).subscribe({
      next: (customer) => {
        if (customer){
          this.cpfNotFound = false;
          this.order.customer = customer;
        }
        else{
          this.cpfNotFound = true;
          this.order.customer = undefined;
        }
      },
      error: (error) =>{
        console.log(error);
        this.cpfNotFound = true;
        this.order.customer = undefined;
      }
    });

  }


  listAllProducts(): void{
    this.productService.listAll().subscribe(
      (prods: Product[]) => {
        if (prods == null) {
          this.allProducts = [];
        }
        else {
          this.allProducts = prods;
        }
        this.collectionSize = this.allProducts.length;
        this.refreshProducts();
      }
    );
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
    if( parseInt(qtd)>0 && parseInt(qtd)<=1000 ){
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
  }


  toggleTimeSpinners(): void {
    this.spinners = !this.spinners;
  }


  closeCpfAlert(): void {
    this.cpfNotFound = false;
  }


  orderIsValid(): boolean{
    let hasProducts = this.order.items!
      .filter(item => item.quantity! > 0).length > 0 ? true : false;
    return Boolean(this.order.customer) && hasProducts;
  }


  private dateToTimePicker(): void {
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