import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/db/User';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  user?: User;

  constructor(private auth: LoginService, private  router:  Router) { 
    this.auth.getUser().subscribe((param) => this.user = param);
  }
  createUser (form){
    if(form.value['password'] != form.value['confirm'])return;
    this.user.name = form.value['name'];
    this.user.email = form.value['email'];
    this.user.password = form.value['password'];
    this.auth.setUser(this.user).subscribe();
  }

}
