import {AppActions} from '../app.actions';
import {tassign} from 'tassign';

export function userReducer(state = null, action: any) {
  switch (action.type) {

    case AppActions.RECEIVED_USER:
      console.log('user reducer')
      return tassign(state, {status: 'OK', account: action.payload});

    case AppActions.FAILED_TO_GET_USER:
      console.log(action.payload);
      return tassign(state, {status: action.payload});

    case AppActions.CREATE_USER:
    console.log(action.payload);
    return tassign(state, {account: action.payload});

    case AppActions.CREATED_USER:
      return state;

    case AppActions.FAILED_TO_CREATE_USER:
      return state;

    case AppActions.UPDATE_USER:
      return state;

    case AppActions.UPDATED_USER:
      const updatedUser = Object.assign(state.account, action.payload);
      return tassign(state, {account: updatedUser});

    case AppActions.FAILED_TO_UPDATE_USER:
      return state;

    case AppActions.DELETE_USER:
      return state;

    case AppActions.DELETED_USER:
      return state;

    case AppActions.FAILED_TO_DELETE_USER:
      return state;

    case AppActions.GET_USER_HOUSES:
      return tassign(state, {status: null});

    case AppActions.RECEIVED_USER_HOUSES:
      return tassign(state, { houses: action.payload});

    case AppActions.FAILED_TO_GET_USER_HOUSES:
      return state;

    default:
      return state;
  }
}
