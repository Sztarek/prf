import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { User } from '../user';

@Component({
  selector: 'app-register-form',
  template: `
    <form class="register-form" autocomplete="off" [formGroup]="registerForm" (ngSubmit)="submitForm()">
      <div class="form-floating mb-3">
        <input class="form-control" type="text" id="name" formControlName="name" placeholder="Name" required>
        <label for="name">Name</label>
      </div>

      <div *ngIf="name.invalid && (name.dirty || name.touched)" class="alert alert-danger">
        <div *ngIf="name.errors?.['required']">
          Name is required.
        </div>
        <div *ngIf="name.errors?.['minlength']">
          Name must be at least 3 characters long.
        </div>
      </div>

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


      <button class="btn btn-primary" type="submit" [disabled]="registerForm.invalid">Register</button>
    </form>
  `,
  styles: [
    `.register-form {
      max-width: 560px;
      margin-left: auto;
      margin-right: auto;
    }`
  ]
})
export class RegisterFormComponent implements OnInit {
  @Input()
  initialState: BehaviorSubject<User> = new BehaviorSubject({});

  @Output()
  formValuesChanged = new EventEmitter<User>();

  @Output()
  formSubmitted = new EventEmitter<User>();

  registerForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  get name() { return this.registerForm.get('name')!; }
  get email() { return this.registerForm.get('email')!; }
  get password() { return this.registerForm.get('password')!; }

  ngOnInit() {
    this.initialState.subscribe(user => {
      this.registerForm = this.fb.group({
        name: [ user.name, [Validators.required] ],
        email: [ user.email, [ Validators.required, Validators.email ] ],
        password: [ user.password, [ Validators.required, Validators.minLength(10)] ]
      });
    });

    this.registerForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }

  submitForm() {
    this.formSubmitted.emit(this.registerForm.value);
  }

}
