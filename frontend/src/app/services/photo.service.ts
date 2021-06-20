import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Observable } from 'rxjs';
import { User } from '../db/User';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) { }
  getPic(user: User): Observable<User>{
    console.log('photo0', user)
    return this.http.get<User>(`/api/${user.name}`)

  }
  public async addNewToGallery(user: User) {
    // Take a photo
    console.log('photo1')
    let capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
    console.log('photo2', capturedPhoto)
    console.log('photouser', user)
    return this.http.put<User>(`/api/${user._id}`, {body: user.email, photo: capturedPhoto.webPath})
  }

/*   public async get(){
    console.log(this.client.get('http://localhost:8000/'));
  } */


}
