import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, take } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
  <button class="btn btn-primary me-1" [disabled]="this.isLoggedIn === 'true'" [routerLink]="['login']">Login</button>
  <button class="btn btn-primary me-1" (click)="logout()" [disabled]="this.isLoggedIn !== 'true'" >Logout</button>
  <button class="btn btn-primary me-1" [disabled]="this.isLoggedIn === 'true'" [routerLink]="['register']">Register</button>

  <button class="btn btn-primary me-1" style="float: right" [disabled]="this.isAdmin !== 'true'" [routerLink]="['admin/users']">Admin Page</button>
                
  <div class="container-md">
    <router-outlet></router-outlet>
  </div>
  `
})
export class AppComponent implements OnInit{

  isLoggedIn:(string | null) = ''
  isAdmin:(string | null) = ''

  ngOnInit() {
    this.userService.checkUser().subscribe((event: any) => {
      this.isLoggedIn = event.isLoggedIn
      this.isAdmin = event.isAdmin
    })
  }

  logout(){
    this.userService.logout().subscribe(() => {
      localStorage.setItem("isAdmin", JSON.stringify(false))
      localStorage.setItem("isLoggedIn", JSON.stringify(false))
      this.router.navigate(['login'])
    })
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
  ) { }

}
