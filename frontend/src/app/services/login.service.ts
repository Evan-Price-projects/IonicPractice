import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../db/User';
import { TokenstorageService } from './tokenstorage.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService implements CanActivate {
  constructor(
    private http: HttpClient,
    private tokenStorage: TokenstorageService
  ) { }

  canActivate(){
    if(this.tokenStorage.getToken()){return true;
    }
    else{
      return false;
    }
  }
  
  getNewUser():Observable<User> {
    return this.http.get<User>(`/api/register/new`)
  }
  getUserByEmail(_id: string):Observable<User> {
    return this.http.get<User>(`/api/login/${_id}`)
  }
  login(user: User){
    return this.http.post(`api/login`, {user}, httpOptions)
  }
  setUser(user: User) {
    return this.http.post<User[]>(`/api/register`,{user}, httpOptions)
  }
}