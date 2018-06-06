import {IAppState} from '../store/store';
import {AppService} from '../app.service';
import {AppActions} from '../app.actions';
import {tassign} from 'tassign';

// const INITIAL_STATE: IAppState = AppService.getInitialState();

export function userReducer(state = null, action: any) {
  switch (action.type) {

    case AppActions.RECEIVED_USER:
      return tassign( state, { status: 'OK', account: action.payload} );

    case AppActions.FAILED_TO_GET_USER:
      console.log(action.payload);
      return tassign(state, { status: action.payload});

    case AppActions.CREATE_USER:
      const newUserArray = [ ...state.user, action.payload ];
      return tassign( state, { user: newUserArray } );

    default:
      return state;
  }
}
