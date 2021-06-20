import { Component } from '@angular/core';
import { Photo } from '@capacitor/camera';
import { LoginPage } from '../auth/login/login.page';
import { User } from '../db/User';
import { PhotoService } from '../services/photo.service';
import { TokenstorageService } from '../services/tokenstorage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  user?: User;
  photo?: Photo;


  constructor(public photoService: PhotoService, private tokenStorage: TokenstorageService) {
    if (this.tokenStorage.getToken()) {
      LoginPage.isLoggedIn = true;
      this.user = this.tokenStorage.getUser();
      console.log(this.user);
    }
  }
  addPhotoToGallery() {
    this.user = this.tokenStorage.getUser();
    this.photoService.getPic(this.user).subscribe((user: User)=>{
      console.log('user',user)
      this.photoService.addNewToGallery(user).then((photo)=>{
        photo.subscribe((innerUser:User)=>{
          this.user=innerUser;
          this.tokenStorage.saveUser(this.user);
        });
      } , ()=>{});
    })
  }
}
