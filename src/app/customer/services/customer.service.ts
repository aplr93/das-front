import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { Customer } from '../../shared/models';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  readonly BASE_URL = env.BASE_URL + "customers/";

  constructor(private httpClient: HttpClient) { }

  insert(newCustomer: Customer): Observable<Customer> {
    newCustomer.id = this.createUserId();
    return this.httpClient.post<Customer>(this.BASE_URL, newCustomer);
  }

  findById(customerId: number): Observable<Customer> {
    let findByIdUrl = this.BASE_URL + customerId + '/';
    return this.httpClient.get<Customer>(findByIdUrl);
  }

  listAll(): Observable<Customer[]>{
    return this.httpClient.get<Customer[]>(this.BASE_URL);
  }
  findByCPF(cpf: string): Observable<Customer | undefined>{
    let customerListObservable = this.listAll();
    return customerListObservable.pipe(
      map(customerList => customerList.find(customer => customer.cpf === cpf))
    );
  }

  update(customer: Customer): Observable<Customer>{
    return this.httpClient.put<Customer>(this.BASE_URL + customer.id, customer);
  }

  remove(id: number): Observable<Customer>{
    return this.httpClient.delete<Customer>(this.BASE_URL + id);
  }

  private createUserId(): number {
    return new Date().getTime(); // seconds since epoch
  }
}
