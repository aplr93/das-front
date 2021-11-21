import { TestBed } from '@angular/core/testing';

import { Order } from 'src/app/shared/models/order.model';
import { OrderService } from './order.service';


// {id: 1634999841258, date: "2021-10-06T11:37:03.284Z",…}
// customer: {id: 1634999816068, cpf: "08774201905", firstName: "Maria Carolina", lastName: "tes"}
// cpf: "08774201905"
// firstName: "Maria Carolina"
// id: 1634999816068
// lastName: "tes"
// date: "2021-10-06T11:37:03.284Z"
// id: 1634999841258
// items: [{product: {id: 1634186149051, description: "teste"}, quantity: 123}]
// 0: {product: {id: 1634186149051, description: "teste"}, quantity: 123}
// product: {id: 1634186149051, description: "teste"}
// description: "teste"
// id: 1634186149051
// quantity: 123

        //Order Model
        // public id?: number,
        // public date?: Date,
        // public customer?: Customer,
        // public items?: OrderItem[]

       // OrderItem Model
        //public product? : Product,
        //public quantity? : number


describe('OrderService', () => {
  let orderService: OrderService;

  const mockedDate = new Date(Date.now());


  let orders: Order[] = [
    new Order(1, mockedDate, {id: 1634999816068, cpf: "08774201905", firstName: "Joao", lastName: "Balzer"}, [{product: {id: 1, description: "Coca Cola"}, quantity: 1}]),
    new Order(2, mockedDate, {id: 1634999816069, cpf: "73829873821", firstName: "Maria", lastName: "Carolina"}, [ {product: {id: 2, description: "Água com Gás"}, quantity: 20 } , {product: {id: 2, description: "Boné Vans"}, quantity: 1 }]),
    new Order(3, mockedDate, {id: 1634999816070, cpf: "73291293982", firstName: "Joao", lastName: "Santos"}, [{product: {id: 3, description: "Violão Tagima"}, quantity: 5}]),
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    orderService = TestBed.inject(OrderService);
  });

  beforeEach(() => { // mocks localStorage
    var store: any = {};
    store["orders"] = JSON.stringify(orders);

    spyOn(Storage.prototype, 'getItem').and.callFake( (key:string):string => {
     return store[key] || null;
    });
    spyOn(Storage.prototype, 'removeItem').and.callFake((key:string):void =>  {
      delete store[key];
    });
    spyOn(Storage.prototype, 'setItem').and.callFake((key:string, value:string):string =>  {
      return store[key] = <string>value;
    });
    spyOn(Storage.prototype , 'clear').and.callFake(() =>  {
        store = {};
    });

  });



  it('should be created', () => {
    expect(orderService).toBeTruthy();
  });


  it('should return the same list of orders that was inserted', () => {
    expect(
      JSON.stringify( orderService.listAll() ))
      .toEqual(JSON.stringify( orders ));
  });


  it('should insert a new order', () => {
    orderService.insert(new Order(4, mockedDate, {id: 123123123432, cpf: "08774201905", firstName: "Joao", lastName: "Balzer"}, [{ product: {id: 999, description: "Agua coca Latão"}, quantity: 1}]));
    expect(orderService.listAll().length).toEqual(4);
  })


  it('when search id 1 should return today`s day, today`s month, todays`s  year, customer id 1634999816068, customer cpf 08774201905, customer firstName Joao and customer lastName Balzer', () => {

    const date = orderService.searchById(1).date;
    const customer = orderService.searchById(1).customer;

    let record_day= ((mockedDate.getDate()));
    let record_month = ((mockedDate.getMonth() + 1));
    let record_year = (mockedDate.getFullYear());

    let mocked_day= ((mockedDate.getDate()));
    let mocked_month = ((mockedDate.getMonth() + 1));
    let mocked_year = (mockedDate.getFullYear());

    expect(record_day).toEqual(mocked_day);
    expect(record_month).toEqual(mocked_month);
    expect(mocked_year).toEqual(mocked_year);

    expect(orderService.searchById(1).customer).toEqual({id: 1634999816068, cpf: "08774201905", firstName: "Joao", lastName: "Balzer"});

  })

  it('should update order id 3 to id 456 , "Pneu de Carro" and quantity 1', () => {
    orderService.update(new Order(3, mockedDate, {id: 123123123432, cpf: "08774201905", firstName: "Joao", lastName: "Balzer"}, [{ product: {id: 456, description: "Pneu de Carro"}, quantity: 1}]));
    expect(orderService.searchById(3).items).toEqual([{ product: {id: 456, description: "Pneu de Carro"}, quantity: 1}]);
  })


  it('should remove order with id=2', () => {
   orderService.remove(2);
   expect(orderService.listAll().length).toEqual(2);
  })

});
