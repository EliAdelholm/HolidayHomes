import {HouseState} from '../store/store';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class HouseService {

  constructor( private http: HttpClient){}

  getHouses(){
    return this.http.get('/get-houses');
  }

  static getInitialHouseState(): HouseState {
    return { house: [] };
  }


}
