import {HouseState} from '../store/store';
import {HouseService} from './house.service';
import {HouseActions} from './house.actions';
import {tassign} from 'tassign';

const INITIAL_STATE: HouseState = HouseService.getInitialHouseState();

export function houseReducer ( state: HouseState = INITIAL_STATE, action: any ){
  switch ( action.type ){
    case HouseActions.CREATE_HOUSE:
      let newHouseArray = [ ...state.house, action.payload ];
      console.log( 'newHouseArray', newHouseArray );
      return tassign( state, { house: newHouseArray } )

    case HouseActions.GET_HOUSES:
      newHouseArray = [ state.house ];
      console.log( 'get newHouseArray',newHouseArray );
      return tassign( state, { house: newHouseArray } )

    default:
      return state;
  }
}
