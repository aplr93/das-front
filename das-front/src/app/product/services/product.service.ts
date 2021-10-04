import { Injectable } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';

const LS_KEY: string = "products";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  
  listAll(): Product[]{
    const products = localStorage.getItem(LS_KEY);
    return products ? JSON.parse(products) : [];
  }


  insert(product: Product): void {
    const products = this.listAll();
    product.id = new Date().getTime();
    products.push(product);
    localStorage.setItem(LS_KEY, JSON.stringify(products) );
  }


  searchById(id: number): Product{
    const products: Product[] = this.listAll();
    return products.find(product => product.id === id)!;
  }


  update(product: Product): void{
    const products: Product[] = this.listAll();

    products.forEach( (obj, index, objs) => {
      if (product.id === obj.id){
        objs[index] = product;
      }
    });
    localStorage.setItem(LS_KEY, JSON.stringify(products) );
  }


  remove(id: number): void{
    let products: Product[] = this.listAll();
    products = products.filter(product => product.id !== id);
    localStorage.setItem(LS_KEY, JSON.stringify(products) );
  }

}
