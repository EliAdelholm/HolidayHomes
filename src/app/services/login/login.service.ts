import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import {Router} from '@angular/router';

@Injectable()
export class LoginService {

  isLoggedIn = false;

  login(): Observable<boolean> {
    return Observable.of(true).do(val => {
      this.isLoggedIn = true;
    });
  }

  logout(): void {
    this.isLoggedIn = false;
    this.router.navigate(['login']);
  }

  constructor(private router: Router) { }

}
