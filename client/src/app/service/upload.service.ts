import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  uploadImage(fd: FormData){
    return this.http.post<any>('http://localhost:4000/uploads', fd)
  }

  getUploads(){
    return this.http.get<any>('http://localhost:4000/uploads')
  }
}
