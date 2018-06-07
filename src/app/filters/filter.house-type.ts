import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {House} from '../entities/house';

@Pipe({name: 'filterHouseType'})
@Injectable()

export class FilterHouseType implements PipeTransform {
  transform( items: House[], isHouse: boolean, isApartment: boolean, hasWifi: boolean, hasTv: boolean, hasDryer: boolean, isFamilyFriendly: boolean ): any {
    console.log(hasWifi, hasTv, hasDryer, isFamilyFriendly);
    return items.filter(
      item => {
        if ( !isHouse && !isApartment ) { return false; }
        if ( isHouse && isApartment ) { return true; }
        if ( isHouse && item.is_house === 1 ) { return true; }
        if ( isApartment && item.is_house === 0 ) { return true; }
        return false;
      }).filter(item => {
        if ( hasTv && item.tv === 0 ) { return false; }
        return true;
      }).filter(item => {
        if ( hasDryer && item.dryer === 0 ) { return false; }
        return true;
      }).filter(item => {
        console.log('item', item.isFamilyFriendly);
        if ( isFamilyFriendly && item.isFamilyFriendly === 0 ) { return false; }
        return true;
      }).filter(item => {
        if ( hasWifi && item.hasWifi === 0 ) { return false; }
        return true;
      });
  }
}

// if ( hasTv && item.tv === 1 ) { return true; }
// if ( hasDryer && item.dryer === 1 ) { return true; }
// if ( isFamilyFriendly && item.isFamilyFriendly === 1 ) { return true;}
