import {Injectable} from '@angular/core';
import {House} from '../entities/house';
import {User} from '../entities/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AppService {

  constructor(private http: HttpClient) {
  }

  // HOUSE SERVICES
  getHouses() {
    console.log('getting houses');
    return this.http.get('/api/get-houses?number=50');
  }

  createHouse(house) {
    console.log('service: ' + house)
    return this.http.post('/api/create-house', house);
  }

  updateHouse(house: House) {
    return this.http.post('/api/update-house', house);
  }

  deleteHouse(houseId: number) {
    return this.http.delete('/api/delete-house?id=' + houseId);
  }

  // USER SERVICES
  login(formData: object) {
    return this.http.post('/api/login', formData);
  }

  getUser(userId) {
    return this.http.get('/api/get-user?id=' + userId);
  }

  createUser(payload: User): Observable<any> {
    const result = this.http.post('/api/create-user', payload);
    return result;
  }

  updateUser(user: object) {
    return this.http.post('/api/update-user', user);
  }

  deleteUser(userId: number) {
    return this.http.get('/api/delete-user?id=' + userId);
  }

  getUserHouses(userId: number) {
    return this.http.get('/api/get-houses-belonging-to-user?id=' + userId);
  }

}
