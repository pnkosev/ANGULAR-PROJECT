import { AdminToolComponent } from './admin-tool/admin-tool.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';

import { RoleGuardService } from './../../core/guards/role-guard.service';
import { GetAllPostsResolver } from '../../core/resolvers/get-all-posts.resolver';



const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    resolve: {
      userPosts: GetAllPostsResolver,
    }
  },
  {
    path: 'admin-tool',
    component: AdminToolComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRole: 'admin'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
