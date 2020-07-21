import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './shared/auth.service';
import {DialogService} from './ui/dialog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Купить Детали';
  state = {
    findNumber: '',
  };

  constructor(
    private  router: Router,
    private authService: AuthService,
    private dialog: DialogService) {
  }

  isLoggedIn = () => this.authService.isLoggedIn();
  userName = () => localStorage.getItem('user_name');

  doLogout() {
    this.dialog.confirmDialog('Вы действительно хотите выйти?',
      '200px', () => {
        this.authService.logout();
      });
  }

  navigatePage(s: string) {
    this.router.navigate([s]);
  }

  doFind() {
    this.router.navigate(['main'], {
      queryParams: {
        findNumber: this.state.findNumber
      }
    });
  }

  doFindByKey(event: KeyboardEvent) {
    console.log(event);
    if (event.key === 'Enter') {
      this.doFind();
    }
  }
}
