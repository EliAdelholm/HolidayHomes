import { Injectable } from '@angular/core';

@Injectable()
export class DatesArrayService {

  constructor() {
    // defining the function
    const getDatesBetweenDates = function(startDate, endDate) {
      const aBookedDates = [];
      let currentDate = startDate;
      const addDays = function (days) {
        const date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
      while (currentDate <= endDate) {
        aBookedDates.push(currentDate);
        currentDate = addDays.call(currentDate, 1);
      }
      return aBookedDates;
    };

// The function adds a trailing zero so you get 01 instead of 1 for example.
    const addLeadingZero = (iNumber) => {
      if (iNumber < 10) {
        return `0${iNumber}`;
      }
      return iNumber;
    };

// Arguments should be passed like this
//    new Date(1992, 5, 25);

// Examples of using existing dates
//     getDatesBetweenDates(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()),
//       new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()));

// map this to get the data in the right format for the calender
//     const asDatesBetween = aDatesBetween.map((date) => {
//       return `${date.getFullYear()}-${addLeadingZero(date.getMonth() + 1)}-${addLeadingZero(date.getDate())}`;
//     };

}
