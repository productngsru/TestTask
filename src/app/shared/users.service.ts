import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConstants} from '../AppConstants';

export interface UserRecord {
  ID: number;
  TpID: number;
  Email: string;
  FIO: string;
  Phone: string;
  Data: string;
  Activation: string;
  Actv: number;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl = AppConstants.baseApiURL + 'user_data/';
  constructor(private httpClient: HttpClient) { }

  getUserData(email: string) {
    const  url = this.apiUrl + btoa(email);
    console.log(url);
    return this.httpClient.get <UserRecord>(url);
  }

}
