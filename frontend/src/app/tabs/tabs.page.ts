import { Component, OnInit } from '@angular/core';
import { LoginPage } from '../auth/login/login.page';
import { User } from '../db/User';
import { TokenstorageService } from '../services/tokenstorage.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  user?: User
  constructor(private tokenStorage: TokenstorageService){}
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      LoginPage.isLoggedIn = true;
      this.user = this.tokenStorage.getUser();
    }
  }
  signOff=()=>{
  this.tokenStorage.signOut();
  LoginPage.reloadPage();
  }

}
