import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-edit-product.component.ts',
  template: `
    <h2 class="text-center m-5">Edit a product</h2>
    <app-product-form [initialState]="product" (formSubmitted)="editProduct($event)"></app-product-form>
  `
})
export class EditProductComponent implements OnInit {
  product: BehaviorSubject<Product> = new BehaviorSubject({});

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }

    this.productService.getProduct(id !).subscribe((product) => {
      this.product.next(product);
    });
  }

  editProduct(product: Product) {
    this.productService.updateProduct(this.product.value._id || '', product)
      .subscribe({
        next: () => {
          this.router.navigate(['/products']);
        },
        error: (error) => {
          alert('Failed to update product');
          console.error(error);
        }
      })
  }
}
