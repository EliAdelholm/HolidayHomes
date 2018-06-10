import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from '../../services/login/login.service';
import {AppActions} from '../../redux/app.actions';
import {Subscription} from 'rxjs/Subscription';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../../redux/store/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  subscription: Subscription;
  errorMessage;
  user;

  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService, private appActions: AppActions,
              private ngRedux: NgRedux<IAppState>) {
  }

  onSubmit(loginForm) {
    if (loginForm.valid) {
      this.appActions.login(loginForm.value);
    }
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.subscription = this.ngRedux.select(store => store.user).subscribe(user => {
      this.user = user;

      if (this.user && this.user.status === 'OK' ) {
        this.loginService.login(this.user.account.id).subscribe(x => {
          this.appActions.getUserHouses(this.user.account.id);
          this.router.navigate(['portal']);
        });
      }

      if (this.user && this.user.status !== 'OK') {
        this.errorMessage = this.user.status;
      }

    });

  }

}

