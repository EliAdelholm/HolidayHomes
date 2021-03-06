import {AppActions} from '../app.actions';
import {tassign} from 'tassign';

export function houseReducer(state = [], action: any) {

  switch (action.type) {

    case AppActions.CREATE_HOUSE:
      return state;

    case AppActions.CREATED_HOUSE:
      const newHouseArray = [...state, action.payload];

      return Object.assign(newHouseArray);

    case AppActions.FAILED_TO_CREATE_HOUSE:
      return state;

    case AppActions.UPDATE_HOUSE:
      return state;

    case AppActions.UPDATED_HOUSE:
      const filteredHouseArray = state.filter(house => house.id != action.payload.id);
      const updatedHouseArray = [...filteredHouseArray, action.payload];
      return Object.assign(updatedHouseArray);

    case AppActions.FAILED_TO_UPDATE_HOUSE:
      return state;

    case AppActions.DELETE_HOUSE:
      return state;

    case AppActions.DELETED_HOUSE:
      const deletedHouseArray = state.filter(house => house.id != action.payload.id);
      return Object.assign(deletedHouseArray);

    case AppActions.FAILED_TO_DELETE_HOUSE:
      return state;

    case AppActions.RECEIVED_HOUSES:
      const concatHouses = [...state, ...action.payload];
      return Object.assign(concatHouses);

    default:
      return state;
  }
}
