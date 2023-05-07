import { Component, OnInit } from "@angular/core"
import { Observable } from "rxjs"
import { Product } from "../product"
import { ProductService } from "../services/product.service"
import { UserService } from "../services/user.service"

@Component({
  selector: "app-products-list",
  template: `
    <h2 class="text-center m-5">Products List</h2>

    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Type</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        <tr *ngFor="let product of products$ | async">
          <td>{{ product.name }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.type }}</td>
          <td>
            <button class="btn btn-primary me-1" [routerLink]="[product._id]">
              Show
            </button>
            <button
              [disabled]="this.isAdmin !== 'true'"
              class="btn btn-primary me-1"
              [routerLink]="['edit', product._id]"
            >
              Edit
            </button>
            <button
              [disabled]="this.isAdmin !== 'true'"
              class="btn btn-primary me-1"
              (click)="deleteProduct(product._id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <button class="btn btn-primary mt-3" [routerLink]="['new']" [disabled]="this.isLoggedIn !== 'true'">
      Add a New Product
    </button>
  `,
})
export class ProductsListComponent implements OnInit {
  products$: Observable<Product[]> = new Observable()
  isAdmin:(string | null) = null
  isLoggedIn:(string | null) = null

  constructor(
    private productsService: ProductService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.fetchProducts()
    this.checkUser()
  }

  deleteProduct(id: string | undefined): void {
    this.productsService.deleteProduct(id || "").subscribe({
      next: () => this.fetchProducts(),
    })
  }

  checkUser() {
    this.userService.checkUser().subscribe((event: any) => {
      this.isAdmin = event.isAdmin ?? ''
      this.isLoggedIn = event.isLoggedIn ?? ''
    })
  }

  

  private fetchProducts(): void {
    this.products$ = this.productsService.getProducts()
  }
}
