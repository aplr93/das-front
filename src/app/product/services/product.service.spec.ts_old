import { TestBed } from '@angular/core/testing';

import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from './product.service';


describe('ProductService', () => {
  let productService: ProductService;
  let products: Product[] = [
    new Product(1, "Caneta Bic Cristal"),
    new Product(2, "Cachaça Velho Barreiro"),
    new Product(3, "Pneu Remold MD")
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    productService = TestBed.inject(ProductService);
  });

  beforeEach(() => { // mocks localStorage
    var store: any = {};
    store["products"] = JSON.stringify(products);

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
    expect(productService).toBeTruthy();
  });


  it('should return the same list of products that was inserted', () => {
    expect(
      JSON.stringify( productService.listAll() ))
      .toEqual(JSON.stringify( products ));
  });


  it('should insert a new object', () => {
    productService.insert(new Product(0,"Notebook Dell"));
    expect(productService.listAll().length).toEqual(4);
  })


  it('should return "Caneta Bic Cristal" when searching for id=1', () => {
    expect(productService.searchById(1).description).toEqual("Caneta Bic Cristal");
  })


  it('should update "Remold" to "Novo" in "Pneu Remold MD"', () => {
    productService.update(new Product(3, "Pneu Novo MD") );
    expect(productService.searchById(3).description).toEqual("Pneu Novo MD");
  })

  
  it('should remove product with id=2', () => {
    productService.remove(2);
    expect(productService.listAll().length).toEqual(2);
  })

});
