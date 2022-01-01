import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegisterData } from '../model/registerData';
import { posts, Users } from '../model/userModel';
import { ConfigService } from '../service/Config/config.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  mode: string = "";
  username: string = "";
  user = <Users>{};
  posts = <posts[]>{}

  constructor( private route: ActivatedRoute, private configService: ConfigService ) {
    this.mode = this.route.snapshot.params.mode;
    this.username = this.route.snapshot.params.username;

    

    this.configService.getUserDetails(this.username).subscribe(
      (res: any) => {
        this.user = res.result;
        console.log(this.user.posts.length, 'LENGTH OF POSTS');
      },
      (err) => { console.log(err) },
      () => {
        
      }
    )

   }

   getUserFunction(){
    console.log(this.user.posts.length, 'LENGTH OF POSTS');

   }

  ngOnInit(): void {
  }

}
