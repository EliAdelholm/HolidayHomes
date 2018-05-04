import { combineReducers } from "redux";
import { routerReducer } from "@angular-redux/router";
import {houseReducer} from '../house/house.reducer';
import {House} from '../../entities/house';

export class HouseState {
  house : House[];
}

export class IAppState {
  house ?: HouseState;
}

export const rootReducer = combineReducers<IAppState>({
  house: houseReducer,
  // when you add more reducers, add them here..
  router: routerReducer
});
