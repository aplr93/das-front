import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-insert-product',
  templateUrl: './insert-product.component.html',
  styleUrls: ['./insert-product.component.css']
})
export class InsertProductComponent implements OnInit {

  @ViewChild('formProduct') formProduct! : NgForm;
  product! : Product;

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.product = new Product();
  }

  insert(): void{
    if (this.formProduct.form.valid) {
      this.productService.insert(this.product);
      this.router.navigate( ["/products"] );
    }
  }

}
