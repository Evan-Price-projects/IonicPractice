import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor() { }
  public async addNewToGallery(): Promise<Photo> {
    // Take a photo
    let capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
    console.log(capturedPhoto)
    return (capturedPhoto);
  }

/*   public async get(){
    console.log(this.client.get('http://localhost:8000/'));
  } */


}
