import { Component } from "@angular/core"
import { Router } from "@angular/router"
import { Product } from "../product"
import { UserService } from "../services/user.service"
import { User } from "../user"

@Component({
  selector: "app-login-user",
  template: `
    <h2 class="text-center m-5">Login</h2>
    <app-login-form (formSubmitted)="loginUser($event)"></app-login-form>
  `,
})
export class LoginUserComponent {
  constructor(private router: Router, private userService: UserService) {}

  loginUser(user: User) {
    this.userService.login(user).subscribe((event: any) => {
      const { isAdmin } = JSON.parse(event)
      alert("Success")
      localStorage.setItem("isAdmin", JSON.stringify(isAdmin ?? false))
      localStorage.setItem("isLoggedIn", JSON.stringify(true))

      this.router.navigate(["products"])
    })
  }
}
