import {HouseState} from '../store/store';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class HouseService {

  constructor( private http: HttpClient){}

  getHouses(){
    return this.http.get('./server/server.js');
  }

  static getInitialHouseState(): HouseState {
    return { house: [] };
  }


}
