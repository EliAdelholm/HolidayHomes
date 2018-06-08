import {FormControl} from '@angular/forms';

export class DateValidator {
  static getDateValidator() {
    return function getDateValidator(control: FormControl) {
      if (control.parent !== undefined) {
        const startTimeControl = control.parent.controls['startDate'];
        const endTimeControl = control.parent.controls['endDate'];

        const timeStartStr = startTimeControl.value;
        const timeEndStr = endTimeControl.value;
        const timeStartDate = new Date(timeStartStr);
        const timeEndDate = new Date(timeEndStr);

        console.log('Comparing', timeStartDate, timeEndDate);
        if (timeStartDate < timeEndDate) {
          console.log( 'timeStartDate is OK' );
          return null;
        } else {
          console.log('timeStartDate => timeEndDate');
          return { invalidTime: true };
        }
      } else {
        console.log('Control parent is undefined');
        return { parentUndefined: true };
      }
    };
  }
}
