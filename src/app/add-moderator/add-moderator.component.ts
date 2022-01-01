import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterData } from '../model/registerData';
import { ConfigService } from '../service/Config/config.service';
import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { LoginData } from '../model/loginData';
import { AuthenticationService } from '../service/authentication/authentication.service';

@Component({
  selector: 'app-add-moderator',
  templateUrl: './add-moderator.component.html',
  styleUrls: ['./add-moderator.component.css']
})
export class AddModeratorComponent implements OnInit {

  emailCheck = false;
  nameCheck = false;
  passwordCheck = false;
  passwordDub = false;
  nameDub = false;

  stepOne = true;
  selectedFile = <File>{};
  filePath = "";
  fileName = "";
  uploadFilesUrl: string[] = [];


  nameDubResponse: string = "";
  registerResponse: string = "";
  emailErrorString: string = "";

  registerForm = new FormGroup({

    email: new FormControl("", [Validators.required, Validators.email] ),
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    cPassword: new FormControl("")

  })

  constructor(private configService: ConfigService, private router: Router, private httpClient: HttpClient, private authService: AuthenticationService){}

  ngOnInit(): void {
    this.filePath = "";
  }

  onSubmit(){
    console.log(this.registerForm.value, this.registerForm.status, this.registerForm.get('email')?.status);

    //EMAIL VALIDATIONS
    if( this.registerForm.get('email')?.status == 'INVALID' ){
      this.emailCheck = true;
      if( this.registerForm.get('email')?.value == '' ){
        this.emailErrorString = "Email is Required";
      }
      else{
        this.emailErrorString = "Email is Invalid";
      }
    }
    else{
      this.emailCheck = false;
    }


    //NAME VALIDATIONS
    if( this.registerForm.get('username')?.status == 'INVALID' ){
      this.nameCheck = true;
    }
    else{
      this.nameCheck = false;
    }
    
    const useernameCheck = this.registerForm.get('username')?.value;

    this.configService.checkDupUser(useernameCheck).subscribe(

      (res: any) => {
        this.nameDubResponse = res.status;
      },
      (err) => {
        this.nameDub = true;
      },
      () => {
        console.log(this.nameDubResponse);
        if( this.nameDubResponse == "ok" ){
          this.nameDub = false;
        }
        else{
          this.nameDub = true;
        }
      }


    )



    //PASSWORD VALIDATIONS
    if(this.registerForm.get('password')?.status == 'INVALID'){
      this.passwordCheck = true;
    }
    else{
      this.passwordCheck = false;
    }

    if( this.registerForm.get('password')?.value != this.registerForm.get('cPassword')?.value ){
      this.passwordDub = true;
    }
    else{
      this.passwordDub = false;
    }

    console.log(this.nameDub);

    setTimeout(() => {
      console.log(this.nameDub, "this.nameDub");
    if( !this.passwordDub && !this.passwordCheck && !this.nameCheck && !this.nameDub && !this.emailCheck ){
      this.stepOne = false;
    }
    }, 2000);



  }

  changeDP(event: any){

    if( event.target.files[0].type == "image/jpeg" ){
      this.selectedFile = <File>event.target.files[0];
      console.log(this.selectedFile);
      this.fileName = event.target.files[0].name;
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(e:any) => {
        this.filePath = e.target.result;
        var img = <string>reader.result;
        this.uploadFilesUrl.push(img);
      }
    }
    else{
      console.log("WRONG FILE TYPE")
    }
    
  }

  onUpload(){
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);

    const registerUser = {
      email: this.registerForm.get('email')?.value,
      username: this.registerForm.get('username')?.value,
      password: this.registerForm.get('password')?.value,
      role: 'user'
    }

    console.log( "REGISTER USER WITH FILE", fd, this.uploadFilesUrl, registerUser )

    this.configService.registerFile( registerUser, this.uploadFilesUrl, this.fileName )

  }


  registerLogin(){
    const registerUser = {
      email: this.registerForm.get('email')?.value,
      username: this.registerForm.get('username')?.value,
      password: this.registerForm.get('password')?.value,
      role: 'moderator'
    }

    this.configService.register(registerUser).subscribe(
      (res: any) => {
        this.registerResponse = res.status;
      },
      (err) => {},
      () => {
        // if( this.registerResponse == "ok" ){
        //   console.log(this.registerResponse)
        // }
        if( this.registerResponse == "Ok" ){
          console.log( "ADDED MODERATOR" );
          this.router.navigate(['home', 'admin']);
        }
        else{
          console.log(this.registerResponse, 'registerResponse');

        }
      }
    )
  }
}
