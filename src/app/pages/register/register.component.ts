import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerFrm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.registerFrm = this.fb.group({
      userEmail: ['', Validators.required],
      userPassword: ['', Validators.required],
      userName: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit(registerFrm) {
    console.log('registerFrm' , this.registerFrm);
    this.router.navigate(['login']);
  }

}
// bla bla bla
