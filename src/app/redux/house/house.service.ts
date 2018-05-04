import {HouseState} from '../store/store';
import {Injectable} from '@angular/core';

@Injectable()
export class HouseService {
  static getInitialHouseState(): HouseState {
    // to do : fetch from api
    return { house: [] };
  }


}
