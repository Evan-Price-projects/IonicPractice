import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../db/User';



@Injectable({
  providedIn: 'root'
})
export class LoginService /* implements CanActivate */ {
  constructor(
    private http: HttpClient
  ) { }

  getUser():Observable<User> {
    return this.http.get<User>(`/api/login/new`)
  }

  setUser(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'body': JSON.stringify(user)
      })
    };
    return this.http.post<User[]>(`/api/login`,{'body': JSON.stringify(user)}, httpOptions)
  }
}