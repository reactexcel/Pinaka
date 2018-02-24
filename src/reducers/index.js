import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import settings from './settings';
import customer from './customer';
import user from './user';
import interest from './interest';
import redeem from './redeem';


const reducers = {
  routing: routerReducer,
  settings,
  customer,
  user,
  interest,
  redeem
};

module.exports = combineReducers(reducers);
