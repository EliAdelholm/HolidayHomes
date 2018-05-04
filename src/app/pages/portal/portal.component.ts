import { Component, OnInit } from '@angular/core';
import {HouseActions} from '../../redux/house/house.actions';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {

  constructor(
    private houseActions: HouseActions
  ) { }

  ngOnInit() {
    // console.log('houses', this.houseActions.getHouses());
  }

}
