import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../service/posts/post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  username = "";

  constructor( private route: ActivatedRoute, private postService: PostService ) {
    this.username = this.route.snapshot.params.username;
  }

  ngOnInit(): void {
  }

  
  postForm = new FormGroup({

    postName: new FormControl("", [Validators.required] ),
    description: new FormControl("", [Validators.required])

  })

  addPost(){
    const postName = this.postForm.get('postName')?.value;
    const description = this.postForm.get('description')?.value;
    this.postService.addPost(this.username, postName, description).subscribe(
      (res: any) => {
        console.log(res);
      }
    )
  }
}
