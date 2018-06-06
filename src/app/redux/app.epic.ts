import { Injectable } from '@angular/core';
import {AppService} from './app.service';
import {AppActions} from './app.actions';
import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AppEpic {
  constructor( private appService: AppService ) {}

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
      .mergeMap(({ payload }) => {
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
  }

  getUser = (actions: ActionsObservable<any>) => {
    return actions.ofType(AppActions.GET_USER)
      .mergeMap(({ payload }) => {
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
  }
}
