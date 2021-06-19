import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../db/User';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService /* implements CanActivate */ {
  constructor(
    private http: HttpClient
  ) { }

  getUser():Observable<User> {
    return this.http.get<User>(`/api/register/new`)
  }
  getLogin():Observable<User> {
    return this.http.get<User>(`/api/login/new`)
  }
  login(user: User){
    return this.http.post(`api/login`, {user}, httpOptions)
  }
  setUser(user: User) {
    return this.http.post<User[]>(`/api/register`,{user}, httpOptions)
  }
}