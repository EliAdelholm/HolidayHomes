import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {LoginService} from '../../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService) {
    this.loginForm = this.fb.group({
      userMail: ['', Validators.required],
      userPassword: ['', Validators.required]
    });
  }

  onSubmit(loginForm) {
    this.loginService.login(loginForm.value.userMail).subscribe(x => {
      console.log('loginForm' , this.loginForm);
      this.router.navigate(['portal']);
    });
  }

  ngOnInit() {
  }

}

