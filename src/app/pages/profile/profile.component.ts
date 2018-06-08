import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
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
  popupContent;
  houseId;
  subscription: Subscription;
  user;
  houses;
  gotHouses = false;

  constructor(private fb: FormBuilder, private ngRedux: NgRedux<IAppState>, private appActions: AppActions, private cd: ChangeDetectorRef) {
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

  uploadImage(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.updateProfileFrm.patchValue({
          userImg: {
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
    }
  }

  togglePopup(type, id) {
    this.popupContent = type;
    type === 'house' ? this.houseId = id : this.houseId = null;
    this.displayPopup = !this.displayPopup;
  }

  deleteHouse() {
    console.log('Delete house with id: ' + this.houseId);
  }

  deleteAccount() {
    console.log('Delete account with id: ' + this.user.id);
  }

}
