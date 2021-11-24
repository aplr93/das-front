import { Component, OnInit } from '@angular/core';

import { CustomerService } from '../services/customer.service';
import { Customer } from '../../shared/models';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {

  customers: Customer[] = [];
  errorMessage: String = "";

  constructor(
    private customerService: CustomerService,
  ) { }

  ngOnInit(): void {
    this.refreshScreen();
  }

  remove($event: any, customer: Customer): void {
    $event.preventDefault();
    if (this.userConfirmsRemoval(customer)) {
      this.removeCustomer(customer);
    }
  }

  private listAllCustomers(): void{
    this.customerService.listAll().subscribe(
      customerList => this.customers = customerList
    );
  }

  private userConfirmsRemoval(customer: Customer): boolean {
    return confirm('Deseja realmente remover o cliente "' + customer.firstName + '"?');
  }

  private removeCustomer(customer: Customer): void{
    this.customerService.remove(customer.id!)
      .subscribe({
        next: () => this.refreshScreen(),
        error: (errorObject: HttpErrorResponse) => this.errorMessage = errorObject.error
      });
  }

  private refreshScreen(){
    this.listAllCustomers();
    this.errorMessage = "";
  }

}
