import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../../redux/store/store';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {House} from '../../entities/house';
import {DatePickerConfig, ECalendarType} from '@libusoftcicom/lc-datepicker';
import * as moment from 'moment';
import {BookingService} from './booking.service';
import {LoginService} from '../../services/login/login.service';
import {DateValidator} from '../../validators/date-validator';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  private dateValue: string = null;
  public config = new DatePickerConfig();
  public sCalendarOpened = false;
  public eCalendarOpened = false;
  bookingForm: FormGroup;
  houseId: number = this.route.snapshot.params.id;
  subscription: Subscription;
  house: House;
  bookings: any = [];
  bookingStatus = null;
  dateTaken: boolean;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private ngRedux: NgRedux<IAppState>, private bookingService: BookingService, private loginService: LoginService) {
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
      // console.log('this.bookings', this.bookings);
      for (let i = 0; i < this.bookings.length; i++) {
        // console.log('checking', this.bookingForm.value.endDate,  this.bookings[i]);
        if (this.bookingForm.value.endDate === this.bookings[i]) {
          // console.log('dateTaken', this.bookings[i]);
          this.dateTaken = true;
        }
        if (this.bookingForm.value.startDate === this.bookings[i]) {
          // console.log('dateTaken', this.bookings[i]);
          this.dateTaken = true;
        }
      }
      if (!this.dateTaken) {
        // console.log('Send booking', bookingForm.value);
        this.bookingService.addBooking(bookingForm.value).subscribe(response => {
          // console.log(response);
          this.bookingStatus = response;
          if (this.bookingStatus.status === 'OK') {
            this.router.navigate(['house-preview/', this.houseId]);
          }
        });
      }
    }
  }


  ngOnInit() {
    this.subscription = this.ngRedux.select(state => state.houses).subscribe(houses => {
      this.house = houses.find(x => x.id == this.houseId);
    });
    const dateValidator = DateValidator.getDateValidator();
    this.bookingForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.compose([Validators.required, dateValidator])],
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
