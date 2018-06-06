import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class BookingService {

  constructor(private http: HttpClient) {
  }

  getBookings(houseId) {
    return this.http.get('/api/get-bookings?id=' + houseId);
  }

  addBooking(booking: {}) {
    return this.http.post('/api/create-booking', booking);
  }

}
