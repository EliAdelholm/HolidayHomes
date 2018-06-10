import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AppActions} from '../../redux/app.actions';
import {LoginService} from '../../services/login/login.service';
import {House} from '../../entities/house';
import {Subscription} from 'rxjs/Subscription';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../../redux/store/store';
import {User} from '../../entities/user';

@Component({
  selector: 'app-update-house',
  templateUrl: './update-house.component.html',
  styleUrls: ['./update-house.component.scss']
})
export class UpdateHouseComponent implements OnInit, OnDestroy {
  updateHouseFrm: FormGroup;
  subscription: Subscription;
  statusSubscription: Subscription;
  houseId: number = this.route.snapshot.params.id;
  house: House;
  user: User;
  houses: House [];
  toDeleteArray = [];
  status;

  constructor(private fb: FormBuilder, private router: Router, private houseActions: AppActions, private cd: ChangeDetectorRef,
              private loginService: LoginService, private ngRedux: NgRedux<IAppState>, private route: ActivatedRoute) {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.statusSubscription.unsubscribe();
  }

  ngOnInit() {
    this.statusSubscription = this.ngRedux.select(state => state.requestStatus).subscribe(status => {
      this.status = status;

      if (this.status.code && this.status.code === 'OK') {
        this.router.navigate(['profile']);
        this.houseActions.resetStatus();
      }
    });

    this.subscription = this.ngRedux.select(store => store.houses).subscribe(houses => {
      this.house = houses && houses.find(x => x.id == this.houseId);
      console.log(this.house);

      if (this.house) {
        this.updateHouseFrm = this.fb.group({
          id: [this.house.id, Validators.required],
          headline: [this.house.headline, Validators.compose([
            Validators.required,
            Validators.maxLength(100)
          ])],
          description: [this.house.description, Validators.compose([
            Validators.required,
            Validators.maxLength(1000)
          ])],
          price: [this.house.price, Validators.required],
          address: [this.house.address, Validators.required],
          space: [this.house.space, Validators.required],
          isHouse: [this.house.is_house, Validators.required],
          hasWifi: [this.house.wifi],
          hasTv: [this.house.tv],
          hasDryer: [this.house.dryer],
          isFamilyFriendly: [this.house.familyfriendly],
          houseThumbnail: [''],
          imagesToDelete: [this.toDeleteArray],
          imagesToUpload: ['']
        });
      }
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
        const file = uploadedFiles[i];
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
        imagesToUpload: fileArray
      });
    }
  }

  toBeDeleted(img) {
    return this.toDeleteArray.includes(img);
  }

  toggleToBeDeleted(img) {
    if (!this.toBeDeleted(img)) {
      this.toDeleteArray.push(img);
    } else {
      this.toDeleteArray = this.toDeleteArray.filter(x => x !== img);
    }
  }

}
