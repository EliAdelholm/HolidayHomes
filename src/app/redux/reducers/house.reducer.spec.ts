import {houseReducer} from './house.reducer';
import {AppActions} from '../app.actions';
import {House} from '../../entities/house';

const deepFreeze = require('deep-freeze');

describe('house reducer', () => {
  it('should create house', () => {
    const state = [];
    deepFreeze(state);

    const house: House = new House();
    house.address = 'test';
    house.description = 'test test';
    house.dryer = 0;
    house.wifi = 0;
    house.headline = 'test';
    house.is_house = 0;
    house.familyfriendly = 0;
    house.tv = 0;
    house.thumbnail_image = 'test';
    house.space = 10;
    house.price = 10;
    house.images = ['test'];

    const afterState = [];
    afterState.push(house);

    const newState = houseReducer(state, {
      type: AppActions.CREATED_HOUSE, payload: house
    });

    expect(newState).toEqual(afterState);
  });

});
