import {combineReducers} from 'redux';
import {routerReducer} from '@angular-redux/router';
import {houseReducer} from '../reducers/house.reducer';
import {userReducer} from '../reducers/user.reducer';
import {House} from '../../entities/house';
import {User} from '../../entities/user';
import {statusReducer} from '../reducers/status.reducer';



export class IAppState {
  houses: House[];
  user: {
    status: string,
    account: User,
    houses: any[]
  };
  requestStatus: {
    code: string,
    result: any,
  };
}

export const rootReducer = combineReducers<IAppState>({
  houses: houseReducer,
  user: userReducer,
  requestStatus: statusReducer,
  router: routerReducer
});
