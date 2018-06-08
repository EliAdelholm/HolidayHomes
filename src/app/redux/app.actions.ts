import {Injectable} from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import {House} from '../entities/house';
import {IAppState} from './store/store';
import {User} from '../entities/user';

@Injectable()
export class AppActions {
  constructor(private ngRedux: NgRedux<IAppState>) {
  }

  static RESET_STATUS: String = 'RESET_STATUS';

  static CREATE_HOUSE: String = 'CREATE_HOUSE';
  static CREATED_HOUSE: String = 'CREATED_HOUSE';
  static FAILED_TO_CREATE_HOUSE: String = 'FAILED_TO_CREATE_HOUSE';

  static UPDATE_HOUSE: String = 'UPDATE_HOUSE';
  static UPDATED_HOUSE: String = 'UPDATED_HOUSE';
  static FAILED_TO_UPDATE_HOUSE: String = 'FAILED_TO_UPDATE_HOUSE';

  static DELETE_HOUSE: String = 'DELETE_HOUSE';
  static DELETED_HOUSE: String = 'DELETED_HOUSE';
  static FAILED_TO_DELETE_HOUSE: String = 'FAILED_TO_DELETE_HOUSE';

  static GET_HOUSES: String = 'GET_HOUSES';
  static RECEIVED_HOUSES: String = 'RECEIVED_HOUSES';
  static RESPONSE_ERROR: String = 'RESPONSE_ERROR';
  static RESPONSE_OK: String = 'RESPONSE_OK';

  static CREATE_USER: String = 'CREATE_USER';
  static CREATED_USER: String = 'CREATED_USER';
  static FAILED_TO_CREATE_USER: String = 'FAILED_TO_CREATE_USER';

  static UPDATE_USER: String = 'UPDATE_USER';
  static UPDATED_USER: String = 'UPDATED_USER';
  static FAILED_TO_UPDATE_USER: String = 'FAILED_TO_UPDATE_USER';

  static DELETE_USER: String = 'DELETE_USER';
  static DELETED_USER: String = 'DELETED_USER';
  static FAILED_TO_DELETE_USER: String = 'FAILED_TO_DELETE_USER';

  static LOGIN: String = 'LOGIN';
  static LOGGED_IN_USER = 'LOGGED_IN_USER';
  static GET_USER: String = 'GET_USER';
  static RECEIVED_USER: String = 'RECEIVED_USER';
  static FAILED_TO_GET_USER: String = 'FAILED_TO_GET_USER';

  static GET_USER_HOUSES: String = 'GET_USER_HOUSES';
  static RECEIVED_USER_HOUSES: String = 'RECEIVED_USER_HOUSES';
  static FAILED_TO_GET_USER_HOUSES: String = 'FAILED_TO_GET_USER_HOUSES';

  // STATUS ACTIONS
  resetStatus() {
    this.ngRedux.dispatch({
      type: AppActions.RESET_STATUS
    });
  }

  // HOUSE ACTIONS
  createHouse(house: House) {
    console.log('house ', house);
    this.ngRedux.dispatch({
      type: AppActions.CREATE_HOUSE,
      payload: house
    });
  }

  updateHouse(house: House) {
    this.ngRedux.dispatch({
      type: AppActions.UPDATE_HOUSE,
      payload: house
    });
  }

  deleteHouse(houseId: number) {
    this.ngRedux.dispatch({
      type: AppActions.DELETE_HOUSE,
      payload: houseId
    });
  }

  getHouses() {
    // console.log('get houses ');
    this.ngRedux.dispatch({
      type: AppActions.GET_HOUSES
    });
  }

  // USER ACTIONS
  createUser(user: User) {
    console.log('action: create user');
    this.ngRedux.dispatch({
      type: AppActions.CREATE_USER,
      payload: user
    });
  }

  login(formData) {
    this.ngRedux.dispatch({
      type: AppActions.LOGIN,
      payload: formData
    });
  }

  getUser(userId) {
    this.ngRedux.dispatch({
      type: AppActions.GET_USER,
      payload: userId
    });
  }

  updateUser(user: object) {
    this.ngRedux.dispatch({
      type: AppActions.UPDATE_USER,
      payload: user
    });
  }

  deleteUser(userId: object) {
    this.ngRedux.dispatch({
      type: AppActions.DELETE_USER,
      payload: userId
    });
  }

  getUserHouses(userId: number) {
    this.ngRedux.dispatch({
      type: AppActions.GET_USER_HOUSES,
      payload: userId
    });
  }

}
