import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-house-form',
  templateUrl: './new-house-form.component.html',
  styleUrls: ['./new-house-form.component.scss']
})
export class NewHouseFormComponent implements OnInit {
  createHouseFrm: FormGroup;
  searchForm: FormGroup;

  constructor( private fb: FormBuilder,
               private router: Router) {
    this.createHouseFrm = this.fb.group({
      houseHeadline:['', Validators.required],
      houseDescription:['', Validators.required],
      housePrice:['', Validators.required],
      houseAddress:['', Validators.required],
      houseSpace:['', Validators.required],
      houseType:['', Validators.required],
      hasWifi:[''],
      hasTv:[''],
      hasDryer:[''],
      isFamilyFriendly:[''],
      houseThumbnail:[''],
      houseImg:[''],
      houseImg1:[''],
      houseImg2:[''],
      houseImg3:[''],
      houseImg4:[''],
      houseImg5:['']
    })
  }

  ngOnInit() {
  }


  onSubmit(createHouseFrm){
    if(this.createHouseFrm.value.hasWifi == ""){
      this.createHouseFrm.value.hasWifi = false
    }

    if(this.createHouseFrm.value.hasTv == ""){
      this.createHouseFrm.value.hasTv = false
    }

    if(this.createHouseFrm.value.hasDryer == ""){
      this.createHouseFrm.value.hasDryer = false
    }

    if(this.createHouseFrm.value.isFamilyFriendly == ""){
      this.createHouseFrm.value.isFamilyFriendly = false
    }

    console.log('createHouseFrm' , this.createHouseFrm.value);
    this.router.navigate(['portal']);
  }

  checkValue(event: any){
    console.log(event);
  }
}
