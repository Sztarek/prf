import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { User } from '../user';

@Component({
  selector: 'app-user-list',
  template: `
    <h2 class="text-center m-5">User List</h2>

    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Password</th>
          <th>Is admin</th>
        </tr>
      </thead>

      <tbody>
        <tr *ngFor="let user of users$ | async">
          <td>{{user.name}}</td>
          <td>{{user.email}}</td>
          <td>encoded password</td>
          <td>{{user.isAdmin}}</td>
          <td>
              <button class="btn btn-primary me-1" [routerLink]="['edit/', user._id]">Edit</button>
              <button class="btn btn-danger" (click)="deleteUser(user._id || '')">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <button class="btn btn-primary me-1" [routerLink]="['new']">Add a New User</button>
  `
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]> = new Observable();

  constructor(private usersService: UserService) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  deleteUser(id: string): void {
    this.usersService.deleteUser(id).subscribe({
      next: () => this.fetchUsers()
    });
  }

  private fetchUsers(): void {
    this.users$ = this.usersService.getUsers();
  }
}
