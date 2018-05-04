import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { House } from '../../entities/house';
import {IAppState} from '../store/store';

@Injectable()
export class HouseActions {
  constructor ( private ngRedux: NgRedux<IAppState> ) {}

  static CREATE_HOUSE: String = 'CREATE_HOUSE';
  static GET_HOUSES: String = 'GET_HOUSES';
  static RESPONSE_ERROR: String = 'RESPONSE_ERROR';
  static RESPONSE_OK: String = 'RESPONSE_OK';

  createHouse ( house: House ) {
    console.log('house ',  house);
    this.ngRedux.dispatch({
      type: HouseActions.CREATE_HOUSE,
      payload: house
    });
  }

  getHouses () {
    this.ngRedux.dispatch({
      type: HouseActions.GET_HOUSES
    });
  }

}
