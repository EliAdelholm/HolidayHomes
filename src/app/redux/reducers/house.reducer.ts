import {AppService} from '../app.service';
import {AppActions} from '../app.actions';
import {tassign} from 'tassign';
import {House} from '../../entities/house';

export function houseReducer(state = [], action: any) {
  switch (action.type) {
    case AppActions.RECEIVED_USER:
      console.log('house reducer');
      return state;

    case AppActions.CREATE_HOUSE:
      return state;

    case AppActions.CREATED_HOUSE:
      const newHouseArray = [...state, action.payload];
      console.log('newHouseArray', newHouseArray);
      return tassign({state: newHouseArray});

    case AppActions.FAILED_TO_CREATE_HOUSE:
      return state;

    case AppActions.UPDATE_HOUSE:
      return state;

    case AppActions.UPDATED_HOUSE:
      const updateHouseIndex = state.findIndex(house => house.id === action.payload.id)
      const updatedHouseArray = Object.assign(state[updateHouseIndex], action.payload);
      return tassign({state: updatedHouseArray});

    case AppActions.FAILED_TO_UPDATE_HOUSE:
      return state;

    case AppActions.RECEIVED_HOUSES:
      const concatHouses = [...state, ...action.payload];
      return Object.assign(concatHouses);

    default:
      return state;
  }
}
