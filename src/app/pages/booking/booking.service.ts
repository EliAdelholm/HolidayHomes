import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AppService {

  constructor(private http: HttpClient) {
  }

  getBookings() {
    return this.http.get('/api/bookings');
  }

  addBooking(booking: {}) {
    return this.http.post('/api/create-booking', booking);
  }

}
