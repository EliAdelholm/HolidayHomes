import {Injectable} from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import {House} from '../entities/house';
import {IAppState} from './store/store';
import {User} from '../entities/user';

@Injectable()
export class AppActions {
  constructor(private ngRedux: NgRedux<IAppState>) {}

  static CREATE_HOUSE: String = 'CREATE_HOUSE';
  static CREATED_HOUSE: String = 'CREATED_HOUSE';
  static FAILED_TO_CREATE_HOUSE: String = 'FAILED_TO_CREATE_HOUSE';

  static GET_HOUSES: String = 'GET_HOUSES';
  static RECEIVED_HOUSES: String = 'RECEIVED_HOUSES';
  static RESPONSE_ERROR: String = 'RESPONSE_ERROR';
  static RESPONSE_OK: String = 'RESPONSE_OK';

  static CREATE_USER: String = 'CREATE_USER';
  static CREATED_USER: String = 'CREATED_USER';
  static FAILED_TO_CREATE_USER: String = 'FAILED_TO_CREATE_USER';

  static GET_USER: String = 'GET_USER';
  static RECEIVED_USER: String = 'RECEIVED_USER';
  static FAILED_TO_GET_USER: String = 'FAILED_TO_GET_USER';

  static GET_USER_HOUSES: String = 'GET_USER_HOUSES';
  static RECEIVED_USER_HOUSES: String = 'RECEIVED_USER_HOUSES';
  static FAILED_TO_GET_USER_HOUSES: String = 'FAILED_TO_GET_USER_HOUSES';

  // house actions
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

  // user actions
  createUser(user: User) {
    console.log('action: create user');
    this.ngRedux.dispatch({
      type: AppActions.CREATE_USER,
      payload: user
    });
  }

  getUser(formData) {
    this.ngRedux.dispatch({
      type: AppActions.GET_USER,
      payload: formData
    });
  }

  getUserHouses(userId: number) {
    this.ngRedux.dispatch({
      type: AppActions.GET_USER_HOUSES,
      payload: userId
    });
  }

}
