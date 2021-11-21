import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from '../../shared/models';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-insert-customer',
  templateUrl: './insert-customer.component.html',
  styleUrls: ['./insert-customer.component.css']
})
export class InsertCustomerComponent implements OnInit {

  @ViewChild('formCustomer') formCustomer!: NgForm;
  customer!: Customer;
  transactionErrorMessage: string = "";

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.customer = new Customer();
  }

  insert(): void {
    if (this.formCustomer.form.valid) {
      this.customerService.insert(this.customer).subscribe({
        error: errorResponse => this.displayError(errorResponse),
        complete: () => this.browseToCustomersPage()
      });
    }
  }

  browseToCustomersPage(): void {
    this.router.navigate( ["/customers"] );
  }

  displayError(errorResponse: any): void{
    console.log(errorResponse);
    this.transactionErrorMessage = errorResponse.error;
  }
}
