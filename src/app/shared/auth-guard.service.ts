import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {isDefined} from './utils';

@Injectable()
export class AuthGuard implements CanActivate{

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const token = localStorage.getItem('auth_token');
    const isLoggedIn = (isDefined(token) && token !== '');
    if (isLoggedIn) { return true; }
    this.router.navigate(['/login']);
    return false;
  }
}
