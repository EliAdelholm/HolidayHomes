import { Injectable } from '@angular/core';
import {HouseService} from './house.service';
import {HouseActions} from './house.actions';
import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HouseEpic {
  constructor( private houseService: HouseService ) {}

  getHouses = (actions: ActionsObservable<any>) => {
    return actions.ofType(HouseActions.GET_HOUSES) // Listen for this action
      .mergeMap(({}) => { // payload: (subject: Subject, date: Date): When this action is activated, call ws through service class or directly like below
        return this.houseService.getHouses() // runs async
          .map((result: any[]) => ({ // when web service responds with success, call this action with payload that came back from webservice
            type: HouseActions.RESPONSE_OK,
            payload: result // Hack: Db contains all data, not just yours.
          }))
          .catch(error => {
            if (error.status >= 200 && error.status < 300) { // web service vracia 201 a angular je prijebany takze to oznaci ako error (akceptuje iba 200 ako spravne)
              return Observable.of({ // when web service responds with failure, call this action with payload that came back from webservice
                type: HouseActions.RESPONSE_OK,
                payload: error.status
              });
            } else {
              return Observable.of({ // when web service responds with failure, call this action with payload that came back from webservice
                type: HouseActions.RESPONSE_ERROR,
                payload: error
              });
            }
          });
      });
  }
}
