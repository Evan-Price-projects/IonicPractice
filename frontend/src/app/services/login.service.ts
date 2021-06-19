import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService /* implements CanActivate */ {
  constructor(
    private router: Router,
    private authenticationService: ApiService
  ) { }

/*   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('cu', currentUser)
    if (currentUser) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  } */
}