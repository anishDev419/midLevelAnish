import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginData } from '../model/loginData';
import { AuthenticationService } from '../service/authentication/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }


  onSubmit(signInForm: NgForm){
    console.log(signInForm.value);
    const signInData = new LoginData(signInForm.value.email, signInForm.value.password, false);
    this.authService.authenticate(signInData)
    console.log(this.authService.isAuthenticated);
  }
}
