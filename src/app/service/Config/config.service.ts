import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterData } from 'src/app/model/registerData';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  readonly BASE_URL = "https://localhost:44353/" 

  constructor( private http: HttpClient, private authService: AuthenticationService ) { }

  checkDupUser(username: string){
    return this.http.get(this.BASE_URL+'api/checkDupUser?username='+username);
  }

  suspend(username: string, suspend: string){
    const authOptions =  {
      headers: new HttpHeaders().set('Authorization', this.authService.getAuth().token)
    }
    if( suspend == 'permanent' ){
      this.http.get(this.BASE_URL+'api/susPermanent?username='+username, authOptions).subscribe(
        (res: any) => {
          console.log(res);
        }
      )
    }
    else{
      console.log("TEMPORARY SUSPENSION");
      this.http.get(this.BASE_URL+'api/susTemporary?username='+username, authOptions).subscribe(
        (res: any) => {
          console.log(res);
        }
      )
    }
  }

  getUserDetails(username: string){
    const authOptions =  {
      headers: new HttpHeaders().set('Authorization', this.authService.getAuth().token)
    }
    return this.http.get(this.BASE_URL+'api/getUserDetails?username='+username, authOptions)
  }

  deleteUser(username: string ){
    console.log(username);
    const authOptions =  {
      headers: new HttpHeaders().set('Authorization', this.authService.getAuth().token)
    }
    return this.http.get(this.BASE_URL+'api/deleteUser?username='+username, authOptions).subscribe(
      (res: any) => {
        console.log(res)
      }
    )
  }

  registerModerator( registerUser: any ){
    const authOptions =  {
      headers: new HttpHeaders().set('Authorization', this.authService.getAuth().token)
    }
    return this.http.post(this.BASE_URL+'api/addModerator', registerUser, authOptions);
  }

  getAllUsers(){
    const headerDict = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Authorization': this.authService.getAuth().token
    };

    const requestOptions = {                                                                                                                                                                                 
        headers: new HttpHeaders(headerDict), 
    };
    const authOptions =  {
      headers: new HttpHeaders().append('Authorization', this.authService.getAuth().token)
    }
    console.log( authOptions, this.authService.getAuth().token, 'AUTH TESTS' );
    return this.http.get(this.BASE_URL+'api/getAllUsers', requestOptions);
  }
  
  register( registerUser: any ){
    return this.http.post(this.BASE_URL+'api/register', registerUser)
  }

  registerFile( resgisterUser: any, files: any, fd: string ){

    var formData = new FormData();

    formData.append("data", JSON.stringify(resgisterUser));
    
    if( files != null ){
      for (let i = 0; i < files.length; i++) {
          formData.append(fd, files[i]);
      }
    }
    formData.forEach((value,key) => {
      console.log(key+" "+value)
    });

    const options = {
      headers: new HttpHeaders().set('content-type', 'multipart/form-data')
    }
    console.log(formData, 'formData');
    return this.http.post(this.BASE_URL+'api/registerFile', formData, options).subscribe(
      (res: any) => {
        console.log(res);
      }
    );
  }



}
