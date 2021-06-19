import { Component } from '@angular/core';
import { Photo } from '@capacitor/camera';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  photo?: Photo;


  constructor(public photoService: PhotoService) {}
  addPhotoToGallery() {
    this.photoService.addNewToGallery().then((photo)=>{
      this.photo=photo;
    } , ()=>{});
  }
}
