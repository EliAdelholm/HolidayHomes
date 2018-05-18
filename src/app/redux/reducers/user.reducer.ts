import {IAppState} from '../store/store';
import {AppService} from '../app.service';
import {AppActions} from '../app.actions';
import {tassign} from 'tassign';

// const INITIAL_STATE: IAppState = AppService.getInitialState();

export function userReducer(state: IAppState = null, action: any) {
  switch (action.type) {

    case AppActions.RECEIVED_USER:
      return tassign( state, action.payload );

    default:
      return state;
  }
}
