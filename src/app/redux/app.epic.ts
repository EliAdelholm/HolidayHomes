import {Injectable} from '@angular/core';
import {AppService} from './app.service';
import {AppActions} from './app.actions';
import {ActionsObservable} from 'redux-observable';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AppEpic {
  constructor(private appService: AppService) {
  }

  getHouses = (actions: ActionsObservable<any>) => {
    return actions.ofType(AppActions.GET_HOUSES)
      .mergeMap(({}) => {
        return this.appService.getHouses()
          .map((result: any[]) => ({
            type: AppActions.RECEIVED_HOUSES,
            payload: result
          }))
          .catch(error => {
            if (error.status >= 200 && error.status < 300) {
              return Observable.of({
                type: AppActions.RESPONSE_OK,
                payload: error.status
              });
            } else {
              return Observable.of({ // when web service responds with failure, call this action with payload that came back from webservice
                type: AppActions.RESPONSE_ERROR,
                payload: error
              });
            }
          });
      });
  };

  createHouse = (actions: ActionsObservable<any>) => {
    return actions.ofType(AppActions.CREATE_HOUSE)
      .mergeMap(({payload}) => {
        return this.appService.createHouse(payload)
          .map((result: any[]) => ({
            type: AppActions.CREATED_HOUSE,
            payload: result
          }))
          .catch(error => Observable.of({
            type: AppActions.FAILED_TO_CREATE_HOUSE,
            payload: error.error
          }));
      });
  };

  updateHouse = (actions: ActionsObservable<any>) => {
    return actions.ofType(AppActions.UPDATE_HOUSE)
      .mergeMap(({payload}) => {
        return this.appService.updateHouse(payload)
          .map((result: any[]) => ({
            type: AppActions.UPDATED_HOUSE,
            payload: result
          }))
          .catch(error => Observable.of({
            type: AppActions.FAILED_TO_UPDATE_HOUSE,
            payload: error
          }));
      });
  };

  deleteHouse = (actions: ActionsObservable<any>) => {
    return actions.ofType(AppActions.DELETE_HOUSE)
      .mergeMap(({payload}) => {
        return this.appService.deleteHouse(payload)
          .map((result: any[]) => ({
            type: AppActions.DELETED_HOUSE,
            payload: result
          }))
          .catch(error => Observable.of({
            type: AppActions.FAILED_TO_DELETE_HOUSE,
            payload: error
          }));
      });
  };

  login = (actions: ActionsObservable<any>) => {
    return actions.ofType(AppActions.LOGIN)
      .mergeMap(({payload}) => {
        return this.appService.login(payload)
          .map((result: any[]) => ({
            type: AppActions.RECEIVED_USER,
            payload: result
          }))
          .catch(error => Observable.of({
            type: AppActions.FAILED_TO_GET_USER,
            payload: error.error
          }));
      });
  };

  getUser = (actions: ActionsObservable<any>) => {
    return actions.ofType(AppActions.GET_USER)
      .mergeMap(({payload}) => {
        return this.appService.getUser(payload)
          .map((result: any[]) => ({
            type: AppActions.RECEIVED_USER,
            payload: result
          }))
          .catch(error => Observable.of({
            type: AppActions.FAILED_TO_GET_USER,
            payload: error.error
          }));
      });
  };

  createUser = (actions: ActionsObservable<any>) => {
    return actions.ofType(AppActions.CREATE_USER)
      .mergeMap(({payload}) => {
        return this.appService.createUser(payload)
          .map((result: any) => ({
            type: AppActions.CREATED_USER,
            payload: result
          }))
          .catch(error => Observable.of({
            type: AppActions.FAILED_TO_CREATE_USER,
            payload: error.error
          }));
      });
  };

  updateUser = (actions: ActionsObservable<any>) => {
    return actions.ofType(AppActions.UPDATE_USER)
      .mergeMap(({payload}) => {
        return this.appService.updateUser(payload)
          .map((result: any) => ({
            type: AppActions.UPDATED_USER,
            payload: result
          }))
          .catch(error => Observable.of({
            type: AppActions.FAILED_TO_UPDATE_USER,
            payload: error
          }));
      });
  };

  deleteUser = (actions: ActionsObservable<any>) => {
    return actions.ofType(AppActions.DELETE_USER)
      .mergeMap(({payload}) => {
        return this.appService.deleteUser(payload)
          .map((result: any) => ({
            type: AppActions.DELETED_USER,
            payload: result
          }))
          .catch(error => Observable.of({
            type: AppActions.FAILED_TO_DELETE_USER,
            payload: error
          }));
      });
  };

  getUserHouses = (actions: ActionsObservable<any>) => {
    return actions.ofType(AppActions.GET_USER_HOUSES)
      .mergeMap(({payload}) => {
        return this.appService.getUserHouses(payload)
          .map((result: any[]) => ({
            type: AppActions.RECEIVED_USER_HOUSES,
            payload: result
          }))
          .catch(error => Observable.of({
            type: AppActions.FAILED_TO_GET_USER_HOUSES,
            payload: error.error
          }));
      });
  };
}
