import { Component, OnInit } from '@angular/core';
import { RegisterData } from '../model/registerData';
import { ConfigService } from '../service/Config/config.service';
import Swal from 'sweetalert2';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userList: any[] = [];
  role: string = "";
  deletePerm = false;

  constructor(private route: ActivatedRoute , private configService: ConfigService, private router: Router ) {

    this.role = this.route.snapshot.params.role;

    this.configService.getAllUsers().subscribe(
      (res: any) => {
        this.userList = res;
      },
      (err) => {},
      () => { 
        this.permissions(this.role); 
        console.log(this.userList, "this.userList")
      }
    )
   }

  ngOnInit(): void {
  }

  permissions(role: string){

    if( role == "admin" ){
      this.deletePerm = true;
      console.log(this.deletePerm, "this.deletePerm");
    }
  }

  openSus(event: any){
    Swal.fire({
      icon: 'error',
      title: 'Suspend Options',
      text: 'Choose a Suspend Option',
      html:
        '<b>Choose a Suspend Option</b>, ',
      showCloseButton: true,
      showDenyButton: true,
      focusConfirm: false,
      confirmButtonText: 'Permanent',
      denyButtonText: `Temporary`,
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(event);
        this.configService.suspend(event.srcElement.id, 'permanent');
      } else if (result.isDenied) {
        this.configService.suspend(event.srcElement.id, 'temporary');
        console.log(event);
      }
    })
  }

  deleteUser(event: any){
    console.log(event.srcElement.id)
    this.configService.deleteUser(event.srcElement.id);
    this.router.navigate(['home', 'admin']);
  }

  routeUserDetails(event: any){
    this.router.navigate(['userDetails', 'view', event.srcElement.id ]);
  }

}
