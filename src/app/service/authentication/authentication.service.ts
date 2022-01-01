import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginData } from 'src/app/model/loginData';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  readonly BASE_URL = "https://localhost:44353/";
  private response = "";
  private role = "";
  private profile = {};
  private token = "";

  constructor(private router: Router, private httpClient: HttpClient) { }

  isAuthenticated = false;

  // authenticate(signInData: LoginData){

  //   const check = this.checkCredentials(signInData);

  //   if(check){

  //     this.isAuthenticated = true;
  //     this.router.navigate(['home']);
  //     return true;

  //   }

  //   this.isAuthenticated = false;
  //   return false;
  // }


  authenticate(signInData: LoginData){
    this.httpClient.post(this.BASE_URL+'api/login', signInData).subscribe(
      (res: any) => { 
        console.log(res); this.response = res.status; this.role = res.message.role; this.profile = res.message; this.token = ("Bearer "+res.result);
      },
      (err) => {},
      () => { 
        if( this.response == "ok" ){
          let auth = {
            'profile': this.profile,
            'token': this.token
          }
          this.setAuth(auth);
          this.isAuthenticated = true;
          this.router.navigate(['home', this.role]);
          return true;
        }
        else{
          this.isAuthenticated = false;
          return false;
        }
       }
    )
  }

  logout(){
    this.isAuthenticated = false;
    window.localStorage.removeItem('USER_PROFILE');
    window.localStorage.removeItem('TOKEN');
    this.router.navigate(['']);
  }

  getAuth(): any {
      let auth: any = {
          profile: window.localStorage.getItem('USER_PROFILE'),
          token: window.localStorage.getItem('TOKEN'),
          
      };
      //console.log({gettoken:auth.token});
      return auth;
  }

  removeAuth(): void {
      window.localStorage.removeItem('USER_PROFILE');
      window.localStorage.removeItem('TOKEN');
      
  }

  setAuth(auth: any) {
      console.log(auth, 'AUTH')
      window.localStorage.setItem('USER_PROFILE', auth.profile.username);
      window.localStorage.setItem('TOKEN', auth.token);
      window.localStorage.setItem('setting',auth.setting);
  }

  getRequestOption() {
      let headers: Headers = new Headers({ 'Authorization': this.getAuth().token })
      console.log({ headers: headers });
      return headers;
  }
}
