import { Component, OnInit } from '@angular/core';
import {HouseActions} from '../../redux/house/house.actions';
import {Subscription} from 'rxjs/Subscription';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../../redux/store/store';
import {House} from '../../entities/house';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {
  subscription: Subscription;
  houses: House [];
  constructor(
    private houseActions: HouseActions,
    private ngRedux: NgRedux<IAppState>
  ) { }

  ngOnInit() {
    this.houseActions.getHouses();
    this.subscription = this.ngRedux.select(store => store.house).subscribe( x => {
      this.houses = x.house;
      // console.log("houses", x);
    })

  }

  onGetHouses(){

  }

}
