import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/db/User';
import { LoginService } from 'src/app/services/login.service';
import { TokenstorageService } from 'src/app/services/tokenstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  static isLoggedIn = false;
  static isLoginFailed = false;
  errorMessage = '';
  user?: User;;
  roles: string[] = [];

  constructor(private auth: LoginService, private router: Router,private tokenStorage: TokenstorageService) {
    if (this.tokenStorage.getToken()) {
      LoginPage.isLoggedIn = true;
      this.user = this.tokenStorage.getUser();
      this.auth.getUserByEmail(this.user.name).subscribe((user)=>this.user=user);

    }
  }
  loginUser(form) {
    let user = new User();
    user.name = form.value['name'];
    user.password = form.value['password'];
    this.auth.login(user).subscribe((data) => {
      this.tokenStorage.saveToken(data['accessToken']);

      LoginPage.isLoginFailed = false;
      LoginPage.isLoggedIn = true;
      this.auth.getUserByEmail(user.name).subscribe((user)=>this.user=user);
      this.tokenStorage.saveUser(this.user);
      LoginPage.reloadPage();
    },
      err => {
        this.errorMessage = err.error.message;
        LoginPage.isLoginFailed = true;
      }
    );
  }

  static reloadPage(): void {
    window.location.reload();
  }
}
  

