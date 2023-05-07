import { Component } from "@angular/core"
import { Router } from "@angular/router"
import { Product } from "../product"
import { UserService } from "../services/user.service"
import { User } from "../user"

@Component({
  selector: "app-add-user",
  template: `
    <h2 class="text-center m-5">New user</h2>
    <app-register-form (formSubmitted)="addUser($event)"></app-register-form>
  `,
})
export class AddUserComponent {
  constructor(private router: Router, private userService: UserService) {}

  addUser(user: User) {
    this.userService.createUser(user).subscribe({
      next: () => {
        alert("Success")
      },
      error: (error) => {
        alert("Failed to create user")
        console.error(error)
      },
    })
  }
}
