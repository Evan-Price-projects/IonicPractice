import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/db/User';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  constructor(private auth: LoginService, private  router:  Router) { 
  }
  loginUser (form){
    let user = new User();
    user.email= form.value['email'];
    user.password = form.value['password'];
    this.auth.login(user).subscribe(x=>console.log(x));
  }


}
