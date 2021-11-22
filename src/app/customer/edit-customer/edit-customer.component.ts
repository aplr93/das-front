import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../../shared/models';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  @ViewChild("formCustomer") formCustomer!: NgForm;
  customer: Customer = new Customer();
  transactionErrorMessage: string = "";

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    this.customerService.findById(id).subscribe(
      (customer) => this.customer = customer
    );
  }

  update(): void {
    if (this.formCustomer.form.valid) {
      this.customerService.update(this.customer).subscribe({
        error: (errorResponse) => this.displayError(errorResponse),
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
