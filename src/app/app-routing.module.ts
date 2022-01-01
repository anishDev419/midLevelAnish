import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddModeratorComponent } from './add-moderator/add-moderator.component';
import { AddPostComponent } from './add-post/add-post.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {path:'home/:role', component: HomeComponent, canActivate: [AuthGuard] },
  {path:'', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path: 'addModerator', component: AddModeratorComponent, canActivate: [AuthGuard]},
  {path: 'userList/:role', component: UserListComponent, canActivate: [AuthGuard]},
  {path: 'userDetails/:mode/:username', component: UserDetailsComponent, canActivate: [AuthGuard]},
  {path: 'addPost/:username', component: AddPostComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
