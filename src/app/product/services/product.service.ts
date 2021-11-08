import { Injectable } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { Observable } from 'rxjs';

//const LS_KEY: string = "products";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private httpClient: HttpClient,
  ) { }

  //products: Product[] = [];
  URL = env.BASE_URL + "products/";


  listAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.URL, this.httpOptions);
  }

  
  searchById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(this.URL + id, this.httpOptions);
  }
  

  insert( product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.URL, JSON.stringify(product), this.httpOptions);
  }


  update(product: Product): Observable<Product>{
    return this.httpClient.put<Product>(this.URL + product.id, JSON.stringify(product), this.httpOptions);
  }


  remove(id: number): Observable<Product>{
    return this.httpClient.delete<Product>(this.URL + id, this.httpOptions);
  }

}
