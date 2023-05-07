import { Injectable } from "@angular/core"
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable, Subject, tap } from "rxjs"
import { Product } from "../product"
import { User } from "../user-login"
import { User as UserReg } from "../user"

@Injectable({
  providedIn: "root",
})
export class UserService {
  private url = "http://localhost:3000/api"
  private users$: Subject<UserReg[]> = new Subject()

  constructor(private httpClient: HttpClient) {}

  private refreshUsers() {
    this.httpClient
      .get<UserReg[]>(`${this.url}/users/admin`)
      .subscribe((products) => {
        this.users$.next(products)
      })
  }

  checkUser(): Observable<Object> {
    return this.httpClient.get<boolean>(`${this.url}/users/getcookie`)
  }

  checkIfLoggedIn(): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.url}/users/isLoggedIn`)
  }

  login(user: User): Observable<string> {
    return this.httpClient.post(`${this.url}/users/login`, user, {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "text/html, application/xhtml+xml, */*",
        
      }),
      responseType: "text",
    })
  }

  logout(){
    return this.httpClient.post(`${this.url}/users/logout`, {}, {
      responseType: "text",
    }) 
  }

  getUsers(): Subject<UserReg[]> {
    this.refreshUsers()
    return this.users$
  }

  getUser(id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.url}/users/admin/${id}`)
  }

  createUser(user: UserReg): Observable<Object> {
    return this.httpClient.post(`${this.url}/users/register`, user, {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "text/html, application/xhtml+xml, */*",
      }),
      responseType: "text",
    })
  }

  updateUser(id: string, user: UserReg): Observable<string> {
    return this.httpClient.put(`${this.url}/users/admin/${id}`, user, {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "text/html, application/xhtml+xml, */*",
      }),
      responseType: "text",
    })
  }

  deleteUser(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/users/admin/${id}`, {
      responseType: "text",
    })
  }
}
