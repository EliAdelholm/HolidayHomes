import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../../redux/store/store';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';
import {House} from '../../entities/house';
import * as moment from 'moment';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  bookingForm: FormGroup;
  houseId: number = this.route.snapshot.params.id;
  subscription: Subscription;
  house: House;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private ngRedux: NgRedux<IAppState>) {
  }

  onSubmit(bookingForm) {
    if (bookingForm.valid) {
      console.log('Send booking');
    }
  }

  ngOnInit() {
    this.subscription = this.ngRedux.select(state => state.houses).subscribe(houses => {
      this.house = houses.find(x => x.id == this.houseId);
    });

    this.bookingForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      houseId: [this.houseId, Validators.required]
    });
  }

}
