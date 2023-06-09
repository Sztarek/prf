import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable()
export class AuthGuardServiceAdmin implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    if (!this.auth.isAdmin()) {
      this.router.navigate(['products']);
      return false;
    }
    return true;
  }
}

@Injectable()
export class AuthGuardServiceUser implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['products']);
      return false;
    }
    return true;
  }
}