import { Component, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { BehaviorSubject } from "rxjs"
import { User } from "../user"
import { UserService } from "../services/user.service"

@Component({
  selector: "app-edit-user.component.ts",
  template: `
    <h2 class="text-center m-5">Edit a user</h2>
    <app-register-form
      [initialState]="product"
      (formSubmitted)="editUser($event)"
    ></app-register-form>
  `,
})
export class EditUserComponent implements OnInit {
  product: BehaviorSubject<User> = new BehaviorSubject({})

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id")
    if (!id) {
      alert("No id provided")
    }

    this.userService.getUser(id!).subscribe((product) => {
      this.product.next(product)
    })
  }

  editUser(product: User) {
    this.userService
      .updateUser(this.product.value._id || "", product)
      .subscribe({
        next: () => {
          this.router.navigate(['/products']);
        },
        error: (error) => {
          alert("Failed to update product")
          console.error(error)
        },
      })
  }
}
