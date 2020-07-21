import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './main/main.component';
import {AboutComponent} from './about/about.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './shared/auth-guard.service';
import {RegisterComponent} from './register/register.component';

const routes: Routes = [
  { path: '', component: MainComponent, canActivate: [AuthGuard]},
  { path: 'main', component: MainComponent, canActivate: [AuthGuard]},
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
