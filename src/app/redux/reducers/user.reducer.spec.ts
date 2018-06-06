import {User} from '../../entities/user';
import {userReducer} from './user.reducer';
import {AppActions} from '../app.actions';

const deepFreeze = require('deep-freeze');

describe('user reducer', () => {
  it('should create user', () => {
    const state = { status: null, account: null, houses: [] };
    deepFreeze(state);

    const user: User = new User();
    user.userEmail = 'testMail';
    user.userName = 'testName';
    user.userPassword = 'testPass';

    const afterState = { status: null, account: null, houses: [] };
    afterState.account = user;

    const newState = userReducer(state, {
      type: AppActions.CREATE_USER, payload: user
    });

    expect(newState).toEqual(afterState);

  });
});
