import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../../redux/store/store';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';
import {House} from '../../entities/house';
import {DatePickerConfig, ECalendarType} from '@libusoftcicom/lc-datepicker';
import * as moment from 'moment';
import {BookingService} from './booking.service';
import {LoginService} from '../../services/login/login.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  private dateValue: string = null;
  public config = new DatePickerConfig();
  public sCalendarOpened: boolean = false;
  public eCalendarOpened: boolean = false;
  bookingForm: FormGroup;
  houseId: number = this.route.snapshot.params.id;
  subscription: Subscription;
  house: House;
  bookings: any = [];
  bookingStatus = null;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private ngRedux: NgRedux<IAppState>, private bookingService: BookingService, private loginService: LoginService) {
    this.config.CalendarType = ECalendarType.Date;
    this.config.Localization = 'en';
    this.config.MinDate = {years: moment().year(), months: moment().month(), date: moment().date()};
    this.config.PrimaryColor = '#007bff';
    this.config.Format = 'YYYY-MM-DD';
  }

  public get sDate() {
    return this.bookingForm.value.startDate;
  }

  public get eDate() {
    return this.bookingForm.value.endDate;
  }

  public set sDate(value: string) {
    this.bookingForm.controls['startDate'].patchValue(value);
  }

  public set eDate(value: string) {
    this.bookingForm.controls['endDate'].patchValue(value);
  }

  onSubmit(bookingForm) {
    if (bookingForm.valid) {
      console.log('Send booking', bookingForm.value);
      this.bookingService.addBooking(bookingForm.value).subscribe(response => {
        console.log(response);
        this.bookingStatus = response;
      });
    }
  }

  ngOnInit() {
    this.subscription = this.ngRedux.select(state => state.houses).subscribe(houses => {
      this.house = houses.find(x => x.id == this.houseId);
    });

    this.bookingForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      houseId: [this.houseId, Validators.required],
      userId: [this.loginService.getUserId()]
    });

    this.bookingService.getBookings(this.houseId)
      .subscribe(data => {
        this.bookings = data;
        this.config.setDisabledDates(this.bookings);
      });


  }

}
