import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {House} from '../../entities/house';
import {AppActions} from '../../redux/app.actions';

@Component({
  selector: 'app-new-house-form',
  templateUrl: './new-house-form.component.html',
  styleUrls: ['./new-house-form.component.scss']
})
export class NewHouseFormComponent implements OnInit {
  createHouseFrm: FormGroup;

  // searchForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private houseActions: AppActions) {

    this.createHouseFrm = this.fb.group({
      userId: [1],
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
      houseThumbnail: [''],
      houseImages: [''],
    });
  }

  ngOnInit() {
  }


  onSubmit(createHouseFrm) {
    console.log(createHouseFrm.value);
    createHouseFrm.value.hasWifi ? createHouseFrm.value.hasWifi = 1 : createHouseFrm.value.hasWifi = 0;
    createHouseFrm.value.hasTv ? createHouseFrm.value.hasTv = 1 : createHouseFrm.value.hasTv = 0;
    createHouseFrm.value.hasDryer ? createHouseFrm.value.hasDryer = 1 : createHouseFrm.value.hasDryer = 0;
    createHouseFrm.value.isFamilyFriendly ? createHouseFrm.value.isFamilyFriendly = 1 : createHouseFrm.value.isFamilyFriendly = 0;
    createHouseFrm.value.isHouse === 'house' ? createHouseFrm.value.isHouse = 1 : createHouseFrm.value.isHouse = 0;

    console.log(createHouseFrm.value);

    const house: House = createHouseFrm.value as House;
    this.houseActions.createHouse(house);
    // this.router.navigate(['portal']);
  }

  checkValue(event: any) {
    console.log(event);
  }
}
