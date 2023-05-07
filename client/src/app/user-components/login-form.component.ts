import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { User } from '../user-login';

@Component({
  selector: 'app-login-form',
  template: `
    <form class="login-form" autocomplete="off" [formGroup]="loginForm" (ngSubmit)="submitForm()">

      <div class="form-floating mb-3">
        <input class="form-control" type="text" formControlName="email" placeholder="Email" required>
        <label for="email">Email</label>
      </div>

      <div *ngIf="email.invalid && (email.dirty || email.touched)" class="alert alert-danger">

        <div *ngIf="email.errors?.['required']">
          Email is required.
        </div>
        <div *ngIf="email.errors?.['email']">
          Must be valid email.
        </div>
      </div>

      <div class="form-floating mb-3">
        <input class="form-control" type="password" formControlName="password" placeholder="password" required>
        <label for="password">Password</label>
      </div>

      <div *ngIf="password.invalid && (password.dirty || password.touched)" class="alert alert-danger">

        <div *ngIf="password.errors?.['required']">
          Password is required.
        </div>
        <div *ngIf="password.errors?.['password']">
          Must be valid password.
        </div>
      </div>


      <button class="btn btn-primary" type="submit" [disabled]="loginForm.invalid">Login</button>
    </form>
  `,
  styles: [
    `.login-form {
      max-width: 560px;
      margin-left: auto;
      margin-right: auto;
    }`
  ]
})
export class LoginFormComponent implements OnInit {
  @Input()
  initialState: BehaviorSubject<User> = new BehaviorSubject({});

  @Output()
  formValuesChanged = new EventEmitter<User>();

  @Output()
  formSubmitted = new EventEmitter<User>();

  loginForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  get email() { return this.loginForm.get('email')!; }
  get password() { return this.loginForm.get('password')!; }

  ngOnInit() {
    this.initialState.subscribe(user => {
      this.loginForm = this.fb.group({
        email: [ user.email, [ Validators.required, Validators.email ] ],
        password: [ user.password, [ Validators.required, Validators.minLength(10)] ]
      });
    });

    this.loginForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }

  submitForm() {
    this.formSubmitted.emit(this.loginForm.value);
  }
}
