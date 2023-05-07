import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { ProductsListComponent } from "./product-components/products-list.component"
import { AddProductComponent } from "./product-components/add-product.component"
import { EditProductComponent } from "./product-components/edit-product.component"
import { RegisterFormComponent } from "./user-components/register-form.component"
import { LoginFormComponent } from "./user-components/login-form.component"
import { UserListComponent } from "./user-components/user-list.component"
import { EditUserComponent } from "./user-components/edit-user.component"
import { ShowProductComponent } from "./product-components/show-product.component"
import { AddUserComponent } from "./user-components/add-user.component"
import { LoginUserComponent } from "./user-components/login-user.component"
import {
  AuthGuardServiceAdmin,
  AuthGuardServiceUser,
} from "./services/auth-guard.service"
import { AuthService } from "./services/auth.service"

const routes: Routes = [
  { path: "", redirectTo: "products", pathMatch: "full" },
  { path: "products", component: ProductsListComponent },
  {
    path: "products/new",
    component: AddProductComponent,
    canActivate: [AuthGuardServiceUser],
  },
  {
    path: "products/edit/:id",
    component: EditProductComponent,
    canActivate: [AuthGuardServiceAdmin],
  },
  { path: "products/:id", component: ShowProductComponent },
  { path: "login", component: LoginUserComponent },
  { path: "register", component: AddUserComponent },
  {
    path: "admin/users/new",
    component: AddUserComponent,
    canActivate: [AuthGuardServiceAdmin],
  },
  {
    path: "admin/users",
    component: UserListComponent,
    canActivate: [AuthGuardServiceAdmin],
  },
  {
    path: "admin/users/edit/:id",
    component: EditUserComponent,
    canActivate: [AuthGuardServiceAdmin],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers : [
    AuthGuardServiceUser,
    AuthGuardServiceAdmin,
    AuthService
  ]
})
export class AppRoutingModule {}
