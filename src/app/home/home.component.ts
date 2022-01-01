import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterData } from '../model/registerData';
import { ConfigService } from '../service/Config/config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  role: string = "";
  showAddModerator = false;
  showUserList = false;
  userList: RegisterData[] = [];
  userListNames: any[] = [];

  constructor( private route: ActivatedRoute, private router: Router, private configService: ConfigService ) {

    this.configService.getAllUsers().subscribe(
      (res: any) => {
        this.userList = res;
      },
      (err) => {},
      () => {
        this.userList.forEach(user => {
          console.log(user, 'USER')
          this.userListNames.push(user);
        });
      }
    )
    console.log(this.userList, 'userList');
    this.role = this.route.snapshot.params.role;
    console.log(this.role);

    if( this.role == "admin" ){
      this.showAddModerator = true;
    }

    if( this.role == "admin" || this.role == "moderator"){
      this.showUserList = true;
    }
   }

   routeAddModerator(){
     this.router.navigate(['addModerator']);
   }
   routeUserList(){
     this.router.navigate(['userList', this.role]);
   }

   addPost(){
    this.router.navigate(['addPost', window.localStorage.getItem('USER_PROFILE')]);
   }


  ngOnInit(): void {
  }

}
