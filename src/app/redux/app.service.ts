import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {House} from '../entities/house';

@Injectable()
export class AppService {

  constructor(private http: HttpClient) {
  }

  getHouses() {
    console.log('getting houses');
    return this.http.get('/api/get-houses?number=5');
  }

  getUser(formData: object) {
    return this.http.post('/api/login', formData);
  }


}
