import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../../redux/store/store';
import {AppActions} from '../../redux/app.actions';
import {LoginService} from '../../services/login/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit, OnDestroy {
  updateProfileFrm: FormGroup;
  displayPopup = false;
  popupContent;
  houseId;
  subscription: Subscription;
  user;
  houses;
  deleteUserStatus;

  constructor(private fb: FormBuilder, private ngRedux: NgRedux<IAppState>, private appActions: AppActions,
              private cd: ChangeDetectorRef, private loginService: LoginService) {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.ngRedux.select(store => store.user).subscribe(user => {
      this.user = user.account;
      this.houses = user.houses;
      this.deleteUserStatus = user.status;

      if (this.deleteUserStatus === 'User deleted') {
        this.loginService.logout();
      }

      if (this.user) {
        this.updateProfileFrm = this.fb.group({
          id: [this.user.id, Validators.required],
          username: [this.user.name, Validators.required],
          email: [this.user.email, Validators.required],
          password: [this.user.password, Validators.required],
          image: ['']
        });
      }
    });
  }

  uploadImage(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.updateProfileFrm.patchValue({
          image: {
            base64: reader.result.split(',')[1],
            extension: file.name.split('.')[1]
          }
        });

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

  onSubmit(form) {
    if (form.valid) {
      console.log(form.value);
      this.appActions.updateUser(form.value);
    }
  }

  togglePopup(type, id) {
    this.popupContent = type;
    type === 'house' ? this.houseId = id : this.houseId = null;
    this.displayPopup = !this.displayPopup;
  }

  deleteHouse() {
    console.log('Delete house with id: ' + this.houseId);
    this.appActions.deleteHouse(this.houseId);
    this.displayPopup = false;
  }

  deleteAccount() {
    console.log('Delete account with id: ' + this.user.id);
    this.appActions.deleteUser(this.user.id);
  }

}
