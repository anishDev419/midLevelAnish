import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  readonly BASE_URL = "https://localhost:44353/" 

  constructor( private http: HttpClient, private authService: AuthenticationService ) { }


  addPost(username: string, postName: string, description: string){
    const authOptions =  {
      headers: new HttpHeaders().set('Authorization', this.authService.getAuth().token)
    }
    const user = {
      "username": username,
      "posts": [
        {
          "postName": postName,
          "description": description
        }
      ]
    }
    return this.http.post(this.BASE_URL+'api/addPost', user, authOptions)
  }
}
