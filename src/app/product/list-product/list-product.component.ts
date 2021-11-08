import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  
  ngOnInit(): void {
    this.listAll();
  }


  listAll(): void{
    this.productService.listAll().subscribe(
      (prods: Product[]) => {
        if (prods == null) {
          this.products = [];
        }
        else {
          this.products = prods;
        }
        this.changeDetectorRef.markForCheck();
      }
    );
  }


  remove($event: any, product: Product): void {
    $event.preventDefault();
    if (confirm('Deseja realmente remover o produto "' + product.description + '"?')) {
      this.productService.remove(product.id!);
      this.listAll();
    }
  }
}
