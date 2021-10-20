import { TestBed } from '@angular/core/testing';

import { Order } from 'src/app/shared/models/order.model';
import { OrderService } from './order.service';


describe('OrderService', () => {
  let orderService: OrderService;
  let orders: Order[] = [
    new Order(1, "01/02/2021", 2),
    new Order(2, "03/02/2021", 3),
    new Order(3, "04/02/2021", 4 )
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


  it('should insert a new object', () => {
    orderService.insert(new Order(0,"Notebook Dell"));
    expect(orderService.listAll().length).toEqual(4);
  })


  it('should return "01/02/2021" and 2 when searching for id=1', () => {
    expect(orderService.searchById(1).data).toEqual("01/02/2021");
    expect(orderService.searchById(1).id_cliente).toEqual(2);
  })


  // it('should update user id to 4 "Remold" to "Novo" and 3 in "Pneu Remold MD"', () => {
  //   orderService.update(new Order(3, "Pneu Novo MD") );
  //   expect(orderService.searchById(3).id_cliente).toEqual("Pneu Novo MD");
  // })

  
  it('should remove order with id=2', () => {
    orderService.remove(2);
    expect(orderService.listAll().length).toEqual(2);
  })

});
