import { TestBed } from '@angular/core/testing';
import { Order } from 'src/app/shared/models/order.model';
import { OrderService } from './order.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('OrderService', () => {
  let orderService: OrderService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  const mockedDate = new Date(Date.now());

  let mockOrders: Order[] = [
    new Order(1, mockedDate,
      {
        id: 1634999816068, cpf: "08774201905", firstName: "João", lastName: "Balzer"
      },
      [{
        product: { id: 1, description: "Coca Cola" }, quantity: 1
      }]
    ),
    new Order(2, mockedDate,
      {
        id: 1634999816069, cpf: "73829873821", firstName: "Maria", lastName: "Carolina"
      },
      [{
        product: { id: 2, description: "Água com Gás" }, quantity: 20
      }, {
        product: { id: 2, description: "Boné Vans" }, quantity: 1
      }]
    ),
    new Order(3, mockedDate,
      {
        id: 1634999816070, cpf: "73291293982", firstName: "João", lastName: "Santos"
      },
      [{
        product: { id: 3, description: "Violão Tagima" }, quantity: 5
      }]
    )
  ];

  let newOrder = new Order(4, mockedDate, 
    { 
      id: 123123123432, cpf: "08774201905", firstName: "João", lastName: "Balzer" 
    }, [{ 
      product: { id: 999, description: "Agua coca Latão" }, quantity: 1 
    }]
  );

  let modifiedOrder = new Order(3, mockedDate,
    {
      id: 123123123432, cpf: "08774201905", firstName: "João", lastName: "Balzer"
    },
    [{
      product: { id: 456, description: "Pneu de Carro" }, quantity: 1
    }]
  );


  beforeEach(() => {
    const spy = jasmine.createSpyObj(HttpClient, ['get', 'post', 'put', 'delete']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrderService, { provide: HttpClient, useValue: spy }]
    });
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    orderService = TestBed.inject(OrderService);
  });


  it('should be created', () => {
    expect(orderService).toBeTruthy();
  });


  it('should return the same list of products that was inserted', () => {
    httpClientSpy.get.and.returnValue(of(mockOrders));

    orderService.listAll().subscribe(
      (orderList) => {
        expect(orderList).toEqual(mockOrders);
        expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
      }
    );
  });



  it('should insert a new order', () => {
    httpClientSpy.post.and.returnValue(of(newOrder));

    orderService.insert(newOrder).subscribe(
      (order) => {
        expect(order).toEqual(newOrder);
        expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
      }
    );
  })


  it('should return an order with customer "João" and product "Coca Cola" when searching for id=1', () => {
    let joao = mockOrders[0];
    httpClientSpy.get.and.returnValue(of(joao));

    orderService.searchById(1).subscribe(
      (order) => {
        expect(order.customer?.firstName).toEqual("João");
        expect(order.items && order.items[0].product?.description).toEqual("Coca Cola")
        expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
      }
    );
  })


  it('should update the product in order id=3 to: id=456 , "Pneu de Carro" and quantity 1', () => {
    httpClientSpy.put.and.returnValue(of(modifiedOrder));

    orderService.update(modifiedOrder).subscribe(
      (order) => {
        expect(order).toEqual(modifiedOrder);
        expect(httpClientSpy.put.calls.count()).toBe(1, 'one call');
      }
    );
  })



  it('should remove order with id=2', () => {
    let orderToBeRemoved = mockOrders[1];
    httpClientSpy.delete.and.returnValue(of(orderToBeRemoved));

    orderService.remove(2).subscribe(
      (order) => {
        expect(order).toBeTruthy();
        expect(httpClientSpy.delete.calls.count()).toBe(1, 'one call');
      }
    );
  })

});
