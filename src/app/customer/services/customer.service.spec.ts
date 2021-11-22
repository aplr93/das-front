import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Customer } from '../../shared/models/customer.model';
import { CustomerService } from './customer.service';

describe('CustomerService', () => {
  let service: CustomerService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let customers: Customer[] = [];
  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    TestBed.configureTestingModule({
      providers: [
        CustomerService,
        {provide: HttpClient, useValue: spy }
      ],
    });
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    service = TestBed.inject(CustomerService);

    customers = [
      new Customer(1, "98111111111", "Luis", "Silveira"),
      new Customer(2, "98222222222", "Carlos", "Barbosa"),
      new Customer(3, "98333333333", "Pedro", "Schutz"),
      new Customer(4, "98444444444", "João Paulo", "Ortiz"),
    ];

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the same list of customers that was inserted', () => {
    httpClientSpy.get.and.returnValue(of(customers));
    service.listAll().subscribe(
      customerList => expect(customerList).toEqual(customers)
    );
    expect(httpClientSpy.get.calls.count()).toEqual(1);
  });

  it('should insert a new valid customer', () => {
    let newCustomer = new Customer(5, "55555555555", "Luana", "Oliveira");
    httpClientSpy.post.and.returnValue(of(customers.push(newCustomer)));
    service.insert(newCustomer).subscribe(
      returnedCustomer => expect(returnedCustomer).toBeTruthy()
    );
    expect(httpClientSpy.post.calls.count()).toEqual(1);
  });

  it('should return "Luis" when searching for id=1', () => {
    httpClientSpy.get.and.returnValue(of(customers[0]));
    service.findById(1).subscribe(
      customer => expect(customer.firstName).toEqual('Luis')
    );
    expect(httpClientSpy.get.calls.count()).toEqual(1);
  });

  it('should update "Carlos" to "Gabriela" in "Carlos Barbosa"', () => {
    let customerToBeEdited = new Customer(2, "98222222222", "Gabriela", "Barbosa");
    httpClientSpy.put.and.returnValue(of(customerToBeEdited));
    service.update(customerToBeEdited).subscribe(
      returnedCustomer => {
        expect(returnedCustomer).toBeTruthy();
        expect(returnedCustomer.firstName).toEqual('Gabriela');
      }
    );
    expect(httpClientSpy.put.calls.count()).toEqual(1);
  })

  it('should remove customer with id=2', () => {
    let customerToBeRemoved = customers[1];
    httpClientSpy.delete.and.returnValue(of(customerToBeRemoved));
    service.remove(1).subscribe(
      returnedCustomer => expect(returnedCustomer).toBeTruthy()
    );
    expect(httpClientSpy.delete.calls.count()).toEqual(1);
  })

});
