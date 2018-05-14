import {HouseState} from '../store/store';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class HouseService {

  constructor( private http: HttpClient){}

  getHouses(){
    console.log('getting houses');
    return this.http.get('/get-houses?number=5');
  }

  static getInitialHouseState(): HouseState {
    return { house: [] };
  }


}
