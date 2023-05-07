import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core"
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { BehaviorSubject } from "rxjs"
import { Product } from "../product"
import { ActivatedRoute, Router } from "@angular/router"

@Component({
  selector: "app-product-form",
  template: `
    <form
      class="product-form"
      autocomplete="off"
      [formGroup]="productForm"
      (ngSubmit)="submitForm()"
    >
      <div class="form-floating mb-3">
        <input
          class="form-control"
          type="text"
          id="name"
          formControlName="name"
          placeholder="Name"
          required
        />
        <label for="name">Name</label>
      </div>

      <div
        *ngIf="name.invalid && (name.dirty || name.touched)"
        class="alert alert-danger"
      >
        <div *ngIf="name.errors?.['required']">Name is required.</div>
        <div *ngIf="name.errors?.['minlength']">
          Name must be at least 3 characters long.
        </div>
      </div>

      <div class="form-floating mb-3">
        <input
          class="form-control"
          type="text"
          formControlName="price"
          placeholder="Position"
          required
        />
        <label for="price">Price</label>
      </div>

      <div
        *ngIf="price.invalid && (price.dirty || price.touched)"
        class="alert alert-danger"
      >
        <div *ngIf="price.errors?.['required']">Price is required.</div>
      </div>

      <div class="form-floating mb-3">
        <input
          class="form-control"
          type="text"
          id="desc"
          formControlName="desc"
          placeholder="Description"
          required
        />
        <label for="desc">Description</label>
      </div>

      <div
        *ngIf="desc.invalid && (desc.dirty || desc.touched)"
        class="alert alert-danger"
      >
        <div *ngIf="desc.errors?.['required']">Description is required.</div>
      </div>

      <div class="form-floating mb-3">
        <label for="type">Type</label>
        <select
          class="form-control"
          type="text"
          id="type"
          formControlName="type"
          placeholder="Description"
          required
        >
          <option value="electronics">Electronics</option>
          <option value="books">Books</option>
          <option value="food">Food</option>
          <option value="clothes">Clothes</option>
        </select>
      </div>

      <div
        *ngIf="desc.invalid && (desc.dirty || desc.touched)"
        class="alert alert-danger"
      >
        <div *ngIf="desc.errors?.['required']">Description is required.</div>
      </div>

      <button
        class="btn btn-primary"
        type="submit"
        [disabled]="productForm.invalid"
      >
        Add
      </button>
    </form>
  `,
  styles: [
    `
      .product-form {
        max-width: 560px;
        margin-left: auto;
        margin-right: auto;
      }
    `,
  ],
})
export class ProductFormComponent implements OnInit {

  
  @Input()
  initialState: BehaviorSubject<Product> = new BehaviorSubject({})
  @Input('isReadonly') isReadonly = false

  @Output()
  formValuesChanged = new EventEmitter<Product>()

  @Output()
  formSubmitted = new EventEmitter<Product>()

  productForm: FormGroup = new FormGroup({})

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,) {}

  get name() {
    return this.productForm.get("name")!
  }
  get price() {
    return this.productForm.get("price")!
  }
  get desc() {
    return this.productForm.get("desc")!
  }

  ngOnInit() {
    this.initialState.subscribe((product) => {
      this.productForm = this.fb.group({
        name: [{value: product.name, disabled: this.isReadonly}, [Validators.required]],
        price: [{value: product.price, disabled: this.isReadonly}, [Validators.required]],
        desc: [{value: product.desc, disabled: this.isReadonly}, [Validators.required]],
        type: [{value: product.type, disabled: this.isReadonly}, [Validators.required] ]
      })
    })

    this.productForm.valueChanges.subscribe((val) => {
      this.formValuesChanged.emit(val)
    })
  }

  submitForm() {
    
    this.formSubmitted.emit(this.productForm.value)
    this.router.navigate(['products'])
  }
}
