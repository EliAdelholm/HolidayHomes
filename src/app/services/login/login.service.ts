import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import {Router} from '@angular/router';

@Injectable()
export class LoginService {

  isLoggedIn = false;

  isActiveSession() {
    if (localStorage.getItem('login')) {
      this.isLoggedIn = true;
      return true;
    }
    return false;
  }

  login(userId): Observable<boolean> {
    return Observable.of(true).do(val => {
      this.isLoggedIn = true;
      localStorage.setItem('login', userId);
    });
  }

  logout(): void {
    console.log('logout',);
    localStorage.removeItem('login');
    this.isLoggedIn = false;
    // this.router.navigate(['login']);
  }

  getUserId() {
    return localStorage.getItem('login');
  }

  constructor(private router: Router) {
  }

}
