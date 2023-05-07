import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-product',
  template: `
    <h2 class="text-center m-5">Add a New product</h2>
    <app-product-form (formSubmitted)="addProduct($event)"></app-product-form>
  `
})
export class AddProductComponent {
  constructor(
    private router: Router,
    private productService: ProductService
  ) { }

  addProduct(product: Product) {
    this.productService.createProduct(product)
      .subscribe({
        next: () => {
          this.router.navigate(['/products']);
        },
        error: (error) => {
          alert("Failed to create product");
          console.error(error);
        }
      });
  }
}
