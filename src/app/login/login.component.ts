import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  state: any = {login: '', password: ''};

  constructor(private  authService: AuthService) { }

  ngOnInit() {
  }

  onLogin() {
    console.log('onLogin');
    this.authService.login(this.state.login, this.state.password);
  }
}
