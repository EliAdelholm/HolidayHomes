import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  updateProfileFrm: FormGroup;
  constructor( private fb: FormBuilder) {
    this.updateProfileFrm = this.fb.group({
      userEmail: ['', Validators.required],
      userPassword: ['', Validators.required],
      userName: ['', Validators.required],
      userImg: ['']
    });
  }

  ngOnInit() {
  }

}
