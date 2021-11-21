import { Component, OnInit } from '@angular/core';

import { CustomerService } from '../services/customer.service';
import { Customer } from '../../shared/models';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {

  customers: Customer[] = [];

  constructor(
    private customerService: CustomerService,
  ) { }

  ngOnInit(): void {
    this.listAllCustomers();
  }

  listAllCustomers(): void{
    this.customerService.listAll().subscribe(
      customerList => this.customers = customerList
    );
  }

  remove($event: any, customer: Customer): void {
    $event.preventDefault();
    if (this.userConfirmsRemoval(customer)) {
      this.removeCustomer(customer);
    }
  }

  userConfirmsRemoval(customer: Customer): boolean {
    return confirm('Deseja realmente remover o cliente "' + customer.firstName + '"?');
  }

  removeCustomer(customer: Customer): void{
    this.customerService.remove(customer.id!)
      .subscribe(
        () => this.listAllCustomers()
      );
  }

}
