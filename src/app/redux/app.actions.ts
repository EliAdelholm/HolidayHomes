import {Injectable} from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import {House} from '../entities/house';
import {IAppState} from './store/store';

@Injectable()
export class AppActions {
  constructor(private ngRedux: NgRedux<IAppState>) {
  }

  static CREATE_HOUSE: String = 'CREATE_HOUSE';
  static CREATED_HOUSE: String = 'CREATED_HOUSE';
  static FAILED_TO_CREATE_HOUSE: String = 'FAILED_TO_CREATE_HOUSE';

  static GET_HOUSES: String = 'GET_HOUSES';
  static RECEIVED_HOUSES: String = 'RECEIVED_HOUSES';
  static RESPONSE_ERROR: String = 'RESPONSE_ERROR';
  static RESPONSE_OK: String = 'RESPONSE_OK';

  static GET_USER: String = 'GET_USER';
  static RECEIVED_USER: String = 'RECEIVED_USER';
  static FAILED_TO_GET_USER: String = 'FAILED_TO_GET_USER';

  createHouse(house: House) {
    console.log('house ', house);
    this.ngRedux.dispatch({
      type: AppActions.CREATE_HOUSE,
      payload: house
    });
  }

  getHouses() {
    // console.log('get houses ');
    this.ngRedux.dispatch({
      type: AppActions.GET_HOUSES
    });
  }

  getUser(formData) {
    this.ngRedux.dispatch({
      type: AppActions.GET_USER,
      payload: formData
    });
  }

}
