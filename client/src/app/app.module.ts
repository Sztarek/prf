import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsListComponent } from './product-components/products-list.component'
import { ProductFormComponent } from './product-components/product-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './product-components/add-product.component';
import { EditProductComponent } from './product-components/edit-product.component'; // <-- add this line
import { UserListComponent } from './user-components/user-list.component';
import { RegisterFormComponent } from './user-components/register-form.component';
import { LoginFormComponent } from './user-components/login-form.component';
import { EditUserComponent } from './user-components/edit-user.component';
import { ShowProductComponent } from './product-components/show-product.component';
import { AddUserComponent } from './user-components/add-user.component';
import { LoginUserComponent } from './user-components/login-user.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    ProductFormComponent,
    AddProductComponent,
    EditProductComponent,
    UserListComponent,
    RegisterFormComponent,
    LoginFormComponent,
    EditUserComponent,
    ShowProductComponent,
    AddUserComponent,
    LoginUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule // <-- add this line
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
