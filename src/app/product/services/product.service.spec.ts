import { TestBed, } from '@angular/core/testing';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from './product.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';


import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('ProductService', () => {
  let productService: ProductService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let mockProducts: Product[] = [
    new Product(1, "Caneta Bic Cristal"),
    new Product(2, "Cachaça Velho Barreiro"),
    new Product(3, "Pneu Remold MD")
  ];

  beforeEach(() => {
    const spy = jasmine.createSpyObj(HttpClient, ['get', 'post', 'put', 'delete']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService, { provide: HttpClient, useValue: spy }]
    });
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    productService = TestBed.inject(ProductService);
  });


  it('should be created', () => {
    expect(productService).toBeTruthy();
  });


  it('should return the same list of products that was inserted', () => {
    httpClientSpy.get.and.returnValue(of(mockProducts));

    let products: Product[] = [];
    productService.listAll().subscribe(
      (prods) => products = prods
    )
    expect(JSON.stringify(products)).toEqual(JSON.stringify(mockProducts));
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });


  it('should insert a new object', () => {
    let newProduct = new Product(0, "Notebook Dell");
    httpClientSpy.post.and.returnValue(of(newProduct));

    let product!: Product;
    productService.insert(newProduct).subscribe(
      (prod) => {
        product = prod;
      }
    )
    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
    expect(JSON.stringify(product)).toEqual(JSON.stringify(newProduct));
  })


  it('should return "Caneta Bic Cristal" when searching for id=1', () => {
    let bic = mockProducts[0];
    httpClientSpy.get.and.returnValue(of(bic));

    let product!: Product;
    productService.searchById(1).subscribe(
      (prod) => product = prod
    )
    expect(product.description).toEqual("Caneta Bic Cristal");
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  })


  it('should update "Remold" to "Novo" in "Pneu Remold MD"', () => {
    let pneu = new Product(3, "Pneu Novo MD");
    httpClientSpy.put.and.returnValue(of(pneu));

    let product!: Product;
    productService.update(new Product(3, "Pneu Novo MD")).subscribe(
      (prod) => product = prod
    )
    expect(product.description).toEqual("Pneu Novo MD");
    expect(httpClientSpy.put.calls.count()).toBe(1, 'one call');
  })


  it('should remove product with id=2', () => {
    let cachaca = mockProducts[1];
    httpClientSpy.delete.and.returnValue(of(cachaca));

    let product!: Product;
    productService.remove(2).subscribe(
      (prod) => product = prod
    );
    expect(product.description).toEqual("Cachaça Velho Barreiro");
    expect(httpClientSpy.delete.calls.count()).toBe(1, 'one call');
  })

});
