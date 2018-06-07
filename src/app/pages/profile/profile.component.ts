import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../../redux/store/store';
import {AppActions} from '../../redux/app.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit, OnDestroy {
  updateProfileFrm: FormGroup;
  displayPopup = false;
  subscription: Subscription;
  user;
  houses;
  gotHouses = false;

  constructor(private fb: FormBuilder, private ngRedux: NgRedux<IAppState>, private appActions: AppActions) {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.ngRedux.select(store => store.user).subscribe(user => {
      this.user = user.account;
      this.houses = user.houses;

      if (this.user) {
        if (!this.gotHouses) {
          this.appActions.getUserHouses(this.user.id);
          this.gotHouses = true;
        }
        this.updateProfileFrm = this.fb.group({
          userName: [this.user.name, Validators.required],
          userEmail: [this.user.email, Validators.required],
          userPassword: [this.user.password, Validators.required],
          userImg: ['']
        });
      }
    });
  }

  togglePopup() {
    console.log('test');
    this.displayPopup = !this.displayPopup;
  }

}
