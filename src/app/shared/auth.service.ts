import { Injectable } from '@angular/core';
import {AppConstants} from '../AppConstants';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {isDefined, unsubscribeAll} from './utils';
import {UsersService} from './users.service';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = AppConstants.baseApiURL + 'login';
  token;
  subcription: Subscription [] = [];
  constructor(
    private  http: HttpClient,
    private  router: Router,
    private users: UsersService
  ) { }
  login(login: string, password: string) {
    unsubscribeAll(this.subcription);
    localStorage.removeItem('auth_token');
    if (login === 'admin' && password === 'admin') {
      localStorage.setItem('auth_token', '1233454');
      localStorage.setItem('user_name', 'Администратор');
      this.router.navigate(['main']);
    }
  }
  logout() {
    localStorage.removeItem('auth_token');
    this.router.navigate(['']);
  }
  isLoggedIn() {
    const authToken =  localStorage.getItem('auth_token');
    return  (isDefined(authToken) && authToken !== '');
  }
}
