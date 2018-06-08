import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AppActions} from '../../redux/app.actions';
import {LoginService} from '../../services/login/login.service';
import {House} from '../../entities/house';
import {Subscription} from 'rxjs/Subscription';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../../redux/store/store';

@Component({
  selector: 'app-update-house',
  templateUrl: './update-house.component.html',
  styleUrls: ['./update-house.component.scss']
})
export class UpdateHouseComponent implements OnInit, OnDestroy {
  updateHouseFrm: FormGroup;
  subscription: Subscription;
  houseId: number = this.route.snapshot.params.id;
  house: House;

  constructor(private fb: FormBuilder, private router: Router, private houseActions: AppActions, private cd: ChangeDetectorRef,
              private loginService: LoginService, private ngRedux: NgRedux<IAppState>, private route: ActivatedRoute) {
  }

  ngOnDestroy() {
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
    this.updateHouseFrm = this.fb.group({
      userId: [this.loginService.getUserId()],
      headline: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      address: ['', Validators.required],
      space: ['', Validators.required],
      isHouse: ['', Validators.required],
      hasWifi: [''],
      hasTv: [''],
      hasDryer: [''],
      isFamilyFriendly: [''],
      houseThumbnail: ['', Validators.required],
      houseImages: ['', Validators.required],
    });
  }


  onSubmit(updateHouseFrm) {
    if (updateHouseFrm.valid) {
      updateHouseFrm.value.hasWifi ? updateHouseFrm.value.hasWifi = 1 : updateHouseFrm.value.hasWifi = 0;
      updateHouseFrm.value.hasTv ? updateHouseFrm.value.hasTv = 1 : updateHouseFrm.value.hasTv = 0;
      updateHouseFrm.value.hasDryer ? updateHouseFrm.value.hasDryer = 1 : updateHouseFrm.value.hasDryer = 0;
      updateHouseFrm.value.isFamilyFriendly ? updateHouseFrm.value.isFamilyFriendly = 1 : updateHouseFrm.value.isFamilyFriendly = 0;
      updateHouseFrm.value.isHouse === 'house' ? updateHouseFrm.value.isHouse = 1 : updateHouseFrm.value.isHouse = 0;

      console.log(updateHouseFrm.value);

      const house: House = updateHouseFrm.value as House;
      console.log(house);
      this.houseActions.updateHouse(house);
      // this.router.navigate(['portal']);
    }
  }

  uploadThumbnail(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.updateHouseFrm.patchValue({
          houseThumbnail: {
            base64: reader.result.split(',')[1],
            extension: file.name.split('.')[1]
          }
        });

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

  uploadImages(event) {
    if (event.target.files && event.target.files.length) {
      const uploadedFiles = event.target.files;
      const fileArray = [];
      console.log(uploadedFiles);

      for (let i = 0; i < uploadedFiles.length; i++) {
        const reader = new FileReader();
        let file = uploadedFiles[i];
        console.log('img: ', file);
        reader.readAsDataURL(file);
        reader.onload = () => {
          fileArray.push({
            base64: reader.result.split(',')[1],
            extension: file.name.split('.')[1]
          });

          // need to run CD since file load runs outside of zone
          this.cd.markForCheck();
        };
      }
      this.updateHouseFrm.patchValue({
        houseImages: fileArray
      });
    }
  }

}
