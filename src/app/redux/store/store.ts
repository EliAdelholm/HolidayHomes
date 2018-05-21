import {combineReducers} from 'redux';
import {routerReducer} from '@angular-redux/router';
import {houseReducer} from '../reducers/house.reducer';
import {userReducer} from '../reducers/user.reducer';
import {House} from '../../entities/house';


export class IAppState {
  houses: House[];
  user: {
    status: string,
    account: object,
    houses: any[]
  };
}

export const rootReducer = combineReducers<IAppState>({
  houses: houseReducer,
  user: userReducer,
  // when you add more reducers, add them here..
  router: routerReducer
});
