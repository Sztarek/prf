import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../services/product.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-add-product',
  template: `
    <h2 class="text-center m-5">Show a product</h2>
    <app-product-form [initialState]="product" [isReadonly]="true"></app-product-form>
  `
})
export class ShowProductComponent {
  product: BehaviorSubject<Product> = new BehaviorSubject({});
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
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

}
