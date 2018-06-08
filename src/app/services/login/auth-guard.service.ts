import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {LoginService} from './login.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public login: LoginService, public router: Router) {
  }

  canActivate(): boolean {
    if (!this.login.isActiveSession()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
