import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../../redux/store/store';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  updateProfileFrm: FormGroup;
  displayPopup = false;
  subscription: Subscription;
  user;

  constructor(private fb: FormBuilder, private ngRedux: NgRedux<IAppState>) {
  }

  ngOnInit() {

    this.subscription = this.ngRedux.select(store => store.user).subscribe(user => {
      this.user = user.account;

      if (this.user) {
        this.updateProfileFrm = this.fb.group({
          userName: [this.user.name, Validators.required],
          userEmail: [this.user.email, Validators.required],
          userPassword: [this.user.password, Validators.required],
          userImg: [this.user.image]
        });
      }
    });


  }

  togglePopup() {
    console.log('test');
    this.displayPopup = !this.displayPopup;
  }

}
