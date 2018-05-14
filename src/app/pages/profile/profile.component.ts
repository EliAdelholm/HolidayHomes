import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  updateProfileFrm: FormGroup;
  displayPopup = false;
  constructor( private fb: FormBuilder) {}

  ngOnInit() {
    this.updateProfileFrm = this.fb.group({
      userEmail: ['', Validators.required],
      userPassword: ['', Validators.required],
      userName: ['', Validators.required],
      userImg: ['']
    });
  }

  togglePopup() {
    console.log('test');
    this.displayPopup = !this.displayPopup;
  }

}
