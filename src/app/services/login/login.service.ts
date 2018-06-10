import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import {Router} from '@angular/router';

@Injectable()
export class LoginService {

  isLoggedIn = this.isActiveSession();

  isActiveSession() {
    console.log('check session')
    console.log(localStorage.getItem(('login')))
    if (localStorage.getItem('login') !== null) {
      this.isLoggedIn = true;
      return true;
    }
    return false;
  }

  login(userId) {
    console.log('login');
    return Observable.of(true).do(val => {
      this.isLoggedIn = true;
      localStorage.setItem('login', userId);
    });
  }

  logout(): void {
    console.log('logout',);
    localStorage.removeItem('login');
    this.isLoggedIn = false;
    // Reload app to get fresh redux state
    location.reload();
  }

  getUserId() {
    return localStorage.getItem('login');
  }

  constructor(private router: Router) {
  }

}
