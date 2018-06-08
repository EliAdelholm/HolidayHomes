import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {House} from '../../entities/house';
import {AppActions} from '../../redux/app.actions';
import {LoginService} from '../../services/login/login.service';

@Component({
  selector: 'app-new-house-form',
  templateUrl: './new-house-form.component.html',
  styleUrls: ['./new-house-form.component.scss']
})

export class NewHouseFormComponent implements OnInit {
  createHouseFrm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private houseActions: AppActions, private cd: ChangeDetectorRef,
              private loginService: LoginService) {
  }

  ngOnInit() {
    this.createHouseFrm = this.fb.group({
      userId: [this.loginService.getUserId()],
      headline: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      address: ['', Validators.required],
      space: ['', Validators.required],
      isHouse: [1, Validators.required],
      wifi: [''],
      tv: [''],
      dryer: [''],
      familyFriendly: [''],
      houseThumbnail: ['', Validators.required],
      houseImages: [''],
    });
  }


  onSubmit(createHouseFrm) {
    console.log(createHouseFrm.value.isHouse)
    if (createHouseFrm.valid) {
      createHouseFrm.value.wifi ? createHouseFrm.value.wifi = 1 : createHouseFrm.value.wifi = 0;
      createHouseFrm.value.tv ? createHouseFrm.value.tv = 1 : createHouseFrm.value.tv = 0;
      createHouseFrm.value.dryer ? createHouseFrm.value.dryer = 1 : createHouseFrm.value.dryer = 0;
      createHouseFrm.value.familyfriendly ? createHouseFrm.value.familyfriendly = 1 : createHouseFrm.value.familyfriendly = 0;

      console.log(createHouseFrm.value);

      const house: House = createHouseFrm.value as House;
      console.log(house);
      this.houseActions.createHouse(house);
      // this.router.navigate(['portal']);
    }
  }

  uploadThumbnail(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        const splitName = file.name.split('.');
        this.createHouseFrm.patchValue({
          houseThumbnail: {
            base64: reader.result.split(',')[1],
            extension: splitName[splitName.length - 1]
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
        const splitName = file.name.split('.');
        console.log('img: ', file);
        reader.readAsDataURL(file);
        reader.onload = () => {
          fileArray.push({
            base64: reader.result.split(',')[1],
            extension: splitName[splitName.length - 1]
          });

          // need to run CD since file load runs outside of zone
          this.cd.markForCheck();
        };
      }
      this.createHouseFrm.patchValue({
        houseImages: fileArray
      });
    }
  }

}
