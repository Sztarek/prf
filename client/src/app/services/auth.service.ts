import { Injectable, OnInit } from '@angular/core';
import { UserService } from './user.service';
@Injectable()
export class AuthService {

  constructor(private userSevice: UserService) {}

  public isAuthenticated(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true'
  }
  public isAdmin(): boolean {
    return localStorage.getItem('isAdmin') === 'true'
  }
}