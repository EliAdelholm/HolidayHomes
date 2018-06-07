import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {House} from '../entities/house';

@Pipe({name: 'filterHouseType'})
@Injectable()

export class FilterHouseType implements PipeTransform {
  transform(items: House[], isHouse: boolean, isApartment: boolean): any {
    return items.filter(
      item => {
        if(!isHouse && !isApartment) return false;
        if(isHouse && isApartment) return true;
        if(isHouse && item.is_house === 1) return true;
        if(isApartment && item.is_house === 0) return true;

        return false;
      }
    );
  }
}

